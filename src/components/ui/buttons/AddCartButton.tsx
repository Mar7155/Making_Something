import { addProduct } from '@/lib/stores/cartStore';
import { Button } from '../button'

interface AddCartButtonProps {
    id: string;
}

const AddCartButton: React.FC<AddCartButtonProps> = ({ id }) => {

    const addToCart = () => {
        addProduct(id)
    }

    return (
        <Button
            onClick={addToCart}
            className="px-6 py-2 w-full text-black rounded-sm bg-amber-400 hover:bg-amber-600 hover:cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition"
        >
            Agregar al carrito
        </Button>
    )
}

export default AddCartButton