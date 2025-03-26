"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface SerpResultsProps {
  results: {
    keyword: string
    location: string
    device: string
    date: string
    organicResults: Array<{
      position: number
      title: string
      url: string
      description: string
      features: string[]
    }>
    features: {
      featuredSnippet?: {
        type: string
        content: string
        source: string
      }
      peopleAlsoAsk?: string[]
      localPack?: boolean
      imageCarousel?: boolean
      videoResults?: boolean
      newsResults?: boolean
      shoppingResults?: boolean
    }
  }
}

export function SerpResults({ results }: SerpResultsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-medium">{results.keyword}</h3>
          <p className="text-sm text-muted-foreground">
            {results.location} • {results.device} • {new Date(results.date).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View in Google
        </Button>
      </div>

      {results.features.featuredSnippet && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-primary font-medium mb-1">Featured Snippet</p>
                <p className="text-sm">{results.features.featuredSnippet.content}</p>
                <p className="text-xs text-muted-foreground mt-2">Source: {results.features.featuredSnippet.source}</p>
              </div>
              <div className="text-xs px-2 py-1 bg-primary/10 rounded">{results.features.featuredSnippet.type}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {results.organicResults.map((result) => (
          <Card key={result.position} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2">
                      <span className="text-xs font-medium">{result.position}</span>
                    </div>
                    <h4 className="font-medium text-primary">{result.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{result.url}</p>
                  <p className="text-sm">{result.description}</p>

                  {result.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.features.map((feature, index) => (
                        <span key={index} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="ml-2">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

