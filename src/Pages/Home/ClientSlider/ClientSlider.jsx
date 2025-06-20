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
    <section className="w-full pt-[50px] pb-[100px]">
      <h2 className="text-3xl font-bold text-center text-[#03373D] mb-8">
        Trusted by 100+ Companies
      </h2>
      <Marquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
        className="flex gap-16"
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`client-${index}`}
            className="transition mx-10 duration-300"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default ClientSlider;
