import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bank from "./pages/Bank";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import SignupOne from "./pages/signup/SignupOne";
import SignupTwo from "./pages/signup/SignupTwo";
import "react-toastify/dist/ReactToastify.css";
import Transfer from "./pages/transactionPages/Transfer";
import Deposit from "./pages/transactionPages/Deposit";
import Cards from "./pages/transactionPages/Cards";
import Me from "./pages/transactionPages/Me";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./ui/AdminLayout";
import Passcode from "./pages/signup/Passcode";
import ConfirmPasscode from "./pages/signup/ConfirmPasscode";
import Welcome from "./pages/Welcome";

const router = createBrowserRouter([
  {
    element: <Welcome />,
    path: "/"
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/bank",
        element: <Bank />,
        children: [
          {
            path: "/bank/transfer",
            element: <Transfer />,
          },
          {
            path: "/bank/deposit",
            element: <Deposit />,
          },
          {
            path: "/bank/cards",
            element: <Cards />,
          },
          {
            path: "/bank/me",
            element: <Me />,
          },
        ]
      },
      
    ],
  },
  {
    path: "signup",
    element: <Signup />,
    children: [
      {
        path: "/signup/one",
        element: <SignupOne />,
      },
      {
        path: "/signup/two",
        element: <SignupTwo />,
        children: [
          {
            path: "/signup/two/setpasscode",
            element: <Passcode />
          },
          {
            path: "/signup/two/confirmpasscode",
            element: <ConfirmPasscode />
          }
        ]
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        element: <Admin />,
        path: "/admin",
      },
      
    ]
  },
  {
    element: <AdminLogin />,
    path: "/admin/login",
  },
 
]);
export default function App() {
  return <>
  <ToastContainer /><RouterProvider router={router} /></>;
}
