import type { Metadata } from "next"
import "./globals.css"
import GNB from "@/components/gnb"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "오늘 뭐 먹지?",
  description: "귀여운 고양이 메뉴 추천 — 룰렛 & 메뉴 월드컵",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={cn("min-h-screen bg-[#FFF9CC] text-gray-900 antialiased")}>
        <GNB />
        {children}
      </body>
    </html>
  )
}
