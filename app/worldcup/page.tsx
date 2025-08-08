"use client"

import { useMemo, useState } from "react"
import BearAvatar from "@/components/bear-avatar"
import WorldCup from "@/components/world-cup"
import { Button } from "@/components/ui/button"
import { getMenuPool, type MealTime, type MenuItem } from "@/lib/menus"
import { Undo2 } from 'lucide-react'

export default function WorldCupPage() {
  const [mealTime, setMealTime] = useState<MealTime>("lunch")
  const [winner, setWinner] = useState<MenuItem | null>(null)
  const pool = useMemo(() => getMenuPool(mealTime), [mealTime])

  const startOver = () => setWinner(null)

  return (
    <main className="mx-auto max-w-md p-4">
      <BearAvatar says="토너먼트로 정해보자! 🐱🏆" className="mb-3" />

      {/* Segmented buttons: 점심 / 저녁 (same as Roulette) */}
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-2">식사 시간</div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className={mealTime === "lunch" ? "bg-rose-500 text-white" : "bg-rose-50 text-rose-700 hover:bg-rose-100"}
            onClick={() => setMealTime("lunch")}
          >
            점심
          </Button>
          <Button
            className={mealTime === "dinner" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}
            onClick={() => setMealTime("dinner")}
          >
            저녁
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-extrabold">메뉴 월드컵</div>
          <Button variant="ghost" className="gap-2" onClick={startOver}>
            <Undo2 className="h-4 w-4" />
            초기화
          </Button>
        </div>
        <WorldCup items={pool} onFinish={(w) => setWinner(w)} />
      </section>

      {winner && (
        <section className="mt-8">
          <div className="text-xl font-extrabold mb-3">우승 메뉴!</div>
          <div className="rounded-3xl overflow-hidden border shadow-sm bg-white">
            <div className="w-full aspect-square bg-amber-50">
              <img
                src={winner.imageUrl || "/placeholder.svg"}
                alt={`${winner.name} 사진`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="text-2xl font-black mb-2">{winner.name}</div>
              <BearAvatar says={`"${winner.name}" 확정!`} />
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button className="rounded-full" onClick={() => setWinner(null)}>
                  다시 하기
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
