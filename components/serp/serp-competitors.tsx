"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface SerpCompetitorsProps {
  competitors: Array<{
    domain: string
    position: number
    title: string
    url: string
    description: string
    features: string[]
    contentAnalysis: {
      wordCount: number
      headings: number
      images: number
      videos: number
      readabilityScore: number
    }
  }>
}

export function SerpCompetitors({ competitors }: SerpCompetitorsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Top Competitors</h3>

      <div className="space-y-4">
        {competitors.map((competitor) => (
          <Card key={competitor.position} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2">
                      <span className="text-xs font-medium">{competitor.position}</span>
                    </div>
                    <h4 className="font-medium text-primary">{competitor.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{competitor.url}</p>
                  <p className="text-sm">{competitor.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-2">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Words</p>
                  <p className="text-sm font-medium">{competitor.contentAnalysis.wordCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Headings</p>
                  <p className="text-sm font-medium">{competitor.contentAnalysis.headings}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Images</p>
                  <p className="text-sm font-medium">{competitor.contentAnalysis.images}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Videos</p>
                  <p className="text-sm font-medium">{competitor.contentAnalysis.videos}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Readability</p>
                  <p className="text-sm font-medium">{competitor.contentAnalysis.readabilityScore}/100</p>
                </div>
              </div>

              {competitor.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4">
                  {competitor.features.map((feature, index) => (
                    <span key={index} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Content Analysis</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Position</th>
                <th className="text-left py-2 font-medium">Domain</th>
                <th className="text-left py-2 font-medium">Word Count</th>
                <th className="text-left py-2 font-medium">Headings</th>
                <th className="text-left py-2 font-medium">Images</th>
                <th className="text-left py-2 font-medium">Videos</th>
                <th className="text-left py-2 font-medium">Readability</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor) => (
                <tr key={competitor.position} className="border-b">
                  <td className="py-2">{competitor.position}</td>
                  <td className="py-2">{competitor.domain}</td>
                  <td className="py-2">{competitor.contentAnalysis.wordCount}</td>
                  <td className="py-2">{competitor.contentAnalysis.headings}</td>
                  <td className="py-2">{competitor.contentAnalysis.images}</td>
                  <td className="py-2">{competitor.contentAnalysis.videos}</td>
                  <td className="py-2">
                    <div className="flex items-center">
                      <div
                        className={`h-1.5 w-12 rounded-full ${
                          competitor.contentAnalysis.readabilityScore >= 80
                            ? "bg-green-500"
                            : competitor.contentAnalysis.readabilityScore >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="ml-2">{competitor.contentAnalysis.readabilityScore}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

