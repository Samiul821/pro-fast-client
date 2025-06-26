import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import ProFastLogo from "../Pages/shared/ProfastLogo/ProFastLogo";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);

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

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Left Side: Sidebar Component */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer px-3 py-2 font-bold">
            <Link to="/">
              <ProFastLogo />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="px-5 py-1">
              <Link to="/">
                <ProFastLogo />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-2">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                      isActive
                        ? "bg-neutral text-[#606060] font-bold"
                        : "text-gray-700 hover:bg-gray-200 hover:text-black"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="myParcels"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                      isActive
                        ? "bg-neutral text-[#606060] font-bold"
                        : "text-gray-700 hover:bg-gray-200 hover:text-black"
                    }`
                  }
                >
                  My Parcels
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <hr className="mb-2" />

          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-black"
              }`
            }
          >
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1  md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
