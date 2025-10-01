'use client'

import React from 'react'

export default function FormCard({ title, helper, children, actions }: { title: string; helper?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {helper && <p className="text-sm text-gray-400 mt-1">{helper}</p>}
      </div>
      <div className="space-y-4">{children}</div>
      {actions && <div className="pt-4 border-t border-white/10 flex gap-3">{actions}</div>}
    </div>
  )
}


