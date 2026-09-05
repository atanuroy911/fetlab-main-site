import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/site/page-header";
import { ModelLoop } from "@/components/site/model-loop";
import { getSiteSettings } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const t = await getTranslations("About");
  return { title: `${t("eyebrow")} — FETLAB` };
}

export default async function AboutPage() {
  const t = await getTranslations("About");
  const settings = await getSiteSettings();

  const principles = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`principle${n}Title`),
    body: t(`principle${n}Body`),
  }));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={settings.whatIsFetlab} />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-8">
            <h2 className="text-sm font-medium tracking-wide text-primary uppercase">
              {t("visionLabel")}
            </h2>
            <p className="mt-3 font-heading text-xl leading-snug text-pretty">
              {settings.vision}
            </p>
          </div>
          <div className="rounded-lg border border-border p-8">
            <h2 className="text-sm font-medium tracking-wide text-primary uppercase">
              {t("missionLabel")}
            </h2>
            <p className="mt-3 font-heading text-xl leading-snug text-pretty">
              {settings.mission}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t("principlesTitle")}
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="border-l-2 border-border pl-4">
              <h3 className="font-heading text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t("modelTitle")}
        </h2>
        <p className="mt-4 max-w-2xl font-heading text-xl text-pretty">{t("modelIntro")}</p>
        <div className="mt-10">
          <ModelLoop />
        </div>
        <p className="mt-10 max-w-2xl text-muted-foreground">{t("modelOutro")}</p>
      </section>
    </>
  );
}
