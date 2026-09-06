"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContact, type ContactState } from "@/app/(site)/contact/actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive";

export function ContactForm({
  pathways,
  fallbackEmail,
}: {
  pathways: string[];
  fallbackEmail?: string;
}) {
  const [state, formAction] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-border bg-background p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-8 w-8 text-primary" aria-hidden />
        <p className="mt-4 font-heading text-xl font-semibold">Message sent</p>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">{state.message}</p>
      </div>
    );
  }

  const v = state.values;

  return (
    <form action={formAction} className="space-y-5">
      {state.message && state.status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            {state.message}
            {fallbackEmail && (
              <>
                {" "}
                <a href={`mailto:${fallbackEmail}`} className="font-medium underline">
                  {fallbackEmail}
                </a>
              </>
            )}
          </span>
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            defaultValue={v?.name}
            required
            autoComplete="name"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field label="Email" name="email" error={state.errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={v?.email}
            required
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organisation" name="organisation" optional>
          <input
            id="organisation"
            name="organisation"
            defaultValue={v?.organisation}
            autoComplete="organization"
            className={inputClass}
          />
        </Field>

        <Field label="I'm interested in" name="pathway" optional error={state.errors?.pathway}>
          <select
            id="pathway"
            name="pathway"
            defaultValue={v?.pathway ?? ""}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="">Select a pathway…</option>
            {pathways.map((pathway) => (
              <option key={pathway} value={pathway}>
                {pathway}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" name="message" error={state.errors?.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={v?.message}
          required
          minLength={20}
          maxLength={5000}
          placeholder="Tell us a little about what you have in mind."
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={cn(inputClass, "h-auto resize-y py-2.5")}
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
      {!pending && <Send className="ml-1 h-4 w-4" />}
    </Button>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
