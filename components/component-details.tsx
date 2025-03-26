"use client"

import { useEffect, useState } from "react"
import { componentData } from "@/lib/component-data"
import { Card, CardContent } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

export default function ComponentDetails() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [componentInfo, setComponentInfo] = useState<any>(null)

  useEffect(() => {
    const handleShowComponentDetails = (event: CustomEvent) => {
      const { componentName } = event.detail
      setSelectedComponent(componentName)
      setComponentInfo(componentData[componentName])
    }

    window.addEventListener("showComponentDetails", handleShowComponentDetails as EventListener)

    return () => {
      window.removeEventListener("showComponentDetails", handleShowComponentDetails as EventListener)
    }
  }, [])

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{selectedComponent || "Component Details"}</h2>

        {!selectedComponent && (
          <p className="text-muted-foreground mb-4">Click on any component in the diagram to view its details.</p>
        )}

        {selectedComponent && componentInfo && (
          <div className="component-details">
            <div className="mb-4 markdown-content">
              <div dangerouslySetInnerHTML={{ __html: componentInfo.description }} />
            </div>

            {componentInfo.code && (
              <div className="code-container mb-4">
                <h3 className="text-lg font-medium mb-2">Implementation Code</h3>
                <CodeBlock code={componentInfo.code} language={componentInfo.codeLanguage || "python"} />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

