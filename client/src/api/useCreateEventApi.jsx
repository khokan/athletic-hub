import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useCreateEventApi = () => {
  const axiosSecure = useAxiosSecure();
  const myCreateEventPromise = (newEvent) => {
    return axiosSecure.post(`/events`, newEvent).then((res) => res.data);
  };
  return {
    myCreateEventPromise,
  };
};

export default useCreateEventApi;
