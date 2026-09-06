import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/site/page-header";
import { PublicationList } from "@/components/site/publication-list";
import { getPublications } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const t = await getTranslations("Publications");
  return { title: `${t("eyebrow")} — FETLAB` };
}

export default async function PublicationsPage() {
  const t = await getTranslations("Publications");
  const publications = await getPublications();

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <PublicationList publications={publications} />
      </section>
    </>
  );
}
