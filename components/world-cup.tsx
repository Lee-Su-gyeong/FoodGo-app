"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import type { MenuItem } from "@/lib/menus"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeftRight } from 'lucide-react'
import TopPopup from "@/components/top-popup"

type Props = {
  items?: MenuItem[]
  onFinish?: (winner: MenuItem) => void
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function toEvenCount<T>(arr: T[], max = 8) {
  // keep to an even number up to max (mobile friendly)
  const limit = Math.min(max, arr.length)
  return arr.slice(0, limit - (limit % 2))
}

export default function WorldCup({
  items = [
    { id: "ramen", name: "라멘", imageUrl: "/images/foods/ramen.png" },
    { id: "bibimbap", name: "비빔밥", imageUrl: "/images/foods/bibimbap.png" },
    { id: "sushi", name: "초밥", imageUrl: "/images/foods/sushi.png" },
    { id: "burger", name: "버거", imageUrl: "/images/foods/burger.png" },
    { id: "pizza", name: "피자", imageUrl: "/images/foods/pizza.png" },
    { id: "pasta", name: "파스타", imageUrl: "/images/foods/pasta.png" },
    { id: "salad", name: "샐러드", imageUrl: "/images/foods/salad.png" },
    { id: "kimbap", name: "김밥", imageUrl: "/images/foods/kimbap.png" },
  ],
  onFinish = () => {},
}: Props) {
  const [seed, setSeed] = useState(0) // change to reshuffle
  const initial = useMemo(() => toEvenCount(shuffle(items), 8), [items, seed])
  const [round, setRound] = useState<MenuItem[]>(initial)
  const [nextRound, setNextRound] = useState<MenuItem[]>([])
  const [idx, setIdx] = useState(0)

  // popup
  const [popupOpen, setPopupOpen] = useState(false)
  const showPopup = (ms = 2200) => {
    setPopupOpen(true)
    window.setTimeout(() => setPopupOpen(false), ms)
  }

  // sound feedback on select
  const selectAudioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    const a = new Audio("/sounds/win.mp3")
    a.volume = 0.4
    selectAudioRef.current = a
    return () => a.pause()
  }, [])

  useEffect(() => {
    setRound(initial)
    setNextRound([])
    setIdx(0)
  }, [initial])

  const total = round.length
  const pairA = round[idx]
  const pairB = round[idx + 1]
  const roundName = total === 2 ? "결승" : total === 4 ? "4강" : total === 8 ? "8강" : `${total}강`

  const choose = (item: MenuItem) => {
    try {
      navigator.vibrate?.(30)
    } catch {}
    try {
      selectAudioRef.current?.play().catch(() => {})
    } catch {}

    const updated = [...nextRound, item]
    const nextIdx = idx + 2
    if (nextIdx >= total) {
      if (updated.length === 1) {
        showPopup()
        onFinish(updated[0])
        return
      }
      setRound(updated)
      setNextRound([])
      setIdx(0)
    } else {
      setNextRound(updated)
      setIdx(nextIdx)
    }
  }

  return (
    <div className="w-full">
      <TopPopup open={popupOpen} message="우승 메뉴가 결정됐어요!" />

      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-sky-700 font-semibold">{roundName}</div>
        <div className="text-xs text-muted-foreground">남은 후보: {total}</div>
      </div>

      {pairA && pairB ? (
        <div className="grid gap-3">
          {[pairA, pairB].map((m) => (
            <button
              key={m.id}
              onClick={() => choose(m)}
              className={cn(
                "w-full rounded-3xl overflow-hidden border shadow-sm bg-white active:scale-[0.995] transition-transform"
              )}
              aria-label={`${m.name} 선택`}
            >
              <div className="w-full aspect-square bg-sky-50">
                <img src={m.imageUrl || "/placeholder.svg"} alt={`${m.name} 사진`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <div className="text-lg font-bold">{m.name}</div>
                <div className="mt-1 text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <ArrowLeftRight className="h-3.5 w-3.5" /> 탭해서 선택
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground text-sm">다시 시작해 주세요.</div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={() => {
            setSeed((s) => s + 1)
            setRound(toEvenCount(shuffle(items), 8))
            setNextRound([])
            setIdx(0)
            try {
              navigator.vibrate?.(20)
            } catch {}
          }}
        >
          다시 섞기
        </Button>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => {
            if (idx >= 2) {
              setIdx(idx - 2)
              setNextRound(nextRound.slice(0, -1))
              try {
                navigator.vibrate?.(10)
              } catch {}
            }
          }}
          disabled={idx === 0}
        >
          한 단계 뒤로
        </Button>
      </div>
    </div>
  )
}
