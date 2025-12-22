import React, { useEffect, useState } from "react";
import customerTop from "../../../assets/customerTop.png";
import ReviewCard from "./ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="my-24">
      <div className="text-center mb-9">
        <img className="inline-block" src={customerTop} alt="" />
        <h2 className="font-extrabold text-4xl text-[#03373D] mt-10 mb-6">
          What our customers are sayings
        </h2>
        <p className="text-[#606060] font-medium md:w-[750px] mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div className="pl-18 relative overflow-hidden review-carousel">
        {/* Prev Button */}
        <div
          className={`inline-block p-2 rounded-full absolute bottom-9 left-16 md:left-[520px] z-10
            ${
              isBeginning
                ? "bg-white opacity-50 cursor-not-allowed"
                : "bg-[#CAEB66] cursor-pointer"
            }
          `}
          onClick={() => swiper && !isBeginning && swiper.slidePrev()}
        >
          <IoMdArrowBack className="w-5 h-5" />
        </div>

        {/* Next Button */}
        <div
          className={`inline-block p-2 rounded-full absolute bottom-9 right-16 md:right-[520px] z-10
            ${
              isEnd
                ? "bg-white opacity-50 cursor-not-allowed"
                : "bg-[#CAEB66] cursor-pointer"
            }
          `}
          onClick={() => swiper && !isEnd && swiper.slideNext()}
        >
          <IoMdArrowForward className="w-5 h-5" />
        </div>

        <Swiper
          className="w-[1800px] mx-auto relative left-1/2 -translate-x-1/2"
          modules={[EffectCoverflow, Pagination, Navigation]}
          grabCursor
          slidesPerView={5}
          spaceBetween={-60}
          centeredSlides
          initialSlide={2}
          speed={500}
          /*Pagination implementation*/
          pagination={{
            type: "bullets",
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 2,
          }}
          /*Initialization of swiper instance - for buttons*/
          onSwiper={(s) => {
            setSwiper(s);
            setIsBeginning(s.activeIndex === 0);
            setIsEnd(s.activeIndex === s.slides.length - 1);
          }}
          onSlideChange={(s) => {
            setIsBeginning(s.activeIndex === 0);
            setIsEnd(s.activeIndex === s.slides.length - 1);
          }}
          /* Adjusts each slide's vertical position and opacity based on distance from the center to create a custom coverflow effect.*/
          watchSlidesProgress
          onProgress={(swiper) => {
            swiper.slides.forEach((slide) => {
              const p = Math.abs(slide.progress);
              let translateY = 0;

              if (p < 0.1) translateY = 0;
              else if (p < 1.1) translateY = 50;
              else translateY = 100;

              slide.style.transform = `translateY(${translateY}px)`;
              slide.style.opacity = p < 0.9 ? 1 : 0.3;
            });
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="pb-26">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
