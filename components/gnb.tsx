"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function GNB() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-md px-4">
        <div className="flex items-center gap-3 py-3">
          {/* Sheep face (cropped) */}
          <div className="w-9 h-9 rounded-full border bg-white shadow-sm overflow-hidden">
            <img
              src="/images/mascot-sheep.png"
              alt="양 얼굴"
              className="w-full h-full object-cover object-center scale-[1.15]"
              aria-hidden="true"
            />
          </div>
          <div className="font-extrabold text-lg">오늘 뭐 먹지?</div>
        </div>
        <nav className="pb-2">
          <ul className="grid grid-cols-2 gap-2">
            <li>
              <Link
                href="/roulette"
                aria-current={isActive("/roulette") ? "page" : undefined}
                className={cn(
                  "block text-center rounded-full px-4 py-2 text-base font-bold transition-colors",
                  isActive("/roulette")
                    ? "bg-sky-500 text-white"
                    : "bg-sky-50 text-sky-700 hover:bg-sky-100"
                )}
              >
                룰렛
              </Link>
            </li>
            <li>
              <Link
                href="/worldcup"
                aria-current={isActive("/worldcup") ? "page" : undefined}
                className={cn(
                  "block text-center rounded-full px-4 py-2 text-base font-bold transition-colors",
                  isActive("/worldcup")
                    ? "bg-blue-500 text-white"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
              >
                메뉴 월드컵
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
