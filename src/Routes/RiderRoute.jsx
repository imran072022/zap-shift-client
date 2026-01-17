import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/Loading/Loading";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isRoleLoading } = useRole();
  if (loading || isRoleLoading) {
    return <Loading></Loading>;
  }
  /*It's frontend security only, people still can access data from backend  */
  if (role !== "Rider") {
    return <Navigate to="/forbidden"></Navigate>;
  }
  return children;
};

export default RiderRoute;
