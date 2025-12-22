import { CalendarDays, MapPin, Truck, Package, ShoppingBag, User as UserIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "../ui/custom-card";
import { Button } from "../ui/button";
import { useOrderInfo } from "@/hooks/useOrderInfo";
import { OrderStatus } from "@/lib/types";

// Helper para convertir el Integer Status a Texto
const getOrderStatusInfo = (status: number) => {
    switch (status) {
        case OrderStatus.PENDING: // 1
            return { label: "Pendiente de Pago", variant: "pending" as const };
        case OrderStatus.PAID:    // 2
            return { label: "Pagado", variant: "default" as const };
        case OrderStatus.PROCESSING: // 3
            return { label: "En Producción", variant: "pending" as const }; // Impresión 3D/Pines
        case OrderStatus.SHIPPED: // 4
            return { label: "Enviado", variant: "shipped" as const };
        case OrderStatus.COMPLETED: // 5
            return { label: "Entregado", variant: "completed" as const };
        case OrderStatus.CANCELLED: // 99
            return { label: "Cancelado", variant: "cancelled" as const };
        default:
            return { label: "Desconocido", variant: "secondary" as const };
    }
};

// Formateador de moneda
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
};

// Formateador de fecha
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

function OrdersInfo() {
    // Asegúrate que tu hook useOrderInfo retorne OrderWithDetails[]
    const { userOrders, loadingOrders } = useOrderInfo();

    return (
        <>
            {loadingOrders ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
                </div>
            ) : userOrders.length > 0 ? (
                <ul className="space-y-6">
                    {userOrders.map((order) => {
                        const statusInfo = getOrderStatusInfo(order.status);
                        // Supabase suele devolver shipment como array, tomamos el primero si existe
                        const tracking = order.shipment?.[0]?.tracking_number;

                        return (
                            <li key={order.id}>
                                <Card className="w-full mx-auto overflow-hidden">
                                    <CardHeader className="bg-gray-50/50 dark:bg-gray-900/50 pb-4">
                                        <div className="flex items-center justify-between">
                                            <Badge variant={statusInfo.variant}>
                                                {statusInfo.label}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground font-mono">
                                                ID: {order.id.slice(0, 8)}...
                                            </span>
                                        </div>
                                    </CardHeader>
                                    
                                    <CardContent className="px-6 py-6">
                                        {/* Header Row */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    Pedido realizado
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                    <CalendarDays className="h-3 w-3" />
                                                    <span>{formatDate(order.created_at)}</span>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-2xl font-bold text-primary">
                                                    {formatCurrency(order.amount)}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Total MXN
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            {/* Left Column - Info */}
                                            <div className="space-y-6">
                                                {/* Shipping Address */}
                                                <div>
                                                    <h4 className="font-medium text-xs text-muted-foreground mb-2 flex items-center gap-1 uppercase tracking-wider">
                                                        <MapPin className="h-3 w-3" />
                                                        Dirección de Envío
                                                    </h4>
                                                    {order.shipping_address ? (
                                                        <div className="text-sm leading-relaxed">
                                                            <p className="font-medium text-gray-900 dark:text-gray-100">
                                                                {order.shipping_address.street} {order.shipping_address.ext_num}
                                                            </p>
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                {order.shipping_address.district}, {order.shipping_address.city}
                                                            </p>
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                CP {order.shipping_address.zip_code}, {order.shipping_address.state}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground italic">Sin dirección asignada</p>
                                                    )}
                                                </div>

                                                {/* Tracking */}
                                                {tracking && (
                                                    <div>
                                                        <h4 className="font-medium text-xs text-muted-foreground mb-2 flex items-center gap-1 uppercase tracking-wider">
                                                            <Truck className="h-3 w-3" />
                                                            Rastreo
                                                        </h4>
                                                        <p className="font-mono text-sm font-medium text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">
                                                            {tracking}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Middle Column - Items */}
                                            <div className="lg:col-span-2">
                                                <h4 className="font-medium text-xs text-muted-foreground mb-3 flex items-center gap-1 uppercase tracking-wider">
                                                    <Package className="h-3 w-3" />
                                                    Productos ({order.items.length})
                                                </h4>
                                                <div className="space-y-3">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                                                            <div className="flex gap-3">
                                                                {/* Imagen del producto */}
                                                                <div className="h-16 w-16 rounded-md overflow-hidden bg-white border shrink-0">
                                                                    {item.product?.preview_image_url ? (
                                                                        <img 
                                                                            src={item.product.preview_image_url} 
                                                                            alt={item.product.name}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                                            <Package className="h-6 w-6" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                
                                                                <div>
                                                                    <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                                                        {item.product?.name || "Producto desconocido"}
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground mt-1">
                                                                        Cantidad: <span className="font-medium text-gray-700 dark:text-gray-300">{item.quantity}</span>
                                                                    </p>
                                                                    {/* Indicador de Personalización */}
                                                                    {item.customization_data && (
                                                                        <Badge variant="outline" className="mt-2 text-[10px] px-1 py-0 h-5">
                                                                            Personalizado
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="text-right">
                                                                <p className="font-medium text-sm">
                                                                    {formatCurrency(item.amount * item.quantity)}
                                                                </p>
                                                                <p className="text-[10px] text-muted-foreground">
                                                                    {formatCurrency(item.amount)} c/u
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    
                                    {/* Footer Actions */}
                                    <CardFooter className="justify-end bg-gray-50/30 dark:bg-gray-900/30 px-6 py-4">
                                        <CardAction>
                                            <a href={`https://wa.me/52XXXXXXXXXX?text=Hola, tengo duda con mi pedido #${order.id.slice(0,5)}`} target="_blank" rel="noreferrer">
                                                <Button variant="outline" size="sm">
                                                    Ayuda con mi pedido
                                                </Button>
                                            </a>
                                        </CardAction>
                                    </CardFooter>
                                </Card>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 border border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">No tienes pedidos aún</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                        Parece que no has realizado ninguna compra de pines o impresiones 3D.
                    </p>
                    <a href="/Products">
                        <Button variant="primary">
                            Ver Catálogo
                        </Button>
                    </a>
                </div>
            )}
        </>
    );
}

export default OrdersInfo;