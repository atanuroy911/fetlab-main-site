import { Badge } from "@/components/ui/badge";
import type { NoticeType } from "@/lib/sanity/types";

const LABELS: Record<NoticeType, string> = {
  vacancy: "Vacancy",
  call: "Call",
  announcement: "Announcement",
  event: "Event",
};

const VARIANTS: Record<NoticeType, "default" | "secondary" | "outline"> = {
  vacancy: "default",
  call: "secondary",
  announcement: "outline",
  event: "outline",
};

export function NoticeTypeBadge({ type }: { type: NoticeType }) {
  return (
    <Badge variant={VARIANTS[type]} className="shrink-0">
      {LABELS[type]}
    </Badge>
  );
}
