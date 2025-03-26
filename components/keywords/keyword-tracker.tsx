"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchKeywords, addKeyword } from "@/lib/api/keywords"
import { Loader2, Plus, ArrowUp, ArrowDown, Minus, Search, Filter } from "lucide-react"

interface Keyword {
  id: string
  keyword: string
  position: number
  previousPosition: number
  searchVolume: number
  difficulty: number
  cpc: number
  url: string
}

export function KeywordTracker() {
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newKeyword, setNewKeyword] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("position")
  const [sortOrder, setSortOrder] = useState("asc")

  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const data = await fetchKeywords()
        setKeywords(data)
      } catch (error) {
        console.error("Failed to load keywords:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadKeywords()
  }, [])

  const handleAddKeyword = async () => {
    if (!newKeyword) return

    try {
      const keyword = await addKeyword(newKeyword)
      setKeywords([...keywords, keyword])
      setNewKeyword("")
    } catch (error) {
      console.error("Failed to add keyword:", error)
    }
  }

  const getPositionChange = (current: number, previous: number) => {
    if (previous === 0) return <span className="text-gray-500">New</span>

    const diff = previous - current

    if (diff > 0) {
      return (
        <span className="text-green-500 flex items-center">
          <ArrowUp className="h-3 w-3 mr-1" />
          {diff}
        </span>
      )
    } else if (diff < 0) {
      return (
        <span className="text-red-500 flex items-center">
          <ArrowDown className="h-3 w-3 mr-1" />
          {Math.abs(diff)}
        </span>
      )
    } else {
      return (
        <span className="text-gray-500 flex items-center">
          <Minus className="h-3 w-3 mr-1" />0
        </span>
      )
    }
  }

  const sortedKeywords = [...keywords].sort((a, b) => {
    let comparison = 0

    if (sortBy === "position") {
      comparison = a.position - b.position
    } else if (sortBy === "keyword") {
      comparison = a.keyword.localeCompare(b.keyword)
    } else if (sortBy === "volume") {
      comparison = a.searchVolume - b.searchVolume
    } else if (sortBy === "difficulty") {
      comparison = a.difficulty - b.difficulty
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const filteredKeywords = sortedKeywords.filter((keyword) =>
    keyword.keyword.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search keywords..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Input placeholder="Add new keyword..." value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} />
        <Button onClick={handleAddKeyword} disabled={!newKeyword}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium cursor-pointer" onClick={() => handleSort("keyword")}>
                  Keyword
                  {sortBy === "keyword" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="text-left py-2 font-medium cursor-pointer" onClick={() => handleSort("position")}>
                  Position
                  {sortBy === "position" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="text-left py-2 font-medium">Change</th>
                <th className="text-left py-2 font-medium cursor-pointer" onClick={() => handleSort("volume")}>
                  Volume
                  {sortBy === "volume" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="text-left py-2 font-medium cursor-pointer" onClick={() => handleSort("difficulty")}>
                  Difficulty
                  {sortBy === "difficulty" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="text-right py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredKeywords.map((keyword) => (
                <tr key={keyword.id} className="border-b">
                  <td className="py-2">{keyword.keyword}</td>
                  <td className="py-2">{keyword.position}</td>
                  <td className="py-2">{getPositionChange(keyword.position, keyword.previousPosition)}</td>
                  <td className="py-2">{keyword.searchVolume.toLocaleString()}</td>
                  <td className="py-2">
                    <div className="flex items-center">
                      <div
                        className={`h-1.5 w-12 rounded-full ${
                          keyword.difficulty < 30
                            ? "bg-green-500"
                            : keyword.difficulty < 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="ml-2">{keyword.difficulty}</span>
                    </div>
                  </td>
                  <td className="py-2 text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredKeywords.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    {keywords.length === 0
                      ? "No keywords tracked yet. Add your first keyword above."
                      : "No keywords match your search criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

