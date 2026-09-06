import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
}) {
  const centered = align === "center";
  return (
    <div className="relative overflow-hidden">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_50%_60%_at_20%_0%,black_10%,transparent_70%)] opacity-40" />
      <section className="relative mx-auto max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20 sm:pb-12">
        {eyebrow && (
          <p className={cn("flex items-center gap-2 text-sm font-medium tracking-wide text-primary uppercase", centered && "justify-center")}>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
        )}
        <h1 className={cn("mt-3 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-4xl", centered && "text-center")}>
          {title}
        </h1>
        {description && (
          <p className={cn("mt-4 max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg", centered && "mx-auto text-center")}>
            {description}
          </p>
        )}
      </section>
    </div>
  );
}
