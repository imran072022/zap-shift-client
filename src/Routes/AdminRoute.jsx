import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/Loading/Loading";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoadingRole } = useRole();
  if ((loading, isLoadingRole)) {
    return <Loading></Loading>;
  }
  /*It's frontend security only, people still can access data from backend  */
  if (role !== "Admin") {
    return <Navigate to="/forbidden-route"></Navigate>;
  }
  return children;
};

export default AdminRoute;
