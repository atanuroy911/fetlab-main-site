import { getPublications } from "@/lib/sanity/fetch";
import { toBibTeXFile } from "@/lib/bibtex";

/** The whole publication list as a single .bib file, for reference managers. */
export async function GET() {
  const publications = await getPublications();

  return new Response(toBibTeXFile(publications), {
    headers: {
      "Content-Type": "application/x-bibtex; charset=utf-8",
      "Content-Disposition": 'attachment; filename="fetlab-publications.bib"',
    },
  });
}
