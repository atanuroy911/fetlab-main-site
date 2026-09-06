import { PageHeader } from "@/components/site/page-header";
import { PublicationList } from "@/components/site/publication-list";
import { getPublications } from "@/lib/sanity/fetch";

export const metadata = { title: "Publications — FETLAB" };

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Publications"
        description="Papers, reports, and research outputs from across the FETLAB network."
      />
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <PublicationList publications={publications} />
      </section>
    </>
  );
}
