import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { getGalleryAlbums } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";

const description =
  "Photos from events, workshops, field visits, and everyday life across the FETLAB network.";

export const metadata = {
  title: "Gallery",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery — FETLAB", description, url: "/gallery" },
};

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Gallery" description={description} />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {albums.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-20 text-center">
            <Camera className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
            <p className="mt-4 font-heading text-xl font-semibold">No albums yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Photo albums published in the Studio will appear here.
            </p>
          </div>
        ) : (
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <RevealItem key={album._id}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    {album.coverUrl ? (
                      <Image
                        src={album.coverUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        placeholder={album.coverLqip ? "blur" : undefined}
                        blurDataURL={album.coverLqip ?? undefined}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Camera className="h-6 w-6 text-muted-foreground" aria-hidden />
                      </div>
                    )}
                    <span className="absolute right-3 bottom-3 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                      {album.imageCount} {album.imageCount === 1 ? "photo" : "photos"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={album.date} className="text-xs text-muted-foreground">
                      {formatDate(album.date)}
                      {album.location && ` · ${album.location}`}
                    </time>
                    <h2 className="mt-2 font-heading text-lg font-semibold text-balance">
                      {album.title}
                    </h2>
                    {album.description && (
                      <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">
                        {album.description}
                      </p>
                    )}
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </section>
    </>
  );
}
