"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { optimizeContent } from "@/lib/api/content"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ContentOptimizer() {
  const [content, setContent] = useState("")
  const [targetKeywords, setTargetKeywords] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)

  const handleOptimize = async () => {
    if (!content) return

    setIsOptimizing(true)
    try {
      const results = await optimizeContent({
        content,
        keywords: targetKeywords.split(",").map((k) => k.trim()),
      })

      setOptimizationResults(results)
    } catch (error) {
      console.error("Error optimizing content:", error)
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-to-optimize">Content to Optimize</Label>
        <Textarea
          id="content-to-optimize"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your content here to optimize it for SEO"
          className="min-h-[200px] font-sans"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="target-keywords">Target Keywords (comma separated)</Label>
        <Input
          id="target-keywords"
          value={targetKeywords}
          onChange={(e) => setTargetKeywords(e.target.value)}
          placeholder="seo, content marketing, digital strategy"
        />
      </div>

      <Button onClick={handleOptimize} disabled={!content || isOptimizing} className="w-full">
        {isOptimizing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Optimizing...
          </>
        ) : (
          "Optimize Content"
        )}
      </Button>

      {optimizationResults && (
        <div className="space-y-4 mt-4">
          <Alert variant={optimizationResults.score > 70 ? "default" : "destructive"}>
            {optimizationResults.score > 70 ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>SEO Score: {optimizationResults.score}/100</AlertTitle>
            <AlertDescription>
              {optimizationResults.score > 70
                ? "Your content is well-optimized for SEO!"
                : "Your content needs improvement for better SEO performance."}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Optimization Suggestions</Label>
            <ul className="space-y-2 list-disc pl-5">
              {optimizationResults.suggestions.map((suggestion: string, index: number) => (
                <li key={index} className="text-sm">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <Label>Optimized Content</Label>
            <Textarea
              value={optimizationResults.optimizedContent}
              className="min-h-[200px] font-sans"
              onChange={(e) => {
                setOptimizationResults({
                  ...optimizationResults,
                  optimizedContent: e.target.value,
                })
              }}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOptimizationResults(null)}>
              Discard
            </Button>
            <Button onClick={() => setContent(optimizationResults.optimizedContent)}>Apply Changes</Button>
          </div>
        </div>
      )}
    </div>
  )
}

