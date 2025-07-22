"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { CalendarIcon, Save, FileCheck, Plus, Scan, AlertCircle } from "lucide-react"

interface InspectionItem {
  id: string
  serialNumber: string
  model: string
  manufacturer: string
  norm: string
  yearOfManufacture: string
  condition: string
  result: "Gut" | "Überwachen" | "Reparieren" | "Aussondern" | ""
  nextInspection: Date | undefined
  remarks: string
}

export function InspectionForm() {
  const [inspectorName, setInspectorName] = useState("Max Mustermann")
  const [userName, setUserName] = useState("")
  const [inspectionDate, setInspectionDate] = useState<Date>(new Date())
  const [items, setItems] = useState<InspectionItem[]>([])
  const [currentSerialNumber, setCurrentSerialNumber] = useState("")

  const addInspectionItem = () => {
    if (!currentSerialNumber.trim()) return

    // Simulate auto-fill based on serial number
    const newItem: InspectionItem = {
      id: Date.now().toString(),
      serialNumber: currentSerialNumber,
      model: "Petzl OK", // Auto-filled
      manufacturer: "Petzl", // Auto-filled
      norm: "EN 362", // Auto-filled
      yearOfManufacture: "2020", // Auto-filled
      condition: "",
      result: "",
      nextInspection: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      remarks: "",
    }

    setItems([...items, newItem])
    setCurrentSerialNumber("")
  }

  const updateItem = (id: string, field: keyof InspectionItem, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const getResultColor = (result: string) => {
    switch (result) {
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

  return (
    <div className="space-y-6">
      {/* Inspection Header */}
      <Card>
        <CardHeader>
          <CardTitle>Neue PSA-Prüfung</CardTitle>
          <CardDescription>Erstellen Sie einen neuen Prüfbericht für PSA-Ausrüstung</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inspector">Prüfer</Label>
              <Input id="inspector" value={inspectorName} onChange={(e) => setInspectorName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user">Anwender</Label>
              <Input
                id="user"
                placeholder="Name des Anwenders"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Prüfdatum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {inspectionDate ? format(inspectionDate, "PPP", { locale: de }) : "Datum wählen"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={inspectionDate}
                    onSelect={(date) => date && setInspectionDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Equipment */}
      <Card>
        <CardHeader>
          <CardTitle>PSA-Gerät hinzufügen</CardTitle>
          <CardDescription>Seriennummer eingeben oder QR-Code scannen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Seriennummer eingeben..."
              value={currentSerialNumber}
              onChange={(e) => setCurrentSerialNumber(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addInspectionItem()}
              className="flex-1"
            />
            <Button onClick={addInspectionItem} disabled={!currentSerialNumber.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Hinzufügen
            </Button>
            <Button variant="outline">
              <Scan className="w-4 h-4 mr-2" />
              QR-Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Items */}
      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Prüfgegenstände ({items.length})</CardTitle>
            <CardDescription>Bewertung der einzelnen PSA-Geräte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {items.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Gerät {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Entfernen
                  </Button>
                </div>

                {/* Equipment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Seriennummer</Label>
                    <Input value={item.serialNumber} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Modell</Label>
                    <Input value={item.model} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Hersteller</Label>
                    <Input value={item.manufacturer} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Norm</Label>
                    <Input value={item.norm} disabled />
                  </div>
                </div>

                <Separator />

                {/* Inspection Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`condition-${item.id}`}>
                      Zustand / Bemerkung <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id={`condition-${item.id}`}
                      placeholder="Beschreibung des Zustands..."
                      value={item.condition}
                      onChange={(e) => updateItem(item.id, "condition", e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label>
                        Ergebnis <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup value={item.result} onValueChange={(value) => updateItem(item.id, "result", value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Gut" id={`gut-${item.id}`} />
                          <Label htmlFor={`gut-${item.id}`} className="text-green-700">
                            Gut
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Überwachen" id={`watch-${item.id}`} />
                          <Label htmlFor={`watch-${item.id}`} className="text-yellow-700">
                            Überwachen
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Reparieren" id={`repair-${item.id}`} />
                          <Label htmlFor={`repair-${item.id}`} className="text-orange-700">
                            Reparieren
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Aussondern" id={`discard-${item.id}`} />
                          <Label htmlFor={`discard-${item.id}`} className="text-red-700">
                            Aussondern
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Nächste Prüfung</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {item.nextInspection ? format(item.nextInspection, "PPP", { locale: de }) : "Datum wählen"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={item.nextInspection}
                            onSelect={(date) => updateItem(item.id, "nextInspection", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {item.result && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge className={getResultColor(item.result)}>{item.result}</Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <Save className="w-4 h-4 mr-2" />
          Entwurf speichern
        </Button>
        <Button
          disabled={items.length === 0 || !userName.trim() || items.some((item) => !item.condition || !item.result)}
        >
          <FileCheck className="w-4 h-4 mr-2" />
          Prüfung abschließen
        </Button>
      </div>

      {/* Validation Messages */}
      {items.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-orange-800">Prüfung unvollständig</p>
                <ul className="text-sm text-orange-700 space-y-1">
                  {!userName.trim() && <li>• Anwendername ist erforderlich</li>}
                  {items.some((item) => !item.condition) && (
                    <li>• Zustandsbeschreibung für alle Geräte erforderlich</li>
                  )}
                  {items.some((item) => !item.result) && <li>• Ergebnis für alle Geräte erforderlich</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
