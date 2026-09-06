import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getFeaturedResearchGroups,
  getPeople,
  getRecentNotices,
  getRecentPosts,
  getPublications,
  getResearchGroups,
  getSiteSettings,
} from "@/lib/sanity/fetch";
import { NoticeTypeBadge } from "@/components/site/notice-type-badge";
import { ModelLoop } from "@/components/site/model-loop";
import { HeroLottie } from "@/components/site/hero-lottie";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { formatDate } from "@/lib/format-date";

export default async function HomePage() {
  const [settings, groups, allGroups, notices, posts, publications, people] = await Promise.all([
    getSiteSettings(),
    getFeaturedResearchGroups(),
    getResearchGroups(),
    getRecentNotices(),
    getRecentPosts(),
    getPublications(),
    getPeople(),
  ]);
  const recentPublications = publications.slice(0, 3);

  const stats = [
    { label: "Research groups & initiatives", value: `${allGroups.length}+` },
    { label: "People in the network", value: `${people.length}+` },
    { label: "Founded", value: "2026" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_70%)] opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-24 sm:pb-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Future &amp; Emerging Technology Laboratory
              </p>
              <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-6xl">
                <span className="text-brand-gradient">{settings.heroHeadline}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted-foreground text-pretty sm:text-lg">
                {settings.heroSubtext}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={
                    <Link href="/research">
                      Explore Research <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  }
                />
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/contact">Collaborate with us</Link>}
                />
              </div>

              <dl className="mt-12 grid grid-cols-3 gap-3 border-t border-border pt-8 sm:mt-16 sm:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs text-muted-foreground text-pretty">{stat.label}</dt>
                    <dd className="mt-1 font-heading text-xl font-semibold text-brand-gradient sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hidden lg:block">
              <HeroLottie />
            </div>
          </div>
        </div>
      </section>

      {/* What is FETLAB */}
      <section className="relative bg-muted/30 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-6xl px-4 sm:px-6" as="section">
          <div className="grid gap-10 sm:grid-cols-[200px_1fr]">
            <RevealItem>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                What is FETLAB?
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="max-w-2xl font-heading text-xl leading-snug text-pretty sm:text-2xl">
                {settings.whatIsFetlab}
              </p>
            </RevealItem>
          </div>
        </Reveal>
      </section>

      {/* The FETLAB Model */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-3xl"
          style={{ backgroundImage: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
        />
        <Reveal className="relative mx-auto max-w-6xl px-4 sm:px-6" as="section">
          <div className="grid gap-10 sm:grid-cols-[200px_1fr]">
            <RevealItem>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                The FETLAB Model
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="max-w-2xl text-muted-foreground">
                A problem-driven, multidisciplinary, and iterative loop — rather than a
                one-way pipeline from research to product.
              </p>
              <div className="mt-10">
                <ModelLoop />
              </div>
            </RevealItem>
          </div>
        </Reveal>
      </section>

      {/* Research Groups */}
      <section className="relative bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-10 flex items-end justify-between gap-4">
            <RevealItem>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Research &amp; Initiatives
              </h2>
              <p className="mt-2 max-w-xl font-heading text-xl">
                Distributed research groups, initiatives, and forums under the FETLAB umbrella.
              </p>
            </RevealItem>
            <Link
              href="/research"
              className="hidden shrink-0 text-sm font-medium text-foreground hover:underline sm:block"
            >
              View all research →
            </Link>
          </Reveal>
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <RevealItem key={group._id}>
                <Link
                  href={`/research/${group.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{
                      backgroundImage: "linear-gradient(90deg, var(--brand), var(--brand-2))",
                    }}
                  />
                  <span className="text-xs font-medium tracking-wide text-primary uppercase">
                    {group.kind === "group"
                      ? "Research Group"
                      : group.kind === "initiative"
                      ? "Initiative"
                      : "Forum"}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-balance">
                    {group.shortTitle || group.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
                    {group.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-foreground">
                    Learn more{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
          <Link
            href="/research"
            className="mt-8 block text-sm font-medium text-foreground hover:underline sm:hidden"
          >
            View all research →
          </Link>
        </div>
      </section>

      {/* Latest from FETLAB: publications, blog, notices side by side */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-10">
            <RevealItem>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Latest from FETLAB
              </h2>
              <p className="mt-2 max-w-xl font-heading text-xl">
                Publications, blog posts, and notices from across the network.
              </p>
            </RevealItem>
          </Reveal>

          <Reveal className="grid gap-8 lg:grid-cols-3">
            {/* Publications */}
            <RevealItem>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold">Publications</h3>
                <Link
                  href="/publications"
                  className="text-xs font-medium text-foreground hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
                {recentPublications.length === 0 ? (
                  <p className="p-4 text-sm text-muted-foreground">
                    No publications listed yet.
                  </p>
                ) : (
                  recentPublications.map((pub) => (
                    <div key={pub._id} className="p-4">
                      <p className="text-sm font-medium text-balance">{pub.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{pub.year}</p>
                    </div>
                  ))
                )}
              </div>
            </RevealItem>

            {/* Blog */}
            <RevealItem>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold">Blog</h3>
                <Link href="/blog" className="text-xs font-medium text-foreground hover:underline">
                  View all
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
                {posts.length === 0 ? (
                  <p className="p-4 text-sm text-muted-foreground">No posts published yet.</p>
                ) : (
                  posts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="p-4 transition-colors hover:bg-accent/50"
                    >
                      <p className="text-sm font-medium text-balance">{post.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(post.publishedAt)}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </RevealItem>

            {/* Notices */}
            <RevealItem>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold">Notices</h3>
                <Link
                  href="/notices"
                  className="text-xs font-medium text-foreground hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
                {notices.map((notice) => (
                  <Link
                    key={notice._id}
                    href={`/notices/${notice.slug}`}
                    className="flex flex-col gap-1.5 p-4 transition-colors hover:bg-accent/50"
                  >
                    <NoticeTypeBadge type={notice.type} />
                    <p className="text-sm font-medium text-balance">{notice.title}</p>
                    <time className="text-xs text-muted-foreground">
                      {formatDate(notice.publishedAt)}
                    </time>
                  </Link>
                ))}
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Collaborate CTA */}
      <section className="bg-muted/30 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealItem
            className="relative overflow-hidden rounded-2xl border border-border px-8 py-14 text-center sm:px-16"
          >
            <div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--brand) 10%, var(--card)), var(--card))",
              }}
            />
            <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
              Collaborate with FETLAB
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Researchers · Students · Institutions · Industry · Government · Communities —
              FETLAB is strengthened by everyone who participates in its ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" nativeButton={false} render={<Link href="/contact">Get in touch</Link>} />
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/notices">See open opportunities</Link>}
              />
            </div>
          </RevealItem>
        </Reveal>
      </section>
    </>
  );
}
