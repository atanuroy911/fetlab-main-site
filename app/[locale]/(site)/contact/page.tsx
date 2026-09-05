import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/site/page-header";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { Handshake, Lightbulb, Building2, GraduationCap, Users, Mail } from "lucide-react";

const PATHWAY_ICONS = [Handshake, Lightbulb, Building2, GraduationCap, Users, Mail];

export async function generateMetadata() {
  const t = await getTranslations("Contact");
  return { title: `${t("eyebrow")} — FETLAB` };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const settings = await getSiteSettings();

  const pathways = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    title: t(`pathway${n}Title`),
    body: t(`pathway${n}Body`),
    Icon: PATHWAY_ICONS[i],
  }));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pathways.map(({ title, body, Icon }) => (
            <div key={title} className="border-l-2 border-border pl-4">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-heading text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px w-full bg-border" />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div
          className="rounded-2xl border border-border px-8 py-14 text-center sm:px-16"
          style={{
            backgroundImage:
              "radial-gradient(120% 100% at 50% 0%, color-mix(in oklch, var(--brand) 8%, var(--card)), var(--card))",
          }}
        >
          <h2 className="font-heading text-2xl font-semibold">{t("getInTouch")}</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">{t("getInTouchDesc")}</p>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            {settings.contactEmail}
          </a>
        </div>
      </section>
    </>
  );
}
