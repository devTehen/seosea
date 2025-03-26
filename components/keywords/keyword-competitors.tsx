"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { fetchCompetitors } from "@/lib/api/keywords"
import { Loader2, Search } from "lucide-react"

interface Competitor {
  domain: string
  overlapCount: number
  overlapKeywords: string[]
  avgPosition: number
  uniqueKeywords: number
  commonKeywords: {
    keyword: string
    yourPosition: number
    theirPosition: number
  }[]
}

export function KeywordCompetitors() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadCompetitors = async () => {
      try {
        const data = await fetchCompetitors()
        setCompetitors(data)
        if (data.length > 0) {
          setSelectedCompetitor(data[0])
        }
      } catch (error) {
        console.error("Failed to load competitors:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCompetitors()
  }, [])

  const filteredCompetitors = competitors.filter((competitor) =>
    competitor.domain.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search competitors..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-4">
            <Label>Competitors</Label>
            <div className="space-y-2">
              {filteredCompetitors.map((competitor) => (
                <Card
                  key={competitor.domain}
                  className={`cursor-pointer ${selectedCompetitor?.domain === competitor.domain ? "border-primary" : ""}`}
                  onClick={() => setSelectedCompetitor(competitor)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{competitor.domain}</h4>
                        <p className="text-xs text-muted-foreground">{competitor.overlapCount} overlapping keywords</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">{competitor.avgPosition}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredCompetitors.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No competitors found matching your search criteria.
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            {selectedCompetitor ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{selectedCompetitor.domain}</h3>
                  <Button variant="outline" size="sm">
                    Add as Competitor
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Overlapping Keywords</p>
                      <h4 className="text-2xl font-bold mt-1">{selectedCompetitor.overlapCount}</h4>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Avg. Position</p>
                      <h4 className="text-2xl font-bold mt-1">{selectedCompetitor.avgPosition}</h4>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Unique Keywords</p>
                      <h4 className="text-2xl font-bold mt-1">{selectedCompetitor.uniqueKeywords}</h4>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Common Keywords</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Keyword</th>
                            <th className="text-left py-2 font-medium">Your Position</th>
                            <th className="text-left py-2 font-medium">Their Position</th>
                            <th className="text-left py-2 font-medium">Difference</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCompetitor.commonKeywords.map((keyword, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{keyword.keyword}</td>
                              <td className="py-2">{keyword.yourPosition}</td>
                              <td className="py-2">{keyword.theirPosition}</td>
                              <td className="py-2">
                                {keyword.yourPosition < keyword.theirPosition ? (
                                  <span className="text-green-500">
                                    +{keyword.theirPosition - keyword.yourPosition}
                                  </span>
                                ) : keyword.yourPosition > keyword.theirPosition ? (
                                  <span className="text-red-500">-{keyword.yourPosition - keyword.theirPosition}</span>
                                ) : (
                                  <span className="text-gray-500">0</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Select a competitor to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

