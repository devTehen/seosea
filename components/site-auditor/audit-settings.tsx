"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function AuditSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Crawl Settings</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="max-pages" className="text-sm">
                Maximum Pages to Crawl
              </Label>
              <p className="text-xs text-muted-foreground">Limit the number of pages to crawl per audit</p>
            </div>
            <Input id="max-pages" type="number" className="w-20" defaultValue="100" min="1" max="1000" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="crawl-delay" className="text-sm">
                Crawl Delay (ms)
              </Label>
              <p className="text-xs text-muted-foreground">Time to wait between requests</p>
            </div>
            <Input id="crawl-delay" type="number" className="w-20" defaultValue="200" min="0" max="5000" step="100" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Respect robots.txt</Label>
              <p className="text-xs text-muted-foreground">Follow crawl directives in robots.txt</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Follow External Links</Label>
              <p className="text-xs text-muted-foreground">Crawl links to external domains</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Performance Settings</Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="performance-weight" className="text-sm">
                Performance Weight
              </Label>
              <span className="text-sm">30%</span>
            </div>
            <Slider id="performance-weight" defaultValue={[30]} max={100} step={5} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="seo-weight" className="text-sm">
                SEO Weight
              </Label>
              <span className="text-sm">40%</span>
            </div>
            <Slider id="seo-weight" defaultValue={[40]} max={100} step={5} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="accessibility-weight" className="text-sm">
                Accessibility Weight
              </Label>
              <span className="text-sm">15%</span>
            </div>
            <Slider id="accessibility-weight" defaultValue={[15]} max={100} step={5} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="best-practices-weight" className="text-sm">
                Best Practices Weight
              </Label>
              <span className="text-sm">15%</span>
            </div>
            <Slider id="best-practices-weight" defaultValue={[15]} max={100} step={5} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notification Settings</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Email Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive audit results via email</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Critical Issues Only</Label>
              <p className="text-xs text-muted-foreground">Only notify for critical issues</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <Button className="w-full">Save Settings</Button>
    </div>
  )
}

