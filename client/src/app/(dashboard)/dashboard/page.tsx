"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ShieldCheck, Bookmark, ShieldAlert, MessageSquare, Info } from "lucide-react"

export default function DashboardFeed() {
  const [tips, setTips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userContext, setUserContext] = useState({ id: 0, branch: "CSE", year: "2nd Year", college: "" })
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      const u = JSON.parse(userStr)
      setUserContext(u)
      fetchTips(u)
    }
  }, [])

  const fetchTips = async (u: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tips/?college=${u.college}&branch=${u.branch}&year=${u.year}`)
      const data = await res.json()
      setTips(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (tipId: number) => {
    if (!userContext.id) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifications/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip_id: tipId, verified_by: userContext.id, status: "Verified" })
      })
      if (res.ok) {
        // Optimistic update
        setTips(tips.map(t => {
          if (t.id === tipId) {
            return { ...t, verifications: [...t.verifications, { status: "Verified" }] }
          }
          return t
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleBookmark = async (tipId: number) => {
    if (!userContext.id) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saves/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip_id: tipId, user_id: userContext.id })
      })
      alert("Opportunity saved!")
    } catch (err) {
      console.error(err)
    }
  }

  const toggleCategory = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories(["All"])
      return
    }
    
    let newSelected = selectedCategories.filter(c => c !== "All")
    if (newSelected.includes(cat)) {
      newSelected = newSelected.filter(c => c !== cat)
    } else {
      newSelected.push(cat)
    }
    
    if (newSelected.length === 0) {
      newSelected = ["All"]
    }
    setSelectedCategories(newSelected)
  }

  const filteredTips = tips.filter(tip => {
    if (selectedCategories.includes("All")) return true;
    return selectedCategories.includes(tip.category);
  });

  const getExpiresIn = (dateStr: string) => {
    if (!dateStr) return null;
    const expiry = new Date(dateStr).getTime()
    const now = new Date().getTime()
    const diff = expiry - now
    if (diff < 0) return "Expired"
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) return `⏳ Expires in ${hours} hours`
    return `⏳ Expires in ${Math.floor(hours / 24)} days`
  }

  const getContributorBadge = (score: number) => {
    if (score >= 90) return "Trusted Senior"
    if (score >= 70) return "Contributor"
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      {/* Sidebar Filters */}
      <div className="md:col-span-1 space-y-6">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle className="text-lg">Your Filter</CardTitle>
            <CardDescription>{userContext.branch} • {userContext.year}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <h4 className="text-sm font-semibold mb-3">Categories</h4>
            {["All", "Placements", "Internships", "Research", "Scholarships", "Clubs", "Exams"].map(cat => (
              <div key={cat} className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id={cat} 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="rounded border-input" 
                />
                <label htmlFor={cat} className="text-sm cursor-pointer">{cat}</label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Feed */}
      <div className="md:col-span-3 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Intelligence Feed</h2>
          <select className="text-sm border rounded-md p-1 bg-background">
            <option>Smart Ranking</option>
            <option>Recent</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12"><p className="text-muted-foreground animate-pulse">Loading intelligence network...</p></div>
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-12 border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">No opportunities found for the selected categories.</p>
          </div>
        ) : (
          filteredTips.map((tip) => {
            const verifiedCount = tip.verifications.filter((v:any) => v.status === "Verified").length
            const expiresIn = getExpiresIn(tip.expiry_date)
            const badge = getContributorBadge(tip.author.credibility_score)

            return (
              <Card key={tip.id} className="transition-all hover:shadow-md border-muted group relative overflow-hidden">
                {tip.urgency === "High" && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tip.urgency === "High" && <Badge variant="urgent">🔥 High Priority</Badge>}
                        <Badge variant="secondary">{tip.category}</Badge>
                        {expiresIn && <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">{expiresIn}</Badge>}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{tip.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => handleBookmark(tip.id)}>
                      <Bookmark className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                  
                  {/* Why am I seeing this? */}
                  <div className="bg-muted/30 p-3 rounded-md border text-xs flex items-start gap-2 text-muted-foreground">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-1">Why you're seeing this:</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {tip.target_year && <li>Relevant to {tip.target_year} students</li>}
                        <li>Verified by {verifiedCount} peers</li>
                        {tip.urgency === "High" && <li>High urgency deadline approaching</li>}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t bg-muted/20 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{tip.author.name}</span>
                      {badge && <Badge variant="outline" className="text-[10px] py-0 h-4 border-primary/20 text-primary bg-primary/5">{badge}</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Badge variant="verified" className="cursor-default">
                      <ShieldCheck className="w-3 h-3 mr-1" /> {verifiedCount} Verified
                    </Badge>
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleVerify(tip.id)}>Verify Tip</Button>
                  </div>
                </CardFooter>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
