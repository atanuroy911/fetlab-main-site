import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/site/language-switcher";

export function SiteFooter() {
  const tNav = useTranslations("Nav");
  const tFooter = useTranslations("Footer");

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
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">{tFooter("tagline")}</p>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted-foreground sm:flex sm:flex-wrap">
          <Link href="/about" className="hover:text-foreground">{tNav("about")}</Link>
          <Link href="/research" className="hover:text-foreground">{tNav("research")}</Link>
          <Link href="/publications" className="hover:text-foreground">{tNav("publications")}</Link>
          <Link href="/people" className="hover:text-foreground">{tNav("people")}</Link>
          <Link href="/blog" className="hover:text-foreground">{tNav("blog")}</Link>
          <Link href="/notices" className="hover:text-foreground">{tNav("notices")}</Link>
          <Link href="/contact" className="hover:text-foreground">{tNav("contact")}</Link>
        </nav>
      </div>
      <div className="border-t border-border/70 py-4">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-3 px-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {tFooter("rights", { year: new Date().getFullYear() })}
          </p>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
