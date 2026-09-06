import { Badge } from "@/components/ui/badge";
import { NEWS_KIND_LABEL, type NewsKind } from "@/lib/news";

const VARIANTS: Record<NewsKind, "default" | "secondary" | "outline"> = {
  post: "secondary",
  announcement: "outline",
  event: "default",
};

export function NewsKindBadge({ kind }: { kind: NewsKind }) {
  return (
    <Badge variant={VARIANTS[kind]} className="shrink-0 font-normal">
      {NEWS_KIND_LABEL[kind]}
    </Badge>
  );
}
