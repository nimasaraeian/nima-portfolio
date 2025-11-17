export default function FunnelPreview() {
  return (
    <section
      role="group"
      aria-label="Funnel — Trust Points"
      className="h-full rounded-[28px] border border-white/14 bg-white/[0.08] p-6 md:p-7 text-base text-gray-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <h3 className="text-lg font-semibold text-white">Funnel — Trust Points</h3>
      <div className="mt-4 rounded-3xl border border-white/12 bg-black/40 p-5">
        <svg
          viewBox="0 0 320 160"
          className="w-full h-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <polygon points="20,35 300,35 240,85 80,85" className="opacity-95" />
          <polygon points="50,100 270,100 230,138 90,138" className="opacity-95" />
        </svg>
        <div className="mt-5 grid gap-3 text-sm text-gray-100">
          <LayerRow
            color="bg-blue-200/70"
            title="Awareness layer"
            description="Surface top-of-funnel proof, emotional hooks, curiosity triggers, and bold intros."
          />
          <LayerRow
            color="bg-blue-200/40"
            title="Consideration → Conversion"
            description="Layer trust cues, before/after narratives, social proof, and expert endorsements."
          />
        </div>
      </div>
    </section>
  )
}

function LayerRow({ color, title, description }: { color: string; title: string; description: string }) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:p-6">
      <div className="flex items-center gap-3 text-white">
        <span className={`h-2.5 w-12 rounded-full ${color}`} aria-hidden />
        <span className="text-base font-semibold uppercase tracking-[0.18em]">{title}</span>
      </div>
      <p className="text-gray-200 leading-relaxed text-base lg:text-[1.05rem]">{description}</p>
    </div>
  )
}

