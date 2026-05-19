"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"

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
    if (userStr) {
      setUser(JSON.parse(userStr))
    } else {
      router.push("/onboarding")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    
    setLoading(true)
    
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        urgency: formData.urgency,
        expiry_date: formData.expiry_date ? new Date(formData.expiry_date).toISOString() : null,
        college: user.college,
        branch: user.branch,
        target_year: user.year,
        tags: formData.tags,
        created_by: user.id
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tips/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      
      if (!res.ok) throw new Error("Failed to submit")
      
      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err) {
      console.error(err)
      alert("Failed to submit tip. Ensure backend is running.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-2">Intelligence Submitted!</h2>
        <p className="text-muted-foreground">Thank you for contributing to the community.</p>
        <p className="text-sm text-muted-foreground mt-4">Redirecting to feed...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Submit Insider Knowledge</CardTitle>
          <CardDescription>
            Share verified, actionable intelligence. Your credibility score increases when peers verify this tip.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="submit-tip-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input required placeholder="e.g. Goldman Sachs Internship Hiring" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>Placements</option>
                  <option>Internships</option>
                  <option>Scholarships</option>
                  <option>Clubs</option>
                  <option>Research</option>
                  <option>Exams</option>
                  <option>Faculty</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency</label>
                <select required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.urgency} onChange={e => setFormData({...formData, urgency: e.target.value})}>
                  <option>Normal</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                required
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="The coding club received referral forms before public release. Attend Wednesday sessions..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date (Optional)</label>
                <Input type="datetime-local" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (Comma separated)</label>
                <Input placeholder="e.g. Internship, CSE, Tech" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-md p-4 flex gap-3 text-sm text-orange-700 dark:text-orange-400">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>
                <strong>Warning:</strong> Posting misinformation will severely penalize your credibility score if reported by peers.
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-muted/20 pt-6">
          <Button variant="ghost" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" form="submit-tip-form" disabled={loading}>
            {loading ? "Submitting..." : "Submit Intelligence"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
