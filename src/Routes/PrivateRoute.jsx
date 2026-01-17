import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Pages/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "You are not authorized to access this page!",
        }}
      ></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
