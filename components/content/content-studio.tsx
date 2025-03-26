"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ContentEditor } from "@/components/content/content-editor"
import { ContentGenerator } from "@/components/content/content-generator"
import { ContentOptimizer } from "@/components/content/content-optimizer"
import { ContentTemplates } from "@/components/content/content-templates"

export function ContentStudio() {
  const [activeTab, setActiveTab] = useState("editor")

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Content Studio</CardTitle>
          <CardDescription>Create, edit, and optimize content for SEO</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="editor" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="generator">AI Generator</TabsTrigger>
              <TabsTrigger value="optimizer">SEO Optimizer</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              <ContentEditor />
            </TabsContent>

            <TabsContent value="generator" className="space-y-4">
              <ContentGenerator />
            </TabsContent>

            <TabsContent value="optimizer" className="space-y-4">
              <ContentOptimizer />
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <ContentTemplates />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish Content</Button>
        </CardFooter>
      </Card>

      <div className="col-span-4 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>Configure content parameters and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter content title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea id="meta-description" placeholder="Enter meta description" className="resize-none h-20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Target Keywords</Label>
              <Input id="keywords" placeholder="Enter keywords separated by commas" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-type">Content Type</Label>
              <select id="content-type" className="w-full p-2 rounded-md border border-input bg-background">
                <option value="blog">Blog Post</option>
                <option value="article">Article</option>
                <option value="product">Product Description</option>
                <option value="landing">Landing Page</option>
                <option value="social">Social Media</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Apply Settings
            </Button>
          </CardFooter>
        </Card>

        {activeTab === "optimizer" && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>SEO Analysis</CardTitle>
              <CardDescription>Real-time content optimization feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Keyword Density</Label>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Readability</Label>
                    <span className="text-sm font-medium">Needs Improvement</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Content Length</Label>
                    <span className="text-sm font-medium">Excellent</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Internal Links</Label>
                    <span className="text-sm font-medium">Poor</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Analysis
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

