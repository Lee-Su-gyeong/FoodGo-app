"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MenuItem } from "@/lib/menus"
import TopPopup from "@/components/top-popup"
import { RefreshCcw } from 'lucide-react'

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

  // Top popup
  const [popupOpen, setPopupOpen] = useState(false)
  const showPopup = (ms = 2200) => {
    setPopupOpen(true)
    window.setTimeout(() => setPopupOpen(false), ms)
  }

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

  // Sky/blue pastel palette for wedges
  const colors = useMemo(
    () => ["#E0F2FE", "#DBEAFE", "#CFFAFE", "#BFDBFE", "#BAE6FD", "#C7D2FE", "#93C5FD", "#A5F3FC"],
    []
  )

  const gradient = useMemo(() => {
    if (!slices.length) return "conic-gradient(#e5f0ff, #eff6ff)"
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
        showPopup()
        onPick(slices[pickedIndex])
      }
    }
    el.addEventListener("transitionend", handler)
    return () => el.removeEventListener("transitionend", handler)
  }, [pickedIndex, slices, onPick])

  return (
    <div className="flex flex-col items-center gap-4">
      <TopPopup open={popupOpen} message="결과가 나왔어요! 아래 카드에서 확인하세요." />

      <div className="relative">
        {/* Pointer in sky-500 */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 w-0 h-0"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderBottom: "20px solid rgb(14 165 233)", // sky-500
          }}
        />
        {/* Wheel with blue border */}
        <div
          ref={wheelRef}
          className={cn("relative rounded-full border-2 border-sky-200 shadow-xl w-72 h-72 md:w-80 md:h-80")}
          style={{
            transform: `rotate(${rotation}deg)`,
            backgroundImage: gradient,
            transition: spinning ? `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
          }}
          role="img"
          aria-label="메뉴 룰렛"
        >
          {/* Center hub with the provided image */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-sky-200 shadow overflow-hidden">
              <img
                src="/images/center-gromit.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={spin}
        size="lg"
        className="rounded-full px-6 py-6 text-lg bg-sky-500 hover:bg-sky-600"
        disabled={spinning || !slices.length}
      >
        <RefreshCcw className={cn("h-5 w-5 mr-2", spinning ? "animate-spin" : "")} />
        {spinning ? "돌리는 중..." : "룰렛 돌리기"}
      </Button>
    </div>
  )
}
