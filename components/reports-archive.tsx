"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText, Calendar, User } from "lucide-react"

interface InspectionReport {
  id: string
  reportNumber: string
  date: string
  inspector: string
  user: string
  equipmentCount: number
  status: "Abgeschlossen" | "Entwurf"
  results: {
    gut: number
    überwachen: number
    reparieren: number
    aussondern: number
  }
}

const mockReports: InspectionReport[] = [
  {
    id: "1",
    reportNumber: "PSA-2024-001",
    date: "15.01.2024",
    inspector: "Max Mustermann",
    user: "Materiallager Schrank",
    equipmentCount: 12,
    status: "Abgeschlossen",
    results: { gut: 10, überwachen: 2, reparieren: 0, aussondern: 0 },
  },
  {
    id: "2",
    reportNumber: "PSA-2024-002",
    date: "18.01.2024",
    inspector: "Max Mustermann",
    user: "FAM Team",
    equipmentCount: 8,
    status: "Abgeschlossen",
    results: { gut: 6, überwachen: 1, reparieren: 1, aussondern: 0 },
  },
  {
    id: "3",
    reportNumber: "PSA-2024-003",
    date: "22.01.2024",
    inspector: "Max Mustermann",
    user: "Luftrettung",
    equipmentCount: 15,
    status: "Entwurf",
    results: { gut: 12, überwachen: 2, reparieren: 0, aussondern: 1 },
  },
]

export function ReportsArchive() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [yearFilter, setYearFilter] = useState<string>("2024")

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesYear = report.date.includes(yearFilter)
    return matchesSearch && matchesStatus && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abgeschlossen":
        return "bg-green-100 text-green-800"
      case "Entwurf":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Prüfberichte Archiv</CardTitle>
            <CardDescription>Übersicht und Verwaltung aller Prüfberichte</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Protokoll(e) herunterladen
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Prüfbericht herunterladen
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Suchen nach Berichtsnummer, Prüfer oder Anwender..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status filtern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="Abgeschlossen">Abgeschlossen</SelectItem>
              <SelectItem value="Entwurf">Entwurf</SelectItem>
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Jahr" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Berichtsnummer</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Prüfer</TableHead>
                <TableHead>Anwender</TableHead>
                <TableHead>Geräte</TableHead>
                <TableHead>Ergebnisse</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-mono text-sm font-medium">{report.reportNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {report.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {report.inspector}
                    </div>
                  </TableCell>
                  <TableCell>{report.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.equipmentCount} Geräte</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {report.results.gut > 0 && (
                        <Badge className="bg-green-100 text-green-800 text-xs">{report.results.gut} Gut</Badge>
                      )}
                      {report.results.überwachen > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          {report.results.überwachen} Überwachen
                        </Badge>
                      )}
                      {report.results.reparieren > 0 && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          {report.results.reparieren} Reparieren
                        </Badge>
                      )}
                      {report.results.aussondern > 0 && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          {report.results.aussondern} Aussondern
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{filteredReports.length}</div>
              <div className="text-sm text-gray-600">Berichte gesamt</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {filteredReports.filter((r) => r.status === "Abgeschlossen").length}
              </div>
              <div className="text-sm text-gray-600">Abgeschlossen</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {filteredReports.filter((r) => r.status === "Entwurf").length}
              </div>
              <div className="text-sm text-gray-600">Entwürfe</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {filteredReports.reduce((sum, r) => sum + r.equipmentCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Geräte geprüft</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
