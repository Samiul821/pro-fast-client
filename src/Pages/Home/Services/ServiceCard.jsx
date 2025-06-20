import React from "react";

const ServiceCard = ({ Icon,service , bg}) => {
    const { title, description } = service;
    const backgroundStyle = bg ? { backgroundColor: bg } : {};
  return (
    <div className={`card bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300`}
      style={backgroundStyle}>
      <div className="text-primary mb-4 text-5xl">
        <Icon />
      </div>
      <h3 className="text-xl text-[#03373D] font-semibold mb-2">{title}</h3>
      <p className="text-[#606060]">{description}</p>
    </div>
  );
};

export default ServiceCard;
