import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useUpdateEventApi = () => {
  const axiosSecure = useAxiosSecure();
  const myUpdateEventPromise = (id, updatedEvent) => {
    return axiosSecure
      .put(`/events/${id}`, updatedEvent)
      .then((res) => res.data);
  };
  return {
    myUpdateEventPromise,
  };
};

export default useUpdateEventApi;
