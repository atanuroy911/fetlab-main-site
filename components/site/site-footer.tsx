import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Image
            src="/logo.png"
            alt="FETLAB"
            width={36}
            height={36}
            className="h-9 w-9 rounded-md"
          />
          <div>
            <p className="font-heading text-base font-semibold">FETLAB</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              An open multidisciplinary research, innovation, and collaboration platform.
            </p>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted-foreground sm:flex sm:flex-wrap">
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/research" className="hover:text-foreground">Research</Link>
          <Link href="/publications" className="hover:text-foreground">Publications</Link>
          <Link href="/people" className="hover:text-foreground">People</Link>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <Link href="/notices" className="hover:text-foreground">Notices</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
        </nav>
      </div>
      <div className="border-t border-border/70 py-4">
        <p className="mx-auto max-w-6xl px-6 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} FETLAB — Future &amp; Emerging Technology Laboratory.
        </p>
      </div>
    </footer>
  );
}
