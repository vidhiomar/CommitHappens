"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { ShieldCheck, Bookmark, AlertTriangle, Clock, Info, Filter, Flame, Search, X } from "lucide-react"
import { CountdownTimer } from "@/components/CountdownTimer"
import { TrustBadge } from "@/components/TrustBadge"

const CATEGORIES = ["All", "Placements", "Internships", "Scholarships", "Research", "Clubs", "Faculty", "Exams"]
const URGENCIES  = ["All", "High", "Medium", "Low"]

const CATEGORY_ICONS: Record<string, string> = {
  All: "🔍", Placements: "💼", Internships: "🚀", Scholarships: "📚",
  Research: "🔬", Clubs: "🎯", Faculty: "👨‍🏫", Exams: "📝",
}

export default function DashboardFeedInner() {
  const searchParams = useSearchParams()
  const [tips, setTips]           = useState<any[]>([])
  const [loading, setLoading]     = useState(true)
  const [user, setUser]           = useState<any>(null)
  const [category, setCategory]   = useState("All")
  const [urgency, setUrgency]     = useState("All")
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [searchQ, setSearchQ]     = useState("")
  const [savedIds, setSavedIds]   = useState<Set<number>>(new Set())
  const [verifiedByMe, setVerifiedByMe] = useState<Map<number, string>>(new Map())

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") ?? "{}")
    if (u?.id) { setUser(u); fetchTips(u) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // React to search params from layout search bar
  useEffect(() => {
    const q = searchParams.get("q")
    const college = searchParams.get("college")
    if (q) {
      setSearchQ(q)
      fetchSearch(q, college ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const fetchTips = useCallback(async (u: any, cat = "All", urg = "All", vOnly = false) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (u.college) params.set("college", u.college)
      if (u.branch)  params.set("branch",  u.branch)
      if (u.year)    params.set("year",     u.year)
      if (cat !== "All") params.set("category", cat)
      if (urg !== "All") params.set("urgency",  urg)
      if (vOnly) params.set("verified_only", "true")
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tips/?${params}`)
      const data = await res.json()
      setTips(Array.isArray(data) ? data : [])
      setSearchQ("")
    } catch { setTips([]) }
    finally { setLoading(false) }
  }, [])

  const fetchSearch = async (q: string, college: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ q })
      if (college) params.set("college", college)
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tips/search?${params}`)
      const data = await res.json()
      setTips(Array.isArray(data) ? data : [])
    } catch { setTips([]) }
    finally { setLoading(false) }
  }

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    if (user) fetchTips(user, cat, urgency, verifiedOnly)
  }
  const handleUrgencyChange = (urg: string) => {
    setUrgency(urg)
    if (user) fetchTips(user, category, urg, verifiedOnly)
  }
  const handleVerifiedToggle = () => {
    const next = !verifiedOnly
    setVerifiedOnly(next)
    if (user) fetchTips(user, category, urgency, next)
  }
  const clearSearch = () => {
    setSearchQ("")
    if (user) fetchTips(user, category, urgency, verifiedOnly)
  }

  const handleVerify = async (tipId: number, status: string) => {
    if (!user?.id) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifications/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip_id: tipId, verified_by: user.id, status }),
      })
      setVerifiedByMe(prev => new Map(prev).set(tipId, status))
      setTips(prev => prev.map(t => {
        if (t.id !== tipId) return t
        const newV = [...t.verifications.filter((v: any) => v.verified_by !== user.id), { status, verified_by: user.id }]
        return { ...t, verifications: newV }
      }))
    } catch {}
  }

  const handleBookmark = async (tipId: number) => {
    if (!user?.id || savedIds.has(tipId)) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saves/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip_id: tipId, user_id: user.id }),
      })
      setSavedIds(prev => new Set(prev).add(tipId))
    } catch {}
  }

  const urgentTips = tips.filter(t => {
    if (!t.expiry_date) return false
    const h = (new Date(t.expiry_date).getTime() - Date.now()) / 3600000
    return h > 0 && h < 24
  })

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Expiring Soon Banner ─────────────────────────────────────────── */}
      {urgentTips.length > 0 && !searchQ && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/8 p-4 flex items-start gap-3 animate-pulse-glow">
          <Flame className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-400">
              🔥 {urgentTips.length} {urgentTips.length === 1 ? "opportunity" : "opportunities"} expiring within 24 hours!
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {urgentTips.slice(0, 2).map((t: any) => t.title).join(" · ")}{urgentTips.length > 2 ? ` +${urgentTips.length - 2} more` : ""}
            </p>
          </div>
        </div>
      )}

      {/* ── Search Result Banner ─────────────────────────────────────────── */}
      {searchQ && (
        <div className="flex items-center gap-3 rounded-2xl glass px-4 py-3">
          <Search className="h-4 w-4 text-primary shrink-0" />
          <p className="text-sm flex-1">
            <span className="text-muted-foreground">Results for </span>
            <span className="font-semibold text-foreground">"{searchQ}"</span>
            <span className="text-muted-foreground"> — {tips.length} found</span>
          </p>
          <button onClick={clearSearch} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className="lg:col-span-1 space-y-5">
          <div className="glass-card rounded-2xl p-5 sticky top-20">
            {/* Profile context */}
            {user && (
              <div className="mb-5 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {user.name?.charAt(0) ?? "U"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{user.branch} · {user.year}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Filters header */}
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Filters</span>
            </div>

            {/* Urgency filter */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Urgency</p>
              <div className="space-y-1.5">
                {URGENCIES.map(u => (
                  <button key={u} onClick={() => handleUrgencyChange(u)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2
                      ${urgency === u ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:bg-muted/50"}`}>
                    {u === "High" && <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />}
                    {u === "Medium" && <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />}
                    {u === "Low" && <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />}
                    {u === "All" && <span className="h-2 w-2 rounded-full bg-muted-foreground shrink-0" />}
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified only toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
              <span className="text-sm font-medium">Verified Only</span>
              <button
                onClick={handleVerifiedToggle}
                className={`h-5 w-9 rounded-full transition-all relative ${verifiedOnly ? "bg-emerald-500" : "bg-muted"}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${verifiedOnly ? "left-4" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Feed ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-5">

          {/* Category chips */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => handleCategoryChange(c)}
                className={`cat-chip ${category === c ? "active" : ""}`}>
                {CATEGORY_ICONS[c]} {c}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {searchQ ? "Search Results" : "Intelligence Feed"}
              <span className="ml-2 text-sm font-normal text-muted-foreground">({tips.length})</span>
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Smart Ranked
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse space-y-3">
                  <div className="flex gap-2"><div className="h-5 w-16 bg-muted rounded-full" /><div className="h-5 w-24 bg-muted rounded-full" /></div>
                  <div className="h-6 w-3/4 bg-muted rounded-lg" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : tips.length === 0 ? (
            <div className="glass-card rounded-2xl p-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-semibold text-muted-foreground">No intelligence found</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Try different filters or ensure the backend is running</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tips.map((tip, idx) => {
                const verifiedCount  = tip.verifications.filter((v: any) => v.status === "Verified").length
                const fakeCount      = tip.verifications.filter((v: any) => v.status === "Fake").length
                const myVote         = verifiedByMe.get(tip.id)
                const isExpiredSoon  = tip.expiry_date && (new Date(tip.expiry_date).getTime() - Date.now()) / 3600000 < 24
                const urgencyBorder  = tip.urgency === "High" ? "#ef4444" : tip.urgency === "Medium" ? "#f59e0b" : "transparent"

                return (
                  <div key={tip.id}
                    className={`glass-card rounded-2xl overflow-hidden tip-card animate-fade-in-up stagger-${Math.min(idx + 1, 5)}`}
                    style={{ borderLeft: `3px solid ${urgencyBorder}` }}
                  >
                    <div className="p-5 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {tip.urgency === "High" && (
                              <span className="urgency-high inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold">🔥 High Priority</span>
                            )}
                            {tip.urgency === "Medium" && (
                              <span className="urgency-medium inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold">⚡ Medium</span>
                            )}
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border border-border bg-muted/40 text-muted-foreground">
                              {CATEGORY_ICONS[tip.category]} {tip.category}
                            </span>
                            {tip.target_year && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-primary/20 bg-primary/5 text-primary">
                                {tip.target_year}
                              </span>
                            )}
                            {tip.expiry_date && (
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border
                                ${isExpiredSoon ? "border-red-500/30 bg-red-500/8 text-red-400" : "border-border bg-muted/30 text-muted-foreground"}`}>
                                <Clock className="h-3 w-3" />
                                <CountdownTimer expiryDate={tip.expiry_date} />
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold leading-snug">{tip.title}</h3>
                        </div>
                        <button
                          onClick={() => handleBookmark(tip.id)}
                          className={`p-2 rounded-lg transition-all shrink-0 ${savedIds.has(tip.id) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}>
                          <Bookmark className="h-4 w-4" fill={savedIds.has(tip.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    <div className="px-5 pb-4 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>

                      {tip.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {tip.tags.split(",").map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-muted/50 border border-border/50 text-xs text-muted-foreground">
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex items-start gap-2.5">
                        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-semibold text-primary mb-1.5">Why you&apos;re seeing this:</p>
                          <ul className="space-y-0.5 list-disc list-inside">
                            {tip.target_year && <li>Targeted at {tip.target_year} students</li>}
                            {verifiedCount > 0 && <li>Verified by {verifiedCount} peers in your network</li>}
                            {tip.urgency === "High" && <li>High urgency — deadline approaching</li>}
                            {tip.author?.credibility_score >= 80 && <li>Posted by a highly trusted contributor ({tip.author.credibility_score}/100)</li>}
                            {fakeCount > 0 && <li className="text-amber-400">⚠ {fakeCount} peer(s) flagged this</li>}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-3.5 border-t border-border/50 bg-muted/10 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {tip.author?.name?.charAt(0)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{tip.author?.name}</span>
                          <TrustBadge score={tip.author?.credibility_score ?? 50} />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {verifiedCount > 0 && (
                          <span className="verified-chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold">
                            <ShieldCheck className="h-3 w-3" /> {verifiedCount} Verified
                          </span>
                        )}
                        {myVote ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border">
                            You: {myVote}
                          </span>
                        ) : (
                          <>
                            <button onClick={() => handleVerify(tip.id, "Verified")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-all">
                              <ShieldCheck className="h-3 w-3" /> Verify
                            </button>
                            <button onClick={() => handleVerify(tip.id, "Outdated")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all">
                              <Clock className="h-3 w-3" /> Outdated
                            </button>
                            <button onClick={() => handleVerify(tip.id, "Fake")}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                              <AlertTriangle className="h-3 w-3" /> Fake
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
