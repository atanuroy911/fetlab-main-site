import type { Publication } from "@/lib/sanity/types";

const ENTRY_TYPE: Record<Publication["type"], string> = {
  journal: "article",
  conference: "inproceedings",
  preprint: "misc",
  thesis: "phdthesis",
  report: "techreport",
};

/** BibTeX keys must be ASCII and free of separators. */
function citationKey(publication: Publication): string {
  const firstAuthor = (publication.authors[0] ?? "anon")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/\s+/)
    .pop()!
    .replace(/[^A-Za-z0-9]/g, "")
    .toLowerCase();
  const firstWord = publication.title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/\s+/)
    .find((w) => w.replace(/[^A-Za-z0-9]/g, "").length > 3)
    ?.replace(/[^A-Za-z0-9]/g, "")
    .toLowerCase();
  return [firstAuthor || "anon", publication.year, firstWord].filter(Boolean).join("");
}

/**
 * Braces and backslashes carry meaning in BibTeX, so they are stripped rather
 * than escaped — a mangled title is worse than a plain one.
 */
function clean(value: string): string {
  return value.replace(/[{}\\]/g, "").trim();
}

function doiFromUrl(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/10\.\d{4,9}\/[^\s"<>]+/);
  return match ? match[0] : null;
}

const VENUE_FIELD: Record<Publication["type"], string> = {
  journal: "journal",
  conference: "booktitle",
  preprint: "howpublished",
  thesis: "school",
  report: "institution",
};

export function toBibTeX(publication: Publication): string {
  const fields: [string, string][] = [
    ["title", clean(publication.title)],
    ["author", publication.authors.map(clean).join(" and ")],
    ["year", String(publication.year)],
  ];

  if (publication.venue) fields.push([VENUE_FIELD[publication.type], clean(publication.venue)]);

  const doi = doiFromUrl(publication.doiUrl);
  if (doi) fields.push(["doi", doi]);

  const url = publication.doiUrl || publication.pdfUrl;
  if (url) fields.push(["url", url]);

  if (publication.tags?.length) fields.push(["keywords", publication.tags.map(clean).join(", ")]);

  const body = fields.map(([key, value]) => `  ${key} = {${value}}`).join(",\n");
  return `@${ENTRY_TYPE[publication.type]}{${citationKey(publication)},\n${body}\n}`;
}

export function toBibTeXFile(publications: Publication[]): string {
  return publications.map(toBibTeX).join("\n\n") + "\n";
}
