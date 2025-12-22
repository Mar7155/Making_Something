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
            variant="primary"
        >
            Agregar al carrito
        </Button>
    )
}

export default AddCartButton