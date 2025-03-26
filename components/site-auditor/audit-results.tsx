"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

interface AuditResultsProps {
  results: {
    score: number
    issues: {
      critical: Array<{
        id: string
        title: string
        description: string
        impact: string
        recommendation: string
      }>
      warnings: Array<{
        id: string
        title: string
        description: string
        impact: string
        recommendation: string
      }>
      passed: Array<{
        id: string
        title: string
        description: string
      }>
    }
    performance: {
      score: number
      metrics: {
        lcp: number
        fid: number
        cls: number
      }
    }
    seo: {
      score: number
      metrics: {
        title: boolean
        meta: boolean
        headings: boolean
        images: boolean
        links: boolean
      }
    }
  }
}

export function AuditResults({ results }: AuditResultsProps) {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null)

  const toggleIssue = (id: string) => {
    setExpandedIssue(expandedIssue === id ? null : id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Audit Score: {results.score}%</h3>
          <p className="text-sm text-muted-foreground">
            {results.score >= 90
              ? "Excellent! Your site is well-optimized."
              : results.score >= 70
                ? "Good, but there's room for improvement."
                : "Your site needs significant improvements."}
          </p>
        </div>
        <div className="h-24 w-24 rounded-full border-8 border-primary flex items-center justify-center">
          <span className="text-2xl font-bold">{results.score}</span>
        </div>
      </div>

      <Tabs defaultValue="issues" className="space-y-4">
        <TabsList>
          <TabsTrigger value="issues">
            Issues ({results.issues.critical.length + results.issues.warnings.length})
          </TabsTrigger>
          <TabsTrigger value="passed">Passed ({results.issues.passed.length})</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4">
          {results.issues.critical.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Critical Issues ({results.issues.critical.length})
              </h4>
              <div className="space-y-2">
                {results.issues.critical.map((issue) => (
                  <Card key={issue.id} className="border-red-200">
                    <CardContent className="p-4">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleIssue(issue.id)}
                      >
                        <h5 className="font-medium">{issue.title}</h5>
                        <Button variant="ghost" size="sm">
                          {expandedIssue === issue.id ? "Hide" : "Show"}
                        </Button>
                      </div>

                      {expandedIssue === issue.id && (
                        <div className="mt-2 space-y-2 text-sm">
                          <p>{issue.description}</p>
                          <div className="pt-2">
                            <p className="font-medium">Impact:</p>
                            <p className="text-muted-foreground">{issue.impact}</p>
                          </div>
                          <div className="pt-2">
                            <p className="font-medium">Recommendation:</p>
                            <p className="text-muted-foreground">{issue.recommendation}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {results.issues.warnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-500 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Warnings ({results.issues.warnings.length})
              </h4>
              <div className="space-y-2">
                {results.issues.warnings.map((issue) => (
                  <Card key={issue.id} className="border-yellow-200">
                    <CardContent className="p-4">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleIssue(issue.id)}
                      >
                        <h5 className="font-medium">{issue.title}</h5>
                        <Button variant="ghost" size="sm">
                          {expandedIssue === issue.id ? "Hide" : "Show"}
                        </Button>
                      </div>

                      {expandedIssue === issue.id && (
                        <div className="mt-2 space-y-2 text-sm">
                          <p>{issue.description}</p>
                          <div className="pt-2">
                            <p className="font-medium">Impact:</p>
                            <p className="text-muted-foreground">{issue.impact}</p>
                          </div>
                          <div className="pt-2">
                            <p className="font-medium">Recommendation:</p>
                            <p className="text-muted-foreground">{issue.recommendation}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {results.issues.critical.length === 0 && results.issues.warnings.length === 0 && (
            <div className="py-8 text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
              <h4 className="text-xl font-medium">No issues found!</h4>
              <p className="text-muted-foreground">Your website passed all the audit checks.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="passed" className="space-y-4">
          {results.issues.passed.length > 0 ? (
            <div className="space-y-2">
              <h4 className="font-medium text-green-500 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Passed Checks ({results.issues.passed.length})
              </h4>
              <div className="space-y-2">
                {results.issues.passed.map((check) => (
                  <Card key={check.id} className="border-green-200">
                    <CardContent className="p-4">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleIssue(check.id)}
                      >
                        <h5 className="font-medium">{check.title}</h5>
                        <Button variant="ghost" size="sm">
                          {expandedIssue === check.id ? "Hide" : "Show"}
                        </Button>
                      </div>

                      {expandedIssue === check.id && (
                        <div className="mt-2 space-y-2 text-sm">
                          <p>{check.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
              <h4 className="text-xl font-medium">No passed checks</h4>
              <p className="text-muted-foreground">Your website didn't pass any audit checks.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Performance Score</h4>
              <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-sm font-bold">{results.performance.score}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Largest Contentful Paint (LCP)</span>
                  <span
                    className={`text-sm font-medium ${results.performance.metrics.lcp < 2.5 ? "text-green-500" : results.performance.metrics.lcp < 4 ? "text-yellow-500" : "text-red-500"}`}
                  >
                    {results.performance.metrics.lcp.toFixed(2)}s
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${results.performance.metrics.lcp < 2.5 ? "bg-green-500" : results.performance.metrics.lcp < 4 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${Math.min(100, (1 - results.performance.metrics.lcp / 8) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">First Input Delay (FID)</span>
                  <span
                    className={`text-sm font-medium ${results.performance.metrics.fid < 100 ? "text-green-500" : results.performance.metrics.fid < 300 ? "text-yellow-500" : "text-red-500"}`}
                  >
                    {results.performance.metrics.fid}ms
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${results.performance.metrics.fid < 100 ? "bg-green-500" : results.performance.metrics.fid < 300 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${Math.min(100, (1 - results.performance.metrics.fid / 500) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Cumulative Layout Shift (CLS)</span>
                  <span
                    className={`text-sm font-medium ${results.performance.metrics.cls < 0.1 ? "text-green-500" : results.performance.metrics.cls < 0.25 ? "text-yellow-500" : "text-red-500"}`}
                  >
                    {results.performance.metrics.cls.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${results.performance.metrics.cls < 0.1 ? "bg-green-500" : results.performance.metrics.cls < 0.25 ? "bg-yellow-500" : "bg-red-500"}`}
                    style={{ width: `${Math.min(100, (1 - results.performance.metrics.cls / 0.5) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">SEO Score</h4>
              <div className="h-12 w-12 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-sm font-bold">{results.seo.score}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Title Tag</span>
                <span
                  className={`text-sm font-medium ${results.seo.metrics.title ? "text-green-500" : "text-red-500"}`}
                >
                  {results.seo.metrics.title ? "Passed" : "Failed"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Meta Description</span>
                <span className={`text-sm font-medium ${results.seo.metrics.meta ? "text-green-500" : "text-red-500"}`}>
                  {results.seo.metrics.meta ? "Passed" : "Failed"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Heading Structure</span>
                <span
                  className={`text-sm font-medium ${results.seo.metrics.headings ? "text-green-500" : "text-red-500"}`}
                >
                  {results.seo.metrics.headings ? "Passed" : "Failed"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Image Alt Text</span>
                <span
                  className={`text-sm font-medium ${results.seo.metrics.images ? "text-green-500" : "text-red-500"}`}
                >
                  {results.seo.metrics.images ? "Passed" : "Failed"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Internal Linking</span>
                <span
                  className={`text-sm font-medium ${results.seo.metrics.links ? "text-green-500" : "text-red-500"}`}
                >
                  {results.seo.metrics.links ? "Passed" : "Failed"}
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

