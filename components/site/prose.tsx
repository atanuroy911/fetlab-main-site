import { PortableText, type PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-8 text-xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-lg font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mt-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-1 pl-5">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-1 pl-5">{children}</ol>,
  },
};

export function Prose({ value }: { value: unknown }) {
  if (!value) return null;
  return (
    <div className="text-muted-foreground [&>*:first-child]:mt-0">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
