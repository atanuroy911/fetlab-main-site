import { useTranslations } from "next-intl";

export function ModelLoop() {
  const t = useTranslations("ModelLoop");
  const steps = [
    t("step1"),
    t("step2"),
    t("step3"),
    t("step4"),
    t("step5"),
    t("step6"),
    t("step7"),
    t("step8"),
  ];

  return (
    <div>
      {/* Desktop / tablet: horizontal node-and-line diagram */}
      <div className="hidden sm:flex sm:items-center">
        {steps.map((step, i) => (
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
            {i < steps.length - 1 && (
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
        {t("loopNote")}
      </p>

      {/* Mobile: vertical timeline */}
      <ol className="flex flex-col sm:hidden">
        {steps.map((step, i) => (
          <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
            {i < steps.length - 1 && (
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
        <li className="pl-[22px] text-xs text-muted-foreground">{t("loopNote")}</li>
      </ol>
    </div>
  );
}
