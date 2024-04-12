import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import { SignUp } from "./pages/SignUp.tsx";
import { Quotes } from "./pages/Quotes.tsx";
import { NewQuote } from "./pages/newQuote/NewQuote.tsx";
import { NewCarQuote } from "./pages/newQuote/CarQuote.tsx";
import { NewHomeQuote } from "./pages/newQuote/HomeQuote.tsx";
import { Contact } from "./pages/Contact.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/quotes",
    children: [
      {
        path: "",
        element: <Quotes />,
      },
      {
        path: "new",
        children: [
          {
            path: "",
            element: <NewQuote />,
          },
          {
            path: "car",
            element: <NewCarQuote />,
          },
          {
            path: "home",
            element: <NewHomeQuote />,
          },
        ],
      },
    ],
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
