import type { Address } from "../types/user"
import { ADDRESS_API_URL } from "../utils"

export const getAddress = async (address_id: string): Promise<Address> => {
    const res = await fetch(`${ADDRESS_API_URL}/users/getUser`)
    if (!res.ok) throw new Error("Error al obtener el usuario")
    return res.json()
}

export const createAddress = async (address: Address) => {
    const res = await fetch(`${ADDRESS_API_URL}/users/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
    })

    if (!res.ok) {
        return JSON.stringify({message: "Ocurrió un error, intentalo más tarde"})
    }

    const data = await res.json()
    return data
}

export const updateAddress = async (address: Address) => {
    const response = await fetch(`${ADDRESS_API_URL}/updateUser`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
    })

    if (!response.ok) {
        return JSON.stringify({message: "Ocurrió un error, vuelve a intentaro más tarde"})
    }

    return JSON.stringify({message: "Usuario actualizado correctamente"})
}

export const deleteAddress = async (userId: string) => {
    const res = await fetch(`${ADDRESS_API_URL}/deleteUser`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    })

    if (!res.ok) {
        return JSON.stringify({message: "Ocurrió un error, vuelve a intentaro más tarde"})
    }

    return JSON.stringify({message: "Usuario eliminado correctamente"})
    
}