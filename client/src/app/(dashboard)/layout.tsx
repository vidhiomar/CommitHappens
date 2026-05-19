import Link from "next/link"
import { LayoutDashboard, PlusCircle, Bell, User, Search } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">InsiderInfo</span>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search internships, scholarships..."
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              />
            </div>
          </div>

          <nav className="flex items-center gap-1 md:gap-4">
            <Link href="/dashboard" className="p-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5" />
              <span className="hidden md:inline text-sm font-medium">Feed</span>
            </Link>
            <Link href="/submit" className="p-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              <span className="hidden md:inline text-sm font-medium">Submit Tip</span>
            </Link>
            <Link href="/notifications" className="p-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </Link>
            <Link href="/profile" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
