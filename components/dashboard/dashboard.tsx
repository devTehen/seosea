"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ContentStudio } from "@/components/content/content-studio"
import { SiteAuditor } from "@/components/site-auditor/site-auditor"
import { KeywordManager } from "@/components/keywords/keyword-manager"
import { SerpAnalysis } from "@/components/serp/serp-analysis"
import { BlockchainVerification } from "@/components/blockchain/blockchain-verification"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardShell>
      <DashboardHeader
        heading="NLP Engine Dashboard"
        text="Comprehensive analytics and tools for content optimization"
      />

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 md:grid-cols-7 lg:w-[800px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Studio</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="audit">Site Auditor</TabsTrigger>
          <TabsTrigger value="serp">SERP Analysis</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentStudio />
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <KeywordManager />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <SiteAuditor />
        </TabsContent>

        <TabsContent value="serp" className="space-y-4">
          <SerpAnalysis />
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <BlockchainVerification />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

