"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, ArrowRight, ArrowLeft, Check, BookOpen, Code2, Cpu, Cog, Zap } from "lucide-react"

const COLLEGES = ["ABC Institute", "XYZ College", "IIT Delhi", "NIT Warangal", "BITS Pilani"]
const BRANCHES = [
  { id: "CSE",        label: "Computer Science",  icon: Code2,   color: "#6366f1" },
  { id: "ECE",        label: "Electronics",        icon: Cpu,     color: "#8b5cf6" },
  { id: "Mechanical", label: "Mechanical",         icon: Cog,     color: "#f59e0b" },
  { id: "Civil",      label: "Civil",              icon: BookOpen,color: "#10b981" },
  { id: "EEE",        label: "Electrical",         icon: Zap,     color: "#ef4444" },
]
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

const PREVIEW_BY_BRANCH: Record<string, string[]> = {
  CSE:        ["Coding club recruitments", "FAANG internship alerts", "OA strategy tips", "Research intern openings"],
  ECE:        ["Core electronics placements", "PSU BHEL/NTPC tips", "GATE ECE strategy", "Signal processing research"],
  Mechanical: ["PSU placement cutoffs", "GATE Mechanical intel", "AutoCAD workshop alerts", "Manufacturing internships"],
  Civil:      ["Government job alerts", "GATE Civil tips", "Infrastructure internships", "Structural analysis tips"],
  EEE:        ["Power sector placements", "GATE EEE cutoffs", "Renewable energy internships", "Lab project tips"],
}

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", email: "", college: COLLEGES[0], branch: "CSE", year: "2nd Year" })

  const preview = PREVIEW_BY_BRANCH[form.branch] ?? []

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const user = await res.json()
      localStorage.setItem("user", JSON.stringify(user))
      router.push("/dashboard")
    } catch {
      setError("Registration failed. Please check backend connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient px-4 py-12">
      {/* Orbs */}
      <div className="hero-orb-1 fixed top-0 left-0 w-72 h-72 rounded-full pointer-events-none" />
      <div className="hero-orb-2 fixed bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">InsiderInfo</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8 justify-center animate-fade-in">
          {[1, 2].map(n => (
            <div key={n} className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${step > n ? "step-done" : step === n ? "step-active" : "step-todo"}`}>
                {step > n ? <Check className="h-4 w-4" /> : n}
              </div>
              {n < 2 && <div className={`h-0.5 w-12 rounded-full transition-all ${step > 1 ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 animate-fade-in-up">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Welcome! Let's set up your profile</h1>
                <p className="text-sm text-muted-foreground">Your identity in the network. Takes 30 seconds.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    required
                    placeholder="Rahul Kumar"
                    className="flex h-11 w-full rounded-xl border border-input bg-muted/50 px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">College Email</label>
                  <input
                    required
                    type="email"
                    placeholder="rahul@college.edu"
                    className="flex h-11 w-full rounded-xl border border-input bg-muted/50 px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">College</label>
                  <select
                    className="flex h-11 w-full rounded-xl border border-input bg-muted/50 px-4 py-2 text-sm focus:outline-none transition-all"
                    value={form.college}
                    onChange={e => setForm({ ...form, college: e.target.value })}
                  >
                    {COLLEGES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {error && <p className="text-sm text-red-400 text-center">{error}</p>}

              <button
                onClick={() => { if (form.name && form.email) setStep(2) }}
                disabled={!form.name || !form.email}
                className="w-full h-12 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all glow-primary disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Continue <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Personalize your feed</h1>
                <p className="text-sm text-muted-foreground">We'll show you intelligence relevant to your exact profile.</p>
              </div>

              {/* Branch selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Branch</label>
                <div className="grid grid-cols-2 gap-2">
                  {BRANCHES.map(b => (
                    <button
                      key={b.id}
                      onClick={() => setForm({ ...form, branch: b.id })}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all text-left
                        ${form.branch === b.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                        }`}
                    >
                      <b.icon className="h-4 w-4 shrink-0" style={{ color: form.branch === b.id ? b.color : undefined }} />
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Year</label>
                <div className="grid grid-cols-4 gap-2">
                  {YEARS.map(y => (
                    <button
                      key={y}
                      onClick={() => setForm({ ...form, year: y })}
                      className={`p-2.5 rounded-xl border text-sm font-semibold transition-all
                        ${form.year === y
                          ? "border-primary bg-primary/15 text-primary"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                        }`}
                    >
                      {y.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                <p className="text-xs font-semibold text-primary mb-2">You'll see intelligence like:</p>
                <ul className="space-y-1">
                  {preview.map(p => (
                    <li key={p} className="text-xs text-muted-foreground flex items-center gap-2">
                      <Check className="h-3 w-3 text-primary shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="h-12 px-5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all glow-primary disabled:opacity-60"
                >
                  {loading ? "Setting up..." : "Enter the Network →"}
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          By joining, you agree to keep information accurate. Misinformation tanks your credibility score.
        </p>
      </div>
    </div>
  )
}
