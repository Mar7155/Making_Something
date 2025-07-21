import { useStore } from '@nanostores/react'
import { $cart, createOrder } from '@/lib/stores/cartStore'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from './custom-card'
import CardItem from './card-item'
import { Button } from './button'
import { useEffect, useState } from 'react'

function CardOrder() {
    const cart = useStore($cart)
    const cartItems = cart.products || []

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <Card className="bg-white shadow-md rounded-lg justify-around">
            <CardHeader className='items-center'>
                <CardTitle className="text-center text-2xl">Tu pedido</CardTitle>
            </CardHeader>
            <CardContent className='h-1/3 overflow-y-auto'>
                <article>
                    <ul className="space-y-4 w-full">
                        {cartItems.map((item) => (
                            <li className="flex flex-col justify-center items-center" key={item.id}>
                                <CardItem {...item} />
                            </li>
                        ))}
                    </ul>
                </article>
            </CardContent>
            <CardFooter className='flex-col gap-4'>
                <article className="flex flex-col justify-end space-y-4 w-full">
                    <div className="flex justify-between">
                        <span className="font-medium">SubTotal:</span>
                        <span className="font-bold">${cart.sub_total?.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className="font-medium">Descuento:</span>
                        <span className="font-bold">${cart.discount?.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">${cart.total?.toFixed(2)}</span>
                    </div>
                </article>
                <CardAction>
                    <Button variant='primary' onClick={createOrder}>
                        Confirmar Pedido
                    </Button>
                </CardAction>
            </CardFooter>
        </Card>
    )
}

export default CardOrder
