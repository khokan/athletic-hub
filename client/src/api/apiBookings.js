import React from "react";

export const myBookingPromise = async (email, accessToken) => {
  const res = await fetch(
    `${import.meta.env.VITE_NODE_SERVER_URL}/bookings?email=${email}`,
    {
      credentials: "include",
      headers: {
        // if firebase or local storage is used
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return await res.json();
};
