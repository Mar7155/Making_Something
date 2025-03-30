import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Check, Loader, Loader2, LogOut, Pencil, X } from "lucide-react"
import Avvvatars from 'avvvatars-react'
import { BASE_URL } from "@/lib/utils.ts"
import type { User } from "@/lib/types/user.ts"

// Default user with the new structure
const userInfo: User = {
  name: "Juan",
  lastname: "Pérez",
  email: "juan.perez@example.com",
  phone: "+52 55 1234 5678",
}

interface UserProfileProps {
  user?: User
}

export default function UserProfile({ user = userInfo }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<User>({ ...user })
  const [originalData, setOriginalData] = useState<User>({ ...user })

  // Update original data when user prop changes
  useEffect(() => {

    setLoading(true)

    if (localStorage.getItem("user")) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "")
      console.log(storedUser);
      
      if (storedUser.direccion == null) {
        storedUser.direccion = {
          calle: "",
          num_exterior: 0,
          num_interior: 0,
          colonia: "",
          cp: 0,
          ciudad: "",
          estado: "",
        }
      }
      setFormData(() => ({
        ...storedUser,
      }))
      setLoading(false)
    }

  }, [user])

  const handleChange = (field: string, value: string | number | boolean) => {
    if (field.startsWith("direccion.")) {
      const direccion = field.split(".")[1] as keyof NonNullable<User["direccion"]>
      setFormData((prev) => ({
        ...prev,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const startEditing = () => {
    setIsEditing(true)
  }

  const saveChanges = async () => {

    const response = await fetch(`${BASE_URL}/updateUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      console.error("Error al guardar los cambios")
      return
    }

    const data = await response.json()
    console.log(data.message);
    localStorage.setItem("user", JSON.stringify(formData))
    setOriginalData({ ...formData })

    setIsEditing(false)

  }

  const cancelEditing = () => {
    // Reset form data to original data
    setFormData({ ...formData })
    setIsEditing(false)
  }

  const logout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const renderField = (field: string, label: string, type = "text", isNumeric = false) => {
    // Get the value based on whether it's a nested field or not
    let value: any
    if (field.startsWith("direccion.")) {
      const direccion = field.split(".")[1] as keyof NonNullable<User["direccion"]>
      value = formData.direccion?.[direccion]
    } else {
      value = formData[field as keyof User]
    }

    return (
      <div className="space-y-2">
        <Label htmlFor={field}>{label}</Label>
        <Input
          id={field}
          name={field}
          type={type}
          value={value !== undefined ? (isNumeric ? Number(value) : String(value)) : ""}
          onChange={(e) =>
            handleChange(field, isNumeric ? (e.target.value ? Number.parseInt(e.target.value) : 0) : e.target.value)
          }
          readOnly={!isEditing}
          className={isEditing ? "border-primary" : ""}
        />
      </div>
    )
  }

  const toggledireccionVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      insertdireccion: !prev.direccion,
    }))
  }

  return (
    <div className="container mx-auto py-6">
     <div className="flex items-center justify-center mb-6">
      <h1>Pagina de prueba, profavor asegurese de no insertar datos reales ^^ </h1>
     </div>
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          {loading ? (
            <Loader2 />
          ):(
            <div>
            <Avvvatars
              value={formData.name}
              size={50}
              style="shape"
            />
          </div>
          )}
          <div>
            <CardTitle className="text-2xl">Información del Usuario</CardTitle>
            <CardDescription>Detalles personales y dirección del usuario</CardDescription>
          </div>          
          {!isEditing ? (
            <Button onClick={startEditing} className="flex items-center gap-2 bg-cyan-600 hover:cursor-pointer hover:bg-cyan-800">
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          ) : (
            <div className="flex flex-col w-24 space-y-2">
              <Button onClick={saveChanges} className="flex items-center gap-2 bg-green-600 hover:cursor-pointer hover:bg-green-800" variant="default">
                <Check className="h-4 w-4" />
                Guardar
              </Button>
              <Button onClick={cancelEditing} className="flex items-center gap-2 bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white" variant="outline">
                <X className="h-4 w-4" />
                Cancelar
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {/* Información Personal */}
          {loading? (
            <div className="flex justify-center items-center">
              <Loader2></Loader2>
            </div>
          ):(
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("name", "Nombre")}
                {renderField("lastname", "Apellido")}
                {renderField("email", "Correo Electrónico", "email")}
                {renderField("phone", "Teléfono", "tel")}
                {renderField("password", "Contraseña", "password")}
              </div>
            </div>
          )}

          <Separator />

          {/* Dirección Toggle * 
          <div className="flex items-center space-x-2">
            <Switch
              id="direccion-toggle"
              checked={formData.direccion !== undefined}
              onCheckedChange={toggledireccionVisibility}
            />
            <Label htmlFor="direccion-toggle">Mostrar información de dirección</Label>
          </div>*/}

          {formData.direccion && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dirección</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("direccion.calle", "Calle")}
                <div className="grid grid-cols-2 gap-4">
                  {renderField("direccion.num_exterior", "Número Exterior", "number", true)}
                  {renderField("direccion.num_interior", "Número Interior", "number", true)}
                </div>
                {renderField("direccion.colonia", "Colonia")}
                {renderField("direccion.cp", "Código Postal", "number", true)}
                {renderField("direccion.ciudad", "Ciudad")}
                {renderField("direccion.estado", "Estado")}
              </div>
            </div>
          )}
          <div>
          <Button onClick={logout} className="flex items-center gap-2 bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white" variant="outline">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

