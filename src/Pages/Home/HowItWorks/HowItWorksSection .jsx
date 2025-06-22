import React from "react";
import {
  FaBoxOpen,
  FaMoneyBillWave,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBoxOpen />,
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 3,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaWarehouse />,
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FaBuilding />,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="pt-[60px]">
      <h2 className="text-[32px] font-bold text-primary mb-8">How It Works</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg  transition-all duration-500"
          >
            <div className="text-4xl text-[#03373D] mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-[#606060] leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
