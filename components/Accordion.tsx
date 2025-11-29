"use client";

import { useState } from "react";

export default function AccordionItem({ title, children }: { title: string, children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center text-lg font-semibold text-white hover:text-purple-300 transition-colors"
      >
        {title}
        <span className="text-2xl text-purple-400">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="mt-4 text-base text-gray-300 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

