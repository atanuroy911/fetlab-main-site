import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
      <p className="text-sm font-medium tracking-wide text-primary uppercase">404</p>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground text-pretty">
        The page may have been moved or removed. Try one of the sections below, or head
        back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/">Back to home</Link>} />
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/research">Browse research</Link>}
        />
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/news">Read the news</Link>}
        />
      </div>
    </section>
  );
}
