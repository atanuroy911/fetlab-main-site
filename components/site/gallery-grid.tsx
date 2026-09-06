"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/sanity/types";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? null : (i + delta + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // Stop the page behind the lightbox from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const active = openIndex === null ? null : images[openIndex];

  return (
    <>
      <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4">
        {images.map((image, i) => (
          <li key={image.url}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-label={`Open photo ${i + 1} of ${images.length}: ${image.alt}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                placeholder={image.lqip ? "blur" : undefined}
                blurDataURL={image.lqip ?? undefined}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            {image.caption && (
              <p className="mt-2 text-xs text-muted-foreground text-pretty">{image.caption}</p>
            )}
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between p-4 text-white/80">
            <span className="text-sm tabular-nums">
              {openIndex! + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              autoFocus
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white/80 transition-colors hover:bg-black/60 hover:text-white sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <figure className="flex max-h-full flex-col items-center gap-3">
              <Image
                src={active.url}
                alt={active.alt}
                width={active.width ?? 1600}
                height={active.height ?? 1200}
                placeholder={active.lqip ? "blur" : undefined}
                blurDataURL={active.lqip ?? undefined}
                className="max-h-[75vh] w-auto rounded-lg object-contain"
                priority
              />
              {active.caption && (
                <figcaption className="max-w-xl text-center text-sm text-white/70 text-pretty">
                  {active.caption}
                </figcaption>
              )}
            </figure>

            {images.length > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white/80 transition-colors hover:bg-black/60 hover:text-white sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
