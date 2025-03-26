"use client"

import { useEffect, useState } from "react"
import { fetchSerpHistory } from "@/lib/api/serp"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SerpHistoryRecord {
  id: string
  keyword: string
  date: string
  device: string
  location: string
  features: string[]
}

export function SerpHistory() {
  const [history, setHistory] = useState<SerpHistoryRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchSerpHistory()
        setHistory(data)
        if (data.length > 0) {
          setSelectedKeyword(data[0].keyword)
        }
      } catch (error) {
        console.error("Failed to load SERP history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [])

  // Generate some dummy ranking data for the selected keyword
  const getRankingData = (keyword: string) => {
    const dates = ["Jan 1", "Jan 8", "Jan 15", "Jan 22", "Jan 29", "Feb 5", "Feb 12", "Feb 19", "Feb 26"]

    // Generate a somewhat realistic ranking trend (generally improving)
    let position = Math.floor(Math.random() * 20) + 10 // Start between 10-30

    return dates.map((date) => {
      // Random change in position, with a bias towards improvement
      const change = Math.floor(Math.random() * 5) - 1
      position = Math.max(1, position + change)

      return {
        date,
        position,
      }
    })
  }

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
        <p className="text-muted-foreground">No SERP history available.</p>
        <p className="text-sm text-muted-foreground mt-1">Run a SERP analysis to see historical data here.</p>
      </div>
    )
  }

  const rankingData = selectedKeyword ? getRankingData(selectedKeyword) : []

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Keywords History</h3>
            <div className="space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`p-2 rounded-md cursor-pointer ${
                    selectedKeyword === item.keyword ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedKeyword(item.keyword)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.keyword}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.location} • {item.device}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">
              {selectedKeyword ? `Ranking Trend: ${selectedKeyword}` : "Select a keyword"}
            </h3>
            {selectedKeyword ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rankingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis reversed domain={[1, "dataMax"]} />
                    <Tooltip
                      formatter={(value) => [`Position: ${value}`, "Ranking"]}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line type="monotone" dataKey="position" stroke="#8884d8" strokeWidth={2} name="Position" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-muted-foreground">Select a keyword to view ranking trends</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="outline">Export History</Button>
      </div>
    </div>
  )
}

