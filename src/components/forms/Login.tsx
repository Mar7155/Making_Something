import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { loginSchema } from "@/lib/schemas/login-schema";
import { useState } from "react";


type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC<any> = () => {

    const [error, setError] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);
    
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {

        try {
            const response = await fetch(`http://localhost:3435/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const data = await response.json();
            if (!response.ok) {
                setIsError(true);
                setError(data.message);
                return;
            }
            localStorage.setItem("user", JSON.stringify(data.user));

        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-6 bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow rounded-md">
                <h1 className="text-4xl font-extrabold text-center mb-6">Login</h1>
                <div className="flex flex-col pb-10 items-center justify-center">
                    <a href="/" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
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
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa tu nombre de usuario o correo" {...field} />
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Ingresa tu contraseña" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {isError ? (
                            <div className="flex justify-center py-2 rounded-md text-red-500 bg-red-200">{error}</div>
                        ):(
                            <div className="flex justify-center py-2"></div>
                        )}

                        <Button type="submit" className="w-full mt-4 bg-red-500 hover:cursor-pointer hover:bg-red-600 transition duration-300" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Enviando..." : "Iniciar Sesión"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Login;