"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SerpResults } from "@/components/serp/serp-results"
import { SerpFeatures } from "@/components/serp/serp-features"
import { SerpCompetitors } from "@/components/serp/serp-competitors"
import { SerpHistory } from "@/components/serp/serp-history"
import { analyzeSERP } from "@/lib/api/serp"
import { Loader2 } from "lucide-react"

export function SerpAnalysis() {
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("United States")
  const [device, setDevice] = useState("desktop")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("search")

  const handleAnalyze = async () => {
    if (!keyword) return

    setIsAnalyzing(true)
    try {
      const results = await analyzeSERP({
        keyword,
        location,
        device,
      })

      setAnalysisResults(results)
      setActiveTab("results")
    } catch (error) {
      console.error("Error analyzing SERP:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>SERP Analysis</CardTitle>
          <CardDescription>Analyze search engine results pages for insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="search" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
            <TabsList>
              <TabsTrigger value="search">New Search</TabsTrigger>
              <TabsTrigger value="results" disabled={!analysisResults}>
                Results
              </TabsTrigger>
              <TabsTrigger value="features" disabled={!analysisResults}>
                SERP Features
              </TabsTrigger>
              <TabsTrigger value="competitors" disabled={!analysisResults}>
                Competitors
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter a keyword to analyze"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="device">Device</Label>
                  <select
                    id="device"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="w-full p-2 rounded-md border border-input bg-background"
                  >
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                  </select>
                </div>
              </div>

              <Button onClick={handleAnalyze} disabled={!keyword || isAnalyzing} className="w-full">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze SERP"
                )}
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {analysisResults && <SerpResults results={analysisResults} />}
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              {analysisResults && <SerpFeatures features={analysisResults.features} />}
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              {analysisResults && <SerpCompetitors competitors={analysisResults.competitors} />}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <SerpHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="col-span-4 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Computer Vision Analysis</CardTitle>
            <CardDescription>Visual analysis of SERP elements and layout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResults ? (
              <div className="space-y-4">
                <div className="relative border rounded-md overflow-hidden">
                  <img
                    src={analysisResults.screenshot || "/placeholder.svg?height=600&width=400"}
                    alt="SERP Screenshot"
                    className="w-full"
                  />

                  {/* Overlay highlighting detected elements */}
                  {analysisResults.visualElements?.map((element: any, index: number) => (
                    <div
                      key={index}
                      className="absolute border-2 border-primary"
                      style={{
                        top: `${element.boundingBox.top}%`,
                        left: `${element.boundingBox.left}%`,
                        width: `${element.boundingBox.width}%`,
                        height: `${element.boundingBox.height}%`,
                      }}
                    >
                      <div className="absolute top-0 left-0 bg-primary text-white text-xs px-1">{element.type}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Detected Elements</h4>
                  <div className="space-y-2">
                    {analysisResults.visualElements?.map((element: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{element.type}</span>
                        <span className="text-muted-foreground">Confidence: {element.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Run a SERP analysis to see visual insights</p>
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Computer Vision Placeholder"
                  className="mx-auto mt-4 opacity-50"
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={!analysisResults}>
              Download Full Analysis
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

