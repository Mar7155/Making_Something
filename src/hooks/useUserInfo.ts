import { $userStore } from "@clerk/astro/client";
import type { ShippingAddress, User } from "@/lib/types/user"
import { useEffect, useState, useSyncExternalStore } from "react"
import type { Product } from "@/lib/types/product";
import type { Order } from "@/lib/types/order";
import type { Cart } from "@/lib/types/cart";

type EditType = "user" | "address"

const products_sample: Product[] = [
    {
        id: "1",
        name: "Pin 5.6cm",
        price: 250.00,
        quantity: 10,
        product_id: "1",
        unit_price: 25.00,
        product_image_preview: "/images/pin-frontal-5.6cm.webp"
    },
    {
        id: "2",
        name: "Pin 3.2cm",
        price: 150.00,
        quantity: 10,
        product_id: "2",
        unit_price: 15.00,
        product_image_preview: "/images/pin-frontal-3.2cm.webp"
    },
    {
        id: "1",
        name: "Pin 5.6cm magnetico destapador",
        price: 400.00,
        quantity: 10,
        product_id: "3",
        unit_price: 40.00,
        product_image_preview: "/images/pin-frontal-5.6cm.webp"
    }
]

const shipping_address: ShippingAddress[] = [
    {
        id: "1",
        email: "john.doe@example.com",
        full_name: "Jhon Doe",
        phone: "+1 1234567890",
        street: "av. independiente",
        no_ext: "999",
        no_int: "999",
        district: "poniente",
        zip_code: 99999,
        city: "Tulancingo",
        state: "Hidalgo",
    },
    {
        id: "2",
        email: "christine.doe@example.com",
        full_name: "Christine Doe",
        phone: "+1 1234527180",
        street: "blv. san cristobal",
        no_ext: "999",
        no_int: "999",
        district: "centro",
        zip_code: 99999,
        city: "mexicali",
        state: "Baja California",
    }
]

const carts_sample: Cart[] = [
    {
        id: "1",
        user_id: "1",
        products: [products_sample[1], products_sample[2]],
        subTotal: 400,
        tax: 0,
        total: 400,
    }
]

const orders_sample: Order[] = [
    {
        id: "ORD-2024-001",
        cart: carts_sample[0],
        total: carts_sample[0].total || 0,
        payment_method: "credit_card",
        shipping_address: shipping_address[1],
        status: "pending",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-02-15T10:30:00Z",
    }
]

const userDefault: User = {
    id: crypto.randomUUID(),
    clerk_id: crypto.randomUUID(),
    username: "John",
    email: "john.doe@example.com",
    has_address: false,
    address: [
        shipping_address[0]
    ],
    orders: [
        orders_sample[0]
    ],
    stripe_customer_id: crypto.randomUUID(),
}

export default function useUserInfo() {

    const clerkUser = useSyncExternalStore($userStore.listen, $userStore.get, $userStore.get)

    const [loading, setLoading] = useState(true)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const [viewAddress, setViewAddress] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [userInfo, setUserInfo] = useState<User>({ ...userDefault })
    const [formData, setFormData] = useState<User>({ ...userDefault })
    const [originalData, setOriginalData] = useState<User>({ ...userDefault })


    useEffect(() => {
        const fetchUserInfo = async () => {
            const user: User = {
                id: crypto.randomUUID(),
                clerk_id: clerkUser?.id || crypto.randomUUID(),
                username: clerkUser?.username || "",
                email: clerkUser?.emailAddresses[0]?.emailAddress || "",
                has_address: false,
                stripe_customer_id: "",
                address: [
                    shipping_address[0]
                ]
            }
            
            if (user) {
                setUserInfo(user)
                setFormData(user)
                setOriginalData(user)
            }
            setLoading(false)
        }
        fetchUserInfo()
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
        setIsEditingAddress(true)
    }

    const deleteAddress = () => {
        setUserInfo({
            ...userInfo,
            has_address: false,
        })
    }

    const toggleaddressVisibility = () => {
        setViewAddress(!viewAddress)
    }

    const getOrders = () => {
        if (userInfo.orders && userInfo.orders.length > 0) {
            return userInfo.orders;
        }
        else {
            return []
        }
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
        getOrders,
    }
}