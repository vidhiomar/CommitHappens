interface Props {
  score: number
  showLabel?: boolean
}

const TIERS = [
  { min: 95, label: "Top Contributor",    color: "#f59e0b", emoji: "👑" },
  { min: 90, label: "Trusted Senior",     color: "#6366f1", emoji: "🛡️" },
  { min: 80, label: "Placement Mentor",   color: "#8b5cf6", emoji: "🎯" },
  { min: 70, label: "Scholarship Guide",  color: "#10b981", emoji: "📚" },
  { min: 55, label: "Contributor",        color: "#3b82f6", emoji: "⭐" },
  { min: 0,  label: "Member",             color: "#6b7280", emoji: "🌱" },
]

export function getTier(score: number) {
  return TIERS.find(t => score >= t.min) ?? TIERS[TIERS.length - 1]
}

export function TrustBadge({ score, showLabel = true }: Props) {
  const tier = getTier(score)
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border"
      style={{
        color: tier.color,
        borderColor: `${tier.color}40`,
        background: `${tier.color}15`,
      }}
    >
      {tier.emoji} {showLabel && tier.label}
    </span>
  )
}
