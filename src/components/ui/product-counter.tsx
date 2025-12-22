import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./input";
import { useStore } from "@nanostores/react";
import { $quantity, plusQuantity, minusQuantity, setQuantity } from "@/lib/stores/cartStore";

const counter = () => {

    const quantity = useStore($quantity);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            if (value < 0){
                setQuantity(0);
                return;
            }
            setQuantity(value);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <Button
                    onClick={() => minusQuantity()}
                    variant="functions"
                >
                    <Minus color="black" />
                </Button>
                <Input
                    type="number"
                    min={0}
                    defaultValue={0}
                    value={quantity}
                    onChange={(e) => handleChange(e)}
                    className="w-1/3 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                <Button
                    onClick={() => plusQuantity(1)}
                    variant="functions"
                >
                    <Plus color="black" />
                </Button>
            </div>
            <div className="flex justify-center items-center gap-2">
                <Button
                    onClick={() => plusQuantity(10)}
                    variant="functions"
                >
                    <Plus color="black" />10
                </Button>
                <Button
                onClick={() => plusQuantity(30)}
                    variant="functions"
                >
                    <Plus color="black" />30
                </Button>
                <Button
                    onClick={() => plusQuantity(50)}
                    variant="functions"
                >
                    <Plus color="black" />50
                </Button>
            </div>
        </>
    )
}

export default counter