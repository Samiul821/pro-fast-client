import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import ProFastLogo from "../Pages/shared/ProfastLogo/ProFastLogo";
import toast from "react-hot-toast";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaSearchLocation,
  FaUserEdit,
  FaHourglassHalf,
  FaMotorcycle,
  FaUserShield,
  FaShippingFast,
  FaClipboardList,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);

  const { role, roleLoading } = useUserRole();
  console.log(role);

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
              {/* home links */}
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                      isActive
                        ? "bg-neutral text-[#606060] font-bold"
                        : "text-gray-700 hover:bg-gray-200 hover:text-black"
                    }`
                  }
                >
                  <FaHome /> Home
                </NavLink>
              </li>

              {/* user links */}
              {!roleLoading && role === "user" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/myParcels"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaBoxOpen /> My Parcels
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/payment-history"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaMoneyCheckAlt /> Payment History
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/track"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaSearchLocation /> Track a Package
                    </NavLink>
                  </li>
                </>
              )}

              {/* rider links */}
              {!roleLoading && role === "rider" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/pending-deliveries"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaClipboardList /> Pending Deliveries
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/completed-deliveries"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaCheckCircle /> Completed Deliveries
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/my-earnings"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaWallet /> My Earnings
                    </NavLink>
                  </li>
                </>
              )}

              {/* admin link */}
              {!roleLoading && role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/assign-rider"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaShippingFast /> Assign Rider
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/activeRiders"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaMotorcycle /> Active Riders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/pendingRiders"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaHourglassHalf /> Pending Riders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/makeAdmin"
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                          isActive
                            ? "bg-neutral text-[#606060] font-bold"
                            : "text-gray-700 hover:bg-gray-200 hover:text-black"
                        }`
                      }
                    >
                      <FaUserShield /> Make Admin
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div>
          <hr className="mb-2" />

          <NavLink
            to="update-profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 inter ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200 hover:text-black"
              }`
            }
          >
            <FaUserEdit /> Update Profile
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
      <div className="flex-1  md:ml-64 lg:px-[5%]">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
