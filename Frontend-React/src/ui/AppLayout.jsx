import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CryptoTransaction from "../components/CryptoTransaction";
import { useDispatch, useSelector } from "react-redux";
import { BankContext } from "../context/BankContext";
import AdminLayout from "./AdminLayout";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { CusCareContext } from "../context/CusCareContext";
import CustomerCareOverlay from "../components/CustomerCareOverlay";
import ConfirmPinForTransaction from "../components/ConfirmPinForTransaction";
import { refreshUser, setCurrencySymbol } from "../slice/authUserSlice";
import axios from "axios";
import Loader from "../components/Loader";
import TransactionReceipt from "../components/TransactionReceipt";
import TranactionFailed from "../components/TranactionFailed";
import SuspendedPage from "../components/SuspendedPage";
import BankDisplay from "../components/BankDisplay";

const flags = [
  { country: "Argentina", currency: "ARS", symbol: "₱" },
  { country: "Australia", currency: "AUD", symbol: "$" },
  { country: "Austria", currency: "EUR", symbol: "€" },
  { country: "Belgium", currency: "EUR", symbol: "€" },
  { country: "Brazil", currency: "BRL", symbol: "R$" },
  { country: "Canada", currency: "CAD", symbol: "$" },
  { country: "Chile", currency: "CLP", symbol: "$" },
  { country: "China", currency: "CNY", symbol: "¥" },
  { country: "Colombia", currency: "COP", symbol: "$" },
  { country: "Croatia", currency: "EUR", symbol: "€" },
  { country: "Czech Republic", currency: "CZK", symbol: "Kč" },
  { country: "Denmark", currency: "DKK", symbol: "kr" },
  { country: "Egypt", currency: "EGP", symbol: "£" },
  { country: "Estonia", currency: "EUR", symbol: "€" },
  { country: "Finland", currency: "EUR", symbol: "€" },
  { country: "France", currency: "EUR", symbol: "€" },
  { country: "Germany", currency: "EUR", symbol: "€" },
  { country: "Greece", currency: "EUR", symbol: "€" },
  { country: "Hungary", currency: "HUF", symbol: "Ft" },
  { country: "Iceland", currency: "ISK", symbol: "kr" },
  { country: "India", currency: "INR", symbol: "₹" },
  { country: "Ireland", currency: "EUR", symbol: "€" },
  { country: "Israel", currency: "ILS", symbol: "₪" },
  { country: "Italy", currency: "EUR", symbol: "€" },
  { country: "Japan", currency: "JPY", symbol: "¥" },
  { country: "Kenya", currency: "KES", symbol: "Sh" },
  { country: "Latvia", currency: "EUR", symbol: "€" },
  { country: "Lithuania", currency: "EUR", symbol: "€" },
  { country: "Luxembourg", currency: "EUR", symbol: "€" },
  { country: "Malaysia", currency: "MYR", symbol: "RM" },
  { country: "Mexico", currency: "MXN", symbol: "$" },
  { country: "Netherlands", currency: "EUR", symbol: "€" },
  { country: "New Zealand", currency: "NZD", symbol: "$" },
  { country: "Nigeria", currency: "NGN", symbol: "₦" },
  { country: "Norway", currency: "NOK", symbol: "kr" },
  { country: "Peru", currency: "PEN", symbol: "S/" },
  { country: "Philippines", currency: "PHP", symbol: "₱" },
  { country: "Poland", currency: "PLN", symbol: "zł" },
  { country: "Portugal", currency: "EUR", symbol: "€" },
  { country: "Romania", currency: "RON", symbol: "lei" },
  { country: "Russia", currency: "RUB", symbol: "₽" },
  { country: "Saudi Arabia", currency: "SAR", symbol: "ر.س" },
  { country: "South Africa", currency: "ZAR", symbol: "R" },
  { country: "South Korea", currency: "KRW", symbol: "₩" },
  { country: "Spain", currency: "EUR", symbol: "€" },
  { country: "Sweden", currency: "SEK", symbol: "kr" },
  { country: "Switzerland", currency: "CHF", symbol: "Fr" },
  { country: "Taiwan", currency: "TWD", symbol: "NT$" },
  { country: "Thailand", currency: "THB", symbol: "฿" },
  { country: "Turkey", currency: "TRY", symbol: "₺" },
  { country: "Ukraine", currency: "UAH", symbol: "₴" },
  { country: "United Arab Emirates", currency: "AED", symbol: "د.إ" },
  { country: "United Kingdom", currency: "GBP", symbol: "£" },
  { country: "United States", currency: "USD", symbol: "$" },
];

export default function AppLayout() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { isLoggedIn, currentUser } = useSelector((state) => state.userAuth);
  const {
    cryptoPage,
    confirmPinForAmount,
    isLoading,
    setIsloading,
    failedReceiptPage,
    receiptPage,
    setReceiptPage,
    bankPage,
    bankInView,
    setBankInView,
  } = useContext(BankContext);
  const { customerCarePage } = useContext(CusCareContext);
  const dispatch = useDispatch();
  function handleMousemove(e) {
    if (x !== e.pageX && y !== e.pageY) {
      setX(e.pageX);
      setY(e.pageY);
    }
  }
  useEffect(function () {
    setBankInView(true);
  }, []);
  useEffect(function () {
    if (currentUser) {
      const newObj = flags.find(
        (group) => group?.country?.toLowerCase() === currentUser?.country?.toLowerCase()
      );
      dispatch(setCurrencySymbol(newObj));
    }
  }, []);

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (currentUser?.is_admin) return <Navigate to="/admin" />;

  return (
    <>
      {isLoading && <Loader />}
      <div
        onMouseMove={handleMousemove}
        className="h-full w-full relative overflow-hidden"
      >
        <ToastContainer />
        <Outlet />
        <Sidebar />
        {cryptoPage && <CryptoTransaction />}
        {customerCarePage && <CustomerCareOverlay />}
        {confirmPinForAmount && <ConfirmPinForTransaction />}
        {receiptPage && <TransactionReceipt />}
        {failedReceiptPage && <TranactionFailed />}
        {bankPage && <BankDisplay />}
        {currentUser?.status?.toLowerCase() !== "active" && <SuspendedPage />}
        
        <Footer />
      </div>
    </>
  );
}
