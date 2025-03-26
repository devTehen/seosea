"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { KeywordTracker } from "@/components/keywords/keyword-tracker"
import { KeywordResearch } from "@/components/keywords/keyword-research"
import { KeywordAnalytics } from "@/components/keywords/keyword-analytics"
import { KeywordCompetitors } from "@/components/keywords/keyword-competitors"

export function KeywordManager() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Keyword Manager</CardTitle>
          <CardDescription>Research, track, and analyze keywords for SEO</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="tracker" className="space-y-4">
            <TabsList>
              <TabsTrigger value="tracker">Keyword Tracker</TabsTrigger>
              <TabsTrigger value="research">Keyword Research</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
            </TabsList>

            <TabsContent value="tracker" className="space-y-4">
              <KeywordTracker />
            </TabsContent>

            <TabsContent value="research" className="space-y-4">
              <KeywordResearch />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <KeywordAnalytics />
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              <KeywordCompetitors />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="col-span-4 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Keyword Insights</CardTitle>
            <CardDescription>AI-powered keyword recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Trending Keywords</h4>
                <div className="space-y-2">
                  {["content marketing", "seo strategy", "ai writing", "voice search", "local seo"].map(
                    (keyword, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{keyword}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-green-500">+{Math.floor(Math.random() * 30) + 5}%</span>
                          <Button variant="ghost" size="sm">
                            Add
                          </Button>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Keyword Opportunities</h4>
                <div className="space-y-2">
                  {[
                    { keyword: "seo tools comparison", difficulty: 35, volume: 1200 },
                    { keyword: "best content marketing strategy", difficulty: 42, volume: 2800 },
                    { keyword: "how to improve website ranking", difficulty: 28, volume: 3500 },
                    { keyword: "seo for small business", difficulty: 22, volume: 4200 },
                    { keyword: "google algorithm updates", difficulty: 48, volume: 1800 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">{item.keyword}</span>
                        <div className="flex space-x-2 text-xs text-muted-foreground">
                          <span>Difficulty: {item.difficulty}</span>
                          <span>Volume: {item.volume}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Recommendations
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

