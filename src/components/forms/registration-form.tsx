import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom-card"
import { Input } from "@/components/ui/input.tsx"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { registrationSchema, type RegistrationFormValues } from "@/lib/schemas/registration-schema.ts"
import { supabase } from "@/db/supabaseClient"

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (formData: RegistrationFormValues) => {
    setMessage(null)

    try {
      const { data: existingUser, error: usernameCheckError } = await supabase
        .from('profile')
        .select('username')
        .eq('username', formData.username)
        .maybeSingle()

      if (usernameCheckError) {
        setMessage({type: "error", message: "Error interno al verificar disponibilidad del username :("})
      }
      
      if (existingUser) {
        // Si existingUser NO es null, significa que ya existe
        form.setError("username", {
          type: "manual",
          message: "Este nombre de usuario ya está en uso."
        })
        return;
      }

      const { data: existingEmail, error: emailCheckError } = await supabase
        .from('profile')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle()

      if (emailCheckError) {
        setMessage({type: "error", message: "Error interno al verificar disponibilidad del username :("})
      }
      
      if (existingEmail) {
        // Si existingEmail NO es null, significa que ya existe
        form.setError("email", {
          type: "manual",
          message: "Este correo ya está en uso. prueba a iniciar sesión"
        })
        return;
      }

      // Intentar registrar en Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname: formData.fullname,
            username: formData.username,
          }
        }
      })

      // Manejo errores de Auth (Email duplicado)
      console.log(data, authError);
      
      if (authError) {
        // Supabase suele devolver un mensaje específico o status 422 para duplicados
        if (authError.message.includes("already registered") || authError.status === 422) {
          form.setError("email", {
            type: "manual",
            message: "Este correo electrónico ya está registrado."
          })
          return;
        }

        // Crear funcion para cualquier otro error de Auth
      }

      // ÉXITO
      setMessage({type:"success", message:"Registro completado ^^. Confirma tu email porfavor. Redirigiendo al login... en 5 segundos"})
      setTimeout(() => {
        window.location.href = "/Login"
      }, 5000)

    } catch (error: any) {
      setMessage({type:"error", message:"Ocurrió un error interno en el registro :("})
    }
  }

  return (
    <Card className="w-[450px] border-0 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow rounded-md">
      <CardHeader className="flex justify-center items-center flex-col">
        <CardTitle className="text-4xl font-extrabold">Regístrate</CardTitle>
        <CardDescription>Crea tu cuenta para empezar</CardDescription>
        <div className="py-8 flex flex-col items-center justify-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="logo" className="w-10 h-10" />
          </a>
          <span className="text-lg font-bold">Making Something</span>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">

            {/* Mensaje de Error General */}
            {message && (
              <div
                className={`border px-4 py-3 rounded relative text-sm mb-4 ${message.type === 'success'
                    ? "bg-green-100 border-green-400 text-green-700"
                    : "bg-red-100 border-red-400 text-red-700"
                  }`}
              >
                <span className="block sm:inline">{message.message}</span>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input placeholder="Ej. usuario123" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="email" placeholder="ejemplo@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="********" {...field} />
                          <Button
                            type="button" variant="ghost" size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar <span className="text-red-500">*</span></FormLabel>
                      <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div>
              <span className="text-sm">¿Ya tienes una cuenta? </span>
              <a href="/Login" className="text-sm text-sky-700 underline">Inicia sesión</a>
            </div>
            <Button
              type="submit"
              className="w-full mt-2 bg-red-500 hover:cursor-pointer hover:bg-red-600 transition duration-300"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando cuenta...
                </>
              ) : "Registrarse"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}