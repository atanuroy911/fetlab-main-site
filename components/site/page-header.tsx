export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20 sm:pb-12">
      {eyebrow && (
        <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-primary uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      )}
    </section>
  );
}
