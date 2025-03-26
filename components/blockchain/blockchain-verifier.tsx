"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { verifyHash } from "@/lib/api/blockchain"
import { Loader2, CheckCircle2, AlertCircle, FileText, Link, Hash } from "lucide-react"

export function BlockchainVerifier() {
  const [verificationMethod, setVerificationMethod] = useState("url")
  const [inputValue, setInputValue] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleVerify = async () => {
    if (!inputValue) return

    setIsVerifying(true)
    try {
      const result = await verifyHash({
        type: verificationMethod,
        value: inputValue,
      })

      setVerificationResult(result)
    } catch (error) {
      console.error("Error verifying hash:", error)
      setVerificationResult({
        verified: false,
        error: "Failed to verify content",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="url" className="space-y-4" onValueChange={setVerificationMethod} value={verificationMethod}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="url">
            <Link className="h-4 w-4 mr-2" />
            URL
          </TabsTrigger>
          <TabsTrigger value="file">
            <FileText className="h-4 w-4 mr-2" />
            File
          </TabsTrigger>
          <TabsTrigger value="hash">
            <Hash className="h-4 w-4 mr-2" />
            Hash
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content-url-verify">Content URL</Label>
            <Input
              id="content-url-verify"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://example.com/article"
            />
          </div>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content-file">Upload File</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop a file here, or click to select a file</p>
              <Button variant="outline" size="sm">
                Select File
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hash" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content-hash-verify">Content Hash</Label>
            <Input
              id="content-hash-verify"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0x1a2b3c..."
            />
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={handleVerify} disabled={!inputValue || isVerifying} className="w-full">
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </Button>

      {verificationResult && (
        <Card className={`mt-4 ${verificationResult.verified ? "border-green-500" : "border-red-500"}`}>
          <CardContent className="p-4">
            <div className="flex items-center">
              {verificationResult.verified ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <div>
                <h4 className="font-medium">
                  {verificationResult.verified ? "Verified on Blockchain" : "Not Verified"}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {verificationResult.verified
                    ? `Registered on ${new Date(verificationResult.timestamp).toLocaleString()}`
                    : verificationResult.error || "The content could not be verified on the blockchain."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-medium">How It Works</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Our blockchain verification system creates a unique hash of your content and stores it on a distributed
            ledger.
          </p>
          <p>
            This provides an immutable record that can be used to verify the authenticity and integrity of your content
            at any time.
          </p>
          <p>
            The verification process is fast, secure, and transparent, giving you and your audience confidence in your
            content.
          </p>
        </div>
      </div>
    </div>
  )
}

