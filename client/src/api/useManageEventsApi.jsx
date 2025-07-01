import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useManageEventsApi = () => {
  const axiosSecure = useAxiosSecure();
  const myManageEventsPromise = (email) => {
    return axiosSecure
      .get(`/manageEvents?email=${email}`)
      .then((res) => res.data);
  };
  return {
    myManageEventsPromise,
  };
};

export default useManageEventsApi;
