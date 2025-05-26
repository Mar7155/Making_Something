import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Check, Loader2, LogOut, Pencil, X } from "lucide-react"
import Avvvatars from 'avvvatars-react'
import type { User } from "@/lib/types/user"
import { Switch } from "../ui/switch"
import useUserInfo from "@/hooks/useUserInfo"
import { SignOutButton } from "@clerk/astro/components"

export default function UserInfo() {

  const { userInfo, loading, isEditingUser, isEditingAddress, formData, viewAddress, handleChange, startEditing, cancelEditing, saveChanges, deleteAddress, toggleaddressVisibility, AddAddress } = useUserInfo()

  const renderField = (field: string, label: string, type = "text", isNumeric = false) => {
    // Get the value based on whether it's a nested field or not
    let value: any
    if (field.startsWith("address.") && userInfo.has_address) {
      const type = field.split(".")[1] as keyof NonNullable<User["address"]>
      value = formData.address?.[type]
    } else {
      value = formData[field as keyof User]
    }

    if (field.startsWith("address.")) {
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
            readOnly={!isEditingAddress}
            className={isEditingAddress ? "border-primary" : ""}
          />
        </div>
      )
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
          readOnly={!isEditingUser}
          className={isEditingUser ? "border-primary" : ""}
        />
      </div>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-start gap-0 pb-2">
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div>
            <Avvvatars
              value={formData.name}
              size={50}
              style="shape"
            />
          </div>
        )}
        <div className="flex flex-col justify-center w-full text-center mr-6">
          <CardTitle className="text-2xl">Información del Usuario</CardTitle>
          <CardDescription>Detalles personales y dirección del usuario</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Información Personal */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin"></Loader2>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("name", "Nombre")}
              {renderField("lastname", "Apellidos")}
              {renderField("email", "Correo Electrónico", "email")}
              {renderField("phone", "Teléfono", "tel")}
            </div>
            <div className="flex justify-end">
              {!isEditingUser ? (
                <Button onClick={() => startEditing("user")} className="flex items-center gap-2 bg-cyan-600 hover:cursor-pointer hover:bg-cyan-800">
                  <Pencil className="h-4 w-4" />
                  Editar
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => saveChanges("user")} className="flex items-center gap-2 bg-green-600 hover:cursor-pointer hover:bg-green-800" variant="default">
                    <Check className="h-4 w-4" />
                    Guardar
                  </Button>
                  <Button onClick={() => cancelEditing("user")} className="flex items-center gap-2 bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white" variant="outline">
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <Separator />
        <div className="flex items-center space-x-2">
          <Switch
            className="hover:cursor-pointer"
            id="direction-toggle"
            onCheckedChange={toggleaddressVisibility}
          />
          <Label htmlFor="direction-toggle">Mostrar información de dirección</Label>
        </div>

        {viewAddress && userInfo.has_address ? (
          <div className="space-y-4 transition-all duration-200">
            <h3 className="text-lg font-medium">Dirección</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("address.street", "Calle")}
              <div className="grid grid-cols-2 gap-4">
                {renderField("address.no_ext", "Número Exterior", "number", true)}
                {renderField("address.no_int", "Número Interior", "number", true)}
              </div>
              {renderField("address.cologne", "Colonia")}
              {renderField("address.zip_code", "Código Postal", "number", true)}
              {renderField("address.city", "Ciudad")}
              {renderField("address.state", "Estado")}
            </div>
            <div className="flex justify-end">
              {!isEditingAddress ? (
                <div className="flex gap-2">
                  <Button onClick={() => startEditing("address")} className="flex items-center gap-2 bg-cyan-600 hover:cursor-pointer hover:bg-cyan-800">
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button onClick={() => deleteAddress()} className="flex items-center gap-2 bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white" variant="outline">
                    <X className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>

              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => saveChanges("address")} className="flex items-center gap-2 bg-green-600 hover:cursor-pointer hover:bg-green-800" variant="default">
                    <Check className="h-4 w-4" />
                    Guardar
                  </Button>
                  <Button onClick={() => cancelEditing("address")} className="flex items-center gap-2 bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white" variant="outline">
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : !userInfo.has_address && viewAddress ? (
          <div className="space-y-4 transition-all duration-200">
            <h3 className="text-lg font-medium">Dirección</h3>
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-gray-500">Aun no tienes una direccion</p>
              <Button
                onClick={AddAddress}
                className="flex items-center gap-2 bg-cyan-600 hover:cursor-pointer hover:bg-cyan-800"
              >
                Agregar Direccion
              </Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <CardFooter className="flex justify-between p-0">
          <Button className="flex items-center gap-2 bg-red-600 hover:cursor-pointer hover:bg-red-800 text-white" variant="outline">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </CardFooter>
      </CardContent >
    </Card >
  )
}

