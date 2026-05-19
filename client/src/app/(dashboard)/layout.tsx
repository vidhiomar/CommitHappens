"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { LayoutDashboard, PlusCircle, Bell, User, BarChart2, Search, ShieldCheck, X } from "lucide-react"

const NAV = [
  { href: "/dashboard",     icon: LayoutDashboard, label: "Feed" },
  { href: "/submit",        icon: PlusCircle,       label: "Submit" },
  { href: "/notifications", icon: Bell,             label: "Alerts" },
  { href: "/analytics",     icon: BarChart2,        label: "Analytics" },
  { href: "/profile",       icon: User,             label: "Profile" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [searchVal, setSearchVal] = useState("")
  const [unread, setUnread] = useState(0)
  const [college, setCollege] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}")
    if (!user.id) { router.push("/onboarding"); return }
    setCollege(user.college ?? "")
    // Fetch unread notification count
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${user.id}`)
      .then(r => r.json())
      .then((data: any[]) => setUnread(data.filter(n => !n.read).length))
      .catch(() => {})
  }, [router])

  const handleSearch = (q: string) => {
    setSearchVal(q)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!q.trim()) return
    debounceRef.current = setTimeout(() => {
      router.push(`/dashboard?q=${encodeURIComponent(q)}&college=${encodeURIComponent(college)}`)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Top Nav ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6 gap-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:inline">InsiderInfo</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="global-search"
              type="search"
              placeholder="Search internships, scholarships, tips..."
              value={searchVal}
              onChange={e => handleSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-9 rounded-xl border border-input bg-muted/40 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchVal && (
              <button onClick={() => setSearchVal("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map(({ href, icon: Icon, label }) => {
              const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${active ? "nav-active" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {href === "/notifications" && unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {unread}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* ── Page Content ────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* ── Mobile Bottom Nav ────────────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/50">
        <div className="flex items-center justify-around h-16">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs font-medium transition-all
                  ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                <span>{label}</span>
                {href === "/notifications" && unread > 0 && (
                  <span className="absolute top-1 right-2 h-3.5 w-3.5 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center font-bold">
                    {unread}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
