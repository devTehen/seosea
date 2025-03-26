"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { useEffect, useState } from "react"
import { fetchDashboardData } from "@/lib/api/dashboard"

export function Overview() {
  const [data, setData] = useState<any>({
    contentMetrics: [],
    keywordMetrics: [],
    performanceData: {
      contentGenerated: 0,
      keywordsTracked: 0,
      sitesAudited: 0,
      averageScore: 0,
    },
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Content generation and optimization metrics</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button variant="outline">Download</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.contentMetrics}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="contentScore" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="col-span-4 lg:col-span-3">
        <PerformanceMetrics data={data.performanceData} isLoading={isLoading} />
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Keyword Performance</CardTitle>
          <CardDescription>Tracking and ranking changes over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data.keywordMetrics}>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Line type="monotone" dataKey="ranking" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
          <CardDescription>Latest site audits and performance scores</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scores" className="space-y-4">
            <TabsList>
              <TabsTrigger value="scores">Scores</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
            </TabsList>
            <TabsContent value="scores">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground">Loading audit data...</p>
                  </div>
                ) : (
                  data.recentAudits?.map((audit: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full space-y-1">
                        <p className="text-sm font-medium leading-none">{audit.domain}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${audit.score}%` }}></div>
                          </div>
                          <span>{audit.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="issues">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground">Loading issue data...</p>
                  </div>
                ) : (
                  data.recentIssues?.map((issue: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full space-y-1">
                        <p className="text-sm font-medium leading-none">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {issue.domain} - {issue.severity}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Audits
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

