import React from "react";
import booking from "../../assets/bookingIcon.png";
const HowItWorks = () => {
  const data = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: booking,
    },
    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: booking,
    },
    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: booking,
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
      icon: booking,
    },
  ];

  return (
    <div className="max-w-295 mx-auto py-24">
      <h2 className="font-extrabold text-3xl text-[#03373D] mb-7">
        How it Works
      </h2>
      <div className="flex flex-col md:flex-row gap-5">
        {data.map((item, index) => (
          <div key={index} className="bg-white p-7 rounded-3xl flex-1">
            <img className="w-11" src={item.icon} alt="" />
            <h3 className="font-bold text-lg text-[#03373D] mt-4 mb-3 ">
              {item.title}
            </h3>
            <p className="font-medium text-[#606060]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
