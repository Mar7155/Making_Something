import type { Order } from "@/lib/types/order";
import { CalendarDays, MapPin, Truck, Package, ShoppingBag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getOrders } from "@/lib/stores/userStore";
import useUserInfo from "@/hooks/useUserInfo";
import { Button } from "../ui/button";

const getPaymentMethodText = (method?: Order["payment_method"]) => {
    switch (method) {
        case "credit_card":
            return "Tarjeta de Crédito"
        case "paypal":
            return "PayPal"
        case "bank_transfer":
            return "Transferencia Bancaria"
        case "cash":
            return "Pago En Efectivo"
        default:
            return "Sin confirmar"
    }
}

const getOrderStatus = (status: Order["status"]) => {
    switch (status) {
        case "completed":
            return "completado"
        case "pending":
            return "pendiente"
        case "cancelled":
            return "cancelado"
        default:
            return "no especificado"
    }
}

function OrdersInfo() {

    const { loading } = useUserInfo();

    const userOrders: Order[] = getOrders()

    return (
        <>
            {
                userOrders.length > 0 && !loading ? (
                    <ul className="space-y-4">
                        {userOrders.map((order) => (
                            <li key={order.id}>
                                <Card className="w-full mx-auto">
                                    <CardHeader>
                                        <Badge variant={order.status}>
                                            {getOrderStatus(order.status)}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="px-6">
                                        {/* Header Row */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        Pedido #{order.id}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <CalendarDays className="h-3 w-3" />
                                                        <span>{order.created_at}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold">
                                                    {" "}
                                                    ${order.total?.toFixed(2)}{" "}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {" "}{getPaymentMethodText(order.payment_method)}{" "}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Main Content Grid */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            {/* Left Column - Customer & Shipping */}
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        ENVÍO
                                                    </h4>
                                                    {/* Shipping Address */}
                                                    {order.shipping_address?.city === undefined ? (
                                                        <div className="text-sm">
                                                            <p>Sin información de envío</p>
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm">
                                                            <p>{order.shipping_address.street}</p>
                                                            <p>
                                                                {order.shipping_address.city}{" "}
                                                                {order.shipping_address.zip_code}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Customer Info */}
                                                <div>
                                                    <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-1">
                                                        <User className="h-3 w-3" />
                                                        CLIENTE
                                                    </h4>
                                                    {order.shipping_address?.full_name === undefined ? (
                                                        <div className="text-sm">
                                                            <p>Sin información de cliente</p>
                                                        </div>
                                                    ) : (

                                                        <div>
                                                            <p className="font-medium">
                                                                {order.shipping_address?.full_name || ""}                                                       </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {order.shipping_address?.full_name}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tracking */}
                                                {order.tracking_number && (
                                                    <div>
                                                        <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center gap-1">
                                                            <Truck className="h-3 w-3" />
                                                            SEGUIMIENTO
                                                        </h4>
                                                        <p className="font-mono text-sm font-medium text-blue-600">
                                                            {order.tracking_number}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Middle Column - Products */}
                                            <div className="lg:col-span-2">
                                                <h4 className="font-medium text-sm text-muted-foreground mb-3 flex items-center gap-1">
                                                    <Package className="h-3 w-3" />
                                                    PRODUCTOS (
                                                    {order.cart?.products?.length})
                                                </h4>
                                                <div className="space-y-2">
                                                    {order.cart?.products?.map(
                                                        (item) => (
                                                            <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <picture>
                                                                        <img className="w-16 h-16 object-cover rounded-md border" src={item.product_image_preview} alt="Imagen previa del producto" />
                                                                    </picture>
                                                                    <div>
                                                                        <p className="font-medium text-sm">
                                                                            {item.name}
                                                                        </p>
                                                                        <p className="text-xs text-muted-foreground">
                                                                            Cantidad:{" "}{item.quantity}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="font-medium text-sm">
                                                                        $
                                                                        {(
                                                                            (item.unit_price !==
                                                                                undefined
                                                                                ? item.unit_price
                                                                                : item.price !==
                                                                                    undefined
                                                                                    ? item.price
                                                                                    : 0) *
                                                                            item.quantity
                                                                        ).toFixed(
                                                                            2,
                                                                        )}
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        $
                                                                        {item.unit_price?.toFixed(
                                                                            2,
                                                                        )}{" "}
                                                                        c/u
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="justify-end">
                                        <CardAction>
                                            <a href="https://wa.me/qr/AHFH55RNIGJ4J1" target="_blank">
                                                <Button variant={"primary"}>Personalizar</Button>
                                            </a>
                                        </CardAction>
                                    </CardFooter>
                                </Card>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <p className="text-gray-600">No tienes pedidos aún.</p>
                        <div className="pt-4">
                            <ShoppingBag className="text-gray-600"></ShoppingBag>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default OrdersInfo