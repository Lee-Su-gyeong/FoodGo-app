"use client"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
  color?: string // paw color
  background?: string // background circle color
}

/**
 * Cute cat paw:
 * - Soft "toe beans" (ellipses with slight rotation)
 * - Rounded main pad (bean-like)
 * - No strokes to avoid borders
 * - White circle background for clean edges on any background
 */
export default function PawIcon({
  className = "w-12 h-12",
  color = "#111111",
  background = "#ffffff",
}: Props) {
  return (
    <svg
      className={cn(className)}
      viewBox="0 0 64 64"
      role="img"
      aria-label="paw"
    >
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill={background} />

      {/* Toe beans */}
      <ellipse cx="22" cy="23" rx="5.2" ry="6.4" fill={color} transform="rotate(-12 22 23)" />
      <ellipse cx="30" cy="17.5" rx="5.6" ry="6.6" fill={color} transform="rotate(-4 30 17.5)" />
      <ellipse cx="38" cy="17.5" rx="5.6" ry="6.6" fill={color} transform="rotate(4 38 17.5)" />
      <ellipse cx="46" cy="23" rx="5.2" ry="6.4" fill={color} transform="rotate(12 46 23)" />

      {/* Main pad (rounded bean) */}
      <path
        d="
          M20 38
          C20 30, 26 26, 32 26
          C38 26, 44 30, 44 38
          C44 45, 38 49, 32 49
          C26 49, 20 45, 20 38
          Z
        "
        fill={color}
      />
    </svg>
  )
}
