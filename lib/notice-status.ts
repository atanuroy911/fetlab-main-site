import type { NoticeSummary } from "@/lib/sanity/types";

export type NoticeStatus = "open" | "closing-soon" | "closed" | "none";

const DAY = 24 * 60 * 60 * 1000;

/**
 * A notice with a deadline is open until the end of the deadline day — someone
 * applying on the closing date should not be told they are late.
 */
export function noticeStatus(deadline?: string | null, now: Date = new Date()): NoticeStatus {
  if (!deadline) return "none";
  const end = new Date(deadline);
  if (Number.isNaN(end.getTime())) return "none";
  end.setHours(23, 59, 59, 999);
  const remaining = end.getTime() - now.getTime();
  if (remaining < 0) return "closed";
  if (remaining <= 7 * DAY) return "closing-soon";
  return "open";
}

export function daysRemaining(deadline: string, now: Date = new Date()): number {
  const end = new Date(deadline);
  end.setHours(23, 59, 59, 999);
  return Math.ceil((end.getTime() - now.getTime()) / DAY);
}

/**
 * Open and closing-soon notices first (soonest deadline leading), then undated
 * notices by publication date, then everything closed.
 */
export function sortNotices(notices: NoticeSummary[], now: Date = new Date()): NoticeSummary[] {
  const rank = (n: NoticeSummary) => {
    const status = noticeStatus(n.deadline, now);
    if (status === "closing-soon" || status === "open") return 0;
    if (status === "none") return 1;
    return 2;
  };
  return [...notices].sort((a, b) => {
    const byRank = rank(a) - rank(b);
    if (byRank !== 0) return byRank;
    if (rank(a) === 0) {
      return new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime();
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}
