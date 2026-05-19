"use client"
import { useEffect, useState } from "react"

interface Props {
  expiryDate: string | null
}

export function CountdownTimer({ expiryDate }: Props) {
  const [display, setDisplay] = useState("")
  const [urgencyClass, setUrgencyClass] = useState("countdown-safe")

  useEffect(() => {
    if (!expiryDate) return

    const tick = () => {
      const diff = new Date(expiryDate).getTime() - Date.now()
      if (diff <= 0) {
        setDisplay("Expired")
        setUrgencyClass("countdown-critical")
        return
      }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)

      if (h < 1) {
        setDisplay(`${m}m ${s}s`)
        setUrgencyClass("countdown-critical animate-pulse-glow")
      } else if (h < 24) {
        setDisplay(`${h}h ${m}m`)
        setUrgencyClass("countdown-warning")
      } else {
        const d = Math.floor(h / 24)
        setDisplay(`${d}d ${h % 24}h`)
        setUrgencyClass("countdown-safe")
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [expiryDate])

  if (!expiryDate || !display) return null

  return (
    <span className={`text-xs font-mono font-semibold tabular-nums ${urgencyClass}`}>
      ⏱ {display}
    </span>
  )
}
