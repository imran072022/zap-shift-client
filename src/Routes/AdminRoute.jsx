import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Pages/Loading/Loading";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, isLoading } = useRole();

  console.log("AdminRoute Debug:", { user, loading, role, isLoading });

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  /*It's frontend security only, people still can access data from backend  */
  if (role !== "Admin") {
    return <Navigate to="/forbidden-route"></Navigate>;
  }

  return children;
};

export default AdminRoute;
