export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fffaf4] px-6 text-[#2b1d28]">
      <div className="public-grid absolute inset-0 opacity-60" />
      <div className="public-orb public-orb-peach animate-drift-slow" />
      <div className="public-panel relative flex items-center gap-4 px-6 py-5">
        <span className="flex size-11 items-center justify-center rounded-full bg-[#ff8b72] text-base font-semibold text-white shadow-[0_16px_30px_rgba(255,139,114,0.25)]">
          c
        </span>
        <div>
          <p className="font-medium text-[#2b1d28]">Loading Cutuu</p>
          <div className="mt-2 flex gap-1.5">
            <span className="size-2 rounded-full bg-[#ff8b72] animate-pulse" />
            <span className="size-2 rounded-full bg-[#f4b6c5] animate-pulse [animation-delay:120ms]" />
            <span className="size-2 rounded-full bg-[#9ac7ff] animate-pulse [animation-delay:240ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}
