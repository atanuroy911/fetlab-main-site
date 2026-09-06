import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  FlaskConical,
  Building2,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { NoticeTypeBadge } from "@/components/site/notice-type-badge";
import { NoticeStatusBadge } from "@/components/site/notice-status-badge";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { getNotices, getSiteSettings } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";
import { noticeStatus, sortNotices } from "@/lib/notice-status";

const description =
  "Research opportunities, student positions, and open roles at FETLAB — and how to reach us when nothing listed fits.";

export const metadata = {
  title: "Join FETLAB",
  description,
  alternates: { canonical: "/join" },
  openGraph: { title: "Join FETLAB", description, url: "/join" },
};

const ROUTES = [
  {
    Icon: GraduationCap,
    title: "Students",
    body: "Undergraduate and postgraduate students looking for a research project, a thesis supervisor, or a first taste of real research work.",
    expectations: [
      "A short note on what you want to work on and why",
      "Your CV, and a transcript if you have one",
      "Any project, code, or writing you are proud of",
    ],
  },
  {
    Icon: FlaskConical,
    title: "Researchers & Faculty",
    body: "Researchers who want to run a project under the FETLAB umbrella, co-supervise students, or bring an existing line of work into the network.",
    expectations: [
      "A paragraph on your research area and current questions",
      "Your CV or Google Scholar profile",
      "What you would want from FETLAB, and what you would bring",
    ],
  },
  {
    Icon: Building2,
    title: "Institutions & Industry",
    body: "Universities, companies, government bodies, and NGOs looking for a research partner on a specific problem.",
    expectations: [
      "The problem you are trying to solve",
      "Who would be involved on your side",
      "Rough timeline and any constraints we should know about",
    ],
  },
];

export default async function JoinPage() {
  const [notices, settings] = await Promise.all([getNotices(), getSiteSettings()]);

  // Vacancies and calls are the recruiting notices; anything still open leads.
  const opportunities = sortNotices(
    notices.filter(
      (n) => (n.type === "vacancy" || n.type === "call") && noticeStatus(n.deadline) !== "closed"
    )
  );

  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Work with FETLAB"
        description={description}
      />

      {/* Open positions lead, because that is what most visitors came for. */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-xl font-semibold">Open opportunities</h2>
          <Link href="/news" className="shrink-0 text-sm font-medium hover:underline">
            All news →
          </Link>
        </div>

        {opportunities.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-border p-8">
            <p className="font-medium">Nothing is formally open right now.</p>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground text-pretty">
              That does not mean we are not interested. We regularly take on students and
              collaborators outside of advertised calls — if your interests overlap with our
              research, write to us anyway and tell us what you want to work on.
            </p>
            {settings.contactEmail && (
              <Button
                className="mt-6"
                nativeButton={false}
                render={
                  <a href={`mailto:${settings.contactEmail}`}>
                    Write to us <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                }
              />
            )}
          </div>
        ) : (
          <Reveal className="mt-6 flex flex-col divide-y divide-border rounded-lg border border-border">
            {opportunities.map((notice) => (
              <RevealItem key={notice._id}>
                <Link
                  href={`/notices/${notice.slug}`}
                  className="flex flex-col gap-3 p-6 transition-colors hover:bg-accent/50 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <NoticeTypeBadge type={notice.type} />
                      <NoticeStatusBadge deadline={notice.deadline} />
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-semibold text-balance">
                      {notice.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
                      {notice.summary}
                    </p>
                  </div>
                  {notice.deadline && (
                    <div className="shrink-0 text-sm text-muted-foreground sm:text-right">
                      Deadline
                      <br />
                      <span className="font-medium text-foreground">
                        {formatDate(notice.deadline)}
                      </span>
                    </div>
                  )}
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </section>

      {/* Standing invitation — the part that matters when nothing is advertised. */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-xl font-semibold">Ways to join</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground text-pretty">
            Most people who end up working with FETLAB approached us directly. Tell us what you
            want to work on — a specific interest is far more useful than a general offer to help.
          </p>

          <Reveal className="mt-10 grid gap-6 lg:grid-cols-3">
            {ROUTES.map(({ Icon, title, body, expectations }) => (
              <RevealItem
                key={title}
                className="flex h-full flex-col rounded-lg border border-border bg-background p-6"
              >
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-3 font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{body}</p>
                <p className="mt-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  What to send
                </p>
                <ul className="mt-2 flex-1 space-y-1.5">
                  {expectations.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl border border-border px-8 py-14 text-center sm:px-16"
          style={{
            backgroundImage:
              "radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--brand) 10%, var(--background)), var(--background))",
          }}
        >
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Ready to write to us?</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground text-pretty">
            Put &ldquo;Join FETLAB&rdquo; in the subject line along with what you are interested in,
            so it reaches the right person quickly.
          </p>
          {settings.contactEmail && (
            <a
              href={`mailto:${settings.contactEmail}?subject=${encodeURIComponent("Join FETLAB")}`}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {settings.contactEmail}
            </a>
          )}
          <p className="mt-6 text-sm text-muted-foreground">
            Not sure where you fit?{" "}
            <Link href="/research" className="font-medium text-foreground hover:underline">
              Browse our research
            </Link>{" "}
            first.
          </p>
        </div>
      </section>
    </>
  );
}
