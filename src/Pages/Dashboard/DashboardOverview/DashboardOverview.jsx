import React from "react";
import useRole from "../../../Hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";
import Loading from "../../Loading/Loading";

const DashboardOverview = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) return <Loading></Loading>;
  if (role === "Admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "Rider") {
    return <RiderDashboard></RiderDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default DashboardOverview;
