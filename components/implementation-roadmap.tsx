import { Card, CardContent } from "@/components/ui/card"

export default function ImplementationRoadmap() {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Implementation Roadmap</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-1/4 text-center font-medium">Phase 1</div>
            <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/4 text-center font-medium">Phase 2</div>
            <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/4 text-center font-medium">Phase 3</div>
            <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: "20%" }}></div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-lg mb-2">Current Focus</h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            <li>AI integration for content generation</li>
            <li>Predictive analytics pipeline</li>
            <li>Dashboard UI improvements</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

