import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useBookingApi = () => {
  const axiosSecure = useAxiosSecure();
  const myBookingPromise = (email) => {
    if (!axiosSecure) {
      return Promise.reject("Axios instance not ready.");
    }
    return axiosSecure.get(`/bookings?email=${email}`).then((res) => res.data);
  };
  return {
    myBookingPromise,
  };
};

export default useBookingApi;
