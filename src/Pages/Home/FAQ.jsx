import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faq = [
    {
      question: "How long does delivery take?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, it is designed with adjustable straps to comfortably fit a wide range of body types and can be used by teens, adults, and seniors.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Regular use helps align the spine and shoulders, which can reduce strain on the back and gradually improve posture over time.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "This model focuses on physical support and does not include smart features such as vibration alerts or app connectivity.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can sign up for back-in-stock notifications by providing your email, and we will alert you as soon as the product becomes available.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto my-16 px-0 md:px-24">
      <div className="mb-10">
        <h2 className="text-[#03373D] font-extrabold text-3xl md:text-4xl text-center mb-6">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-[#606060] font-medium text-center md:w-[750px] mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {faq.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            className={`rounded-2xl border mx-2.5 md:mx-0 px-6 py-5 cursor-pointer mb-4 transition-all duration-300 ease-in-out ${
              isOpen
                ? "border-[#067A87] bg-[#E6F2F3]"
                : "border-[#DADADA] bg-white"
            }`}
            onClick={() => setOpen(isOpen ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#03373D]">{item.question}</h4>
              {isOpen ? (
                <MdKeyboardArrowUp size={24} className="text-[#2B8282]" />
              ) : (
                <MdKeyboardArrowDown size={24} className="text-[#1F2937]" />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <hr className="border border-[#C3DFE2] my-4 h-px" />
              <p className=" text-[#606060]">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
