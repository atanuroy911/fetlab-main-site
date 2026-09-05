import Image from "next/image";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "linear-gradient(135deg, var(--brand), var(--brand-2))",
  "linear-gradient(135deg, var(--brand-2), var(--brand))",
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function hashIndex(name: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return hash % mod;
}

export function Avatar({
  name,
  photoUrl,
  size = 56,
  className,
}: {
  name: string;
  photoUrl?: string | null;
  size?: number;
  className?: string;
}) {
  if (photoUrl) {
    return (
      <Image
        src={photoUrl}
        alt={name}
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-heading font-semibold text-white",
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        backgroundImage: GRADIENTS[hashIndex(name, GRADIENTS.length)],
      }}
    >
      {initials(name) || "?"}
    </div>
  );
}
