import React, { useState, useEffect, useContext } from "react";
import Overlay from "../../../components/Overlay";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTransfer } from "../../../slice/transactionSlice";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import Cash from "../../../assets/Money.png";
import { CusCareContext } from "../../../context/CusCareContext";

export default function Transfer() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [receiverAccountName, setReceiverAccountName] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [receiverBank, setReceiverBank] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [transferError, setTransferError] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("account");
  const [allUsers, setAllUsers] = useState([]);
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  const {customerCareMessage, setCustomerCareMessage, setCustomerCarePage} = useContext(CusCareContext)

  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if the receiver account number is valid
    if (selectedRoute === "account") {
      try {
        const response = await axios.post(`${apiUrl}/verify/accountnumber`, {
          accountNumber: Number(receiverAccountNumber),
        });
        if (response.data) {
          dispatch(
            setCurrentTransfer({
              receiverAccountName: response?.data.name,
              receiverAccountNumber: response?.data.accnumber,
              receiverBank: "Montreal",
              transferType: "account",
            })
          );
          navigate(`/bank/transfer/amount`);
        } else {
          setTransferError("User not found");
          return;
        }
      } catch (err) {
        console.error("Error verifying account number:", err);
        setTransferError(
          err.response?.data?.message ||
            "An error occurred while verifying the account."
        );
      }
    } else {
      setCustomerCareMessage(`Transfer to ${receiverAccountName} ${receiverAccountNumber}, ${receiverBank}`)
      setCustomerCarePage(true)
    }
  }
  useEffect(
    function () {
      setTimeout(() => {
        setTransferError("");
      }, 5000);
    },
    [transferError]
  );
  async function handleClickTransaction(transaction) {
    try {
      const response = await axios.post(`${apiUrl}/verify/accountnumber`, {
        accountNumber: Number(transaction?.merchant_account),
      });
      if (response.data) {
        dispatch(
          setCurrentTransfer({
            receiverAccountName: response?.data.name,
            receiverAccountNumber: response?.data.accnumber,
            receiverBank: "Montreal",
            transferType: "account",
          })
        );
        navigate(`/bank/transfer/amount`);
      } else {
        setTransferError("User not found");
        return;
      }
    } catch (err) {
      // console.error("Error verifying account number:", err);
      setTransferError(
        err.response?.data?.message ||
          "An error occurred while verifying the account."
      );
    }
  }

  return (
    <div className="z-50 w-full h-full left-0 top-0 fixed md:absolute md:left-[10%] lg:left-[13%] md:w-[90%] lg:w-[87%] overflow-y-auto">
      <div className=" md:hidden absolute cursor-pointer left-0 top-0 text-white px-2 py-8 z-50 h-10 bg-secondary w-full flex items-center">
        <span className="mr-4" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack size={30} />{" "}
        </span>
        <span className="text-lg font-semibold">Transfer to Bank</span>
      </div>
      <Overlay extraClass="flex-col bg-white bg-white text-base mt-10 md:mt-0">
        <form className="p-4 md:w-1/2 w-full z-20" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <p
              onClick={() => setSelectedRoute("account")}
              className={`p-4 text-center font-semibold cursor-pointer basis-1/2 ${
                selectedRoute === "account"
                  ? "border-primary border-b-2 text-primary"
                  : "border-b-0"
              }`}
            >
              TO MONTREAL ACCOUNT
            </p>
            <p
              onClick={() => setSelectedRoute("bank")}
              className={`p-4 text-center font-semibold cursor-pointer basis-1/2 ${
                selectedRoute === "bank"
                  ? "border-primary border-b-2 text-primary"
                  : "border-b-0"
              }`}
            >
              TO EXTERNAL ACCOUNT
            </p>
          </div>
          {selectedRoute === "account" ? (
            <div className="relative mb-4">
              <input
                value={receiverAccountNumber}
                onChange={(e) => setReceiverAccountNumber(e.target.value)}
                id="receiverAccountNumber"
                name="receiverAccountNumber"
                placeholder="Enter Receiver's Account Number"
                className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
                required
              />
            </div>
          ) : (
            <>
              <div className="relative mb-4">
                <input
                  value={receiverAccountNumber}
                  onChange={(e) => setReceiverAccountNumber(e.target.value)}
                  id="receiverAccountNumber"
                  name="receiverAccountNumber"
                  placeholder="Enter Account Number"
                  className="form__input w-full px-3 pt-3 py-2 bg-lightgray focus:outline-none text-lg rounded"
                  required
                />
              </div>
              <div className="relative mb-4">
                <input
                  value={receiverBank}
                  onChange={(e) => setReceiverBank(e.target.value)}
                  id="receiverBank"
                  name="receiverBank"
                  placeholder="Enter Receiver's Bank Name"
                  className="form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none"
                  required
                />
              </div>
              <div className="relative mb-4">
                <input
                  value={receiverAccountName}
                  onChange={(e) => setReceiverAccountName(e.target.value)}
                  id="receiverAccountName"
                  name="receiverAccountName"
                  placeholder="Enter Account Name"
                  className="form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none"
                  required
                />
              </div>
              <div className="relative mb-4">
                <input
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  id="routingNumber"
                  name="routingNumber"
                  placeholder="Enter Routing Number"
                  className="form__input px-3 pt-3 py-2 w-full bg-lightgray rounded-md focus:outline-none"
                  required
                />
              </div>
            </>
          )}
          {transferError && (
            <div className="text-red-500 text-xs mt-2 mb-2">
              {transferError}
            </div>
          )}
          <button
            type="submit"
            className="disabled:text-stone-100 disabled:cursor-not-allowed block p-1 bg-secondary text-white w-full my-4 rounded mx-auto"
          >
            Next
          </button>
        </form>
        <div className="bg-lightgray text-sm overflow-y-auto sidebarScroll w-[90%] md:w-1/2 rounded-2xl h-1/2">
        <div onClick={()=>navigate("/bank/transactions")} className="p-4 font-semibold">
          Recent Transactions {">"}
        </div>
          {transactions?.length > 0 ? (
            transactions
              ?.filter((transaction) => transaction?.asset === "USD")?.reverse().slice(0, 5)
              ?.map((transaction) => (
                <div
                  onClick={() =>handleClickTransaction(transaction)}
                  key={transaction.id} // Ensure each transaction has a unique key
                  className="text-base cursor-pointer p-5 h-14 text-black flex items-center justify-between mb-4"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                    <div
                    style={{
                      backgroundImage: `url("${Cash}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat"
                    }}
                    className="mr-4 w-7 h-7 rounded-full overflow-hidden bg-white p-2">
                    </div>
                    <div className="font-semibold">
                      {transaction?.merchant}
                    </div>
                    </div>
                    <div className="text-sm">{transaction?.bank}({transaction?.merchant_account?.slice(6, 10)})</div>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center p-5 text-secondary">
              No Transactions yet.
            </p>
          )}
        </div>
      </Overlay>
    </div>
  );
}
