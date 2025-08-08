"use client"

import { cn } from "@/lib/utils"

type Props = {
  says?: string
  className?: string
}

export default function BearAvatar({ says = "양이 추천해 줄게요!", className }: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Mascot (sheep) face crop */}
      <div className="w-16 h-16 rounded-full overflow-hidden border shadow-sm bg-white">
        <img
          src="/images/mascot-sheep.png"
          alt="양 얼굴"
          className="w-full h-full object-cover object-center scale-[1.1]"
        />
      </div>
      {/* Speech bubble in sky-blue */}
      <div className="relative">
        <div className="rounded-2xl bg-sky-100 text-sky-900 px-4 py-2 text-base font-bold shadow">
          {says}
        </div>
        <div
          aria-hidden
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0"
          style={{
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: "12px solid rgb(224 242 254)", // sky-100
          }}
        />
      </div>
    </div>
  )
}
