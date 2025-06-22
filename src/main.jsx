import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";

import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="urbanist">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </div>
  </StrictMode>
);
