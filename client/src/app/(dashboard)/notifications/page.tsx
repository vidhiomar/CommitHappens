"use client"
import { useEffect, useState } from "react"
import { Bell, BellOff, Check, Clock, Flame, BookOpen, Star, AlertCircle } from "lucide-react"

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function notifIcon(msg: string) {
  if (msg.includes("🔥") || msg.includes("URGENT")) return <Flame className="h-4 w-4 text-red-400" />
  if (msg.includes("📚"))  return <BookOpen className="h-4 w-4 text-indigo-400" />
  if (msg.includes("⭐") || msg.includes("💡"))  return <Star className="h-4 w-4 text-amber-400" />
  if (msg.includes("⚡"))  return <AlertCircle className="h-4 w-4 text-orange-400" />
  return <Bell className="h-4 w-4 text-primary" />
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") ?? "{}")
    if (!u?.id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${u.id}`)
      .then(r => r.json())
      .then(data => { setNotifications(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const markRead = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/read`, { method: "PATCH" })
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    } catch {}
  }

  const markAllRead = async () => {
    const unread = notifications.filter(n => !n.read)
    await Promise.all(unread.map(n => fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${n.id}/read`, { method: "PATCH" })))
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const today   = notifications.filter(n => (Date.now() - new Date(n.sent_at).getTime()) < 86400000)
  const earlier = notifications.filter(n => (Date.now() - new Date(n.sent_at).getTime()) >= 86400000)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}` : "You're all caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-muted/30 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
            <Check className="h-4 w-4" /> Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="glass-card rounded-2xl p-4 animate-pulse flex gap-3">
              <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
              <div className="flex-1 space-y-2"><div className="h-4 bg-muted rounded w-3/4" /><div className="h-3 bg-muted rounded w-1/3" /></div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="glass-card rounded-2xl p-16 text-center">
          <BellOff className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-semibold text-muted-foreground">No notifications yet</p>
          <p className="text-sm text-muted-foreground/60 mt-1">You'll be notified about urgent opportunities matching your profile</p>
        </div>
      ) : (
        <div className="space-y-6">
          {today.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Today</p>
              <div className="space-y-2">
                {today.map(n => (
                  <div key={n.id} onClick={() => !n.read && markRead(n.id)}
                    className={`notif-item ${!n.read ? "unread" : ""}`}>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${!n.read ? "bg-primary/15" : "bg-muted/50"}`}>
                      {notifIcon(n.message)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug ${!n.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>{n.message}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Clock className="h-3 w-3 text-muted-foreground/50" />
                        <span className="text-xs text-muted-foreground/60">{timeAgo(n.sent_at)}</span>
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />}
                      </div>
                    </div>
                    {!n.read && (
                      <button onClick={e => { e.stopPropagation(); markRead(n.id) }}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {earlier.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Earlier</p>
              <div className="space-y-2">
                {earlier.map(n => (
                  <div key={n.id} className="notif-item opacity-70">
                    <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">{notifIcon(n.message)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground leading-snug">{n.message}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Clock className="h-3 w-3 text-muted-foreground/40" />
                        <span className="text-xs text-muted-foreground/50">{timeAgo(n.sent_at)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
