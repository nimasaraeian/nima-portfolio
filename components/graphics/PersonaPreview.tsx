export default function PersonaPreview() {
  return (
    <section
      role="group"
      aria-label="Persona — Behavior Map"
      className="h-full rounded-[28px] border border-white/14 bg-white/[0.08] p-6 md:p-7 text-base text-gray-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <h3 className="text-lg font-semibold text-white">Persona — Behavior Map</h3>
      <div className="mt-5 grid grid-cols-2 gap-6">
        <PersonaColumn heading="Motivations" items={['Confidence', 'Time-saving', 'Clarity']} />
        <PersonaColumn heading="Barriers" items={['Trust', 'Budget', 'Complexity']} />
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200/80">Triggers</div>
        <p className="mt-3 text-gray-200/85 leading-relaxed">
          Before/after contrasts, expert proof, social validation, and emotional storytelling sequences.
        </p>
      </div>
    </section>
  )
}

function PersonaColumn({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold uppercase tracking-wide text-gray-300">{heading}</div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/40 p-3 text-sm">
            <span className="mt-[2px] inline-block h-2 w-2 rounded-full bg-blue-200/80" aria-hidden />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

