import type { Metadata } from "next"
import Dashboard from "@/components/dashboard/dashboard"

export const metadata: Metadata = {
  title: "NLP Engine Dashboard",
  description: "Comprehensive NLP Engine with SEO optimization, computer vision, and blockchain integration",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Dashboard />
    </main>
  )
}

