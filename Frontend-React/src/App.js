import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import SignupOne from "./pages/signup/SignupOne";
import SignupTwo from "./pages/signup/SignupTwo";
import "react-toastify/dist/ReactToastify.css";
import Withdraw from "./pages/transactionPages/Withdraw";
import Deposit from "./pages/transactionPages/Deposit";
import Cards from "./pages/transactionPages/Cards";
import Me from "./pages/transactionPages/Me";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./ui/AdminLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "withdraw",
        element: <Withdraw />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "me",
        element: <Me />,
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
