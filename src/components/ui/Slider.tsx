import {Swiper, SwiperSlide} from "swiper/react";
import "/node_modules/swiper/swiper-bundle.css";
import Card from "./preview-card";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Slider() {
    return (
        <>
            <Swiper className="mySwiper z-10"
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                //autoplay={{ delay:5000 }}
                tabIndex={10}
            >
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