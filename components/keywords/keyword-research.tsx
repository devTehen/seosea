"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { researchKeywords } from "@/lib/api/keywords"
import { Loader2, Plus } from "lucide-react"

interface KeywordSuggestion {
  keyword: string
  searchVolume: number
  difficulty: number
  cpc: number
  competition: number
}

export function KeywordResearch() {
  const [seedKeyword, setSeedKeyword] = useState("")
  const [isResearching, setIsResearching] = useState(false)
  const [suggestions, setSuggestions] = useState<KeywordSuggestion[]>([])

  const handleResearch = async () => {
    if (!seedKeyword) return

    setIsResearching(true)
    try {
      const results = await researchKeywords(seedKeyword)
      setSuggestions(results)
    } catch (error) {
      console.error("Failed to research keywords:", error)
    } finally {
      setIsResearching(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="seed-keyword">Seed Keyword</Label>
        <div className="flex gap-2">
          <Input
            id="seed-keyword"
            value={seedKeyword}
            onChange={(e) => setSeedKeyword(e.target.value)}
            placeholder="Enter a seed keyword"
          />
          <Button onClick={handleResearch} disabled={!seedKeyword || isResearching}>
            {isResearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Researching...
              </>
            ) : (
              "Research"
            )}
          </Button>
        </div>
      </div>

      {suggestions.length > 0 && (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Suggestions</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            <TabsTrigger value="long-tail">Long-tail</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Keyword</th>
                    <th className="text-left py-2 font-medium">Volume</th>
                    <th className="text-left py-2 font-medium">Difficulty</th>
                    <th className="text-left py-2 font-medium">CPC</th>
                    <th className="text-left py-2 font-medium">Competition</th>
                    <th className="text-right py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestions.map((suggestion, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{suggestion.keyword}</td>
                      <td className="py-2">{suggestion.searchVolume.toLocaleString()}</td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <div
                            className={`h-1.5 w-12 rounded-full ${
                              suggestion.difficulty < 30
                                ? "bg-green-500"
                                : suggestion.difficulty < 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <span className="ml-2">{suggestion.difficulty}</span>
                        </div>
                      </td>
                      <td className="py-2">${suggestion.cpc.toFixed(2)}</td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <div
                            className={`h-1.5 w-12 rounded-full ${
                              suggestion.competition < 0.3
                                ? "bg-green-500"
                                : suggestion.competition < 0.7
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          ></div>
                          <span className="ml-2">{(suggestion.competition * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="py-2 text-right">
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Question</th>
                    <th className="text-left py-2 font-medium">Volume</th>
                    <th className="text-left py-2 font-medium">Difficulty</th>
                    <th className="text-right py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestions
                    .filter(
                      (s) =>
                        s.keyword.startsWith("how") ||
                        s.keyword.startsWith("what") ||
                        s.keyword.startsWith("why") ||
                        s.keyword.startsWith("when") ||
                        s.keyword.startsWith("where") ||
                        s.keyword.startsWith("which") ||
                        s.keyword.startsWith("who") ||
                        s.keyword.includes("?"),
                    )
                    .map((suggestion, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{suggestion.keyword}</td>
                        <td className="py-2">{suggestion.searchVolume.toLocaleString()}</td>
                        <td className="py-2">
                          <div className="flex items-center">
                            <div
                              className={`h-1.5 w-12 rounded-full ${
                                suggestion.difficulty < 30
                                  ? "bg-green-500"
                                  : suggestion.difficulty < 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            ></div>
                            <span className="ml-2">{suggestion.difficulty}</span>
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="related" className="space-y-4">
            {/* Similar table for related keywords */}
            <div className="text-center py-8 text-muted-foreground">Related keywords would be displayed here.</div>
          </TabsContent>

          <TabsContent value="long-tail" className="space-y-4">
            {/* Similar table for long-tail keywords */}
            <div className="text-center py-8 text-muted-foreground">Long-tail keywords would be displayed here.</div>
          </TabsContent>
        </Tabs>
      )}

      {!isResearching && suggestions.length === 0 && seedKeyword && (
        <div className="text-center py-8 text-muted-foreground">
          Enter a seed keyword and click "Research" to get keyword suggestions.
        </div>
      )}
    </div>
  )
}

