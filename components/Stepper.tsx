'use client'

import React from 'react'

interface StepperProps {
  steps: string[]
  current: number
  onSelect: (index: number) => void
}

export default function Stepper({ steps, current, onSelect }: StepperProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {steps.map((label, idx) => (
        <button
          key={label}
          onClick={() => onSelect(idx)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
            current === idx
              ? 'bg-teal-600 text-white border-teal-400'
              : 'bg-transparent text-gray-400 border-white/10 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${current === idx ? 'bg-white/20' : 'bg-white/10'}`}>
            {idx + 1}
          </span>
          {label}
        </button>
      ))}
    </div>
  )
}


