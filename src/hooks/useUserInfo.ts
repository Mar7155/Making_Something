import type { User } from "@/lib/types/user"
import { useEffect, useState, useSyncExternalStore } from "react"
import { $userStore } from "@clerk/astro/client";

type EditType = "user" | "address"

const userDefault: User = {
    id: crypto.randomUUID(),
    clerk_id: crypto.randomUUID(),
    name: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    has_address: false,
    address: {
        street: "",
        no_ext: 999,
        no_int: 999,
        cologne: "",
        zip_code: 99999,
        city: "",
        state: "",
    },
    stripe_customer_id: crypto.randomUUID(),
}

export default function useUserInfo() {


    const [loading, setLoading] = useState(true)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const [viewAddress, setViewAddress] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [userInfo, setUserInfo] = useState<User>({ ...userDefault })
    const [formData, setFormData] = useState<User>({ ...userDefault })
    const [originalData, setOriginalData] = useState<User>({ ...userDefault })

    const user = useSyncExternalStore($userStore.listen, $userStore.get, $userStore.get)

    console.log(user?.id);
    

    useEffect(() => {
        setLoading(false)
    }, [])

    const saveChanges = (type: EditType) => {

        setFormData({ ...formData })
        setOriginalData({ ...formData })
        setUserInfo({ ...formData })

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
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    street: prev.address?.street ?? "",
                    no_ext: prev.address?.no_ext ?? 0,
                    no_int: prev.address?.no_int ?? 0,
                    cologne: prev.address?.cologne ?? "",
                    zip_code: prev.address?.zip_code ?? 0,
                    city: prev.address?.city ?? "",
                    state: prev.address?.state ?? "",
                    [addressField]: value
                }
            }))
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
        setUserInfo({ ...userInfo, has_address: true })
        setFormData((prev) => ({
            ...prev,
            has_address: true,
            address: {
                street: "",
                no_ext: 0,
                no_int: 0,
                cologne: "",
                zip_code: 0,
                city: "",
                state: "",
            }
        }))
        setIsEditingAddress(true)
    }

    const deleteAddress = () => {
        setUserInfo({
            ...userInfo,
            has_address: false,
            address: {}
        })

        setFormData((prev) => ({
            ...prev,
            has_address: false,
            address: {
                street: "",
                no_ext: 0,
                no_int: 0,
                cologne: "",
                zip_code: 0,
                city: "",
                state: "",
            }
        }))
    }

    const toggleaddressVisibility = () => {
        setViewAddress(!viewAddress)
    }

    return {
        userInfo,
        formData,
        originalData,
        isEditingUser,
        isEditingAddress,
        loading,
        viewAddress,
        error,
        handleChange,
        saveChanges,
        startEditing,
        cancelEditing,
        AddAddress,
        deleteAddress,
        toggleaddressVisibility,
    }
}