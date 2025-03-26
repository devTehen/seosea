"use client"

import { Card, CardContent } from "@/components/ui/card"

interface SerpFeaturesProps {
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
    knowledgePanel?: {
      title: string
      description: string
      attributes: Record<string, string>
    }
    relatedSearches?: string[]
  }
}

export function SerpFeatures({ features }: SerpFeaturesProps) {
  const featuresList = [
    { name: "Featured Snippet", present: !!features.featuredSnippet },
    { name: "People Also Ask", present: !!features.peopleAlsoAsk && features.peopleAlsoAsk.length > 0 },
    { name: "Local Pack", present: !!features.localPack },
    { name: "Image Carousel", present: !!features.imageCarousel },
    { name: "Video Results", present: !!features.videoResults },
    { name: "News Results", present: !!features.newsResults },
    { name: "Shopping Results", present: !!features.shoppingResults },
    { name: "Knowledge Panel", present: !!features.knowledgePanel },
    { name: "Related Searches", present: !!features.relatedSearches && features.relatedSearches.length > 0 },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {featuresList.map((feature) => (
          <Card key={feature.name} className={feature.present ? "border-green-500" : "border-gray-200 opacity-60"}>
            <CardContent className="p-3 text-center">
              <div
                className={`w-3 h-3 rounded-full mx-auto mb-1 ${feature.present ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <p className="text-xs font-medium">{feature.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {features.featuredSnippet && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Featured Snippet</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span>{features.featuredSnippet.type}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Content:</span>
                <p className="mt-1 text-sm">{features.featuredSnippet.content}</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Source:</span>
                <span>{features.featuredSnippet.source}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {features.peopleAlsoAsk && features.peopleAlsoAsk.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">People Also Ask</h3>
            <ul className="space-y-1">
              {features.peopleAlsoAsk.map((question, index) => (
                <li key={index} className="text-sm">
                  {question}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {features.knowledgePanel && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Knowledge Panel</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Title:</span>
                <p className="font-medium">{features.knowledgePanel.title}</p>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Description:</span>
                <p className="mt-1">{features.knowledgePanel.description}</p>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Attributes:</span>
                <div className="mt-1 space-y-1">
                  {Object.entries(features.knowledgePanel.attributes).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span>{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {features.relatedSearches && features.relatedSearches.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Related Searches</h3>
            <div className="flex flex-wrap gap-2">
              {features.relatedSearches.map((search, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded bg-muted">
                  {search}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

