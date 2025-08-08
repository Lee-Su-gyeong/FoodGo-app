import type { Metadata } from "next"
import "./globals.css"
import GNB from "@/components/gnb"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "오늘 뭐 먹지?",
  description: "상큼한 메뉴 추천 — 룰렛 & 메뉴 월드컵",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={cn("min-h-screen text-gray-900 antialiased app-gingham")}>
        <GNB />
        <div className="mx-auto max-w-md p-3 md:p-4">
          <div className="bg-white/95 border rounded-3xl shadow-sm backdrop-blur-sm">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
