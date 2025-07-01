import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./contexts/AuthProvider";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./shared/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="top-right" />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
