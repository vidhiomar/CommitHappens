import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "InsiderInfo — Peer-Verified College Intelligence Network",
  description: "Access verified insider knowledge — placement tips, scholarships, research opportunities — tailored to your branch and year. Stop missing out on crucial opportunities.",
  keywords: "college tips, placement intelligence, scholarship alerts, peer verified, student network",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
