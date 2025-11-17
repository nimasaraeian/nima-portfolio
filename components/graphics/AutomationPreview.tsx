export default function AutomationPreview() {
  return (
    <section
      role="group"
      aria-label="Automation Flow"
      className="h-full rounded-[28px] border border-white/14 bg-white/[0.08] p-6 md:p-7 text-base text-gray-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <h3 className="text-lg font-semibold text-white">Automation Flow</h3>
      <div className="mt-4 rounded-3xl border border-white/12 bg-black/40 p-5">
        <svg
          viewBox="0 0 360 140"
          className="w-full h-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <RoundedBox x={10} y={40} w={90} h={36} label="User" />
          <Arrow x1={100} y1={58} x2={165} y2={58} />
          <RoundedBox x={165} y={40} w={120} h={36} label="DM Qualify" />
          <Arrow x1={285} y1={58} x2={340} y2={58} />
          <RoundedBox x={340} y={40} w={90} h={36} label="Booking" />
        </svg>
        <div className="mt-5 space-y-4 text-sm text-gray-100">
          <div className="flex items-center gap-3 text-white">
            <span className="h-2.5 w-12 rounded-full bg-blue-200/70" aria-hidden />
            <span className="text-base font-semibold uppercase tracking-[0.18em]">Automation Highlights</span>
          </div>
          <p className="text-gray-200 leading-relaxed text-base lg:text-[1.05rem]">
            Behavior-based triggers, CRM sync, and automated follow-up sequences that nurture leads all the way to a scheduled call.
          </p>
          <ul className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-gray-200/90">
            <li className="leading-relaxed">Smart lead routing & qualification</li>
            <li className="leading-relaxed">DM / WhatsApp / Email automation flows</li>
            <li className="leading-relaxed">Reminders and human handover alerts</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function RoundedBox({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  const rx = 8
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="12">
        {label}
      </text>
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <polygon points={`${x2},${y2} ${x2 - 8},${y2 - 5} ${x2 - 8},${y2 + 5}`} />
    </g>
  )
}

