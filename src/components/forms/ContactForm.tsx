import React, { useState } from "react";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton.tsx";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form.tsx"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form.tsx";
import { Input } from "../ui/input.tsx";

const formSchema = z.object({
  name: z.string().min(4, "El nombre debe tener almenos 3 caracteres"),
  email: z.string().email(),
  message: z.string().min(10, "El mensaje debe tener almenos 10 caracteres"),
})

function ContactForm() {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full max-w-md mx-auto border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-8 py-12 border-2 rounded-lg bg-gray-100 shadow-lg">
          <h2 className="flex justify-center text-4xl font-extrabold">Contacto</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asunto</FormLabel>
                <FormControl>
                  <Input placeholder="Escribe algo" {...field} />
                </FormControl>
                <FormDescription>
                  Escribe el asunto de tu mensaje. ^^
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="correo@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Escribe tu correo electronico para poder responderte. ^^ 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Input placeholder="Escribe tu mensaje" {...field} />
                </FormControl>
                <FormDescription>
                  Cuentanos que servicio o producto te interesa. ^^
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <SecondaryButton text="enviar" color="bg-blue-400"></SecondaryButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ContactForm;
