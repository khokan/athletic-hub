import React, { useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router";
import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";
import { ThemeProvider } from "../shared/ThemeProvider";

const HomeLayout = () => {
  const { state } = useNavigation();

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div>
          <header className="">
            {/* <Header /> */}
            <NavBar />
          </header>

          <main className="w-11/12 mx-auto min-h-[calc(100vh-350px)]">
            {state == "loading" ? (
              <div className="text-center">
                <span className="loading loading-bars loading-xl"></span>{" "}
              </div>
            ) : (
              <Outlet />
            )}
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

export default HomeLayout;
