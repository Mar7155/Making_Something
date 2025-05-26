import type { User } from "../types/user"
import { USERS_API_URL } from "@/lib/utils"

export const getUser = async (email: string, pass: string): Promise<User> => {
    const res = await fetch(`${USERS_API_URL}/users/getUser`)
    if (!res.ok) throw new Error("Error al obtener el usuario")
    return res.json()
}

export const createUser = async (user: User) => {
    const res = await fetch(`${USERS_API_URL}/users/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })

    if (!res.ok) {
        return res.json().then((data) => {
            data.message
        })
    }

    const data = await res.json()
    return data.message
}

export const updateUser = async (user: User) => {
    const userInfo = {
        id: user.id,
        clerk_id: user.clerk_id,
        name: user.name,
        email: user.email,
        has_address: user.has_address      
    }
    const response = await fetch(`${USERS_API_URL}/updateUser`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    })

    if (!response.ok) {
        return JSON.stringify({message: "Ocurrió un error, vuelve a intentaro más tarde"})
    }

    return JSON.stringify({message: "Usuario actualizado correctamente"})
}

export const deleteUser = async (userId: string) => {
    const res = await fetch(`${USERS_API_URL}/deleteUser`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    })

    if (!res.ok) {
        return JSON.stringify({message: "Ocurrió un error, vuelve a intentaro más tarde"})
    }

    return JSON.stringify({message: "Usuario eliminado correctamente"})
    
}

export const logoutUser = async (userId: string) => {
    const res = await fetch(`${USERS_API_URL}/logoutUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    })

    if (!res.ok) {
        return JSON.stringify({message: "Ocurrió un error, vuelve a intentaro más tarde"})
    }

    return JSON.stringify({message: "Sesión cerrada"})
}

export const getUserInLocalStorage = (): User | false => {
    if (localStorage.getItem("user")) {
        const storedUser: User = JSON.parse(localStorage.getItem("user") || "")

        if (storedUser.has_address == false) {
            storedUser.address = {
                street: "",
                no_ext: 999,
                no_int: 999,
                cologne: "",
                zip_code: 99999,
                city: "",
                state: "",
            }
        }
        return storedUser
    }
    return false
}

export const setUserInLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const removeUserInLocalStorage = () => {
    localStorage.removeItem("user")
}