"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuditResults } from "@/components/site-auditor/audit-results"
import { AuditSettings } from "@/components/site-auditor/audit-settings"
import { AuditHistory } from "@/components/site-auditor/audit-history"
import { auditWebsite } from "@/lib/api/audit"
import { Loader2 } from "lucide-react"

export function SiteAuditor() {
  const [url, setUrl] = useState("")
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditResults, setAuditResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("new")

  const handleAudit = async () => {
    if (!url) return

    setIsAuditing(true)
    try {
      const results = await auditWebsite(url)
      setAuditResults(results)
      setActiveTab("results")
    } catch (error) {
      console.error("Error auditing website:", error)
    } finally {
      setIsAuditing(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Site Auditor</CardTitle>
          <CardDescription>Analyze websites for SEO issues and performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="new" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
            <TabsList>
              <TabsTrigger value="new">New Audit</TabsTrigger>
              <TabsTrigger value="results" disabled={!auditResults}>
                Results
              </TabsTrigger>
              <TabsTrigger value="history">Audit History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website-url">Website URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="website-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                  <Button onClick={handleAudit} disabled={!url || isAuditing}>
                    {isAuditing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Auditing...
                      </>
                    ) : (
                      "Audit"
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Audit Options</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="seo" className="rounded border-gray-300" defaultChecked />
                    <label htmlFor="seo" className="text-sm">
                      SEO Analysis
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="performance" className="rounded border-gray-300" defaultChecked />
                    <label htmlFor="performance" className="text-sm">
                      Performance
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="accessibility" className="rounded border-gray-300" defaultChecked />
                    <label htmlFor="accessibility" className="text-sm">
                      Accessibility
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="best-practices" className="rounded border-gray-300" defaultChecked />
                    <label htmlFor="best-practices" className="text-sm">
                      Best Practices
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Crawl Depth</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="depth-1"
                      name="crawl-depth"
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="depth-1" className="text-sm">
                      Homepage Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="depth-2" name="crawl-depth" className="rounded border-gray-300" />
                    <label htmlFor="depth-2" className="text-sm">
                      Medium (up to 100 pages)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="depth-3" name="crawl-depth" className="rounded border-gray-300" />
                    <label htmlFor="depth-3" className="text-sm">
                      Deep (up to 500 pages)
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {auditResults && <AuditResults results={auditResults} />}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <AuditHistory />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <AuditSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="col-span-4 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Audit Rules</CardTitle>
            <CardDescription>Customize the rules used for website auditing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>SEO Rules</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rule-meta" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="rule-meta" className="text-sm">
                        Meta Tags
                      </label>
                    </div>
                    <select className="text-xs p-1 rounded border border-input">
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rule-headings" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="rule-headings" className="text-sm">
                        Heading Structure
                      </label>
                    </div>
                    <select className="text-xs p-1 rounded border border-input">
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rule-images" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="rule-images" className="text-sm">
                        Image Alt Text
                      </label>
                    </div>
                    <select className="text-xs p-1 rounded border border-input">
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rule-links" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="rule-links" className="text-sm">
                        Internal Linking
                      </label>
                    </div>
                    <select className="text-xs p-1 rounded border border-input">
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Performance Rules</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rule-lcp" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="rule-lcp" className="text-sm">
                        Largest Contentful Paint
                      </label>
                    </div>
                    <select className="text-xs p-1 rounded border border-input">
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rule-fid" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="rule-fid" className="text-sm">
                        First Input Delay
                      </label>
                    </div>
                    <select className="text-xs p-1 rounded border border-input">
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="rule-cls" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="rule-cls" className="text-sm">
                        Cumulative Layout Shift
                      </label>
                    </div>
                    <select className="text-xs p-1 rounded border border-input">
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Save Rule Configuration
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

