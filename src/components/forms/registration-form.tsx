import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { registrationSchema, type RegistrationFormValues } from "@/lib/schemas/registration-schema.ts"
import { BASE_URL } from "@/lib/utils.ts"

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      insertAddress: false,
      direction: {
        calle: "",
        numeroExterior: 0,
        numeroInterior: 0,
        colonia: "",
        codigoPostal: 0,
        ciudad: "",
        estado: "",
      },
    },
  })

  const showAddress = form.watch("insertAddress")

  const mexicoStates = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Ciudad de México",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ]

  const onSubmit = async (data: RegistrationFormValues) => {

    if (data.insertAddress) {
      try {
        const response = await fetch(`${BASE_URL}/createUserWithAddress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
  
        const resData = await response.json()
        if (!response.ok) {
          console.log("Error en la respuesta del servidor: " + resData.message);
          return
        }

        form.reset()
      } catch (error) {
        console.error("Error al registrarse: ", error)
      }
    }
    
    if (!data.insertAddress) {
      try {
        const response = await fetch(`http://localhost:3435/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
  
        const resData = await response.json()
        if (!response.ok) {
          console.log("Error en la respuesta del servidor: " + resData.message);
          return
        }
  
        console.log("Registro exitoso")
        form.reset()
      } catch (error) {
        console.error("Error al registrar:", error)
      }
    }
  }

  return (
    <>
    <div className="container">
      <div className="flex items-center justify-center mb-6">
        <h1>Pagina de prueba, profavor asegurese de no insertar datos reales ^^ </h1>
      </div>
    </div><Card className="border-0 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-shadow rounded-md">
        <CardHeader>
          <div className="flex justify-center items-center flex-col">
            <CardTitle className="text-4xl font-extrabold">Registrate</CardTitle>
            <CardDescription>Por favor completa la información para crear tu cuenta</CardDescription>
            <div className="py-8 flex flex-col items-center justify-center">
              <a href="/" className="flex items-center gap-2">
                <img src="/logo.svg" alt="logo" className="w-10 h-10" />
              </a>
              <span className="text-lg font-bold">Making Something</span>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información Personal</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nombre <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa tu nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Apellidos <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa tus apellidos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Correo electrónico <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ejemplo@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Teléfono <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="10 dígitos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Contraseña <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Crea una contraseña"
                            {...field} />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              {/* Dirección (Opcional) */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="insertAddress"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-center space-x-3 space-y-0 rounded-md p-2 transition-all">
                      <FormControl>
                        <Checkbox
                          className="border-gray-400 hover:cursor-pointer"
                          checked={field.value}
                          onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="">
                        <FormLabel className="text-lg font-medium cursor-pointer">
                          Agregar información de dirección (opcional)
                        </FormLabel>
                      </div>
                    </FormItem>
                  )} />

                {showAddress && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="direction.calle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Calle</FormLabel>
                            <FormControl>
                              <Input placeholder="Nombre de la calle" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="direction.numeroExterior"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número Exterior</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />

                        <FormField
                          control={form.control}
                          name="direction.numeroInterior"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número Interior</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Apt. 4" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="direction.colonia"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Colonia</FormLabel>
                            <FormControl>
                              <Input placeholder="Nombre de la colonia" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                      <FormField
                        control={form.control}
                        name="direction.codigoPostal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Código Postal</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="direction.ciudad"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                              <Input placeholder="Nombre de la ciudad" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                      <FormField
                        control={form.control}
                        name="direction.estado"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mexicoStates.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full mt-4 bg-red-500 hover:cursor-pointer hover:bg-red-600 transition duration-300" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Enviando..." : "Registrarse"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card></>
  )
}

