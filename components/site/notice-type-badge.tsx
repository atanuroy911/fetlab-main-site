import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { NoticeType } from "@/lib/sanity/types";

const VARIANTS: Record<NoticeType, "default" | "secondary" | "outline"> = {
  vacancy: "default",
  call: "secondary",
  announcement: "outline",
  event: "outline",
};

const KEYS: Record<NoticeType, string> = {
  vacancy: "typeVacancy",
  call: "typeCall",
  announcement: "typeAnnouncement",
  event: "typeEvent",
};

export function NoticeTypeBadge({ type }: { type: NoticeType }) {
  const t = useTranslations("Notices");
  return (
    <Badge variant={VARIANTS[type]} className="shrink-0">
      {t(KEYS[type])}
    </Badge>
  );
}
