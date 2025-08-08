"use client"

/**
 * Decorative paw prints using the provided image.
 * Positioned with low opacity for a cute, subtle background.
 */
export default function PawBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <img
        src="/images/paw-print.png"
        alt=""
        className="absolute top-16 left-4 w-10 h-10 opacity-15 rotate-12 select-none"
      />
      <img
        src="/images/paw-print.png"
        alt=""
        className="absolute top-1/3 right-6 w-12 h-12 opacity-15 -rotate-6 select-none"
      />
      <img
        src="/images/paw-print.png"
        alt=""
        className="absolute bottom-28 left-10 w-14 h-14 opacity-10 -rotate-12 select-none"
      />
      <img
        src="/images/paw-print.png"
        alt=""
        className="absolute bottom-10 right-12 w-16 h-16 opacity-10 rotate-6 select-none"
      />
      <img
        src="/images/paw-print.png"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-12 h-12 opacity-10 rotate-[18deg] select-none"
      />
    </div>
  )
}
