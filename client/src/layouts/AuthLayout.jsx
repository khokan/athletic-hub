import React from "react";
import NavBar from "../components/pages/NavBar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <header className="py-3">
        <NavBar />
      </header>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
