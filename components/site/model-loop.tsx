const STEPS = [
  "Challenge",
  "People & Expertise",
  "Collaboration",
  "Research",
  "Experimentation",
  "Prototype",
  "Field & Community",
  "Knowledge",
];

export function ModelLoop() {
  return (
    <div>
      {/* Desktop / tablet: horizontal node-and-line diagram */}
      <div className="hidden sm:flex sm:items-center">
        {STEPS.map((step, i) => (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/25" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="w-24 text-xs leading-tight font-medium text-balance text-muted-foreground">
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="mx-1 mb-6 h-px flex-1"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--border), color-mix(in oklch, var(--brand) 45%, var(--border)))",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 hidden text-center text-xs text-muted-foreground sm:block">
        …and back to Challenge — an evolving loop, not a one-way pipeline.
      </p>

      {/* Mobile: vertical timeline */}
      <ol className="flex flex-col sm:hidden">
        {STEPS.map((step, i) => (
          <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
            {i < STEPS.length - 1 && (
              <span
                className="absolute top-3 left-[5px] h-full w-px"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, var(--border), color-mix(in oklch, var(--brand) 45%, var(--border)))",
                }}
              />
            )}
            <span className="relative z-10 mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
            <span className="text-sm font-medium">{step}</span>
          </li>
        ))}
        <li className="pl-[22px] text-xs text-muted-foreground">
          …and back to Challenge — an evolving loop, not a one-way pipeline.
        </li>
      </ol>
    </div>
  );
}
