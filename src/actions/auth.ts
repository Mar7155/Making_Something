"use server"

import { registrationSchema, type RegistrationFormValues } from "@/lib/validations/registration-schema"

export async function registerUser(formData: RegistrationFormValues) {
  // Validar los datos del formulario con Zod
  const validatedFields = registrationSchema.safeParse(formData)

  // Si hay errores de validación, retornar temprano
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error de validación en el formulario",
    }
  }

  try {
    // Aquí iría la lógica para guardar el usuario en la base de datos
    // Por ejemplo:
    // await db.user.create({
    //   data: {
    //     name: validatedFields.data.nombre,
    //     lastName: validatedFields.data.apellidos,
    //     email: validatedFields.data.correo,
    //     password: await hashPassword(validatedFields.data.password),
    //     phone: validatedFields.data.telefono,
    //     // Procesar dirección si existe
    //     ...(validatedFields.data.showAddress && {
    //       address: {
    //         create: {
    //           street: validatedFields.data.direccion?.calle,
    //           exteriorNumber: validatedFields.data.direccion?.numeroExterior,
    //           interiorNumber: validatedFields.data.direccion?.numeroInterior,
    //           neighborhood: validatedFields.data.direccion?.colonia,
    //           postalCode: validatedFields.data.direccion?.codigoPostal,
    //           city: validatedFields.data.direccion?.ciudad,
    //           state: validatedFields.data.direccion?.estado,
    //         }
    //       }
    //     })
    //   }
    // })

    // Simulación de registro exitoso
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Usuario registrado exitosamente",
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return {
      success: false,
      message: "Error al registrar usuario. Por favor intenta de nuevo.",
    }
  }
}

