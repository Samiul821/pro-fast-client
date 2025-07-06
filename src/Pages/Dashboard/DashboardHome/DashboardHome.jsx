import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import LoadingSpinner from "../../shared/LoadingSpinner";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import Forbidden from "../../Forbidden/Forbidden";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashboardHome;
