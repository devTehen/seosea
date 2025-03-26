"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { fetchApiKeys, addApiKey, updateApiKey, deleteApiKey, testApiKey } from "@/lib/api/settings"
import { Key, Plus, Edit, Trash2, Copy, CheckCircle, AlertCircle, Loader2, Eye, EyeOff, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ApiKey {
  id: string
  name: string
  key: string
  domain: string
  service: string
  permissions: string[]
  createdAt: string
  lastUsed?: string
  status: "active" | "expired" | "revoked"
}

export function ApiKeysManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentKey, setCurrentKey] = useState<ApiKey | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    key: "",
    domain: "",
    service: "analytics",
    permissions: ["read"],
  })
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})
  const [testingKey, setTestingKey] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; message: string } | null>(null)

  useEffect(() => {
    loadApiKeys()
  }, [])

  const loadApiKeys = async () => {
    setIsLoading(true)
    try {
      const keys = await fetchApiKeys()
      setApiKeys(keys)

      // Initialize visibility state for each key
      const initialVisibility: Record<string, boolean> = {}
      keys.forEach((key) => {
        initialVisibility[key.id] = false
      })
      setShowKey(initialVisibility)
    } catch (error) {
      console.error("Failed to load API keys:", error)
      toast({
        title: "Error",
        description: "Failed to load API keys. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddKey = async () => {
    try {
      // Validate form data
      if (!formData.name.trim()) {
        toast({
          title: "Validation Error",
          description: "API key name is required",
          variant: "destructive",
        })
        return
      }

      if (!formData.key.trim()) {
        toast({
          title: "Validation Error",
          description: "API key is required",
          variant: "destructive",
        })
        return
      }

      if (!formData.domain.trim()) {
        toast({
          title: "Validation Error",
          description: "Domain is required",
          variant: "destructive",
        })
        return
      }

      // Validate domain format
      const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
      if (!domainRegex.test(formData.domain)) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid domain name",
          variant: "destructive",
        })
        return
      }

      const newKey = await addApiKey(formData)
      setApiKeys([...apiKeys, newKey])
      setShowAddDialog(false)
      resetForm()

      toast({
        title: "Success",
        description: "API key added successfully",
      })
    } catch (error) {
      console.error("Failed to add API key:", error)
      toast({
        title: "Error",
        description: "Failed to add API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditKey = async () => {
    if (!currentKey) return

    try {
      // Validate form data
      if (!formData.name.trim()) {
        toast({
          title: "Validation Error",
          description: "API key name is required",
          variant: "destructive",
        })
        return
      }

      if (!formData.domain.trim()) {
        toast({
          title: "Validation Error",
          description: "Domain is required",
          variant: "destructive",
        })
        return
      }

      // Validate domain format
      const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
      if (!domainRegex.test(formData.domain)) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid domain name",
          variant: "destructive",
        })
        return
      }

      const updatedKey = await updateApiKey(currentKey.id, formData)
      setApiKeys(apiKeys.map((key) => (key.id === currentKey.id ? updatedKey : key)))
      setShowEditDialog(false)
      resetForm()

      toast({
        title: "Success",
        description: "API key updated successfully",
      })
    } catch (error) {
      console.error("Failed to update API key:", error)
      toast({
        title: "Error",
        description: "Failed to update API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteKey = async (id: string) => {
    try {
      await deleteApiKey(id)
      setApiKeys(apiKeys.filter((key) => key.id !== id))

      toast({
        title: "Success",
        description: "API key deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete API key:", error)
      toast({
        title: "Error",
        description: "Failed to delete API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTestKey = async (id: string) => {
    setTestingKey(id)
    setTestResult(null)

    try {
      const result = await testApiKey(id)
      setTestResult({
        id,
        success: result.success,
        message: result.message,
      })

      toast({
        title: result.success ? "Success" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    } catch (error) {
      console.error("Failed to test API key:", error)
      setTestResult({
        id,
        success: false,
        message: "Failed to test API key. Please try again.",
      })

      toast({
        title: "Error",
        description: "Failed to test API key. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTestingKey(null)
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Copied",
      description: "API key copied to clipboard",
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      key: "",
      domain: "",
      service: "analytics",
      permissions: ["read"],
    })
    setCurrentKey(null)
  }

  const openEditDialog = (key: ApiKey) => {
    setCurrentKey(key)
    setFormData({
      name: key.name,
      key: key.key,
      domain: key.domain,
      service: key.service,
      permissions: key.permissions,
    })
    setShowEditDialog(true)
  }

  const toggleKeyVisibility = (id: string) => {
    setShowKey({
      ...showKey,
      [id]: !showKey[id],
    })
  }

  const getServiceLabel = (service: string) => {
    const services: Record<string, string> = {
      analytics: "Analytics API",
      search: "Search API",
      content: "Content API",
      social: "Social Media API",
      ads: "Advertising API",
      email: "Email Marketing API",
      crm: "CRM API",
      ecommerce: "E-commerce API",
      payment: "Payment API",
      other: "Other",
    }

    return services[service] || service
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Active
          </span>
        )
      case "expired":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Expired
          </span>
        )
      case "revoked":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Revoked
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">API Keys</h2>
          <p className="text-muted-foreground">Manage API keys for your domains</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add API Key
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Keys</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="revoked">Revoked</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : apiKeys.length === 0 ? (
                <div className="text-center py-8">
                  <Key className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No API Keys</h3>
                  <p className="text-muted-foreground">You haven't added any API keys yet.</p>
                  <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add API Key
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys.map((apiKey) => (
                        <TableRow key={apiKey.id}>
                          <TableCell className="font-medium">{apiKey.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="font-mono text-xs">
                                {showKey[apiKey.id]
                                  ? apiKey.key
                                  : apiKey.key.substring(0, 8) + "..." + apiKey.key.substring(apiKey.key.length - 4)}
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                                      {showKey[apiKey.id] ? (
                                        <EyeOff className="h-4 w-4" />
                                      ) : (
                                        <Eye className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {showKey[apiKey.id] ? "Hide API Key" : "Show API Key"}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)}>
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Copy API Key</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                          <TableCell>{apiKey.domain}</TableCell>
                          <TableCell>{getServiceLabel(apiKey.service)}</TableCell>
                          <TableCell>{getStatusBadge(apiKey.status)}</TableCell>
                          <TableCell>{new Date(apiKey.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : "Never"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleTestKey(apiKey.id)}
                                      disabled={testingKey === apiKey.id}
                                    >
                                      {testingKey === apiKey.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : testResult?.id === apiKey.id ? (
                                        testResult.success ? (
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                          <AlertCircle className="h-4 w-4 text-red-500" />
                                        )
                                      ) : (
                                        <RefreshCw className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {testingKey === apiKey.id ? "Testing..." : "Test API Key"}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(apiKey)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit API Key</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this API key? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteKey(apiKey.id)}
                                      className="bg-red-500 hover:bg-red-600"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : apiKeys.filter((key) => key.status === "active").length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active API keys found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys
                        .filter((key) => key.status === "active")
                        .map((apiKey) => (
                          <TableRow key={apiKey.id}>
                            <TableCell className="font-medium">{apiKey.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="font-mono text-xs">
                                  {showKey[apiKey.id]
                                    ? apiKey.key
                                    : apiKey.key.substring(0, 8) + "..." + apiKey.key.substring(apiKey.key.length - 4)}
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                                  {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)}>
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{apiKey.domain}</TableCell>
                            <TableCell>{getServiceLabel(apiKey.service)}</TableCell>
                            <TableCell>{new Date(apiKey.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleTestKey(apiKey.id)}
                                  disabled={testingKey === apiKey.id}
                                >
                                  {testingKey === apiKey.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : testResult?.id === apiKey.id ? (
                                    testResult.success ? (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <AlertCircle className="h-4 w-4 text-red-500" />
                                    )
                                  ) : (
                                    <RefreshCw className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => openEditDialog(apiKey)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this API key? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteKey(apiKey.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : apiKeys.filter((key) => key.status === "expired").length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No expired API keys found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys
                        .filter((key) => key.status === "expired")
                        .map((apiKey) => (
                          <TableRow key={apiKey.id}>
                            <TableCell className="font-medium">{apiKey.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="font-mono text-xs">
                                  {showKey[apiKey.id]
                                    ? apiKey.key
                                    : apiKey.key.substring(0, 8) + "..." + apiKey.key.substring(apiKey.key.length - 4)}
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                                  {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)}>
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{apiKey.domain}</TableCell>
                            <TableCell>{getServiceLabel(apiKey.service)}</TableCell>
                            <TableCell>{new Date(apiKey.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-1">
                                <Button variant="ghost" size="icon" onClick={() => openEditDialog(apiKey)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this API key? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteKey(apiKey.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revoked" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : apiKeys.filter((key) => key.status === "revoked").length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No revoked API keys found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>API Key</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys
                        .filter((key) => key.status === "revoked")
                        .map((apiKey) => (
                          <TableRow key={apiKey.id}>
                            <TableCell className="font-medium">{apiKey.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="font-mono text-xs">
                                  {showKey[apiKey.id]
                                    ? apiKey.key
                                    : apiKey.key.substring(0, 8) + "..." + apiKey.key.substring(apiKey.key.length - 4)}
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                                  {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)}>
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{apiKey.domain}</TableCell>
                            <TableCell>{getServiceLabel(apiKey.service)}</TableCell>
                            <TableCell>{new Date(apiKey.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-1">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this API key? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteKey(apiKey.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add API Key Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add API Key</DialogTitle>
            <DialogDescription>
              Add a new API key for your domain. Make sure to keep your API keys secure.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Analytics API Key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="key"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  placeholder="Enter your API key"
                  type={showKey["new"] ? "text" : "password"}
                />
                <Button variant="outline" size="icon" onClick={() => setShowKey({ ...showKey, new: !showKey["new"] })}>
                  {showKey["new"] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                placeholder="example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analytics">Analytics API</SelectItem>
                  <SelectItem value="search">Search API</SelectItem>
                  <SelectItem value="content">Content API</SelectItem>
                  <SelectItem value="social">Social Media API</SelectItem>
                  <SelectItem value="ads">Advertising API</SelectItem>
                  <SelectItem value="email">Email Marketing API</SelectItem>
                  <SelectItem value="crm">CRM API</SelectItem>
                  <SelectItem value="ecommerce">E-commerce API</SelectItem>
                  <SelectItem value="payment">Payment API</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="permission-read"
                    checked={formData.permissions.includes("read")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "read"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "read"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="permission-read" className="text-sm">
                    Read
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="permission-write"
                    checked={formData.permissions.includes("write")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "write"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "write"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="permission-write" className="text-sm">
                    Write
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="permission-delete"
                    checked={formData.permissions.includes("delete")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "delete"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "delete"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="permission-delete" className="text-sm">
                    Delete
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="permission-admin"
                    checked={formData.permissions.includes("admin")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "admin"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "admin"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="permission-admin" className="text-sm">
                    Admin
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddDialog(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddKey}>Add API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit API Key Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit API Key</DialogTitle>
            <DialogDescription>Update the details for your API key.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-key">API Key</Label>
              <div className="flex space-x-2">
                <Input id="edit-key" value={formData.key} readOnly type={showKey["edit"] ? "text" : "password"} />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowKey({ ...showKey, edit: !showKey["edit"] })}
                >
                  {showKey["edit"] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">API keys cannot be edited. Create a new key if needed.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-domain">Domain</Label>
              <Input
                id="edit-domain"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-service">Service</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger id="edit-service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analytics">Analytics API</SelectItem>
                  <SelectItem value="search">Search API</SelectItem>
                  <SelectItem value="content">Content API</SelectItem>
                  <SelectItem value="social">Social Media API</SelectItem>
                  <SelectItem value="ads">Advertising API</SelectItem>
                  <SelectItem value="email">Email Marketing API</SelectItem>
                  <SelectItem value="crm">CRM API</SelectItem>
                  <SelectItem value="ecommerce">E-commerce API</SelectItem>
                  <SelectItem value="payment">Payment API</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-permission-read"
                    checked={formData.permissions.includes("read")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "read"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "read"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="edit-permission-read" className="text-sm">
                    Read
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-permission-write"
                    checked={formData.permissions.includes("write")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "write"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "write"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="edit-permission-write" className="text-sm">
                    Write
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-permission-delete"
                    checked={formData.permissions.includes("delete")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "delete"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "delete"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="edit-permission-delete" className="text-sm">
                    Delete
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-permission-admin"
                    checked={formData.permissions.includes("admin")}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          permissions: [...formData.permissions, "admin"],
                        })
                      } else {
                        setFormData({
                          ...formData,
                          permissions: formData.permissions.filter((p) => p !== "admin"),
                        })
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="edit-permission-admin" className="text-sm">
                    Admin
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEditKey}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

