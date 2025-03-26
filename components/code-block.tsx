"use client"

import { useEffect, useRef } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/github.min.css"
import "highlight.js/styles/github-dark.min.css"

interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <pre className="rounded-md overflow-hidden">
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}

