import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { getGalleryAlbumBySlug } from "@/lib/sanity/fetch";
import { formatDate } from "@/lib/format-date";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) return { title: "Album not found" };
  const description =
    album.description ?? `${album.imageCount} photos from ${album.title}.`;
  return {
    title: album.title,
    description,
    alternates: { canonical: `/gallery/${slug}` },
    openGraph: {
      title: album.title,
      description,
      url: `/gallery/${slug}`,
      images: album.coverUrl ? [album.coverUrl] : undefined,
    },
  };
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/gallery"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Gallery
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <time dateTime={album.date}>{formatDate(album.date)}</time>
        {album.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {album.location}
          </span>
        )}
        <span>
          {album.imageCount} {album.imageCount === 1 ? "photo" : "photos"}
        </span>
      </div>

      <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {album.title}
      </h1>
      {album.description && (
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
          {album.description}
        </p>
      )}
      {album.relatedGroup && (
        <p className="mt-4 text-sm">
          <Link
            href={`/research/${album.relatedGroup.slug}`}
            className="font-medium text-primary hover:underline"
          >
            {album.relatedGroup.title}
          </Link>
        </p>
      )}

      <div className="mt-10">
        <GalleryGrid images={album.images ?? []} />
      </div>
    </article>
  );
}
