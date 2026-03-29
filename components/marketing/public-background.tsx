export function PublicBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="public-grid absolute inset-0 opacity-70" />
      <div className="public-orb public-orb-peach animate-drift-slow" />
      <div className="public-orb public-orb-rose animate-float-soft" />
      <div className="public-orb public-orb-sky animate-drift-reverse" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/70 via-white/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-white/80 via-white/20 to-transparent" />
    </div>
  );
}
