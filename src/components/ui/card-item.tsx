import type { Product } from '@/lib/types/product'
import { Card } from './card'
import { Button } from './button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Input } from './input'
import { deleteProduct, updateQuantity } from '@/lib/stores/cartStore'

function cardItem(item: Product) {
    return (
        <Card className="p-4">
            <div className="flex items-start space-x-4">
                <img
                    src={item.product_image_preview || '/placeholder.png'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                />
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight">{item.name}</h3>
                    <p className=" font-semibold text-primary mt-1">${item.unit_price?.toFixed(2)}</p>
                </div>
                <Button
                    onClick={() => deleteProduct(item.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:cursor-pointer"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        variant="outline"
                        size="icon"
                        className="hidden lg:flex h-8 w-8 hover:cursor-pointer"
                    >
                        <Minus className="w-3 h-3" />
                    </Button>
                    <Input
                        type="number"
                        min={0}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-full md:w-1/3 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]" />
                    <Button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        variant="outline"
                        size="icon"
                        className="hidden lg:flex h-8 w-8 hover:cursor-pointer"
                    >
                        <Plus className="w-3 h-3" />
                    </Button>
                </div>
                <div className="flex justify-end items-center">
                    <span className='font-bold'>${item.price?.toFixed(2)}</span>
                </div>
            </div>
        </Card>
    )
}

export default cardItem