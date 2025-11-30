import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { loginSchema } from "@/lib/schemas/login-schema";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/db/supabaseClient";

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC<any> = () => {

    const [message, setMessage] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

    const [isError, setIsError] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsError(false);
        setMessage(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                console.error("Error de Supabase:", error.message);
                setIsError(true);
                // Supabase a veces devuelve "Invalid login credentials" que podemos traducir
                setMessage(error.message === "Invalid login credentials"
                    ? { type: "error", message: "Correo o contraseña incorrectos" }
                    : { type: "error", message: "Error al iniciar sesion" });
                return;
            }
            setMessage({ type: "success", message: "Inicio de sesión exitoso ^^. Redirigiendop..." });
            setTimeout(() => {
                window.location.href = "/";
            }, 3000)

        } catch (err) {
            setIsError(true);
            setMessage({ type: "error", message: "Ocurrió un error inesperado al iniciar sesión." });
        }
    };

    return (
        <div className="flex items-center justify-center container min-h-screen px-2">
            <div className="w-full max-w-md p-6 bg-white lg:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow rounded-md">
                <h1 className="text-4xl font-extrabold text-center mb-6">Login</h1>
                <div className="flex flex-col pb-10 items-center justify-center">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="logo de making something" className="w-10 h-10" />
                    </a>
                    <span className="text-lg font-bold">Making Something</span>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa tu correo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Ingresa tu contraseña" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

                        <Button type="submit" className="w-full mt-4 bg-red-500 hover:cursor-pointer hover:bg-red-600 transition duration-300" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader2 className="animate-spin duration-300" /> : "Iniciar Sesión"}
                        </Button>
                    </form>
                </Form>
                <div className="p-2 flex items-center justify-center underline text-sky-700">
                    <a href="/Register">Crear cuenta</a>
                </div>
            </div>
        </div>
    );
}

export default Login;