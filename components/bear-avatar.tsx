"use client"

import { cn } from "@/lib/utils"

type Props = {
  says?: string
  className?: string
}

export default function BearAvatar({ says = "고양이가 추천해 줄게요!", className }: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Face-only crop using the new cat image */}
      <div className="w-16 h-16 rounded-full overflow-hidden border shadow-sm bg-white">
        <img
          src="/images/cat-new.png"
          alt="고양이 얼굴"
          className="w-full h-full object-cover object-center scale-[1.15]"
        />
      </div>
      <div className="relative">
        <div className="rounded-2xl bg-pink-100 text-pink-900 px-4 py-2 text-base font-bold shadow">
          {says}
        </div>
        <div
          aria-hidden
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0"
          style={{ borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderRight: "12px solid rgb(252 231 243)" }}
        />
      </div>
    </div>
  )
}
