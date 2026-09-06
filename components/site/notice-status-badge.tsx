import { cn } from "@/lib/utils";
import { daysRemaining, noticeStatus } from "@/lib/notice-status";

export function NoticeStatusBadge({
  deadline,
  className,
}: {
  deadline?: string | null;
  className?: string;
}) {
  const status = noticeStatus(deadline);
  if (status === "none") return null;

  const base =
    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium";

  if (status === "closed") {
    return (
      <span className={cn(base, "border-border text-muted-foreground", className)}>Closed</span>
    );
  }

  const days = daysRemaining(deadline!);
  const urgent = status === "closing-soon";

  return (
    <span
      className={cn(
        base,
        urgent
          ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400"
          : "border-primary/40 bg-primary/10 text-primary",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          urgent ? "bg-amber-500" : "bg-primary"
        )}
        aria-hidden
      />
      {urgent ? (days <= 1 ? "Closes today" : `${days} days left`) : "Open"}
    </span>
  );
}
