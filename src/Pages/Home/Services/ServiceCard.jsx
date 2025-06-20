import React from "react";

const ServiceCard = ({ Icon, service }) => {
  const { title, description } = service;

  return (
    <div className="group bg-white relative card rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]">
      {/* BG overlay hover effect */}
      <div className="absolute inset-0 rounded-3xl transition-colors duration-500 group-hover:bg-[#CAEB66] z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-primary mb-5 text-5xl transition-all duration-500 group-hover:scale-110 group-hover:text-[#03373D]">
          <Icon />
        </div>
        <h3 className="text-2xl font-bold text-[#03373D] mb-3 group-hover:text-[#022A2F] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#5E5E5E] leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
