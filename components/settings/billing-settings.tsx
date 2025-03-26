"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export function BillingSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [plan, setPlan] = useState("pro")
  const [billingCycle, setBillingCycle] = useState("monthly")

  const handleUpdatePlan = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)

    toast({
      title: "Billing plan updated",
      description: "Your billing plan has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>Manage your subscription plan and billing cycle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Select Plan</Label>
            <RadioGroup value={plan} onValueChange={setPlan} className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="basic" id="plan-basic" className="peer sr-only" />
                <Label
                  htmlFor="plan-basic"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-3 text-center">
                    <p className="text-xl font-bold">Basic</p>
                    <p className="text-sm text-muted-foreground">For individuals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">$9</p>
                    <p className="text-sm text-muted-foreground">
                      {billingCycle === "monthly" ? "per month" : "per month, billed annually"}
                    </p>
                  </div>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="pro" id="plan-pro" className="peer sr-only" />
                <Label
                  htmlFor="plan-pro"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-3 text-center">
                    <p className="text-xl font-bold">Pro</p>
                    <p className="text-sm text-muted-foreground">For small teams</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">$29</p>
                    <p className="text-sm text-muted-foreground">
                      {billingCycle === "monthly" ? "per month" : "per month, billed annually"}
                    </p>
                  </div>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="enterprise" id="plan-enterprise" className="peer sr-only" />
                <Label
                  htmlFor="plan-enterprise"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-3 text-center">
                    <p className="text-xl font-bold">Enterprise</p>
                    <p className="text-sm text-muted-foreground">For large teams</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">$99</p>
                    <p className="text-sm text-muted-foreground">
                      {billingCycle === "monthly" ? "per month" : "per month, billed annually"}
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Billing Cycle</Label>
            <RadioGroup value={billingCycle} onValueChange={setBillingCycle} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="monthly" id="cycle-monthly" className="peer sr-only" />
                <Label
                  htmlFor="cycle-monthly"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <p className="font-medium">Monthly</p>
                  <p className="text-sm text-muted-foreground">Billed monthly</p>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="annual" id="cycle-annual" className="peer sr-only" />
                <Label
                  htmlFor="cycle-annual"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="flex items-center">
                    <p className="font-medium">Annual</p>
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      Save 20%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Billed annually</p>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdatePlan} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Subscription"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods and billing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-credit-card"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <Button variant="outline">Add Payment Method</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your billing history and download invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Invoice #INV-001</p>
                  <p className="text-sm text-muted-foreground">March 1, 2023</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">$29.00</p>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Invoice #INV-002</p>
                  <p className="text-sm text-muted-foreground">April 1, 2023</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">$29.00</p>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Invoice #INV-003</p>
                  <p className="text-sm text-muted-foreground">May 1, 2023</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">$29.00</p>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

