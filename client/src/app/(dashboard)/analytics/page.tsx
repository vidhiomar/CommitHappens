"use client"
import { useEffect, useState } from "react"
import { BarChart2, Users, ShieldCheck, Clock, Flame, TrendingUp } from "lucide-react"
import { TrustBadge } from "@/components/TrustBadge"

export default function AnalyticsDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted rounded-2xl" />)}
        </div>
      </div>
    )
  }

  if (!data) return <div>Failed to load analytics</div>

  const maxCat = Math.max(...data.category_breakdown.map((c: any) => c.count), 1)

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Platform Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time pulse of the verified network.</p>
      </div>

      {/* ── Top KPIs ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card group">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold">{data.active_tips}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Active Intel</div>
        </div>
        <div className="stat-card group">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold">{data.total_verifications}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Verifications</div>
        </div>
        <div className="stat-card group">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-3xl font-bold">{data.expiring_soon}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Expiring < 24h</div>
        </div>
        <div className="stat-card group">
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Users className="h-5 w-5 text-violet-500" />
          </div>
          <div className="text-3xl font-bold">{data.total_users}</div>
          <div className="text-xs text-muted-foreground mt-1 font-medium uppercase tracking-wider">Network Size</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* ── Leaderboard ─────────────────────────────────────────────────── */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Top Contributors
          </h2>
          <div className="space-y-3">
            {data.top_contributors.map((u: any, idx: number) => (
              <div key={u.id} className="leaderboard-row">
                <div className="w-6 text-center font-bold text-muted-foreground">#{idx + 1}</div>
                <div className="h-10 w-10 rounded-full bg-background border flex items-center justify-center font-bold shadow-sm">
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.branch} · {u.year}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-primary">{u.credibility_score}</div>
                  <TrustBadge score={u.credibility_score} showLabel={false} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Categories ──────────────────────────────────────────────────── */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-primary" /> Intelligence by Category
          </h2>
          <div className="space-y-5">
            {data.category_breakdown.sort((a:any,b:any) => b.count - a.count).map((c: any) => (
              <div key={c.category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{c.category}</span>
                  <span className="text-muted-foreground font-mono">{c.count}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full animate-fill-bar"
                    style={{ '--fill-width': `${(c.count / maxCat) * 100}%` } as any}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
