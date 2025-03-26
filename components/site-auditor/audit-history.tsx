"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { fetchAuditHistory } from "@/lib/api/audit"
import { Loader2 } from "lucide-react"

interface AuditRecord {
  id: string
  url: string
  date: string
  score: number
  issues: {
    critical: number
    warnings: number
    passed: number
  }
}

export function AuditHistory() {
  const [history, setHistory] = useState<AuditRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchAuditHistory()
        setHistory(data)
      } catch (error) {
        console.error("Failed to load audit history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No audit history available.</p>
        <p className="text-sm text-muted-foreground mt-1">Run your first audit to see results here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-medium">URL</th>
              <th className="text-left py-2 font-medium">Date</th>
              <th className="text-left py-2 font-medium">Score</th>
              <th className="text-left py-2 font-medium">Issues</th>
              <th className="text-right py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record) => (
              <tr key={record.id} className="border-b">
                <td className="py-2 truncate max-w-[200px]">{record.url}</td>
                <td className="py-2">{new Date(record.date).toLocaleDateString()}</td>
                <td className="py-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                      <span className="text-xs font-medium">{record.score}</span>
                    </div>
                    <div
                      className={`h-1.5 w-12 rounded-full ${
                        record.score >= 90 ? "bg-green-500" : record.score >= 70 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                </td>
                <td className="py-2">
                  <div className="flex space-x-2">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      {record.issues.critical}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {record.issues.warnings}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {record.issues.passed}
                    </span>
                  </div>
                </td>
                <td className="py-2 text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">Page 1 of 1</span>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  )
}

