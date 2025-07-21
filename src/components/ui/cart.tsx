import { ShoppingCart, X } from 'lucide-react'
import { Button } from './button'
import { Separator } from '@radix-ui/react-select'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { $cart, getCartInLocalStorage } from '@/lib/stores/cartStore'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'
import CardItem from '@/components/ui/card-item'

const cart = () => {

  useEffect(() => {
    getCartInLocalStorage();
    initCart();

    function openCart() {
      const overlay = document.getElementById("sidebar-overlay");

      const cart = document.getElementById("cart");
      cart?.classList.remove("translate-x-full");
      overlay?.classList.remove("opacity-0", "invisible");
      overlay?.classList.add("opacity-50", "visible");
      document.body.style.overflow = "hidden";
    }

    function closeCart() {
      const overlay = document.getElementById("sidebar-overlay");
      const cart = document.getElementById("cart");
      cart?.classList.add("translate-x-full");
      overlay?.classList.remove("opacity-100", "visible");
      overlay?.classList.add("opacity-0", "invisible");
      document.body.style.overflow = "";
    }

    function initCart() {
      const cart = document.getElementById("cart");
      const openCartBtn = document.getElementById("open-cart");
      const closeCartBtn = document.getElementById("close-cart");
      const overlay = document.getElementById("sidebar-overlay");

      closeCartBtn?.addEventListener("click", closeCart);
      openCartBtn?.addEventListener("click", openCart);
      overlay?.addEventListener("click", closeCart);
    }

  }, [])


  const cart = useStore($cart)
  const cartItems = cart.products || []

  return (

    <div id='cart-container'>
      <aside id='cart' className="fixed top-0 right-0 w-1/2 lg:w-[450px] h-full z-20 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out">
        <Card className="h-full rounded-none border-0 flex flex-col">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Carrito de compras</CardTitle>
            <button id='close-cart' className="p-2 rounded-lg hover:bg-gray-200 border-1 hover:border-gray-100 transition-colors duration-200 hover:cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </CardHeader>

          <Separator />

          {/* Cart Items */}
          <CardContent className="flex-1 overflow-y-auto py-6 px-2 lg:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className=" font-medium text-muted-foreground">Tu carrito está vacío</h3>
                <p className="text-sm text-muted-foreground mt-1">Agrega algunos productos para comenzar</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <CardItem
                  id={item.id}
                  name={item.name}
                  product_image_preview={item.product_image_preview}
                  unit_price={item.unit_price}
                  quantity={item.quantity}
                  price={item.price}
                  key={item.id}
                />
              ))
            )}
          </CardContent>

          {/* Footer */}
          {cartItems.length > 0 && (
            <>
              <Separator />
              <CardFooter className="flex flex-col space-y-4 p-6">
                <div className="lg:flex w-full justify-between items-end gap-2">
                  <div className="flex items-center">
                    <article className='flex flex-col justify-end'>
                      <div className='flex items-center space-x-2'>
                        <p className="text-sm text-muted-foreground">SubTotal:</p>
                        <div className="flex items-center">
                          <span className='font-bold '>${cart.sub_total?.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <p className="text-sm text-muted-foreground">Descuento:</p>
                        <div className="flex items-center">
                          <span className='font-bold '>${cart.discount?.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <p className="text-sm text-muted-foreground">Total:</p>
                        <div className="flex items-center">
                          <span className='font-bold '>${cart.total?.toFixed(2)}</span>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div className='pt-2'>
                    <p className="text-sm text-muted-foreground">
                      {cartItems.length} {cartItems.length === 1 ? "artículo" : "artículos"}
                    </p>
                  </div>
                </div>

                <a href="/Checkout" className='w-full'>
                  <Button className="w-full" variant={'primary'} size="lg">
                    Finalizar compra
                  </Button>
                </a>
              </CardFooter>
            </>
          )}
        </Card>
      </aside>
    </div>
  )
}

export default cart