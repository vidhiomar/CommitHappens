"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldCheck, LogOut, Award, FileText, Bookmark, Clock } from "lucide-react"

export default function Profile() {
  const [user, setUser] = useState({ id: 0, name: "", email: "", branch: "CSE", year: "2nd Year", credibility_score: 50 })
  const [saved, setSaved] = useState<any[]>([])

  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      const parsed = JSON.parse(userStr)
      setUser(parsed)
      if(parsed.id) fetchSaves(parsed.id)
    }
  }, [])

  const fetchSaves = async (userId: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saves/${userId}`)
      if (res.ok) {
        const data = await res.json()
        setSaved(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getContributorBadge = (score: number) => {
    if (score >= 90) return "Trusted Senior"
    if (score >= 70) return "Contributor"
    return "Member"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card rounded-xl p-8 border shadow-sm">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background shadow-md">
            <span className="text-4xl font-bold text-primary">{user.name ? user.name.charAt(0) : "U"}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline">{user.branch}</Badge>
              <Badge variant="outline">{user.year}</Badge>
              <Badge variant="verified" className="ml-2">
                <Award className="w-3 h-3 mr-1" /> {getContributorBadge(user.credibility_score)}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right bg-muted/30 p-4 rounded-xl border">
          <p className="text-sm font-medium text-muted-foreground mb-1">Credibility Score</p>
          <div className="text-4xl font-black text-primary flex items-center justify-end gap-2">
            {user.credibility_score} <ShieldCheck className="text-green-500 h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Stats */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Your Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4" /> Tips Shared</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Verified Tips</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2"><Bookmark className="h-4 w-4" /> Saved Opportunities</span>
              <span className="font-bold">{saved.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* Saved Items */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Saved Opportunities</CardTitle>
            <CardDescription>Items you have bookmarked for later.</CardDescription>
          </CardHeader>
          <CardContent>
            {saved.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No saved opportunities yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {saved.map((s) => (
                  <div key={s.id} className="p-4 border rounded-lg bg-muted/10 flex justify-between items-start transition-colors hover:bg-muted/20">
                    <div>
                      <div className="flex gap-2 items-center mb-1">
                        <h4 className="font-semibold text-primary">{s.tip.title}</h4>
                        {s.tip.urgency === "High" && <Badge variant="urgent" className="text-[10px] py-0 px-1">Urgent</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {s.tip.expiry_date ? new Date(s.tip.expiry_date).toLocaleDateString() : "No Expiry"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-8 border-t">
        <Button variant="destructive" className="w-full max-w-sm" onClick={() => {
          localStorage.removeItem("user")
          window.location.href = "/"
        }}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
