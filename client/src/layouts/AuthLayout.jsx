import React from "react";
import NavBar from "../components/pages/NavBar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <header className="w-11/12, mx-auto py-3">
        <NavBar />
      </header>
      <main className="w-11/12 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
