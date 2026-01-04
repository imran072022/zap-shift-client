import React from "react";
import liveTracking from "../../assets/live-tracking.png";
import safeDelivery from "../../assets/safe-delivery.png";
const Features = () => {
  return (
    <div className="space-y-6 px-3 md:px-0 max-w-6xl mx-auto">
      <div class="h-px w-full bg-[repeating-linear-gradient(to_right,#03464D_0_4px,transparent_4px_8px)] mb-20"></div>
      <div className="bg-[#ffffffb0] flex items-center  p-6 md:p-8 rounded-2xl md:rounded-3xl">
        <img
          className="h-20 w-20 md:h-[200px] md:w-[200px] mr-6 md:mr-0"
          src={liveTracking}
          alt=""
        />
        <div class="hidden md:block h-40 mx-3 md:mx-12 w-0.5 bg-[repeating-linear-gradient(to_bottom,#03464D_0_6px,transparent_6px_12px)]"></div>
        <div className="space-y-2 md:space-y-4">
          <h3 className="font-extrabold text-xl md:text-2xl text-[#03373D]">
            Live Parcel Tracking
          </h3>
          <p className="font-medium text-[#606060] text-sm md:text-base line-clamp-4">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>
      <div className="bg-[#ffffffb0] flex items-center justify-center p-6 md:p-8 rounded-2xl md:rounded-3xl">
        <img
          className="h-20 w-20 md:h-[200px] md:w-[200px] mr-6 md:mr-0"
          src={safeDelivery}
          alt=""
        />
        <div class="hidden md:block h-40 mx-3 md:mx-12 w-0.5 bg-[repeating-linear-gradient(to_bottom,#03464D_0_6px,transparent_6px_12px)]"></div>
        <div className="space-y-2 md:space-y-4">
          <h3 className="font-extrabold text-xl md:text-2xl text-[#03373D]">
            100% Safe Delivery
          </h3>
          <p className="font-medium text-[#606060] text-sm md:text-base line-clamp-4">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>
      <div className="bg-[#ffffffb0] flex items-center justify-center p-6 md:p-8 rounded-2xl md:rounded-3xl">
        <img
          className="h-20 w-20 md:h-[200px] md:w-[200px] mr-6 md:mr-0"
          src={safeDelivery}
          alt=""
        />
        <div class="hidden md:block h-40 mx-3 md:mx-12 w-0.5 bg-[repeating-linear-gradient(to_bottom,#03464D_0_6px,transparent_6px_12px)]"></div>
        <div className="space-y-2 md:space-y-4">
          <h3 className="font-extrabold text-xl md:text-2xl text-[#03373D]">
            24/7 Call Center Support
          </h3>
          <p className="font-medium text-[#606060] text-sm md:text-base line-clamp-4">
            Our dedicated support team is available around the clock to assist
            you with any questions, updates, or delivery concerns—anytime you
            need us.
          </p>
        </div>
      </div>
      <div class="h-px w-full bg-[repeating-linear-gradient(to_right,#03464D_0_4px,transparent_4px_8px)] mt-20"></div>
    </div>
  );
};

export default Features;
