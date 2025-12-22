import React from "react";
import reviewQuote from "../../../assets/reviewQuote.png";
const ReviewCard = ({ review }) => {
  const { review: testimonial, name, post } = review;
  return (
    <div className="w-82 h-66 bg-[#ffffffb7] p-6 rounded-3xl flex flex-col justify-between">
      <div>
        <img className="w-10" src={reviewQuote} alt="" />
        <p className="text-[#606060] text-sm font-medium mt-2">{testimonial}</p>
      </div>

      <div>
        <hr className="border border-dashed mb-5" />
        <div className="flex items-center gap-3 ">
          <div className="bg-[#03464D] rounded-full w-10 h-10"></div>
          <div>
            <h2 className="font-extrabold text-lg text-[#03373D]">{name}</h2>
            <p className="font-medium text-[#606060] text-sm">{post}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
