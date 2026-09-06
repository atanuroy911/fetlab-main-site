export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading people…</span>
      <div className="mx-auto max-w-2xl">
        <div className="h-11 w-full animate-pulse rounded-full bg-muted" />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-28 animate-pulse rounded-full bg-muted" />
          ))}
        </div>
      </div>
      <div className="mt-20 flex flex-wrap justify-center gap-x-10 gap-y-14">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex w-56 flex-col items-center">
            <div className="h-36 w-36 animate-pulse rounded-full bg-muted" />
            <div className="mt-5 h-5 w-32 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-40 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
