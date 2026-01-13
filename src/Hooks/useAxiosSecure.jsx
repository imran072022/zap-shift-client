import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    /*add request interceptor */
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `bearer ${user?.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    /*add response interceptor */
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/");
          });
        }
        return Promise.reject(error);
      }
    );

    /*remove request interceptor  */
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
