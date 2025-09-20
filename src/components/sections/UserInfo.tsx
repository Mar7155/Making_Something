import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/custom-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Check, Loader2, LogOut, Pencil, X } from "lucide-react"
import Avvvatars from 'avvvatars-react'
import type { User } from "@/lib/types/user"
import { Switch } from "../ui/switch"
import { SignOutButton } from "@clerk/astro/react"
import useUserInfo from "@/hooks/useUserInfo"

export default function UserInfo() {

  const { user, loadingUser } = useUserInfo()

  const renderField = (field: string, label: string, type = "text", isNumeric = false) => {

    let value: any
    if (field.startsWith("address.") && user.has_address) {
      const type = field.split(".")[1] as keyof NonNullable<User["address"]>
      value = user.address?.[type]
    } else {
      value = user[field as keyof User]
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
          readOnly
        />
      </div>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-start gap-0 pb-2">
        {loadingUser ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div>
            <Avvvatars
              value={user.username || "kitty"}
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
        {loadingUser ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin"></Loader2>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("username", "Username")}
              {renderField("email", "Email", "email")}
            </div>
          </div>
        )}

        <Separator />
        <div className="flex items-center space-x-2">
          <Switch
            className="hover:cursor-pointer"
            id="direction-toggle"
            //onCheckedChange={toggleaddressVisibility}
            value="false"
            disabled
          />
          <Label htmlFor="direction-toggle">Mostrar información de dirección</Label>
        </div>

        {/*viewAddress && user.has_address ? (
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
        ) : !user.has_address && viewAddress ? (
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
        )*/}
      </CardContent >
      <CardFooter className="flex justify-end">
        <SignOutButton>
          <Button variant="destructive">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </SignOutButton>
      </CardFooter>
    </Card >
  )
}

