"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import BearAvatar from "@/components/bear-avatar"
import RouletteWheel from "@/components/roulette-wheel"
import { Button } from "@/components/ui/button"
import { getAllMenus, type MenuItem } from "@/lib/menus"
import { Undo2 } from 'lucide-react'

export default function RoulettePage() {
  const [result, setResult] = useState<MenuItem | null>(null)
  const pool = useMemo(() => getAllMenus(), [])
  const resultRef = useRef<HTMLDivElement | null>(null)
  const alertShownRef = useRef(false)

  const startOver = () => {
    setResult(null)
    alertShownRef.current = false
  }

  useEffect(() => {
    if (result && !alertShownRef.current) {
      alertShownRef.current = true
      // Scroll to result card after 1s
      const t = window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 1000)
      return () => window.clearTimeout(t)
    }
  }, [result])

  return (
    <main className="mx-auto max-w-md p-4">
      <BearAvatar says="룰렛으로 골라볼까? 🐑🎡" className="mb-3" />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-extrabold">메뉴 룰렛</div>
          <Button variant="ghost" className="gap-2" onClick={startOver}>
            <Undo2 className="h-4 w-4" />
            초기화
          </Button>
        </div>
        <RouletteWheel items={pool} onPick={(item) => setResult(item)} />
      </section>

      {result && (
        <section ref={resultRef} className="mt-8">
          <div className="text-xl font-extrabold mb-3">오늘의 추천!</div>
          <div className="rounded-3xl overflow-hidden border shadow-sm bg-white">
            <div className="w-full aspect-square bg-sky-50">
              <img
                src={result.imageUrl || "/placeholder.svg"}
                alt={`${result.name} 사진`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="text-2xl font-black mb-2">{result.name}</div>
              <BearAvatar says={`오늘은 "${result.name}" 어때요?`} />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button className="rounded-full" onClick={() => setResult(null)}>
                  다시 돌리기
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  위로
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
