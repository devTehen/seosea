"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BlockchainTransactions } from "@/components/blockchain/blockchain-transactions"
import { BlockchainVerifier } from "@/components/blockchain/blockchain-verifier"
import { BlockchainPerformance } from "@/components/blockchain/blockchain-performance"
import { verifyContent, registerContent } from "@/lib/api/blockchain"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export function BlockchainVerification() {
  const [activeTab, setActiveTab] = useState("verify")
  const [contentUrl, setContentUrl] = useState("")
  const [contentHash, setContentHash] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationResult, setRegistrationResult] = useState<any>(null)

  const handleVerify = async () => {
    if (!contentUrl && !contentHash) return

    setIsVerifying(true)
    try {
      const result = await verifyContent({
        url: contentUrl,
        hash: contentHash,
      })

      setVerificationResult(result)
    } catch (error) {
      console.error("Error verifying content:", error)
      setVerificationResult({
        verified: false,
        error: "Failed to verify content",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleRegister = async () => {
    if (!contentUrl) return

    setIsRegistering(true)
    try {
      const result = await registerContent({
        url: contentUrl,
      })

      setRegistrationResult(result)
      setContentHash(result.contentHash)
    } catch (error) {
      console.error("Error registering content:", error)
      setRegistrationResult({
        success: false,
        error: "Failed to register content",
      })
    } finally {
      setIsRegistering(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Blockchain Verification</CardTitle>
          <CardDescription>Verify content integrity and performance using blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="verify" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
            <TabsList>
              <TabsTrigger value="verify">Verify Content</TabsTrigger>
              <TabsTrigger value="register">Register Content</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="verify" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content-url">Content URL</Label>
                <Input
                  id="content-url"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  placeholder="https://example.com/article"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-hash">Content Hash (optional)</Label>
                <Input
                  id="content-hash"
                  value={contentHash}
                  onChange={(e) => setContentHash(e.target.value)}
                  placeholder="0x1a2b3c..."
                />
              </div>

              <Button onClick={handleVerify} disabled={(!contentUrl && !contentHash) || isVerifying} className="w-full">
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Content"
                )}
              </Button>

              {verificationResult && (
                <Card className={`mt-4 ${verificationResult.verified ? "border-green-500" : "border-red-500"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      {verificationResult.verified ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium">
                          {verificationResult.verified ? "Content Verified" : "Verification Failed"}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {verificationResult.verified
                            ? "The content has been verified on the blockchain."
                            : verificationResult.error || "The content could not be verified."}
                        </p>

                        {verificationResult.verified && (
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Registered:</span>
                              <span>{new Date(verificationResult.timestamp).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Transaction ID:</span>
                              <span className="truncate max-w-[200px]">{verificationResult.transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Block:</span>
                              <span>{verificationResult.blockNumber}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-url">Content URL</Label>
                <Input
                  id="register-url"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  placeholder="https://example.com/article"
                />
              </div>

              <Button onClick={handleRegister} disabled={!contentUrl || isRegistering} className="w-full">
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register Content"
                )}
              </Button>

              {registrationResult && (
                <Card className={`mt-4 ${registrationResult.success ? "border-green-500" : "border-red-500"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      {registrationResult.success ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-medium">
                          {registrationResult.success ? "Content Registered" : "Registration Failed"}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {registrationResult.success
                            ? "The content has been successfully registered on the blockchain."
                            : registrationResult.error || "The content could not be registered."}
                        </p>

                        {registrationResult.success && (
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Content Hash:</span>
                              <span className="truncate max-w-[200px]">{registrationResult.contentHash}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Transaction ID:</span>
                              <span className="truncate max-w-[200px]">{registrationResult.transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Timestamp:</span>
                              <span>{new Date(registrationResult.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <BlockchainTransactions />
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <BlockchainPerformance />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="col-span-4 lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Verifier</CardTitle>
            <CardDescription>Verify content integrity using our blockchain network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BlockchainVerifier />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Blockchain Explorer
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

