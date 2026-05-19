"use client"
import { useEffect, useState } from "react"
import { ShieldCheck, LogOut, FileText, Bookmark, Settings, Award } from "lucide-react"
import { CredibilityBar } from "@/components/CredibilityBar"
import { TrustBadge, getTier } from "@/components/TrustBadge"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [saved, setSaved] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") ?? "{}")
    if (u?.id) {
      setUser(u)
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/saves/${u.id}`)
        .then(r => r.json())
        .then(data => setSaved(Array.isArray(data) ? data : []))
        .finally(() => setLoading(false))
    }
  }, [])

  if (!user) return null

  const tier = getTier(user.credibility_score ?? 50)

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      {/* ── Header Card ─────────────────────────────────────────────────── */}
      <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="h-32 w-32 rounded-full border-4 flex items-center justify-center text-5xl font-bold shadow-xl shrink-0"
               style={{ borderColor: `${tier.color}40`, background: `${tier.color}15`, color: tier.color }}>
            {user.name?.charAt(0) ?? "U"}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h2 className="text-3xl font-extrabold">{user.name}</h2>
              <TrustBadge score={user.credibility_score ?? 50} />
            </div>
            <p className="text-muted-foreground mb-4">{user.email}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-lg bg-muted/50 border border-border text-sm font-medium">
                🏛 {user.college}
              </span>
              <span className="px-3 py-1 rounded-lg bg-muted/50 border border-border text-sm font-medium">
                📚 {user.branch}
              </span>
              <span className="px-3 py-1 rounded-lg bg-muted/50 border border-border text-sm font-medium">
                🎓 {user.year}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/50">
          <CredibilityBar score={user.credibility_score ?? 50} />
        </div>
      </div>

      {/* ── Content Grid ────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" /> Your Impact
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4" /> Tips Shared</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Verified Tips</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><Bookmark className="h-4 w-4" /> Saved Items</span>
                <span className="font-bold">{saved.length}</span>
              </div>
            </div>
          </div>

          <button onClick={() => { localStorage.removeItem("user"); window.location.href = "/" }}
            className="w-full h-12 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        {/* Saved Items */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-primary" /> Saved Opportunities
          </h3>
          
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-16 bg-muted rounded-xl w-full" />
              <div className="h-16 bg-muted rounded-xl w-full" />
            </div>
          ) : saved.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border/50 rounded-xl">
              <Bookmark className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground">No saved opportunities yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {saved.map(s => (
                <div key={s.id} className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-semibold mb-1">{s.tip.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-md bg-background border">{s.tip.category}</span>
                        {s.tip.expiry_date && <span>Expires: {new Date(s.tip.expiry_date).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
