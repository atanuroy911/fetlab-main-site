import { PageHeader } from "@/components/site/page-header";
import { Reveal, RevealItem } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { PATHWAYS, PATHWAY_TITLES } from "./pathways";
import { Handshake, Lightbulb, Building2, GraduationCap, Users, Mail } from "lucide-react";

const ICONS = { Handshake, Lightbulb, Building2, GraduationCap, Users, Mail } as const;

const description =
  "FETLAB works with researchers, students, institutions, industry, government, and communities. Reach out to explore how we can work together.";

export const metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact — FETLAB", description, url: "/contact" },
};

/**
 * The contact form is built and working but intentionally switched off for now.
 * To turn it on: flip this to true and set RESEND_API_KEY, CONTACT_FROM_EMAIL,
 * and (optionally) CONTACT_TO_EMAIL. The env check below then does the rest, so
 * the form never renders without a working transport behind it.
 */
const CONTACT_FORM_ENABLED = false;

// Reading runtime secrets means this page cannot be baked at build time.
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const formEnabled =
    CONTACT_FORM_ENABLED &&
    Boolean(
      process.env.RESEND_API_KEY &&
        process.env.CONTACT_FROM_EMAIL &&
        (process.env.CONTACT_TO_EMAIL || settings.contactEmail)
    );

  return (
    <>
      <PageHeader eyebrow="Connect" title="Collaborate with FETLAB" description={description} />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map(({ title, body, icon }) => {
            const Icon = ICONS[icon];
            return (
              <RevealItem key={title} className="border-l-2 border-border pl-4">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <h2 className="mt-3 font-heading text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </RevealItem>
            );
          })}
        </Reveal>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center font-heading text-2xl font-semibold sm:text-3xl">
            Get in touch
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground text-pretty">
            Send us a note and let us know how you&apos;d like to be involved.
          </p>

          <div className="mt-8">
            {formEnabled ? (
              <ContactForm pathways={PATHWAY_TITLES} fallbackEmail={settings.contactEmail} />
            ) : (
              <div className="rounded-lg border border-border bg-background p-8 text-center">
                <Mail className="mx-auto h-6 w-6 text-primary" aria-hidden />
                {settings.contactEmail ? (
                  <>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Email us and we&apos;ll get back to you.
                    </p>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                    >
                      {settings.contactEmail}
                    </a>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    A contact address has not been set yet.
                  </p>
                )}
              </div>
            )}
          </div>

          {formEnabled && settings.contactEmail && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Prefer email?{" "}
              <a href={`mailto:${settings.contactEmail}`} className="font-medium hover:underline">
                {settings.contactEmail}
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
