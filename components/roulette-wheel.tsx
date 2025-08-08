"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MenuItem } from "@/lib/menus"
import { PartyPopper, RefreshCcw } from 'lucide-react'

type Props = {
  items?: MenuItem[]
  onPick?: (item: MenuItem) => void
}

export default function RouletteWheel({
  items = [
    { id: "ramen", name: "라멘", imageUrl: "/images/foods/ramen.png" },
    { id: "bibimbap", name: "비빔밥", imageUrl: "/images/foods/bibimbap.png" },
    { id: "sushi", name: "초밥", imageUrl: "/images/foods/sushi.png" },
    { id: "burger", name: "버거", imageUrl: "/images/foods/burger.png" },
  ],
  onPick = () => {},
}: Props) {
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [pickedIndex, setPickedIndex] = useState<number | null>(null)
  const [hasSpun, setHasSpun] = useState(false)
  const [durationMs, setDurationMs] = useState(3800)
  const wheelRef = useRef<HTMLDivElement>(null)

  // Sounds
  const spinAudioRef = useRef<HTMLAudioElement | null>(null)
  const winAudioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    const spinA = new Audio("/sounds/spin.mp3")
    spinA.loop = true
    spinA.volume = 0.35
    const winA = new Audio("/sounds/win.mp3")
    winA.volume = 0.7
    spinAudioRef.current = spinA
    winAudioRef.current = winA
    return () => {
      spinA.pause()
      winA.pause()
    }
  }, [])

  const slices = useMemo(() => (items.length ? items : []), [items])
  const anglePer = slices.length ? 360 / slices.length : 360

  const colors = useMemo(
    () => ["#fff3b0", "#ffd3e2", "#ffdca8", "#c8f7dc", "#d7e8ff", "#f5d0fe", "#fbcfe8", "#fce1d2"],
    []
  )

  const gradient = useMemo(() => {
    if (!slices.length) return "conic-gradient(#f1f5f9, #f8fafc)"
    const stops: string[] = []
    for (let i = 0; i < slices.length; i++) {
      const start = (i / slices.length) * 360
      const end = ((i + 1) / slices.length) * 360
      const col = colors[i % colors.length]
      stops.push(`${col} ${start}deg ${end}deg`)
    }
    return `conic-gradient(${stops.join(", ")})`
  }, [slices.length, colors])

  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const spin = () => {
    if (spinning || !slices.length) return
    const extraTurns = hasSpun ? randInt(6, 9) : randInt(9, 12)
    const dur = hasSpun ? randInt(4500, 5200) : randInt(6000, 7200)
    setDurationMs(dur)
    const target = Math.floor(Math.random() * slices.length)
    setPickedIndex(target)
    setSpinning(true)
    setHasSpun(true)

    const targetAngle = 360 * extraTurns + (360 - (target * anglePer + anglePer / 2))
    setRotation((prev) => prev + targetAngle)

    try {
      spinAudioRef.current?.play().catch(() => {})
    } catch {}
    try {
      navigator.vibrate?.(40)
    } catch {}
  }

  useEffect(() => {
    const el = wheelRef.current
    if (!el) return
    const handler = () => {
      setSpinning(false)
      try {
        const a = spinAudioRef.current
        if (a) {
          a.pause()
          a.currentTime = 0
        }
      } catch {}
      try {
        winAudioRef.current?.play().catch(() => {})
      } catch {}
      try {
        navigator.vibrate?.([60, 40, 60])
      } catch {}
      if (pickedIndex != null && slices[pickedIndex]) {
        onPick(slices[pickedIndex])
      }
    }
    el.addEventListener("transitionend", handler)
    return () => el.removeEventListener("transitionend", handler)
  }, [pickedIndex, slices, onPick])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Pointer */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 w-0 h-0"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderBottom: "20px solid rgb(244 114 182)",
          }}
        />
        {/* Wheel */}
        <div
          ref={wheelRef}
          className={cn("relative rounded-full border-2 border-rose-200 shadow-xl w-72 h-72 md:w-80 md:h-80")}
          style={{
            transform: `rotate(${rotation}deg)`,
            backgroundImage: gradient,
            transition: spinning ? `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
          }}
          role="img"
          aria-label="메뉴 룰렛"
        >
          {/* Center hub with provided paw image */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-rose-200 shadow overflow-hidden grid place-items-center">
              <img
                src="/images/paw-print.png"
                alt=""
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={spin}
        size="lg"
        className="rounded-full px-6 py-6 text-lg bg-rose-500 hover:bg-rose-600"
        disabled={spinning || !slices.length}
      >
        <RefreshCcw className={cn("h-5 w-5 mr-2", spinning ? "animate-spin" : "")} />
        {spinning ? "돌리는 중..." : "룰렛 돌리기"}
      </Button>

      {!spinning && pickedIndex != null ? (
        <div className="flex items-center gap-2 text-rose-600">
          <PartyPopper className="h-5 w-5" />
          <span className="font-semibold">결과 확인 아래에서!</span>
        </div>
      ) : null}
    </div>
  )
}
