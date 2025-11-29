'use client'

import { useState } from 'react'
import AIMarketingModule from './AIMarketingModule'

interface ModuleInteractivityProps {
  moduleId: string
  icon: React.ReactNode
  title: string
  bullets: string[]
  footnote?: string
}

export default function ModuleInteractivity({ moduleId, icon, title, bullets, footnote }: ModuleInteractivityProps) {
  const [showModule, setShowModule] = useState(false)

  return (
    <>
      <div 
        className="group relative rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-slate-900 to-black p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer overflow-hidden"
        onClick={() => setShowModule(true)}
      >
        {/* Animated Background Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-purple-600/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
        
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-indigo-500/20"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="rounded-xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 p-2.5 sm:p-3 text-white group-hover:scale-110 transition-transform group-hover:border-purple-500/60">
              {icon}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-indigo-200 group-hover:bg-clip-text transition-all">
              {title}
            </h3>
          </div>
          <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
            {bullets.map((b, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-400 mt-1 font-bold">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {footnote ? (
            <p className="mt-4 sm:mt-6 text-xs text-gray-400 italic border-t border-purple-500/20 pt-4">
              {footnote}
            </p>
          ) : null}
          <button 
            className="mt-6 sm:mt-8 w-full rounded-2xl border-2 border-purple-500/40 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-purple-500/80 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30"
            onClick={(e) => {
              e.stopPropagation()
              setShowModule(true)
            }}
          >
            Start {title}
          </button>
        </div>
      </div>

      {showModule && <AIMarketingModule moduleId={moduleId} onClose={() => setShowModule(false)} />}
    </>
  )
}

