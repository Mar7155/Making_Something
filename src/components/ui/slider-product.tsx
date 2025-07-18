import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel.tsx"
import { useRef } from "react"

interface imagesProps {
    productImages: string[]
}

export function SliderProduct({productImages}: imagesProps) {

    const carouselRef = useRef<HTMLDivElement>(null)

    const onImageClick = (index: number) => {
        const container = carouselRef.current
        if (!container) return
        
        const slide = container.querySelectorAll("[data-slide]")[index] as HTMLElement; 
        if (slide) {   
            
            slide.scrollIntoView({block:"center", inline:"start"});
        }
    }

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,

            }} 
            ref={carouselRef}
            className="w-full max-w-xs hover:cursor-grab">
            <CarouselContent>
                {productImages.map((img, index) => (
                    <CarouselItem key={index} data-slide>
                        <div className="p-1">
                            <img className="rounded-sm" src={img}></img>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-center items-center gap-1 pt-4">
                {productImages.map((img, index) => (
                    <button key={index} onClick={() => onImageClick(index)} className="flex justify-center items-center border-1 border-gray-300 shadow-sm h-10 w-10 rounded-xs hover:cursor-pointer">
                        <img  
                            src={img}  
                            alt="imagen para seleccion en el carrusel" 
                            className="opacity-60 hover:opacity-100 transition-opacity duration-200 h-full w-full object-cover rounded-xs"
                        />
                    </button>
                ))}                
            </div>
        </Carousel>
    )
}
