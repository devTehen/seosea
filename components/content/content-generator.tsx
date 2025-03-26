"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { generateContent } from "@/lib/api/content"
import { Loader2 } from "lucide-react"

export function ContentGenerator() {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [contentType, setContentType] = useState("blog")
  const [toneValue, setToneValue] = useState([50])
  const [lengthValue, setLengthValue] = useState([500])
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!topic) return

    setIsGenerating(true)
    try {
      const content = await generateContent({
        topic,
        keywords: keywords.split(",").map((k) => k.trim()),
        contentType,
        tone: toneValue[0],
        length: lengthValue[0],
      })

      setGeneratedContent(content)
    } catch (error) {
      console.error("Error generating content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topic">Topic</Label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter the main topic for your content"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords (comma separated)</Label>
        <Input
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="seo, content marketing, digital strategy"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-type">Content Type</Label>
        <select
          id="content-type"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          className="w-full p-2 rounded-md border border-input bg-background"
        >
          <option value="blog">Blog Post</option>
          <option value="article">Article</option>
          <option value="product">Product Description</option>
          <option value="landing">Landing Page</option>
          <option value="social">Social Media</option>
        </select>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Tone</Label>
          <span className="text-sm text-muted-foreground">
            {toneValue[0] < 33 ? "Professional" : toneValue[0] < 66 ? "Conversational" : "Casual"}
          </span>
        </div>
        <Slider value={toneValue} onValueChange={setToneValue} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Content Length</Label>
          <span className="text-sm text-muted-foreground">{lengthValue[0]} words</span>
        </div>
        <Slider value={lengthValue} onValueChange={setLengthValue} min={100} max={2000} step={100} />
      </div>

      <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Content"
        )}
      </Button>

      {generatedContent && (
        <div className="space-y-2 mt-4">
          <Label>Generated Content</Label>
          <Textarea value={generatedContent} readOnly className="min-h-[200px] font-sans" />
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setGeneratedContent("")}>
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

