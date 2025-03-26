"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: {
      marketing: true,
      social: true,
      security: true,
      updates: false,
    },
    push: {
      marketing: false,
      social: true,
      security: true,
      updates: true,
    },
    sms: {
      marketing: false,
      social: false,
      security: true,
      updates: false,
    },
  })

  const handleToggle = (channel: string, type: string, value: boolean) => {
    setNotifications({
      ...notifications,
      [channel]: {
        ...notifications[channel as keyof typeof notifications],
        [type]: value,
      },
    })
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)

    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure which email notifications you receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-marketing">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">Receive emails about new features, products, and offers.</p>
            </div>
            <Switch
              id="email-marketing"
              checked={notifications.email.marketing}
              onCheckedChange={(value) => handleToggle("email", "marketing", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-social">Social notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails for mentions, comments, and other social interactions.
              </p>
            </div>
            <Switch
              id="email-social"
              checked={notifications.email.social}
              onCheckedChange={(value) => handleToggle("email", "social", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-security">Security alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about security updates and account activity.
              </p>
            </div>
            <Switch
              id="email-security"
              checked={notifications.email.security}
              onCheckedChange={(value) => handleToggle("email", "security", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-updates">Product updates</Label>
              <p className="text-sm text-muted-foreground">Receive emails about platform updates and new features.</p>
            </div>
            <Switch
              id="email-updates"
              checked={notifications.email.updates}
              onCheckedChange={(value) => handleToggle("email", "updates", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Configure which push notifications you receive on your devices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-marketing">Marketing notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications about new features and offers.</p>
            </div>
            <Switch
              id="push-marketing"
              checked={notifications.push.marketing}
              onCheckedChange={(value) => handleToggle("push", "marketing", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-social">Social notifications</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications for mentions and comments.</p>
            </div>
            <Switch
              id="push-social"
              checked={notifications.push.social}
              onCheckedChange={(value) => handleToggle("push", "social", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-security">Security alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications about security and account activity.
              </p>
            </div>
            <Switch
              id="push-security"
              checked={notifications.push.security}
              onCheckedChange={(value) => handleToggle("push", "security", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-updates">Product updates</Label>
              <p className="text-sm text-muted-foreground">Receive push notifications about platform updates.</p>
            </div>
            <Switch
              id="push-updates"
              checked={notifications.push.updates}
              onCheckedChange={(value) => handleToggle("push", "updates", value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
          <CardDescription>Configure which SMS notifications you receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-marketing">Marketing messages</Label>
              <p className="text-sm text-muted-foreground">Receive SMS about new features and offers.</p>
            </div>
            <Switch
              id="sms-marketing"
              checked={notifications.sms.marketing}
              onCheckedChange={(value) => handleToggle("sms", "marketing", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-social">Social notifications</Label>
              <p className="text-sm text-muted-foreground">Receive SMS for important social interactions.</p>
            </div>
            <Switch
              id="sms-social"
              checked={notifications.sms.social}
              onCheckedChange={(value) => handleToggle("sms", "social", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-security">Security alerts</Label>
              <p className="text-sm text-muted-foreground">Receive SMS about security and account activity.</p>
            </div>
            <Switch
              id="sms-security"
              checked={notifications.sms.security}
              onCheckedChange={(value) => handleToggle("sms", "security", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-updates">Product updates</Label>
              <p className="text-sm text-muted-foreground">Receive SMS about important platform updates.</p>
            </div>
            <Switch
              id="sms-updates"
              checked={notifications.sms.updates}
              onCheckedChange={(value) => handleToggle("sms", "updates", value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Notification Settings"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

