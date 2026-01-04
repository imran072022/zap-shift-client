import React from "react";
import secondBanner from "../../assets/secondBanner.png";

const SecondBanner = () => {
  return (
    <div className="max-w-6xl mx-auto mt-20 mb-24">
      <div
        className="relative w-full bg-cover bg-center rounded-4xl h-[264px] md:h-auto px-4 py-4 md:px-[70px] md:py-[70px]"
        style={{ backgroundImage: `url(${secondBanner})` }}
      >
        <div className="absolute inset-0 rounded-4xl bg-gradient-to-b from-black/20 to-transparent md:hidden"></div>

        <div className="relative flex flex-col justify-center h-full text-center md:text-left">
          <h2 className="font-extrabold text-xl md:text-4xl text-white md:w-[670px] md:mb-4 mb-2 leading-snug">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>

          <p className="text-sm md:text-base text-[#DADADA] leading-5 md:leading-7 md:w-[516px] md:mb-7 mb-2">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <button className="bg-[#CAEB66] py-2 px-4 md:py-3.5 md:px-7 text-[#1F1F1F] font-bold md:text-[18px] rounded-full">
              Become a Merchant
            </button>
            <button className="border border-[#CAEB66] text-[#CAEB66] py-2 px-4 md:py-3.5 md:px-7 font-bold md:text-[18px] rounded-full">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondBanner;
