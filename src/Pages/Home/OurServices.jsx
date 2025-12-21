import React from "react";
import serviceIcon from "../../assets/service.png";
const OurServices = () => {
  const data = [
    {
      title: "Express  & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      icon: serviceIcon,
    },
    {
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      icon: serviceIcon,
    },
    {
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: serviceIcon,
    },
    {
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: serviceIcon,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
      icon: serviceIcon,
    },
    {
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: serviceIcon,
    },
  ];
  return (
    <div className="bg-[#03373D] px-28 py-24 rounded-4xl text-center mb-24">
      <h2 className="font-extrabold text-4xl text-white">Our Services</h2>
      <p className="font-medium text-[#DADADA] mt-4 mb-8 w-178 mx-auto">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-white hover:bg-[#CAEB66] transition-bg duration-300 ease-in-out rounded-3xl"
          >
            <div className="bg-gradient-to-b from-[#EEEDFC] to-[#eeedfc00] p-5 rounded-full  inline-block">
              <img className="w-9 h-9" src={item.icon} alt="" />
            </div>
            <h3 className="font-bold text-[#03373D] text-xl my-3">
              {item.title}
            </h3>
            <p className="font-medium text-[#606060]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
