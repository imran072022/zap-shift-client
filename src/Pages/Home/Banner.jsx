import React from "react";
import "swiper/css"; //required (1)
import "swiper/css/effect-fade"; // required for effect
import "swiper/css/pagination";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import { Swiper, SwiperSlide } from "swiper/react"; //required (2)
import { Autoplay, EffectFade, Pagination } from "swiper/modules"; //required (3)
import arrowIcon from "../../assets/arrow.png";
const Banner = () => {
  return (
    <div className="relative banner-carousel">
      <Swiper
        className="mt-7 "
        modules={[Autoplay, Pagination, EffectFade]} //required (4)
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2000}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop={true} // loop is mandatory for (effect + autoplay) together
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img className="rounded-4xl" src={banner1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="rounded-4xl" src={banner2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="rounded-4xl" src={banner3} alt="" />
        </SwiperSlide>
      </Swiper>
      <div className="flex gap-3 absolute bottom-7 md:bottom-28 left-7 md:left-22 z-2">
        <div className="flex items-center">
          <button
            className="text-[#1F1F1F] text-xs
          
          md:text-base bg-[#CAEB66] px-3 md:px-6 py-2 md:py-2.5 font-bold rounded-full cursor-pointer"
          >
            Track Your Parcel
          </button>
          <img
            className="w-7 h-7 md:w-8.5 md:h-8.5 cursor-pointer"
            src={arrowIcon}
            alt=""
          />
        </div>
        <button className="text-[#1F1F1F] border border-[#DADADA] bg-white px-3 md:px-6  md:py-2 text-xs md:text-base  font-bold rounded-xl cursor-pointer">
          Be A Rider
        </button>
      </div>
    </div>
  );
};

export default Banner;
