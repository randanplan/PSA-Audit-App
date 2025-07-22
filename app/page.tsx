"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ClipboardCheck,
  Package,
  Users,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
} from "lucide-react"
import { EquipmentOverview } from "@/components/equipment-overview"
import { InspectionForm } from "@/components/inspection-form"
import { ReportsArchive } from "@/components/reports-archive"
import { UserManagement } from "@/components/user-management"

export default function PSAAuditApp() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    {
      title: "Aktive PSA-Geräte",
      value: "247",
      description: "Geräte im Einsatz",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Fällige Prüfungen",
      value: "23",
      description: "In den nächsten 30 Tagen",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Abgeschlossene Prüfungen",
      value: "156",
      description: "Dieses Jahr",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Überfällige Prüfungen",
      value: "8",
      description: "Sofortige Aufmerksamkeit erforderlich",
      icon: Clock,
      color: "text-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">PSA-Audit</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-sm">
              CGH IT-Solutions
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Einstellungen
            </Button>
            <div className="text-sm text-gray-600">Willkommen, Max Mustermann</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Übersicht</span>
              </TabsTrigger>
              <TabsTrigger value="inspection" className="flex items-center space-x-2">
                <ClipboardCheck className="w-4 h-4" />
                <span>Prüfung</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Archiv</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Kalender</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Benutzer</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <EquipmentOverview />
            </TabsContent>

            <TabsContent value="inspection" className="space-y-6">
              <InspectionForm />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ReportsArchive />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prüfkalender</CardTitle>
                  <CardDescription>Übersicht über anstehende und überfällige Prüfungen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">Kalenderansicht wird implementiert...</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <UserManagement />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
