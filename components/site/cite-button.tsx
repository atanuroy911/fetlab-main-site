"use client";

import { useEffect, useState } from "react";
import { Check, Quote } from "lucide-react";

/**
 * Copies a ready-made BibTeX entry. The entry is generated on the server and
 * passed in, so the button stays a thin client wrapper.
 */
export function CiteButton({ bibtex, title }: { bibtex: string; title: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked (insecure context, permissions).
      // Select the text instead so the reader can copy it by hand.
      window.prompt("Copy the BibTeX entry:", bibtex);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy BibTeX for ${title}`}
      className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden /> Copied
        </>
      ) : (
        <>
          <Quote className="h-3.5 w-3.5" aria-hidden /> BibTeX
        </>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "BibTeX copied to clipboard" : ""}
      </span>
    </button>
  );
}
