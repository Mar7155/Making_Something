import type { User, UserResponse } from "@/lib/types/user"
import { useEffect, useState } from "react"
import { actions } from "astro:actions";
import { useStore } from "@nanostores/react";
import { $loading, $user } from "@/lib/stores/userStore";
import { supabase } from "@/db/supabaseClient";

type EditType = "user" | "address"
export default function useUserInfo() {

    const user = useStore($user)
    const loadingUser = useStore($loading)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const [viewAddress, setViewAddress] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<User>({})
    const [originalData, setOriginalData] = useState<User>({})

    useEffect(() => {
        const fetchUserInfo = async () => {
            $loading.set(true)
            const username = clerkUser?.username;

            if (!username) {
                return;
            }
            const result = await actions.userActions.getUser({ username });
            console.log(result);


            if (result.error) {
                setError("Failed to fetch user data");
                $loading.set(false);
                return;
            }

            // result.data could be UserResponse or an error object
            const userData = result.data as UserResponse;
            if (!userData) {
                setError("Invalid user data received");
                $loading.set(false);
                return;
            }
            console.log(userData);

            const user: User = {
                id: userData.user.id,
                clerk_id: clerkUser?.id,
                username: userData.user.username,
                email: userData.user.email,
                has_address: userData.user.has_address,
                stripe_customer_id: "",
                orders: userData.user.orders,
                address: userData.user.shippingAddresses
            }
            $user.set(user)
            setFormData(user)
            setOriginalData(user)
            $loading.set(false)
        }
        fetchUserInfo()
    }, [])

    const saveChanges = (type: EditType) => {

        setFormData({ ...formData })
        setOriginalData({ ...formData })
        $user.set({ ...formData })

        if (type === "user") {
            setIsEditingUser(false)
        }
        if (type === "address") {
            //updateUser(formData)
            setIsEditingAddress(false)
        }
    }

    const handleChange = (field: string, value: string | number | boolean) => {
        if (field.startsWith("address.")) {
            const addressField = field.split(".")[1] as keyof NonNullable<User["address"]>

        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }))
        }
    }

    const startEditing = (type: EditType) => {
        if (type === "user") {
            setIsEditingUser(true)
        }
        if (type === "address") {
            setIsEditingAddress(true)
        }
    }

    const cancelEditing = (type: EditType) => {
        if (type === "user") {
            setFormData({ ...originalData })
            setIsEditingUser(false)
        }
        if (type === "address") {
            setFormData({ ...originalData })
            setIsEditingAddress(false)
        }
    }

    const AddAddress = () => {
        $user.set({ ...$user.get(), has_address: true })
        setIsEditingAddress(true)
    }

    const deleteAddress = () => {
        $user.set({ ...$user.get(), has_address: false })
    }

    const toggleaddressVisibility = () => {
        setViewAddress(!viewAddress)
    }

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            // Éxito: Redirigir al usuario al Home
            window.location.href = "/";

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("No se pudo cerrar la sesión, intenta de nuevo.");
        }
    };

    return {
        formData,
        originalData,
        isEditingUser,
        isEditingAddress,
        viewAddress,
        error,
        user,
        loadingUser,
        logout,
        handleChange,
        saveChanges,
        startEditing,
        cancelEditing,
        AddAddress,
        deleteAddress,
        toggleaddressVisibility,
    }
}