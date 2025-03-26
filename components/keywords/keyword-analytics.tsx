"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Bar,
  BarChart,
} from "recharts"

const ANALYTICS_DATA = {
  rankings: [
    { date: "Jan 1", avg: 32, top10: 5, top3: 1 },
    { date: "Jan 8", avg: 28, top10: 7, top3: 2 },
    { date: "Jan 15", avg: 25, top10: 8, top3: 3 },
    { date: "Jan 22", avg: 22, top10: 10, top3: 4 },
    { date: "Jan 29", avg: 19, top10: 12, top3: 5 },
    { date: "Feb 5", avg: 18, top10: 15, top3: 6 },
    { date: "Feb 12", avg: 15, top10: 18, top3: 8 },
    { date: "Feb 19", avg: 14, top10: 20, top3: 9 },
    { date: "Feb 26", avg: 12, top10: 22, top3: 11 },
  ],
  traffic: [
    { date: "Jan 1", organic: 1200, paid: 800, direct: 400 },
    { date: "Jan 8", organic: 1350, paid: 750, direct: 450 },
    { date: "Jan 15", organic: 1500, paid: 700, direct: 500 },
    { date: "Jan 22", organic: 1800, paid: 650, direct: 550 },
    { date: "Jan 29", organic: 2100, paid: 600, direct: 600 },
    { date: "Feb 5", organic: 2400, paid: 550, direct: 650 },
    { date: "Feb 12", organic: 2700, paid: 500, direct: 700 },
    { date: "Feb 19", organic: 3000, paid: 450, direct: 750 },
    { date: "Feb 26", organic: 3300, paid: 400, direct: 800 },
  ],
  distribution: [
    { position: "1-3", count: 11 },
    { position: "4-10", count: 22 },
    { position: "11-20", count: 18 },
    { position: "21-50", count: 35 },
    { position: "51-100", count: 14 },
  ],
}

export function KeywordAnalytics() {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="rankings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="rankings" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ANALYTICS_DATA.rankings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avg" name="Avg. Position" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="top10" name="Top 10 Keywords" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="top3" name="Top 3 Keywords" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Average Position</p>
                  <h3 className="text-3xl font-bold mt-2">12</h3>
                  <p className="text-sm text-green-500 mt-1">↓ 2 positions</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Keywords in Top 10</p>
                  <h3 className="text-3xl font-bold mt-2">22</h3>
                  <p className="text-sm text-green-500 mt-1">↑ 7 keywords</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Keywords in Top 3</p>
                  <h3 className="text-3xl font-bold mt-2">11</h3>
                  <p className="text-sm text-green-500 mt-1">↑ 3 keywords</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ANALYTICS_DATA.traffic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="organic" name="Organic Traffic" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="paid" name="Paid Traffic" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="direct" name="Direct Traffic" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Organic Traffic</p>
                  <h3 className="text-3xl font-bold mt-2">3,300</h3>
                  <p className="text-sm text-green-500 mt-1">↑ 10% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <h3 className="text-3xl font-bold mt-2">3.2%</h3>
                  <p className="text-sm text-green-500 mt-1">↑ 0.5% from last month</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Revenue from Organic</p>
                  <h3 className="text-3xl font-bold mt-2">$12,450</h3>
                  <p className="text-sm text-green-500 mt-1">↑ 15% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ANALYTICS_DATA.distribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="position" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Keywords" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Keywords Tracked</p>
                  <h3 className="text-3xl font-bold mt-2">100</h3>
                  <p className="text-sm text-green-500 mt-1">↑ 15 new keywords</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Keywords with Potential</p>
                  <h3 className="text-3xl font-bold mt-2">35</h3>
                  <p className="text-sm text-muted-foreground mt-1">Positions 11-20</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

