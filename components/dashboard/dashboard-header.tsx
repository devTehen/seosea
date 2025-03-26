import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, User } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <Button variant="outline" size="icon" asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <User className="h-4 w-4" />
          <span className="sr-only">User</span>
        </Button>
      </div>
    </div>
  )
}

