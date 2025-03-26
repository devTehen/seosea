"use client"

import { useState } from "react"

export default function ArchitectureDiagram() {
  const [filter, setFilter] = useState<string>("all")

  const filterComponents = (newFilter: string) => {
    setFilter(newFilter)
  }

  const getNodeOpacity = (category: string) => {
    return filter === "all" || filter === category ? "1" : "0.2"
  }

  const getNodePointerEvents = (category: string) => {
    return filter === "all" || filter === category ? "auto" : "none"
  }

  return (
    <div>
      <div className="w-full h-[500px] relative overflow-auto" id="architecture-diagram">
        {/* SVG Architecture Diagram */}
        <svg width="1000" height="800" viewBox="0 0 1000 800" className="mx-auto">
          {/* Cloud Infrastructure */}
          <g
            className="node"
            data-category="infrastructure"
            data-name="Cloud Infrastructure"
            style={{
              opacity: getNodeOpacity("infrastructure"),
              pointerEvents: getNodePointerEvents("infrastructure") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "Cloud Infrastructure" },
                }),
              )
            }
          >
            <rect
              x="400"
              y="50"
              width="200"
              height="80"
              rx="10"
              fill="#60A5FA"
              className="dark:fill-blue-700"
              stroke="#2563EB"
              strokeWidth="2"
            />
            <text x="500" y="90" textAnchor="middle" fill="white" fontWeight="bold">
              Cloud Infrastructure
            </text>
            <text x="500" y="110" textAnchor="middle" fill="white" fontSize="12">
              AWS/GCP, Kubernetes
            </text>
          </g>

          {/* Data Pipeline */}
          <g
            className="node"
            data-category="infrastructure"
            data-name="Data Pipeline"
            style={{
              opacity: getNodeOpacity("infrastructure"),
              pointerEvents: getNodePointerEvents("infrastructure") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "Data Pipeline" },
                }),
              )
            }
          >
            <rect
              x="150"
              y="200"
              width="180"
              height="80"
              rx="10"
              fill="#60A5FA"
              className="dark:fill-blue-700"
              stroke="#2563EB"
              strokeWidth="2"
            />
            <text x="240" y="240" textAnchor="middle" fill="white" fontWeight="bold">
              Data Pipeline
            </text>
            <text x="240" y="260" textAnchor="middle" fill="white" fontSize="12">
              Kafka, BigQuery, Airflow
            </text>
          </g>

          {/* API Layer */}
          <g
            className="node"
            data-category="infrastructure"
            data-name="API Layer"
            style={{
              opacity: getNodeOpacity("infrastructure"),
              pointerEvents: getNodePointerEvents("infrastructure") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "API Layer" },
                }),
              )
            }
          >
            <rect
              x="670"
              y="200"
              width="180"
              height="80"
              rx="10"
              fill="#60A5FA"
              className="dark:fill-blue-700"
              stroke="#2563EB"
              strokeWidth="2"
            />
            <text x="760" y="240" textAnchor="middle" fill="white" fontWeight="bold">
              API Layer
            </text>
            <text x="760" y="260" textAnchor="middle" fill="white" fontSize="12">
              RESTful, OAuth 2.0
            </text>
          </g>

          {/* NLP Engine */}
          <g
            className="node"
            data-category="ai"
            data-name="NLP Engine"
            style={{
              opacity: getNodeOpacity("ai"),
              pointerEvents: getNodePointerEvents("ai") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "NLP Engine" },
                }),
              )
            }
          >
            <rect
              x="150"
              y="350"
              width="180"
              height="80"
              rx="10"
              fill="#8B5CF6"
              className="dark:fill-purple-700"
              stroke="#6D28D9"
              strokeWidth="2"
            />
            <text x="240" y="390" textAnchor="middle" fill="white" fontWeight="bold">
              NLP Engine
            </text>
            <text x="240" y="410" textAnchor="middle" fill="white" fontSize="12">
              Content Generation, SEO
            </text>
          </g>

          {/* Computer Vision */}
          <g
            className="node"
            data-category="ai"
            data-name="Computer Vision"
            style={{
              opacity: getNodeOpacity("ai"),
              pointerEvents: getNodePointerEvents("ai") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "Computer Vision" },
                }),
              )
            }
          >
            <rect
              x="400"
              y="350"
              width="180"
              height="80"
              rx="10"
              fill="#8B5CF6"
              className="dark:fill-purple-700"
              stroke="#6D28D9"
              strokeWidth="2"
            />
            <text x="490" y="390" textAnchor="middle" fill="white" fontWeight="bold">
              Computer Vision
            </text>
            <text x="490" y="410" textAnchor="middle" fill="white" fontSize="12">
              SERP Analysis
            </text>
          </g>

          {/* Blockchain Integration */}
          <g
            className="node"
            data-category="ai"
            data-name="Blockchain Integration"
            style={{
              opacity: getNodeOpacity("ai"),
              pointerEvents: getNodePointerEvents("ai") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "Blockchain Integration" },
                }),
              )
            }
          >
            <rect
              x="650"
              y="350"
              width="180"
              height="80"
              rx="10"
              fill="#8B5CF6"
              className="dark:fill-purple-700"
              stroke="#6D28D9"
              strokeWidth="2"
            />
            <text x="740" y="390" textAnchor="middle" fill="white" fontWeight="bold">
              Blockchain
            </text>
            <text x="740" y="410" textAnchor="middle" fill="white" fontSize="12">
              Performance Verification
            </text>
          </g>

          {/* Dashboard */}
          <g
            className="node"
            data-category="frontend"
            data-name="Dashboard Implementation"
            style={{
              opacity: getNodeOpacity("frontend"),
              pointerEvents: getNodePointerEvents("frontend") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "Dashboard Implementation" },
                }),
              )
            }
          >
            <rect
              x="400"
              y="500"
              width="200"
              height="80"
              rx="10"
              fill="#F472B6"
              className="dark:fill-pink-700"
              stroke="#DB2777"
              strokeWidth="2"
            />
            <text x="500" y="540" textAnchor="middle" fill="white" fontWeight="bold">
              Dashboard
            </text>
            <text x="500" y="560" textAnchor="middle" fill="white" fontSize="12">
              React.js, Real-time Analytics
            </text>
          </g>

          {/* Site Auditor */}
          <g
            className="node"
            data-category="features"
            data-name="Automated Site Auditor"
            style={{
              opacity: getNodeOpacity("features"),
              pointerEvents: getNodePointerEvents("features") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "Automated Site Auditor" },
                }),
              )
            }
          >
            <rect
              x="150"
              y="650"
              width="180"
              height="80"
              rx="10"
              fill="#F59E0B"
              className="dark:fill-amber-700"
              stroke="#D97706"
              strokeWidth="2"
            />
            <text x="240" y="690" textAnchor="middle" fill="white" fontWeight="bold">
              Site Auditor
            </text>
            <text x="240" y="710" textAnchor="middle" fill="white" fontSize="12">
              Crawling, Audit Rules
            </text>
          </g>

          {/* Content Studio */}
          <g
            className="node"
            data-category="features"
            data-name="AI Content Studio"
            style={{
              opacity: getNodeOpacity("features"),
              pointerEvents: getNodePointerEvents("features") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "AI Content Studio" },
                }),
              )
            }
          >
            <rect
              x="400"
              y="650"
              width="180"
              height="80"
              rx="10"
              fill="#F59E0B"
              className="dark:fill-amber-700"
              stroke="#D97706"
              strokeWidth="2"
            />
            <text x="490" y="690" textAnchor="middle" fill="white" fontWeight="bold">
              Content Studio
            </text>
            <text x="490" y="710" textAnchor="middle" fill="white" fontSize="12">
              Content Generation, SEO
            </text>
          </g>

          {/* Keyword Manager */}
          <g
            className="node"
            data-category="features"
            data-name="Predictive Keyword Manager"
            style={{
              opacity: getNodeOpacity("features"),
              pointerEvents: getNodePointerEvents("features") as any,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("showComponentDetails", {
                  detail: { componentName: "Predictive Keyword Manager" },
                }),
              )
            }
          >
            <rect
              x="650"
              y="650"
              width="180"
              height="80"
              rx="10"
              fill="#F59E0B"
              className="dark:fill-amber-700"
              stroke="#D97706"
              strokeWidth="2"
            />
            <text x="740" y="690" textAnchor="middle" fill="white" fontWeight="bold">
              Keyword Manager
            </text>
            <text x="740" y="710" textAnchor="middle" fill="white" fontSize="12">
              Predictive ML Model
            </text>
          </g>

          {/* Connections */}
          {/* Cloud to Data & API */}
          <path d="M440 130 L240 200" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />
          <path d="M560 130 L760 200" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />

          {/* Data to NLP */}
          <path d="M240 280 L240 350" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />

          {/* API to CV & Blockchain */}
          <path d="M760 280 L740 350" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />
          <path d="M710 280 L490 350" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />

          {/* AI modules to Dashboard */}
          <path d="M240 430 L400 500" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />
          <path d="M490 430 L490 500" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />
          <path d="M740 430 L600 500" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />

          {/* Dashboard to Features */}
          <path d="M400 580 L240 650" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />
          <path d="M490 580 L490 650" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />
          <path d="M600 580 L740 650" className="connection" stroke="#4B5563" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="flex flex-wrap mt-4 justify-center gap-2">
        <button
          className={`filter-btn px-3 py-1 rounded-full text-sm text-white ${filter === "all" ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={() => filterComponents("all")}
        >
          All
        </button>
        <button
          className={`filter-btn px-3 py-1 rounded-full text-sm text-white ${filter === "infrastructure" ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-600"}`}
          onClick={() => filterComponents("infrastructure")}
        >
          Infrastructure
        </button>
        <button
          className={`filter-btn px-3 py-1 rounded-full text-sm text-white ${filter === "ai" ? "bg-purple-600" : "bg-purple-500 hover:bg-purple-600"}`}
          onClick={() => filterComponents("ai")}
        >
          AI Modules
        </button>
        <button
          className={`filter-btn px-3 py-1 rounded-full text-sm text-white ${filter === "frontend" ? "bg-pink-600" : "bg-pink-500 hover:bg-pink-600"}`}
          onClick={() => filterComponents("frontend")}
        >
          Frontend
        </button>
        <button
          className={`filter-btn px-3 py-1 rounded-full text-sm text-white ${filter === "features" ? "bg-amber-600" : "bg-amber-500 hover:bg-amber-600"}`}
          onClick={() => filterComponents("features")}
        >
          Features
        </button>
      </div>
    </div>
  )
}

