import React from "react";
import ProFastLogo from "../ProfastLogo/ProFastLogo";
import { Link } from "react-router-dom";
import linkedin from "../../../assets/linkedin.png";
import facebook from "../../../assets/facebook.png";
import twitter from "../../../assets/twitter.png";
import youtube from "../../../assets/youtube.png";

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-[#DADADA] px-6 py-10 md:p-20 rounded-2xl space-y-8">
      {/* Logo + Description */}
      <aside className="flex flex-col items-center text-center gap-4 max-w-4xl mx-auto">
        <ProFastLogo />
        <p className="text-sm sm:text-base leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </aside>

      {/* Divider */}
      <div className="border-t-2 border-dashed border-[#03464D] w-full"></div>

      {/* Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-items-center font-medium text-sm sm:text-base">
        <a className="link link-hover">Services</a>
        <a className="link link-hover">Coverage</a>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Pricing</a>
        <a className="link link-hover">Blog</a>
        <a className="link link-hover">Contact</a>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-dashed border-[#03464D] w-full"></div>

      {/* Social Icons */}
      <div className="flex justify-center flex-wrap items-center gap-6">
        <Link>
          <img src={linkedin} alt="Linkedin" className="w-6 md:w-full h-6 md:h-full" />
        </Link>
        <Link>
          <img src={twitter} alt="Twitter" className="w-6 md:w-full h-6 md:h-full" />
        </Link>
        <Link>
          <img src={facebook} alt="Facebook" className="w-6 md:w-full h-6 md:h-full" />
        </Link>
        <Link>
          <img src={youtube} alt="Youtube" className="w-6 md:w-full h-6 md:h-full" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
