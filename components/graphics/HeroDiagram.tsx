const STEPS = ['DeepScan', 'Market', 'Content', 'Funnel', 'Automation']
const STEP_WIDTH = 104
const STEP_HEIGHT = 68
const OUTER_WIDTH = 728
const OUTER_PADDING_X = 48
const OUTER_PADDING_TOP = 78

export default function HeroDiagram() {
  const spacingBetweenOrigins =
    (OUTER_WIDTH - OUTER_PADDING_X * 2 - STEP_WIDTH) / (STEPS.length - 1)
  const gapBetweenSteps = spacingBetweenOrigins - STEP_WIDTH
  const arrowLength = Math.max(28, gapBetweenSteps - 6)
  const arrowStartOffset = STEP_WIDTH + (gapBetweenSteps - arrowLength) / 2

  return (
    <svg
      viewBox="0 0 760 240"
      className="h-auto w-full"
      fill="none"
      stroke="#dcdcdc"
      strokeWidth={1.6}
    >
      <rect
        x={16}
        y={16}
        width={728}
        height={208}
        rx={24}
        className="fill-transparent"
        strokeOpacity={0.4}
      />
      <g transform={`translate(${16 + OUTER_PADDING_X},${OUTER_PADDING_TOP})`}>
        {STEPS.map((label, index) => {
          const stepX = index * spacingBetweenOrigins
          const isLast = index === STEPS.length - 1
          return (
            <g key={label} transform={`translate(${stepX},0)`}>
              <Step label={label} />
              {!isLast && <Arrow offset={arrowStartOffset} length={arrowLength} />}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

function Step({ label }: { label: string }) {
  return (
    <g>
      <rect
        x={0}
        y={0}
        width={STEP_WIDTH}
        height={STEP_HEIGHT}
        rx={14}
        className="fill-white/5"
        strokeOpacity={0.8}
      />
      <text x={STEP_WIDTH / 2} y={STEP_HEIGHT / 2 + 5} textAnchor="middle" fontSize={13} fill="#f5f5f5">
        {label}
      </text>
    </g>
  )
}

function Arrow({ offset, length }: { offset: number; length: number }) {
  return (
    <g transform={`translate(${offset},${STEP_HEIGHT / 2})`}>
      <line x1={0} y1={0} x2={length} y2={0} strokeOpacity={0.75} />
      <polygon points={`${length},0 ${length - 10},-7 ${length - 10},7`} fill="#dcdcdc" fillOpacity={0.75} />
    </g>
  )
}

