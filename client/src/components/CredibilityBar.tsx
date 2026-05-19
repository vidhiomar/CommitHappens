"use client"
import { useEffect, useRef } from "react"
import { getTier } from "./TrustBadge"

interface Props {
  score: number
}

export function CredibilityBar({ score }: Props) {
  const barRef = useRef<HTMLDivElement>(null)
  const tier = getTier(score)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    // Trigger animation by setting width after mount
    requestAnimationFrame(() => {
      el.style.width = `${score}%`
    })
  }, [score])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Credibility Score</span>
        <span className="font-bold text-lg" style={{ color: tier.color }}>{score}/100</span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: "0%", background: `linear-gradient(90deg, ${tier.color}99, ${tier.color})` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>Member</span>
        <span>Contributor</span>
        <span>Trusted</span>
        <span>Top</span>
      </div>
      {/* Tier markers */}
      <div className="relative h-1">
        {[55, 70, 80, 90, 95].map(t => (
          <div
            key={t}
            className="absolute top-0 w-0.5 h-3 -translate-x-1/2 rounded-full"
            style={{ left: `${t}%`, background: score >= t ? tier.color : "var(--border)" }}
          />
        ))}
      </div>
    </div>
  )
}
