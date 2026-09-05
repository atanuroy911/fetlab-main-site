import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn", "sv"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  bn: "বাংলা",
  sv: "Svenska",
};
