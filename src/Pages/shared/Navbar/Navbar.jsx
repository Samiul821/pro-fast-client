import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProFastLogo from "../ProfastLogo/ProFastLogo";
import { FiArrowUpRight } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Failed to log out. Please try again.");
        console.error("Logout error:", error);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px] text-primary border-b-2 border-primary"
              : "font-medium text-[16px] text-[#606060] hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/add-parcel"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px] text-primary border-b-2 border-primary"
              : "font-medium text-[16px] text-[#606060] hover:text-primary"
          }
        >
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px] text-primary border-b-2 border-primary"
              : "font-medium text-[16px] text-[#606060] hover:text-primary"
          }
        >
          Coverage
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/beARider"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-[16px] text-primary border-b-2 border-primary"
                  : "font-medium text-[16px] text-[#606060] hover:text-primary"
              }
            >
              Be a Rider
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-[16px] text-primary border-b-2 border-primary"
                  : "font-medium text-[16px] text-[#606060] hover:text-primary"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/track"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-[16px] text-primary border-b-2 border-primary"
              : "font-medium text-[16px] text-[#606060] hover:text-primary"
          }
        >
          Track Order
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-secondary shadow-sm rounded-2xl px-4 lg:px-8">
      {/* Navbar Start */}
      <div className="flex items-center gap-2 lg:gap-12 navbar-start">
        {/* Hamburger for small screen */}
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
            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-secondary rounded-box w-60"
          >
            {navItems}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-[#303030]">
          <ProFastLogo />
        </Link>

        {/* Nav items (lg screen only) */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">{navItems}</ul>
        </div>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {/* Button on md and up */}
        <div className="hidden md:flex gap-4">
          <div className="flex items-center gap-1">
            <Link
              to="/beARider"
              className="text-xl font-bold py-4 px-8 rounded-xl bg-neutral"
            >
              Be a Rider
            </Link>
            {/* <Link className="p-3 bg-[#1F1F1F] rounded-full text-neutral">
              <FiArrowUpRight className="w-8 h-8" />
            </Link> */}
          </div>
          <div className="hidden md:flex items-center gap-4 relative">
            <>
              {user ? (
                <div className="relative">
                  {/* Profile Image */}
                  <img
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="w-[52px] h-[52px] rounded-full border cursor-pointer"
                  />

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                      <div className="px-4 py-3 text-sm text-gray-700">
                        <span className="block font-semibold">
                          {user.displayName || "No Name"}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {user.email}
                        </span>
                      </div>
                      <hr />
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-xl text-[#606060] font-bold py-4 px-8 rounded-xl bg-secondary border border-[#DADADA] hover:bg-neutral hover:text-[#1F1F1F] transition-colors duration-300"
                >
                  Sign In
                </Link>
              )}
            </>
          </div>
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
            className="menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow bg-secondary rounded-box w-60"
          >
            {navItems}
            <li className="mt-2">
              <div className="flex items-center gap-1">
                <Link className="text-xl font-bold w-full py-4 px-8 rounded-xl bg-neutral">
                  Be a rider
                </Link>
              </div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-xl text-[#606060] font-bold py-4 px-8 rounded-xl bg-secondary border border-[#DADADA] hover:bg-red-400 hover:text-white transition-colors duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-xl text-[#606060] font-bold py-4 px-8 rounded-xl bg-secondary border border-[#DADADA] hover:bg-neutral hover:text-[#1F1F1F] transition-colors duration-300"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
