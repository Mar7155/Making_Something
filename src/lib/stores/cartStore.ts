import { atom } from 'nanostores';
import type { Cart } from '../types/cart';
import type { Product } from '../types/product';
import productsList from "@/content/products/products.json";
import { succesToast, errorToast } from "@/components/ui/sonner";
import type { Order } from '../types/order';
import type { ShippingAddress } from '../types/user';
import { addOrder } from './userStore';

export const $quantity = atom(0);
export const $cart = atom<Cart>({});
export const $shipping = atom<ShippingAddress>({})

export function plusQuantity(amount: number) {
    $quantity.set($quantity.get() + amount);
}

export function minusQuantity() {
    $quantity.set($quantity.get() - 1);
}

export function setQuantity(amount: number) {
    if (amount < 0) {
        $quantity.set(0);
        return;
    }
    $quantity.set(amount);
}

export function addProduct(id: any) {

    const quantity = $quantity.get()

    if (quantity <= 0) {
        errorToast("Debes seleccionar una cantidad mayor a 0", 3000)
        return;
    }


    const item = productsList.find(product => product.slug === id);
    if (item) {

        const discount = createDiscount(quantity, item.data.price);

        const product: Product = {
            id: crypto.randomUUID(),
            product_id: item?.data.id,
            name: item?.data.name || 'Unknown Product',
            quantity: $quantity.get(),
            product_images: [],
            product_image_preview: item?.data.imagesUrl[0] || '',
            unit_price: item?.data.price || 0,
            price: item?.data.price * $quantity.get() || 0,
            discount: discount
            
        }
        const currentCart = $cart.get();
        const products = currentCart.products || [];
        $cart.set({
            ...currentCart,
            products: [...products, product],
        });
        updateSubTotal();
        updateTotal();
        $quantity.set(0);
        succesToast("Producto agregado al carrito", 3000)
    }
}

export function updateQuantity(id: string, newQuantity: number) {

    if (newQuantity <= 0) {
        return;
    }

    const currentCart = $cart.get();
    const products = currentCart.products?.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
    ) || [];
    $cart.set({
        ...currentCart,
        products,
    });
    updatePrice(currentCart, id, newQuantity)
    updateSubTotal();
    updateTotal();
}

export function deleteProduct(productId: string) {
    const currentCart = $cart.get();
    const products = currentCart.products || [];
    $cart.set({
        ...currentCart,
        products: products.filter(product => product.id !== productId),
    });
    updateSubTotal();
    updateTotal();

    succesToast("Producto eliminado del carrito", 3000)
}

export function getCartInLocalStorage() {
    const cartStoraged = localStorage.getItem('cart')
    if (cartStoraged) {
        const cartParsed = JSON.parse(cartStoraged)
        $cart.set(cartParsed)
    }
    return;
}

export function createShippingAddress(shippingAddress: ShippingAddress) {
    $shipping.set(shippingAddress)
}

export function createOrder() {
    const currentDate = new Date()
    const formatedDate = currentDate.toLocaleDateString('es-MX')
    const currentHours = currentDate.getHours()
    const currentMinutes = currentDate.getMinutes()
    const currentSeconds = currentDate.getSeconds()
    const splitedDate = formatedDate.split("/")
    const orderId = splitedDate[0] + splitedDate[1] + splitedDate[2] + currentHours + currentMinutes + currentSeconds

    const order: Order = {
        id: "ORD-" + orderId,
        cart: $cart.get(),
        total: $cart.get().total,
        status: 'pending',
        shipping_address: $shipping.get() || "",
        created_at: currentDate.toLocaleDateString(),
        updated_at: currentDate.toLocaleDateString(),
    }
    succesToast("Pedido creado exitosamente, visita tu perfil para más detalles", 3000)
    addOrder(order);
}

function updateTotal() {
    const currentCart = $cart.get();
    const subTotal = currentCart.products?.reduce((acc, product) => acc + (product.price || 0), 0) || 0;
    const cartDiscount = currentCart.products?.reduce((acc, product) => acc + (product.discount || 0), 0) || 0;
    const cartTotal = subTotal - cartDiscount;
    $cart.set({
        ...currentCart,
        total: cartTotal,
        discount: cartDiscount
    });
    localStorage.setItem('cart', JSON.stringify($cart.get()));
}

function updateSubTotal() {
    const currrentCart = $cart.get();
    const sub_total = currrentCart.products?.reduce((acc, product) => acc + (product.price || 0), 0) || 0;
    $cart.set({
        ...currrentCart,
        sub_total: sub_total,
    });
}

function updatePrice(currentCart: Cart, id: string, quantity: number) {
    const products = currentCart.products?.map((item) => {
        if (item.id === id) {
            const unit_price = typeof item.unit_price === 'number' ? item.unit_price : 0;
            const discount = createDiscount(quantity, unit_price)
            return { 
                ...item, 
                price: unit_price * quantity, 
                quantity, 
                discount: discount
            };
        }
        return item;
    }) || [];
    $cart.set({
        ...currentCart,
        products,
    });
}

function createDiscount(quantity: number, unit_price: number) {
    switch (unit_price) {
        case 25:
            if (quantity >= 10 && quantity <= 29) {
                const discount = 5 * quantity;
                return discount;
            }
            if (quantity >= 30 && quantity <= 49) {
                const discount = 10 * quantity;
                return discount;
            }
            if (quantity >= 50) {
                const discount = 15 * quantity;
                return discount;
            }
            break;
        case 15:
            if (quantity >= 20) {
                const discount = 5 * quantity;
                return discount;
            }
            else {
                return 0;
            }
        default:
            return 0
    }
}