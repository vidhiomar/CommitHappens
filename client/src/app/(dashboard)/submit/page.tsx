"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"

export default function SubmitTip() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Placements",
    urgency: "Normal",
    description: "",
    expiry_date: "",
    tags: ""
  })

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) setUser(JSON.parse(userStr))
    else router.push("/onboarding")
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    
    try {
      const payload = {
        ...formData,
        expiry_date: formData.expiry_date ? new Date(formData.expiry_date).toISOString() : null,
        college: user.college,
        branch: user.branch,
        target_year: user.year,
        created_by: user.id
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tips/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      
      if (!res.ok) throw new Error("Failed to submit")
      setSuccess(true)
      setTimeout(() => router.push("/dashboard"), 2000)
    } catch (err) {
      alert("Failed to submit tip. Ensure backend is running.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center px-4">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Intelligence Submitted!</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Thank you for contributing to the community. Your tip is now live and waiting for peer verification.
        </p>
        <p className="text-sm font-medium text-primary mt-6 flex items-center gap-2">
          Redirecting to feed <ArrowRight className="h-4 w-4" />
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Submit Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Share verified, actionable knowledge with your peers.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="md:col-span-2 glass-card rounded-2xl p-6 md:p-8">
          <form id="submit-tip-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input required placeholder="e.g. Goldman Sachs Internship Hiring" 
                className="w-full h-11 rounded-xl border border-input bg-muted/40 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select required 
                  className="w-full h-11 rounded-xl border border-input bg-muted/40 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Placements</option><option>Internships</option><option>Scholarships</option>
                  <option>Research</option><option>Clubs</option><option>Exams</option><option>Faculty</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency</label>
                <select required 
                  className="w-full h-11 rounded-xl border border-input bg-muted/40 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={formData.urgency} onChange={e => setFormData({...formData, urgency: e.target.value})}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea required placeholder="Share the specific details. What's the hidden rule? Who should they contact?"
                className="w-full min-h-[120px] rounded-xl border border-input bg-muted/40 p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry / Deadline <span className="text-muted-foreground font-normal">(Optional)</span></label>
                <input type="datetime-local" 
                  className="w-full h-11 rounded-xl border border-input bg-muted/40 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags <span className="text-muted-foreground font-normal">(Comma separated)</span></label>
                <input placeholder="e.g. Internship, Tech" 
                  className="w-full h-11 rounded-xl border border-input bg-muted/40 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 flex justify-end gap-3">
              <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted/50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 glow-primary transition-all disabled:opacity-60">
                {loading ? "Submitting..." : "Submit Intelligence"}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Guidelines */}
        <div className="md:col-span-1 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-primary/20 bg-primary/5">
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-primary" /> Credibility Rules
            </h3>
            <ul className="text-sm text-muted-foreground space-y-3">
              <li>• Your credibility score increases when peers verify this tip.</li>
              <li>• Higher score = your future tips rank higher in the feed.</li>
              <li>• Unlock badges: Member → Trusted Senior.</li>
            </ul>
          </div>
          
          <div className="glass-card rounded-2xl p-5 border border-red-500/20 bg-red-500/5">
            <h3 className="font-semibold text-red-500 flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4" /> Zero Tolerance
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Posting fake, misleading, or spam content will result in severe credibility penalties if reported by peers. Drop below 30 score and your posting rights are revoked.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
