import React from "react";
import ServiceCard from "./ServiceCard";

// Import icons from react-icons
import {
  FiTruck,
  FiMap,
  FiBox,
  FiDollarSign,
  FiBriefcase,
  FiRotateCw,
} from "react-icons/fi";

const servicesData = [
  {
    Icon: FiTruck,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    Icon: FiMap,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    Icon: FiBox,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    Icon: FiDollarSign,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    Icon: FiBriefcase,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    Icon: FiRotateCw,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const ServicesSection = () => {
  return (
    <section className="my-8 md:mt-16 px-6 md:px-12 py-8 md:py-16 rounded-3xl bg-[#03373D]">
      <h2 className="text-3xl md:text-[40px] text-white font-bold md:font-extrabold mb-4 text-center">
        Our Services
      </h2>
      <p className="max-w-2xl mx-auto text-center text-[#DADADA] mb-12">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service, idx) => (
          <ServiceCard 
          key={idx} 
          service={service} 
          Icon={service.Icon} 
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
