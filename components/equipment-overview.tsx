"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Download, QrCode, History, Edit, Plus } from "lucide-react"

interface Equipment {
  id: string
  model: string
  serialNumber: string
  description: string
  manufacturer: string
  norm: string
  lastInspection: string
  nextInspection: string
  status: "Gut" | "Überwachen" | "Reparieren" | "Aussondern"
  inspector: string
  user: string
}

const mockEquipment: Equipment[] = [
  {
    id: "1",
    model: "Petzl OK",
    serialNumber: "09255VA2127-",
    description: "Alukarabiner",
    manufacturer: "Petzl",
    norm: "EN 362",
    lastInspection: "27.01.2019",
    nextInspection: "27.01.2025",
    status: "Gut",
    inspector: "Max Mustermann",
    user: "Materiallager Schrank",
  },
  {
    id: "2",
    model: "Edelrid Abseilachter",
    serialNumber: "1104",
    description: "Abseilgerät",
    manufacturer: "Edelrid",
    norm: "EN 341",
    lastInspection: "27.01.2019",
    nextInspection: "27.01.2025",
    status: "Überwachen",
    inspector: "Max Mustermann",
    user: "FAM",
  },
  {
    id: "3",
    model: "Petzl OXAN",
    serialNumber: "132070005-",
    description: "Stahlkarabiner",
    manufacturer: "Petzl",
    norm: "EN 362",
    lastInspection: "25.02.2019",
    nextInspection: "25.02.2025",
    status: "Gut",
    inspector: "Max Mustermann",
    user: "Luftrettung",
  },
]

export function EquipmentOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Gut":
        return "bg-green-100 text-green-800"
      case "Überwachen":
        return "bg-yellow-100 text-yellow-800"
      case "Reparieren":
        return "bg-orange-100 text-orange-800"
      case "Aussondern":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredEquipment = mockEquipment.filter((item) => {
    const matchesSearch =
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEquipment(filteredEquipment.map((item) => item.id))
    } else {
      setSelectedEquipment([])
    }
  }

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedEquipment([...selectedEquipment, itemId])
    } else {
      setSelectedEquipment(selectedEquipment.filter((id) => id !== itemId))
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>PSA-Ausrüstung</CardTitle>
            <CardDescription>Verwaltung und Übersicht aller PSA-Geräte</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Neues Gerät
            </Button>
            <Button variant="outline">
              <QrCode className="w-4 h-4 mr-2" />
              QR-Code erstellen
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Suchen nach Modell, Seriennummer oder Beschreibung..."
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
              <SelectItem value="Gut">Gut</SelectItem>
              <SelectItem value="Überwachen">Überwachen</SelectItem>
              <SelectItem value="Reparieren">Reparieren</SelectItem>
              <SelectItem value="Aussondern">Aussondern</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Action Buttons */}
        {selectedEquipment.length > 0 && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-700">{selectedEquipment.length} Gerät(e) ausgewählt</span>
            <Button size="sm" variant="outline">
              <History className="w-4 h-4 mr-2" />
              Prüfhistorie
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Bearbeiten
            </Button>
            <Button size="sm" variant="outline">
              <QrCode className="w-4 h-4 mr-2" />
              QR-Codes
            </Button>
          </div>
        )}

        {/* Equipment Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedEquipment.length === filteredEquipment.length && filteredEquipment.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Modell</TableHead>
                <TableHead>Seriennummer</TableHead>
                <TableHead>Hersteller</TableHead>
                <TableHead>Norm</TableHead>
                <TableHead>Letzte Prüfung</TableHead>
                <TableHead>Nächste Prüfung</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prüfer</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedEquipment.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell className="font-mono text-sm">{item.serialNumber}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.norm}</TableCell>
                  <TableCell>{item.lastInspection}</TableCell>
                  <TableCell>{item.nextInspection}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{item.inspector}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            {filteredEquipment.length} von {mockEquipment.length} Einträgen angezeigt
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Zurück
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Nächste
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
