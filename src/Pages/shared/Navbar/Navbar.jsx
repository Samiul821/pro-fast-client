import React from "react";
import { Link, NavLink } from "react-router-dom";
import ProFastLogo from "../ProfastLogo/ProFastLogo";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink className="font-medium text-[16px] text-[#606060]" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className="font-medium text-[16px] text-[#606060]" to="/about">About Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl px-4 lg:px-8">
      {/* Navbar Start */}
      <div className="flex items-center gap-2 navbar-start">
        {/* Hamburger on md and below (hidden on lg) */}
        <div className="dropdown hidden lg:hidden md:block dropdown-start">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-base-100 rounded-box w-60"
          >
            {navItems}
            <li className="mt-2">
              <a className="btn btn-primary w-full">Button</a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-[#303030]">
          <ProFastLogo />
        </Link>
      </div>

      {/* Navbar Center (only on lg and up) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {/* Button on md and up */}
        <div className="hidden md:block">
          <a className="btn btn-primary">Button</a>
        </div>

        {/* Hamburger on mobile (sm only) */}
        <div className="dropdown md:hidden dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-base-100 rounded-box w-60"
          >
            {navItems}
            <li className="mt-2">
              <a className="btn btn-primary w-full">Button</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
