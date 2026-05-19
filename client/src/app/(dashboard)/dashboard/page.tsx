"use client"

import { Suspense } from "react"
import DashboardFeedInner from "./DashboardFeedInner"

export default function DashboardFeed() {
  return (
    <Suspense fallback={
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="glass-card rounded-2xl p-6 animate-pulse space-y-3">
            <div className="flex gap-2"><div className="h-5 w-16 bg-muted rounded-full" /><div className="h-5 w-24 bg-muted rounded-full" /></div>
            <div className="h-6 w-3/4 bg-muted rounded-lg" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        ))}
      </div>
    }>
      <DashboardFeedInner />
    </Suspense>
  )
}
