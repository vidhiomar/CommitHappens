"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BellRing, Clock, Star } from "lucide-react"

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "urgent",
      message: "Microsoft mentorship applications close tonight.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "match",
      message: "You are eligible for AI scholarship based on your branch.",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "system",
      message: "Your credibility score increased to 92!",
      time: "1 day ago",
      read: true
    }
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Card key={n.id} className={`transition-colors ${!n.read ? 'bg-primary/5 border-primary/20' : ''}`}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className="mt-1">
                {n.type === "urgent" && <BellRing className="text-orange-500 h-5 w-5" />}
                {n.type === "match" && <Star className="text-primary h-5 w-5" />}
                {n.type === "system" && <Badge variant="verified" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">✓</Badge>}
              </div>
              <div className="flex-1 space-y-1">
                <p className={`text-sm ${!n.read ? 'font-medium' : 'text-muted-foreground'}`}>
                  {n.message}
                </p>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <Clock className="h-3 w-3" />
                  {n.time}
                </div>
              </div>
              {!n.read && (
                <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
