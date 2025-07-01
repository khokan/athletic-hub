import { useEffect, useRef } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_NODE_SERVER_URL,
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const interceptorRef = useRef(null);

  useEffect(() => {
    if (!user?.accessToken) return;

    // Eject previous interceptor if it exists
    if (interceptorRef.current !== null) {
      axiosInstance.interceptors.request.eject(interceptorRef.current);
    }

    // Add new request interceptor
    interceptorRef.current = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      }
    );

    return () => {
      if (interceptorRef.current !== null) {
        axiosInstance.interceptors.request.eject(interceptorRef.current);
      }
    };
  }, [user?.accessToken]);

  // Add response interceptor once (or move it here if needed)
  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          signOutUser()
            .then(() => t.log("Signed out due to 401/403"))
            .catch((err) => console.error(err));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser]);

  return axiosInstance;
};

export default useAxiosSecure;
