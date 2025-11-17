export default function CalendarPreview() {
  const rows = Array.from({ length: 6 })

  return (
    <section
      role="group"
      aria-label="Content Calendar (30 days)"
      className="h-full rounded-[28px] border border-white/14 bg-white/[0.08] p-6 md:p-7 text-base text-gray-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <h3 className="text-lg font-semibold text-white">Content Calendar (30d)</h3>

      <div className="mt-5 grid grid-cols-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
        <div>Day</div>
        <div>Topic</div>
        <div>Hook</div>
        <div>Format</div>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-white/12 bg-black/40">
        {rows.map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-4 border-b border-white/8 px-4 py-3 text-xs text-gray-200/90 last:border-b-0"
          >
            <div className="font-mono text-gray-300">D{i + 1}</div>
            <div className="font-semibold text-white/95">Insight #{i + 1}</div>
            <div className="italic text-blue-200/90">“What if…?”</div>
            <div>IG Reel</div>
          </div>
        ))}
      </div>
    </section>
  )
}

