"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Onboarding() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "ABC Institute",
    branch: "CSE",
    year: "2nd Year"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      
      if (!res.ok) {
        throw new Error("Failed to register user")
      }
      
      const userData = await res.json()
      
      // Save to local storage to maintain session
      localStorage.setItem("user", JSON.stringify(userData))
      
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Please check backend connection.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <Card className="w-full max-w-md shadow-2xl animate-fade-in-up">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Help us personalize your intelligence feed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                required 
                placeholder="Rahul Kumar" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">College Email</label>
              <Input 
                required 
                type="email" 
                placeholder="rahul@college.edu" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">College</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
              >
                <option>ABC Institute</option>
                <option>XYZ College</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Branch</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                >
                  <option>CSE</option>
                  <option>ECE</option>
                  <option>Mechanical</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Personalizing Feed..." : "Continue to Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
