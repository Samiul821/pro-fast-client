import React from "react";
import merchantPng from "../../../assets/location-merchant.png";

const BeMarchant = () => {
  return (
    <section data-aos="zoom-in-right" className="bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat flex flex-col-reverse lg:flex-row items-center p-8 md:p-20 rounded-3xl md:rounded-4xl gap-10 relative mb-10 md:mb-20">
      {/* Text Content */}
      <div className=" lg:text-left">
        <h1 className="text-secondary text-2xl sm:text-4xl md:text-[40px] font-extrabold mb-6 leading-tight">
          Merchant and Customer Satisfaction <br className="hidden md:block" /> is Our First Priority
        </h1>
        <p className="text-base-100 mb-8 sm:text-lg leading-relaxed">
          We offer the lowest delivery charge with the highest value along with{" "}
          <br className="hidden md:block" />
          100% safety of your product. Pathao courier delivers your parcels in
          every <br className="hidden md:block" />
          corner of Bangladesh right on time.
        </p>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
          <button className="text-base-300 text-lg sm:text-xl font-bold py-4 px-8 rounded-full bg-[#CAEB66] cursor-pointer hover:brightness-95 transition">
            Become a Merchant
          </button>
          <button className="text-neutral hover:text-base-300 text-lg sm:text-xl font-bold py-4 px-8 border border-[#CAEB66] rounded-full hover:bg-[#CAEB66] cursor-pointer transition">
            Earn with Profast Courier
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center lg:justify-end lg:absolute left-[703px]">
        <img
          src={merchantPng}
          alt="Merchant Illustration"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default BeMarchant;
