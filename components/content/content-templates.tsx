"use client"

import { useState } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const TEMPLATES = [
  {
    id: "blog-post",
    title: "Blog Post",
    description: "Standard blog post with introduction, body, and conclusion",
    category: "blog",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "product-description",
    title: "Product Description",
    description: "Compelling product description with features and benefits",
    category: "ecommerce",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "landing-page",
    title: "Landing Page",
    description: "High-converting landing page with call-to-action",
    category: "marketing",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "seo-article",
    title: "SEO Article",
    description: "Long-form article optimized for search engines",
    category: "seo",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "social-media",
    title: "Social Media Post",
    description: "Engaging social media content with hashtags",
    category: "social",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "email-newsletter",
    title: "Email Newsletter",
    description: "Email template with sections for news and promotions",
    category: "email",
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
]

export function ContentTemplates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="p-2 rounded-md border border-input bg-background"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="blog">Blog</option>
          <option value="ecommerce">E-commerce</option>
          <option value="marketing">Marketing</option>
          <option value="seo">SEO</option>
          <option value="social">Social Media</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <img
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.title}
              className="w-full h-32 object-cover"
            />
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full">
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-2 py-8 text-center text-muted-foreground">
            No templates found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}

