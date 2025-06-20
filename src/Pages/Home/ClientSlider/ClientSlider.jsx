import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../../assets/brands/casio.png";
import logo2 from "../../../assets/brands/amazon.png";
import logo3 from "../../../assets/brands/moonstar.png";
import logo4 from "../../../assets/brands/start.png";
import logo5 from "../../../assets/brands/start-people 1.png";
import logo6 from "../../../assets/brands/randstad.png";
import logo7 from "../../../assets/brands/amazon_vector.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
const ClientSlider = () => {
  return (
    <section className="w-full pt-[25px] pb-[50px] md:pt-[50px] md:pb-[100px]">
      <h2 className="text-xl md:text-[28px] font-bold md:font-extrabold text-center text-[#03373D] mb-8">
        We've helped thousands of sales teams
      </h2>
      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
        className="flex gap-8 md:gap-16"
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`client-${index}`}
            className="transition mx-5 md:mx-10 duration-300"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default ClientSlider;
