import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { shippingSchema, type ShippingFormValues } from '@/lib/schemas/shipping-schema'
import { Button } from '../ui/button'

function shippingForm() {

    const shippingForm = useForm<ShippingFormValues>({
        resolver: zodResolver(shippingSchema),
        defaultValues: {
            full_name: '',
            email: '',
            phone: NaN,
            street: '',
            num_ext: '',
            num_int: NaN,
            district: '',
            zip_code: NaN,
            city: '',
            state: ''
        }
    })

    const mexicoStates = [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Chiapas",
        "Chihuahua",
        "Coahuila",
        "Colima",
        "Ciudad de México",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "México",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas",
    ]

    const userAddress = [
        {
            id: 1,
            address_name: 'test',
            direccion: {
                full_name: 'test',
                email: 'test@gmail.com',
                phone: 7771234567,
                street: 'test street',
                num_ext: '120',
                num_int: 0,
                district: 'centro',
                zip_code: 78902,
                city: 'montecarlo',
                state: 'Aguascalientes'
            }
        },
        {
            id: 2,
            address_name: 'test2',
            direccion: {
                full_name: 'test2',
                email: 'test2@gmail.com',
                phone: 7743933967,
                street: 'test street 2',
                num_ext: '120',
                num_int: 120,
                district: 'valle',
                zip_code: 78902,
                city: 'guanajuato',
                state: 'Guanajuato'
            }
        }
    ]

    function selectAddress(address: any) {
        const parsedAddress = JSON.parse(address);
        shippingForm.reset(parsedAddress);
    }

    function onSubmit(values: ShippingFormValues) {
        console.log("Enviando información de envío:", values);

    }

    return (
        <Card className='justify-around'>
            <CardHeader>
                <CardTitle className='text-center'>Ingresa tu información de envio</CardTitle>

                {userAddress.length > 0 && (
                    <div className='flex justify-end'>
                        <Select onValueChange={selectAddress}>
                            <SelectTrigger>
                                <SelectValue placeholder="Direcciones guardadas" />
                            </SelectTrigger>
                            <SelectContent>
                                {userAddress.map((address) => (
                                    <SelectItem key={address.id} value={JSON.stringify(address.direccion)}>
                                        {address.address_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </CardHeader>
            <Form {...shippingForm}>
                <form onSubmit={shippingForm.handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="space-y-4">
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={shippingForm.control}
                                    name='full_name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nombre completo <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Tu nombre completo' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                </FormField>
                                <FormField
                                    control={shippingForm.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Correo Electrónico <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder='Tu correo electrónico' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={shippingForm.control}
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Número de contacto <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type='number' 
                                                    placeholder='+52 *** *** ****' 
                                                    className='[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={shippingForm.control}
                                    name="street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Calle <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nombre de la calle" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={shippingForm.control}
                                        name="num_ext"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Número Exterior <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="123" {...field}
                                                        className='[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                    <FormField
                                        control={shippingForm.control}
                                        name="num_int"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Número Interior
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Apt. 4" {...field} 
                                                        className='[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'    
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={shippingForm.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Colonia <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nombre de la colonia" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={shippingForm.control}
                                    name="zip_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Código Postal <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="12345" {...field} 
                                                    className='[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={shippingForm.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Ciudad <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nombre de la ciudad" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                <FormField
                                    control={shippingForm.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Estado <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un estado" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {mexicoStates.map((state) => (
                                                        <SelectItem key={state} value={state}>
                                                            {state}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='pt-8'>
                        <CardAction>
                            <Button
                                type='submit'
                                variant={'primary'}
                                disabled={shippingForm.formState.isSubmitting}>
                                {shippingForm.formState.isSubmitting ? "Calculando" : "Calcular envío"}
                            </Button>
                        </CardAction>
                    </CardFooter>
                </form>
            </Form>
        </Card >
    )
}

export default shippingForm