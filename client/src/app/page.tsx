import Link from "next/link"
import { ArrowRight, ShieldCheck, Zap, BellRing, Target, Users, TrendingUp, Star, Lock, Globe } from "lucide-react"

const STATS = [
  { label: "Tips Verified", value: "847+" },
  { label: "Active Scholarships", value: "23" },
  { label: "Expiring Tonight", value: "6" },
  { label: "Contributors", value: "312" },
]

const FEATURES = [
  {
    icon: Target,
    title: "Hyper-Personalized Feed",
    desc: "Only see what matters to you. Filtered by college, branch & year. CSE 2nd year gets intern alerts; Mech 4th year sees PSU tips.",
    color: "#6366f1",
  },
  {
    icon: ShieldCheck,
    title: "Peer Verification Engine",
    desc: "Every tip is verified by real seniors. Fake reports tank credibility scores. Our trust graph ranks the most reliable voices at the top.",
    color: "#10b981",
  },
  {
    icon: BellRing,
    title: "Smart Deadline Alerts",
    desc: "\"Google STEP closes in 5 hours.\" Get warned before opportunities expire — not after. Live countdown timers on every opportunity.",
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    title: "Smart Ranking Algorithm",
    desc: "Feed ranked by trust + urgency + freshness − expiry decay. Not chronological noise — intelligent prioritization.",
    color: "#8b5cf6",
  },
  {
    icon: Lock,
    title: "Hidden Curriculum Access",
    desc: "Professor preferences, backdoor club entries, hidden internship portals. The unwritten rules that only senior friend circles know.",
    color: "#ef4444",
  },
  {
    icon: Star,
    title: "Contributor Reputation",
    desc: "Earn badges: Member → Contributor → Trusted Senior → Placement Mentor → Top Contributor. Gamified credibility system.",
    color: "#f59e0b",
  },
]

const DEMO_FLOW = [
  { step: 1, text: "Freshman signs up & picks branch/year" },
  { step: 2, text: "Gets personalized dashboard instantly" },
  { step: 3, text: "Receives urgent scholarship notification" },
  { step: 4, text: "Senior submits hidden placement tip" },
  { step: 5, text: "Peers verify → credibility updates live" },
  { step: 6, text: "Feed ranking changes dynamically" },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full glass border-b border-border/50">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center glow-primary">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight gradient-text">InsiderInfo</span>
          </div>
          <nav className="hidden md:flex gap-8">
            {["Features", "How It Works", "Impact"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/onboarding"
              className="hidden sm:inline-flex h-9 px-4 rounded-lg border border-border text-sm font-medium items-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
              Sign In
            </Link>
            <Link href="/onboarding"
              className="inline-flex h-9 px-4 rounded-lg bg-primary text-sm font-semibold text-white items-center gap-1.5 hover:bg-primary/90 transition-all glow-primary">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden hero-gradient min-h-[90vh] flex items-center">
          {/* Decorative orbs */}
          <div className="hero-orb-1 absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none animate-float" />
          <div className="hero-orb-2 absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

          <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10 w-full">
            {/* Tag line pill */}
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-fade-in">
              <Zap className="h-3.5 w-3.5" />
              The #1 Peer-Verified Intelligence Network for Students
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Stop Missing Out on<br />
              <span className="gradient-text">Crucial Opportunities</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Students often fail not because they lack talent, but because they lack access to insider knowledge.
              We convert unspoken campus intelligence into actionable, verified opportunity data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/onboarding"
                className="flex items-center gap-2 h-14 px-8 text-lg font-semibold rounded-full bg-primary text-white glow-primary hover:bg-primary/90 transition-all group">
                Join the Network
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#features"
                className="flex items-center gap-2 h-14 px-8 text-lg font-medium rounded-full glass border hover:border-primary/50 transition-all">
                Explore Features
              </a>
            </div>

            {/* Live Stats Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {STATS.map(s => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────────────────── */}
        <section id="features" className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <TrendingUp className="h-3.5 w-3.5" /> Engineered for Action
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                Not a Social Feed.<br /><span className="gradient-text">An Intelligence System.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every feature is built to surface high-priority, time-sensitive, peer-verified opportunities before they expire.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <div key={f.title} className="glass-card rounded-2xl p-6 tip-card group" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                    <f.icon className="h-6 w-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ────────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-28 bg-muted/20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                The <span className="gradient-text">Perfect Demo Flow</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From signup to verified intelligence in under 60 seconds.
              </p>
            </div>
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />
              <div className="space-y-4">
                {DEMO_FLOW.map((item, i) => (
                  <div key={i} className="flex gap-6 items-start glass-card rounded-2xl p-5 tip-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="h-10 w-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <p className="text-base font-medium pt-1.5 text-foreground/90">{item.text}</p>
                    {i < DEMO_FLOW.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto mt-2 shrink-0 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Impact ──────────────────────────────────────────────────────── */}
        <section id="impact" className="py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Globe className="h-12 w-12 text-primary mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              Democratizing <span className="gradient-text">Opportunity</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              "We convert unspoken institutional knowledge into actionable opportunity intelligence for first-generation students."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding"
                className="flex items-center justify-center gap-2 h-14 px-8 text-lg font-semibold rounded-full bg-primary text-white glow-primary hover:bg-primary/90 transition-all group">
                Start Your Journey <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/50 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <ShieldCheck className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold gradient-text">InsiderInfo</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2026 InsiderInfo Platform. Built for students, by students. Democratizing opportunity intelligence.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/onboarding" className="hover:text-foreground transition-colors">Join Now</Link>
            <Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
