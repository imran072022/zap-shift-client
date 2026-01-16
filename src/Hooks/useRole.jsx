import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isLoading, data: role = "User" } = useQuery({
    queryKey: ["user-role", user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      console.log(res.data);
      return res.data.role;
    },
  });
  return { isLoading, role };
};

export default useRole;
