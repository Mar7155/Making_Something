import {Swiper, SwiperSlide} from "swiper/react";
import 'Swiper/css';
import Card from "./preview-card";

export default function Slider() {
    return (
        <>
            <Swiper className="mySwiper z-10">
                <SwiperSlide className="py-18">
                    <Card 
                        title={"producto 1"} 
                        description={"lorem ipsum dolor nose nose nose"}
                    />
                </SwiperSlide>
                <SwiperSlide className="px-10 py-18">
                    <Card 
                        title={"producto 1"} 
                        description={"lorem ipsum dolor nose nose nose"}
                    />
                </SwiperSlide>
                <SwiperSlide className="px-10 py-18">
                    <Card 
                        title={"producto 1"} 
                        description={"lorem ipsum dolor nose nose nose"}
                    />
                </SwiperSlide>
                <SwiperSlide className="px-10 py-18">
                    <Card 
                        title={"producto 1"} 
                        description={"lorem ipsum dolor nose nose nose"}
                    />
                </SwiperSlide>
                <SwiperSlide className="px-10 py-18">
                    <Card 
                        title={"producto 1"} 
                        description={"lorem ipsum dolor nose nose nose"}
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}