import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Bank from "./pages/Bank";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import SignupOne from "./pages/signup/SignupOne";
import SignupTwo from "./pages/signup/SignupTwo";
import "react-toastify/dist/ReactToastify.css";
import Transfer from "./pages/transactionPages/Transfer/Transfer";
import Deposit from "./pages/transactionPages/Deposit";
import Cards from "./pages/Cards";
import Me from "./pages/transactionPages/Me";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./ui/AdminLayout";
import Passcode from "./pages/signup/Passcode";
import ConfirmPasscode from "./pages/signup/ConfirmPasscode";
import Welcome from "./pages/Welcome";
import UserTransactions from "./pages/UserTransactions";
import TransferAmount from "./pages/transactionPages/Transfer/TransferAmount";
import Pin from "./pages/Pin";
import ConfirmPin from "./pages/ConfirmPin";
import SetPin from "./pages/SetPin";
import ViewUser from "./pages/admin/ViewUser";
import { login } from "./slice/authUserSlice";  // Import the login action
import Settings from "./pages/Settings";
import OTP from "./components/OTP";
import ErrorPage from "./components/ErrorPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter([
  {
    element: <Welcome />,
    path: "/",
  },
  {
    element: <AppLayout />,
    path: "/bank",
    children: [
      {
        path: "/bank",
        element: <Bank />,
      },
      {
        path: "/bank/transfer",
        children: [
          {
            path: "/bank/transfer",
            element: <Transfer />,
          },
          {
            path: "/bank/transfer/amount",
            element: <TransferAmount />,
          },
        ],
      },
      {
        path: "/bank/deposit",
        element: <Deposit />,
      },
      {
        path: "/bank/transactions",
        element: <UserTransactions />,
      },
      {
        path: "/bank/cards",
        element: <Cards />,
      },
      {
        path: "/bank/me",
        element: <Me />,
      },
      {
        path: "/bank/settings",
        element: <Settings />,
      },
    ],
    errorElement: <ErrorPage />
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
            element: <Passcode />,
          },
          {
            path: "/signup/two/confirmpasscode",
            element: <ConfirmPasscode />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/login/pin",
        element: <Pin />,
        children: [
          {
            path: "/login/pin/set",
            element: <SetPin />,
          },
          {
            path: "/login/pin/confirm",
            element: <ConfirmPin />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminLayout />,
    path: "/admin",
    children: [
      {
        element: <Admin />,
        path: "/admin",
      },
      {
        element: <ViewUser />,
        path: "/admin/viewUser",
      },
    ],
  },
  {
    element: <AdminLogin />,
    path: "/admin/login",
  },
  {
    element: <ForgotPassword />,
    path:"/forgot-password"
  },
  {
    element: <ResetPassword />,
    path: "/forgot-password/reset-password/:token?",
  },
  
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
