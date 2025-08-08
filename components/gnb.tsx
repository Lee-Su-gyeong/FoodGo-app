"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function GNB() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[#FFF7CC]/90 backdrop-blur supports-[backdrop-filter]:bg-[#FFF7CC]/70">
      <div className="mx-auto max-w-md px-4">
        <div className="flex items-center gap-3 py-3">
          {/* New cat face (cropped) */}
          <div className="w-9 h-9 rounded-full border bg-white shadow-sm overflow-hidden">
            <img
              src="/images/cat-new.png"
              alt="고양이 얼굴"
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
                    ? "bg-rose-500 text-white"
                    : "bg-rose-50 text-rose-600 hover:bg-rose-100"
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
                    ? "bg-amber-500 text-white"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100"
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
