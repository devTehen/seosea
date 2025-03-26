"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { fetchTransactions } from "@/lib/api/blockchain"
import { Loader2, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface Transaction {
  id: string
  type: "register" | "verify" | "update"
  status: "confirmed" | "pending" | "failed"
  timestamp: string
  contentUrl: string
  contentHash: string
  blockNumber?: number
}

export function BlockchainTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions()
        setTransactions(data)
      } catch (error) {
        console.error("Failed to load transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "register":
        return "Content Registration"
      case "verify":
        return "Content Verification"
      case "update":
        return "Content Update"
      default:
        return type
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No blockchain transactions found.</p>
        <p className="text-sm text-muted-foreground mt-1">Register or verify content to see transactions here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-medium">Type</th>
              <th className="text-left py-2 font-medium">Status</th>
              <th className="text-left py-2 font-medium">Date</th>
              <th className="text-left py-2 font-medium">Content</th>
              <th className="text-right py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-2">{getTypeLabel(transaction.type)}</td>
                <td className="py-2">
                  <div className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <span className="ml-1 capitalize">{transaction.status}</span>
                  </div>
                </td>
                <td className="py-2">{new Date(transaction.timestamp).toLocaleString()}</td>
                <td className="py-2 truncate max-w-[200px]">{transaction.contentUrl}</td>
                <td className="py-2 text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">Page 1 of 1</span>
        <Button variant="outline" size="sm" disabled>
          Next
        </Button>
      </div>
    </div>
  )
}

