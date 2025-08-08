"use client"

import { useMemo, useState } from "react"
import { redirect } from "next/navigation"
import BearAvatar from "@/components/bear-avatar"
import RouletteWheel from "@/components/roulette-wheel"
import WorldCup from "@/components/world-cup"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getMenuPool, type MealTime, type MenuItem } from "@/lib/menus"
import { Sparkles, Trophy, Undo2 } from 'lucide-react'

type Mode = "roulette" | "worldcup" | null

export default function Page() {
  redirect("/roulette")

  const [mealTime, setMealTime] = useState<MealTime>("lunch")
  const [mode, setMode] = useState<Mode>(null)
  const [result, setResult] = useState<MenuItem | null>(null)

  const pool = useMemo(() => getMenuPool(mealTime), [mealTime])

  const startOver = () => {
    setResult(null)
    setMode(null)
  }

  return (
    <main className="mx-auto max-w-md p-4">
      {/* Header with Bear */}
      <div className="flex items-center justify-between">
        <BearAvatar says="안녕! 곰돌이가 메뉴 골라줄게요 🐻💖" />
      </div>

      <div className="mt-4">
        <Card className="bg-rose-50/40 border-rose-100">
          <CardContent className="pt-4">
            <div className="mb-3">
              <div className="text-pink-900 font-bold text-xl">오늘은 점심? 저녁?</div>
              <div className="text-sm text-muted-foreground mt-1">먼저 식사 시간을 골라주세요.</div>
            </div>
            <RadioGroup
              value={mealTime}
              onValueChange={(v: MealTime) => setMealTime(v)}
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="lunch" value="lunch" />
                <Label htmlFor="lunch" className="text-base">점심</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="dinner" value="dinner" />
                <Label htmlFor="dinner" className="text-base">저녁</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Mode chooser */}
      {mode === null && result === null ? (
        <section className="mt-6">
          <div className="text-lg font-extrabold mb-3">추천 방식을 선택하세요</div>
          <div className="grid gap-3">
            <button
              onClick={() => setMode("roulette")}
              className="w-full rounded-3xl overflow-hidden border shadow-sm active:scale-[0.995] transition-transform bg-white"
              aria-label="메뉴 룰렛 모드"
            >
              <div className="w-full aspect-[16/10] bg-gradient-to-br from-rose-100 to-pink-100 grid place-items-center">
                <img
                  src="/kawaii-pastel-roulette.png"
                  alt="귀여운 룰렛 그림"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-xl font-bold">메뉴 룰렛</div>
                <Sparkles className="h-6 w-6 text-rose-500" />
              </div>
            </button>

            <button
              onClick={() => setMode("worldcup")}
              className="w-full rounded-3xl overflow-hidden border shadow-sm active:scale-[0.995] transition-transform bg-white"
              aria-label="메뉴 월드컵 모드"
            >
              <div className="w-full aspect-[16/10] bg-gradient-to-br from-amber-100 to-orange-100 grid place-items-center">
                <img
                  src="/kawaii-food-tournament.png"
                  alt="귀여운 월드컵(토너먼트) 그림"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-xl font-bold">메뉴 월드컵</div>
                <Trophy className="h-6 w-6 text-amber-500" />
              </div>
            </button>
          </div>
        </section>
      ) : null}

      {/* Roulette Mode */}
      {mode === "roulette" && (
        <section className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-extrabold">룰렛 돌리기</div>
            <Button variant="ghost" className="gap-2" onClick={startOver}>
              <Undo2 className="h-4 w-4" />
              처음으로
            </Button>
          </div>
          <RouletteWheel
            items={pool}
            onPick={(item) => setResult(item)}
          />
        </section>
      )}

      {/* World Cup Mode */}
      {mode === "worldcup" && (
        <section className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-extrabold">메뉴 월드컵</div>
            <Button variant="ghost" className="gap-2" onClick={startOver}>
              <Undo2 className="h-4 w-4" />
              처음으로
            </Button>
          </div>
          <WorldCup
            items={pool}
            onFinish={(winner) => setResult(winner)}
          />
        </section>
      )}

      {/* Result */}
      {result && (
        <section className="mt-8">
          <div className="text-xl font-extrabold mb-3">오늘의 추천!</div>
          <div className="rounded-3xl overflow-hidden border shadow-sm bg-white">
            <div className="w-full aspect-square bg-pink-50">
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
                  다시 고르기
                </Button>
                <Button variant="secondary" className="rounded-full" onClick={startOver}>
                  다른 방식
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="mt-8 text-center text-[11px] text-muted-foreground">
        App Router 기반의 간단한 단일 페이지 예시입니다. [^1][^2]
      </footer>
    </main>
  )
}
