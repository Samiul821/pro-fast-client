import React from "react";
import tracking from "../../../assets/live-tracking.png";
import safe from "../../../assets/safe-delivery.png";
import support from "../../../assets/support.png";

const benefitsData = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safe,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: support,
  },
];

const BenefitsSection = () => {
  return (
    <section className="border-t border-b border-dashed py-10 md:py-20 mb-10 md:mb-20">
      <div className="space-y-6">
        {benefitsData.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col md:flex-row items-center gap-6 md:gap-[48px] p-6 md:p-8 border border-gray-200 rounded-3xl shadow-sm 
                 hover:shadow-[0_8px_30px_rgba(3,70,77,0.15)] hover:border-[#CAEB66] bg-white 
                 hover:bg-[#FAFFE4] transition-all duration-500 ease-in-out transform hover:-translate-y-2"
          >
            {/* Left Image */}
            <div className="transition-transform duration-500 group-hover:scale-105">
              <img
                src={item.image}
                alt={item.title}
                className="w-[200px] h-[200px] object-contain rounded-2xl"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[1px] h-[150px] bg-transparent border-l border-[#03464D] border-dashed group-hover:border-[#CAEB66] transition-colors duration-500"></div>

            {/* Right Text */}
            <div className="w-full md:w-2/3 transition-all duration-500 group-hover:text-[#022A2F]">
              <h3 className="text-xl md:text-2xl font-semibold text-[#03373D] mb-2 group-hover:text-[#022A2F] transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-[#606060] font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
