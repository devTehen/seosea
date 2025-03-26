"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchPerformanceMetrics } from "@/lib/api/blockchain"
import { Loader2 } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

interface PerformanceMetrics {
  transactionCount: number
  averageConfirmationTime: number
  successRate: number
  dailyTransactions: Array<{
    date: string
    count: number
    confirmationTime: number
  }>
}

export function BlockchainPerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchPerformanceMetrics()
        setMetrics(data)
      } catch (error) {
        console.error("Failed to load performance metrics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMetrics()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No performance metrics available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <h4 className="text-2xl font-bold mt-1">{metrics.transactionCount.toLocaleString()}</h4>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Avg. Confirmation Time</p>
            <h4 className="text-2xl font-bold mt-1">{metrics.averageConfirmationTime.toFixed(2)}s</h4>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <h4 className="text-2xl font-bold mt-1">{metrics.successRate.toFixed(1)}%</h4>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium mb-4">Transaction Volume</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.dailyTransactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" name="Transactions" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium mb-4">Confirmation Time</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.dailyTransactions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="confirmationTime"
                  name="Confirmation Time (s)"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Performance Insights</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Our blockchain network is currently operating at optimal performance with an average confirmation time of{" "}
            {metrics.averageConfirmationTime.toFixed(2)} seconds.
          </p>
          <p>
            The success rate of {metrics.successRate.toFixed(1)}% indicates high reliability for content verification
            and registration.
          </p>
          <p>
            Transaction volume has{" "}
            {metrics.dailyTransactions[0].count < metrics.dailyTransactions[metrics.dailyTransactions.length - 1].count
              ? "increased"
              : "decreased"}{" "}
            over the past period, showing{" "}
            {metrics.dailyTransactions[0].count < metrics.dailyTransactions[metrics.dailyTransactions.length - 1].count
              ? "growing"
              : "changing"}{" "}
            usage patterns.
          </p>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        View Detailed Performance Report
      </Button>
    </div>
  )
}

