import React from "react";
import Marquee from "react-fast-marquee";
import brand1 from "../../assets/brands/amazon.png";
import brand2 from "../../assets/brands/casio.png";
import brand3 from "../../assets/brands/amazon_vector.png";
import brand4 from "../../assets/brands/moonstar.png";
import brand5 from "../../assets/brands/star.png";
import brand6 from "../../assets/brands/start_people.png";
import brand7 from "../../assets/brands/randstad.png";

const SalesTeam = () => {
  const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

  return (
    <div className="mb-24 max-w-6xl mx-auto">
      <h2 className="text-[#03373D] text-2xl font-extrabold text-center mb-9">
        We've helped thousands of sales teams
      </h2>
      <Marquee speed={50} pauseOnHover={true}>
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt={`Brand ${index + 1}`}
            className="px-12"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default SalesTeam;
