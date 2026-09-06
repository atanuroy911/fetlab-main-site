/**
 * One-time migration: `person.category` moves from a hardcoded string to a
 * reference to a `personCategory` document.
 *
 * Creates the five legacy categories as documents (idempotent), then repoints
 * every person that still holds a plain string. Safe to run more than once.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=sk... node scripts/migrate-person-categories.mjs
 *   SANITY_WRITE_TOKEN=sk... node scripts/migrate-person-categories.mjs --dry-run
 *
 * Create the token at https://www.sanity.io/manage -> API -> Tokens (Editor).
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";

// Read NEXT_PUBLIC_* values out of .env.local so this matches the site config.
function envFromFile(name) {
  try {
    const line = readFileSync(new URL("../.env.local", import.meta.url), "utf8")
      .split("\n")
      .find((l) => l.trim().startsWith(`${name}=`));
    return line ? line.slice(line.indexOf("=") + 1).trim() : undefined;
  } catch {
    return undefined;
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || envFromFile("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || envFromFile("NEXT_PUBLIC_SANITY_DATASET") || "production";
const token = process.env.SANITY_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token && !dryRun) throw new Error("Missing SANITY_WRITE_TOKEN (or pass --dry-run)");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const LEGACY = [
  { value: "leadership", title: "Founders & Leadership", order: 1 },
  { value: "core", title: "Core Team", order: 2 },
  { value: "researcher", title: "Researchers & Faculty", order: 3 },
  { value: "student", title: "Student Researchers", order: 4 },
  { value: "collaborator", title: "Collaborators", order: 5 },
];

const people = await client.fetch(`*[_type == "person"]{_id, name, category}`);
// Only people whose category is still a raw string need migrating.
const stale = people.filter((p) => typeof p.category === "string");

console.log(`${people.length} people, ${stale.length} need migrating.`);
if (stale.length === 0) {
  console.log("Nothing to do.");
  process.exit(0);
}

const used = new Set(stale.map((p) => p.category));
const tx = client.transaction();

for (const { value, title, order } of LEGACY) {
  if (!used.has(value)) continue;
  // createIfNotExists keeps this safe to re-run.
  tx.createIfNotExists({
    _id: `personCategory.${value}`,
    _type: "personCategory",
    title,
    slug: { _type: "slug", current: value },
    order,
  });
  console.log(`  category: ${title} (${value})`);
}

for (const person of stale) {
  const known = LEGACY.some((l) => l.value === person.category);
  if (!known) {
    console.warn(`  ! skipping ${person.name}: unknown category "${person.category}"`);
    continue;
  }
  tx.patch(person._id, {
    set: {
      category: { _type: "reference", _ref: `personCategory.${person.category}` },
    },
  });
  console.log(`  person: ${person.name} -> ${person.category}`);
}

if (dryRun) {
  console.log("\nDry run — nothing written.");
  process.exit(0);
}

await tx.commit();
console.log("\nDone.");
