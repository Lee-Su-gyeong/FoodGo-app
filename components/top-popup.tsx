"use client"

import { cn } from "@/lib/utils"
import { PartyPopper } from 'lucide-react'

type Props = {
  open: boolean
  message: string
  className?: string
}

export default function TopPopup({ open, message, className }: Props) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed left-1/2 top-3 z-50 -translate-x-1/2 transition-all duration-300",
        open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none",
        className
      )}
    >
      <div className="flex items-center gap-2 rounded-full bg-sky-500 text-white px-4 py-2 shadow-lg border border-sky-600/30">
        <PartyPopper className="h-4 w-4" />
        <span className="text-sm font-bold">{message}</span>
      </div>
    </div>
  )
}
