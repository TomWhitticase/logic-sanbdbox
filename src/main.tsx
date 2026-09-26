import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./index.css";
import App from "./App";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
  ],
  // Respect the deploy base path, e.g. /logic-sanbdbox/ on GitHub Pages
  { basename: import.meta.env.BASE_URL }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
