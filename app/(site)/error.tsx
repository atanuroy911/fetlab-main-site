"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
      <p className="text-sm font-medium tracking-wide text-primary uppercase">Error</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground text-pretty">
        This page failed to load. You can try again, or return to the homepage.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/">Back to home</Link>} />
      </div>
    </section>
  );
}
