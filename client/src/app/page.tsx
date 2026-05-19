import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, BellRing, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md glass">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">InsiderInfo</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/onboarding">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link href="/onboarding">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm animate-fade-in">
              <Zap className="mr-2 h-4 w-4" />
              <span>The #1 Verified Knowledge Network for Students</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Stop Missing Out on <br className="hidden md:block" />
              <span className="text-primary">Crucial Opportunities</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              A verified insider knowledge system where students share actionable intelligence that normally spreads only through friend circles. Don't be the last to know.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/onboarding">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full group">
                  Join the Network
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full glass">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineered for Action</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Not another random social feed. We built a structured intelligence system to filter noise and surface high-priority opportunities.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl">Personalized Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Only see what matters to you. Filtered by your college, branch, and year. No more scrolling through irrelevant mechanical branch posts as a CS student.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <ShieldCheck className="h-10 w-10 text-green-500 mb-4" />
                  <CardTitle className="text-xl">Peer Verified</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our credibility system ensures high trust. Tips are peer-reviewed. Fake news is reported. Top contributors earn verified badges.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <BellRing className="h-10 w-10 text-orange-500 mb-4" />
                  <CardTitle className="text-xl">Smart Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get alerted before deadlines hit. The system proactively warns you about urgent expiring opportunities based on your profile.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2026 InsiderInfo Platform. Built for the students, by the students.</p>
        </div>
      </footer>
    </div>
  )
}
