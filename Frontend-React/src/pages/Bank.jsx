import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import smallcd from "../assets/smallcd.png";
import Transaction from "../components/Transaction";
import { setTransaction } from "../slice/balanceSlice";
import { BankContext } from "../context/BankContext";
import UserCryptoDropDown from "../components/UserCryptoDropdown";
import card1 from "../assets/card_background.png";
import Logo from "../components/Logo";
import logo2 from "../assets/logo large2.png";
import logoGen from "../assets/logo sign.png";
import { CusCareContext } from "../context/CusCareContext";
import { login, refreshUser } from "../slice/authUserSlice";
import { toast } from "react-toastify";
import LoaderSmall from "../components/LoaderSmall";
import { IoIosCheckmarkCircle } from "react-icons/io";
import cardImg from "../assets/card des2.png";
import cardBack from "../assets/card back.png";
import transactB from "../assets/transact b.png";
import { BiHide, BiShow } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import useRefetchUser from "../hooks/useRefetchUser";

import { FaAsterisk } from "react-icons/fa6";

export default function Bank() {
  const { currentUser, currency, symbol } = useSelector((state) => state.userAuth);
  const { transactions } = useSelector((state) => state.userBalanceDetails);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  // const [conversionRate, setConversionRate] = useState(1);
  const [balance, setBalance] = useState(1000); // Replace with actual balance
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [showCpBalance, setShowCpBalance] = useState(false);
  const dispatch = useDispatch();
  const [translateTransaction, setTranslateTransaction] = useState("100%");
  const [translateCards, setTranslateCards] = useState("100%");
  const [currentCard, setCurrentCard] = useState("card2");
  const [opacityBalance, setOpacityBalance] = useState("0");
  const [linkAcctState, setLinkAcctState] = useState(true);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const {
    cryptoPage,
    setCryptoPage,
    cryptoCurrencies,
    isLoading,
    setIsLoading,
    setBankPage,
    bankInView,
  } = useContext(BankContext);
  const { setCustomerCarePage, setCustomerCareMessage } =
    useContext(CusCareContext);
  const reversedTransactions = [...transactions].reverse();
  const currentUserFullname = `${currentUser.firstname} ${currentUser.lastname}`;
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const [cpIsdropDownOpen, setCpIsdropDownOpen] = useState(false);
  const [cpSelectedCurrency, setCpSelectedCurrency] = useState("BTC");

  const { refetchUser, error } = useRefetchUser(setIsLoading);
  const [acct, setAcct] = useState({
    cardType: "Mastercard",
    expiry: "10/24",
    cardNumber: "12345689012",
    noc: "Oke Habeeb Adedayo",
  });

  useEffect(function () {
    console.log(bankInView);
    refetchUser();
  }, []);
  useEffect(() => {
    async function fetchUserCards() {
      try {
        const response = await axios.get(
          `${apiUrl}/users/user-cards/${currentUser?.email}`
        );
        setLinkedAccounts(response.data.reverse());
      } catch (error) {
        toast.error("Error fetching Cards:", error);
      }
    }

    fetchUserCards();
  }, [currentUser, dispatch]);
  const userCryptoCurrencies = [
    {
      name: "BTC",
      amount: currentUser?.cryptos[0].btc_balance,
    },
    {
      name: "USDT",
      amount: currentUser?.cryptos[0].usdt_balance,
    },
    {
      name: "BNB",
      amount: currentUser?.cryptos[0].bnb_balance,
    },
    {
      name: "ETH",
      amount: currentUser?.cryptos[0].eth_balance,
    },
  ];
  function handleCusOvMessage() {
    setCustomerCarePage(true);
    setCustomerCareMessage("link account");
  }
  const cryptoAssets = cryptoCurrencies?.find(
    (cp) => cp.symbol === cpSelectedCurrency
  );
  const cryptoValue = cryptoAssets
    ? Number(cryptoAssets.priceUsd) * currentUser[cpSelectedCurrency]
    : 0;
  const profileLevelItems = [
    "firstname",
    "lastname",
    "email",
    "ssn",
    "balance",
    "image_url",
    "identification_state",
    "address",
  ];
  let userCompletion = 0;
  profileLevelItems.forEach((item) => {
    if (currentUser[`${item}`]) {
      userCompletion++;
    }
  });
  let myCompletion = (
    (userCompletion / profileLevelItems.length) *
    100
  ).toFixed(0);

  useEffect(() => {
    async function fetchUserTransaction() {
      if (!currentUser) return;
      try {
        setIsLoadingTransactions(true);
        const response1 = await axios.post(
          `${apiUrl}/currency/money/transactions`,
          { email: currentUser?.email }
        );
        const response2 = await axios.post(
          `${apiUrl}/currency/crypto/transactions`,
          { email: currentUser?.email }
        );
        const transactions = [...response1.data, ...response2.data];
        dispatch(setTransaction(transactions));
      } catch (error) {
      } finally {
        setIsLoadingTransactions(false);
      }
    }

    fetchUserTransaction();
  }, [currentUser, dispatch]);
  const cpToggleDropdown = () => setCpIsdropDownOpen(!cpIsdropDownOpen);
  const cpHandleCurrencySelect = (cur) => {
    if (currentUser?.level.toLowerCase() === "vip" || currentUser?.level.toLowerCase() === "premium") {
      setCpSelectedCurrency(cur?.name);
      setCpIsdropDownOpen(false);
    }
  };
  const menuRef = useRef(null);
  useEffect(() => {
    // Function to handle clicks outside of the menu
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setCpIsdropDownOpen(false);
      }
    }

    // Attach event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setOpacityBalance("1");
    setTranslateTransaction("0px");
  }, []);
  useEffect(function () {
    setOpacityBalance("1");
    setTranslateTransaction("0px");
  }, []);
  const pleasingColors = {
    color1: "rgba(86, 180, 233, 0.2)", // Sky Blue
    color2: "rgba(0, 158, 115, 0.2)", // Emerald Green
    color3: "rgba(240, 228, 66, 0.2)", // Sunflower Yellow
    color4: "rgba(230, 159, 0, 0.2)", // Warm Orange
    color5: "rgba(213, 94, 0, 0.2)", // Burnt Sienna
    color6: "rgba(204, 121, 167, 0.2)", // Orchid Pink
    color7: "rgba(0, 114, 178, 0.2)", // Rich Blue
  };

  const infiniteScrollContent = [
    {
      name: "color1",
      color: "rgb(86, 180, 233)",
      header: "Transfer",
      content: "Transfer to other accouns with ease",
      boxshadow: `inset 0px 0px 20px ${pleasingColors.color1}` /* Inner shadow */,
    },
    {
      name: "color2",
      color: "rgb(0, 158, 115)",
      header: "Deposit",
      content: "Fast and Reliable deposit",
      boxshadow: `inset 0px 0px 20px ${pleasingColors.color2}` /* Inner shadow */,
    },
    {
      name: "color3",
      color: "rgb(240, 228, 66)",
      header: "Withdraw",
      content: "Withdraw easily to external account",
      boxshadow: `inset 0px 0px 20px ${pleasingColors.color3}` /* Inner shadow */,
    },
    {
      name: "color4",
      color: "rgb(230, 159, 0)",
      header: "Buy Crypto",
      content: "Buy cryptocurrency from wallet",
      boxshadow: `inset 0px 0px 20px ${pleasingColors.color4}` /* Inner shadow */,
    },
    {
      name: "color5",
      color: "rgb(213, 94, 0)",
      header: "Sell Crypro",
      content: "P2p crypto transaction",
      boxshadow: `inset 0px 0px 20px ${pleasingColors.color5}` /* Inner shadow */,
    },
    {
      name: "color6",
      color: "rgb(204, 121, 167)",
      header: "Cards",
      content: "Link bank card for transaction",
      boxshadow: `inset 0px 0px 20px ${pleasingColors.color6}` /* Inner shadow */,
    },
    {
      name: "color7",
      color: "rgb(0, 114, 178)",
      header: "MONTREAL",
      content: "We are here for you",
      boxshadow: `inset 0px 0px 20px ${pleasingColors.color7}` /* Inner shadow */,
    },
  ];
  function handleShowBalance() {
    setShowBalance((c) => !c);
  }
  function handleShowCpBalance() {
    setShowCpBalance((c) => !c);
  }

  return (
    <>
      <Outlet />
      <div className="z-20 w-full h-[85%] pb-5  md:pb-0 md:h-full left-0 top-0 md:absolute md:left-[10%] lg:left-[13%] md:w-[90%] lg:w-[87%]">
        <div className="text-sm h-[8%] border-b-2 px-4 py-2">
          <ul className="flex">
            <li className="mr-4">Dashboard</li>
            <li className="mr-4">Transfer</li>
            <li className="mr-4">Cards</li>
            <li className="mr-4">Accounts</li>
          </ul>
        </div>
        <div className="pt-2 pr-2 h-full md:h-[90%] w-[100%] gap-2 md:flex items-center justify-between flex-col md:flex-row overflow-y-auto md:overflow-y-hidden">
          <div className="px-2 lg:basis-[69%] md:basis-[70%] w-[100%] lg:w-[65%] md:w-[70%] h-[800px] md:h-full ">
            <div>
              <h1 className="font-bold tracking-tighter font-[poppins] text-xl lg:text-3xl">
                Welcome,{" "}
                <span className=" text-primary">{currentUser?.username}</span>
                {"."}
              </h1>
            </div>
            <div className="flex md:gap-[5px] bigCardCont gap-4 lg:gap-3 items-center justify-between py-4 md:py-0 h-[25%] md:h-[30%] w-full overflow-x-auto">
              <div
                className="rounded-xl h-[93%] bigCard min-w-[100%] sm:min-w-[48%] md:min-w-[48%] relative flex items-center justify-between flex-col p-[4px]"
                style={{
                  backgroundImage: `url(${card1})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Logo
                  imageSrc={logoGen}
                  extraClass="absolute w-[20px] left-3 top-2"
                />
                <p className="text-white flex items-center text-lg md:text-lg lg:text-xl font-semibold  absolute right-3 top-2">
                  <span className="text-primary flex items-center">
                    <span
                      className="mr-2 cursor-pointer"
                      onClick={handleShowBalance}
                    >
                      {showBalance ? <BiShow /> : <BiHide />}
                    </span>
                    {symbol}
                  </span>
                  <span>
                    {showBalance ? (
                      currentUser?.balance ? (
                        currentUser?.balance.toFixed(2)
                      ) : (
                        "0.00"
                      )
                    ) : (
                      <span className="flex items-center">
                        <FaAsterisk size={10} />
                        <FaAsterisk size={10} />
                        <FaAsterisk size={10} />
                        <FaAsterisk size={10} />
                      </span>
                    )}{" "}
                  </span>
                </p>
                <div className="h-[30%] w-full"></div>
                <div className="h-[30%] px-2 md:px-2 lg:px-4 w-full text-right text-lg md:text-lg lg:text-xl text-white">
                  <p>
                    <p>
                      {currentUser?.accnumber ? (
                        <>
                          <span className="mr-2">
                            {currentUser.accnumber
                              .toString()
                              .split("")
                              .slice(0, 4)
                              .join("")}
                          </span>
                          <span className="mr-2">
                            {currentUser.accnumber
                              .toString()
                              .split("")
                              .slice(4, 8)
                              .join("")}
                          </span>
                          <span className="mr-2">
                            {currentUser.accnumber
                              .toString()
                              .split("")
                              .slice(8, 10)
                              .join("")}
                          </span>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </p>
                </div>
                <div className="h-[40%] w-full">
                  <p className="h-[30%] text-sm md:text-xs lg:text-sm pl-2 text-white">
                    <span>{currentUserFullname}</span>
                  </p>
                  <div className="h-[70%] flex items-center justify-between px-2 text-white">
                    <Link
                      to="/bank/transfer"
                      className="bg-white font-semibold flex items-center p-2 md:px-2 lg:px-4 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer"
                    >
                      <img
                        src={transactB}
                        className="w-[10px] mr-[2px]"
                        alt="tr"
                      />
                      Transfer
                    </Link>
                    <div
                      onClick={() => {
                        setCustomerCarePage(true);
                        setCustomerCareMessage(
                          "deposit to your Montreal account"
                        );
                      }}
                      className="bg-white font-semibold flex items-center md:px-2 lg:px-4 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer p-2"
                    >
                      <img
                        src={transactB}
                        className="w-[10px] mr-[2px]"
                        alt="tr"
                      />
                      Deposit
                    </div>
                    <div
                      onClick={() => {
                        // setCustomerCarePage(true);
                        // setCustomerCareMessage("withdraw to external account");
                        setBankPage(true);
                      }}
                      className="bg-white font-semibold flex items-center md:px-2 lg:px-4 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer p-2"
                    >
                      <img
                        src={transactB}
                        className="w-[10px] mr-[2px]"
                        alt="tr"
                      />
                      Withdraw
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`bg-white text-secondary bigCard relative min-w-[100%] sm:min-w-[48%] border-[2px] rounded-xl border-primary ${
                  currentUser?.level.toLowerCase() === "pro" ? "disabledCP" : ""
                }  h-[93%] md:min-w-[48%]`}
              >
                <Logo
                  imageSrc={logoGen}
                  extraClass="absolute w-[20px] left-3 top-2"
                />
                <p className="text-secondary w-full text-lg md:text-lg lg:text-xl font-semibold  absolute right-3 top-2 flex items-center justify-end">
                  <span className="text-primary font-bold flex items-center">
                    <span
                      className="mr-2 cursor-pointer"
                      onClick={handleShowCpBalance}
                    >
                      {showCpBalance ? <BiShow /> : <BiHide />}
                    </span>
                    {
                      <UserCryptoDropDown
                        ref={menuRef}
                        cpCurrencies={userCryptoCurrencies}
                        cpHandleCurrencySelect={cpHandleCurrencySelect}
                        cpIsDropdownOpen={cpIsdropDownOpen}
                        cpSelectedCurrency={cpSelectedCurrency}
                        cpToggleDropdown={cpToggleDropdown}
                      />
                    }
                  </span>
                  {showCpBalance ? (
                    <span>
                      {currentUser?.cryptos
                        ? currentUser?.cryptos[0][
                            `${cpSelectedCurrency === "BTC" && "btc_balance"}`
                          ]?.toFixed(5)
                        : "0"}
                      {currentUser?.cryptos
                        ? currentUser?.cryptos[0][
                            `${cpSelectedCurrency === "ETH" && "eth_balance"}`
                          ]?.toFixed(5)
                        : "0"}
                      {currentUser?.cryptos
                        ? currentUser?.cryptos[0][
                            `${cpSelectedCurrency === "BNB" && "bnb_balance"}`
                          ]?.toFixed(5)
                        : "0"}
                      {currentUser?.cryptos
                        ? currentUser?.cryptos[0][
                            `${cpSelectedCurrency === "USDT" && "usdt_balance"}`
                          ]?.toFixed(5)
                        : "0"}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FaAsterisk size={10} />
                      <FaAsterisk size={10} />
                      <FaAsterisk size={10} />
                      <FaAsterisk size={10} />
                    </span>
                  )}
                </p>
                <div className="h-[30%] w-full"></div>
                <div className="h-[30%] px-2 md:px-2 lg:px-4 w-full text-right text-lg md:text-lg lg:text-xl text-secondary">
                  <p>
                    {currentUser?.accnumber ? (
                      <>
                        <span className="mr-2">
                          {currentUser.accnumber
                            .toString()
                            .split("")
                            .slice(0, 4)
                            .join("")}
                        </span>
                        <span className="mr-2">
                          {currentUser.accnumber
                            .toString()
                            .split("")
                            .slice(4, 8)
                            .join("")}
                        </span>
                        <span className="mr-2">
                          {currentUser.accnumber
                            .toString()
                            .split("")
                            .slice(8, 10)
                            .join("")}
                        </span>
                      </>
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
                <div className="h-[40%] w-full">
                  <p className="h-[30%] text-sm md:text-xs lg:text-sm pl-2 text-secondary">
                    <span>{currentUserFullname}</span>
                  </p>
                  <div className="h-[70%] flex items-center justify-between px-2 text-secondary">
                    <div
                      onClick={() => {
                        if(currentUser?.level.toLowerCase() === "vip" || currentUser?.level.toLowerCase() === "premium"){
                          setCryptoPage(true)
                        }}}
                      className="border-[1px] border-secondary md:px-2 lg:px-3 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer font-semibold p-2"
                    >
                      Swap
                    </div>
                    <div
                      onClick={() => {
                        if (currentUser?.level.toLowerCase() === "vip" || currentUser?.level.toLowerCase() === "premium") {
                          setCustomerCarePage(true);
                          setCustomerCareMessage("deposit Crypto currency");
                        }
                      }}
                      className="border-[1px] border-secondary md:px-2 lg:px-3 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer font-semibold p-2"
                    >
                      Deposit
                    </div>
                    <div
                      onClick={() => {
                        if (currentUser?.level.toLowerCase() === "vip" || currentUser?.level.toLowerCase() === "premium") {
                          setCustomerCarePage(true);
                          setCustomerCareMessage("For P2P transaction");
                        }
                      }}
                      className="border-[1px] border-secondary md:px-2 lg:px-3 py-1 rounded text-secondary md:text-xs lg:text-sm cursor-pointer font-semibold p-2"
                    >
                      P2P
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[20%] md:h-[25%] py-2">
              <h1 className="font-semibold">Tasks</h1>
              <div className="flex h-[80%] infinite-scroll-container w-[full]">
                <div className="infinite-scroll flex h-full items-center gap-2 w-max">
                  {[...infiniteScrollContent, ...infiniteScrollContent].map(
                    (content, i) => (
                      <div
                        key={i}
                        style={{
                          border: `1px solid ${content?.color}`,
                          boxShadow: `${content?.boxshadow}`,
                          color: `${content?.color}`,
                        }}
                        className="min-w-[100px] h-[90px] rounded-lg border-[1px] shadow-sm smCard px-2 pt-4"
                      >
                        <p className="font-semibold text-xs  capitalize ">
                          {content?.header}
                        </p>
                        <p className="text-[10px] leading-4">
                          {content?.content}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="block sm:mb-4 md:mb-0 md:flex px-2 items-center justify-center md:h-[40%] text-sm">
              <div className="h-full w-full flex flex-col md:flex-row items-center">
                <div className="min-h-[200px] bg-lightgray w-full md:w-[50%] md:mr-4 sidebarScroll overflow-y-auto">
                  <p className="font-bold mb-2 px-4 pt-2">
                    Recent Transactions
                  </p>
                  <hr />
                  <div className="h-full rounded-lg">
                    {isLoadingTransactions ? (
                      <div className="flex items-center justify-center p-4">
                        <LoaderSmall />
                      </div>
                    ) : (
                      <ul className="px-4 pb-4">
                        {(() => {
                          const usdTransactions = transactions.filter(
                            (tr) => tr.asset === "USD"
                          );
                          const reversedUsdTransactions = usdTransactions
                            .slice()
                            .reverse();

                          if (reversedUsdTransactions.length === 0) {
                            return (
                              <p className="text-center text-secondary py-2">
                                No USD Transactions yet.
                              </p>
                            );
                          }

                          return reversedUsdTransactions
                            .slice(0, 3)
                            .map((transaction) => (
                              <Transaction
                                key={transaction.id}
                                transaction={transaction}
                              />
                            ));
                        })()}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="min-h-[200px] mt-4 md:mt-0 bg-lightgray w-full md:w-[50%] overflow-y-auto sidebarScroll md:mr-4">
                  <p className="font-bold mb-2 px-4 pt-2">
                    Crypto Transactions
                  </p>
                  <hr />
                  <div className="h-full sidebarScroll rounded-lg">
                    {isLoadingTransactions ? (
                      <div className="flex items-center justify-center p-4">
                        <LoaderSmall />
                      </div>
                    ) : (
                      <ul className="px-4 pb-4">
                        {(() => {
                          const filteredTransactions = transactions.filter(
                            (tr) =>
                              tr.asset === "BNB" ||
                              tr.asset === "ETH" ||
                              tr.asset === "BTC" ||
                              tr.asset === "USDT"
                          );
                          const reversedFilteredTransactions =
                            filteredTransactions.slice().reverse();

                          if (reversedFilteredTransactions.length === 0) {
                            return (
                              <p className="text-center text-secondary py-2">
                                No Transactions yet.
                              </p>
                            );
                          }

                          return reversedFilteredTransactions
                            .slice(0, 3)
                            .map((transaction) => (
                              <Transaction
                                key={transaction.id}
                                transaction={transaction}
                                currentUser={currentUser}
                              />
                            ));
                        })()}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-lightgray md:basis-[30%] sm:w-[55%] md:w-30% h-[500px] md:h-full  rounded-lg hidden md:block">
            <div className="h-[25%]  p-2 rounded-t-lg flex items-center justify-between bg-secondary flex-col text-white relative">
              <div className="font-semibold flex items-center justify-between w-full">
                <Logo imageSrc={logo2} extraClass="w-[100px] left-3 top-2" />
                <span className="text-yellow-500 font-semibold">
                  {currentUser?.level
                    ? currentUser?.level.toUpperCase()
                    : "PRO"}
                </span>
              </div>
              <div className="font-semibold w-full text-right">
                {currentUserFullname ? currentUserFullname : ""}
              </div>
              <div
                style={{
                  backgroundImage: `url("${
                    currentUser?.image_url ? currentUser?.image_url : ""
                  }")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="w-[100px] h-[100px] border-[3px] border-yellow-500 rounded-t-full rounded-b-2xl  absolute left-5 -bottom-10 bg-white"
              ></div>
            </div>
            <div className="px-2">
              <div className="mt-[50px]">
                {linkedAccounts.length > 0 ? (
                  <div className="debitCard w-full h-[180px] rounded-2xl">
                    <div
                      style={{
                        backgroundImage: `url("${cardImg}")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      className="card-front w-full h-full rounded-2xl shadow-soft cursor-pointer"
                    >
                      <p className="absolute left-[18px] md:left-[22px] lg:left-[25px] top-4 tracking-[1.5px] text-[18px] flex items-center justify-center  text-white font-bold text-base">
                        {linkedAccounts[0]?.card_type}
                      </p>
                      <p className="absolute left-[18px] md:left-[22px] lg:left-[25px] top-[105px] tracking-[1.5px] text-sm md:text-base  flex items-center justify-center text-white font-bold">
                        <span className="mr-2 md:mr-4 lg:mr-6">
                          {linkedAccounts[0]?.card_number
                            .toString()
                            ?.split("")
                            .slice(0, 4)
                            .join("")}
                        </span>
                        <span className="mr-2 md:mr-4 lg:mr-6">
                          {linkedAccounts[0]?.card_number
                            .toString()
                            ?.split("")
                            .slice(4, 8)
                            .join("")}
                        </span>
                        <span className="mr-2 md:mr-4 lg:mr-6">
                          {linkedAccounts[0]?.card_number
                            .toString()
                            ?.split("")
                            .slice(8, 12)
                            .join("")}
                        </span>
                        <span className="mr-2 md:mr-4 lg:mr-6">
                          {linkedAccounts[0]?.card_number
                            .toString()
                            ?.split("")
                            .slice(12, 16)
                            .join("")}
                        </span>
                      </p>
                      <p className="absolute left-[160px] text-[13px] top-[129px] text-white">
                        {`${linkedAccounts[0]?.expire_month}/${linkedAccounts[0]?.expire_year} `}
                      </p>
                      <p className="absolute left-[28px] text-white bottom-2">
                        {linkedAccounts[0]?.cardholder_name}
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundImage: `url("${cardBack}")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      className="card-back w-full h-full rounded-2xl cursor-pointer relative"
                    >
                      <p className="left-[180px] [120px]">
                        {linkedAccounts[0]?.cvv}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-[180px] rounded-2xl cursor-pointer border-2 border-dashed border-gray-300  relative bg-lightgray flex items-center justify-center "
                    onClick={() => handleCusOvMessage()}
                  >
                    <span className="text-2xl text-gray-300">+</span>
                  </div>
                )}
              </div>
              <div className="mt-4 m-auto">
                <h1 className="font-semibold text-sm mb-2">Profile</h1>
                <hr />
                <div
                  onClick={() => navigate("/bank/settings")}
                  className="flex items-center mt-1"
                >
                  <div
                    className="h-[60px] w-[60px] rounded-full flex items-center mr-4 justify-center"
                    style={{
                      backgroundImage: `conic-gradient(#1deb78 ${
                        myCompletion * 3.6
                      }deg, white 0deg)`,
                    }}
                  >
                    <div className="w-[45px] h-[45px] bg-lightgray rounded-full flex items-center justify-center flex-col">
                      <span className="text-sm font-semibold mb-1">
                        {myCompletion}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap w-[60%]">
                    {profileLevelItems.map((pf, i) => (
                      <p
                        key={i}
                        className="capitalize flex items-center text-xs mr-3"
                      >
                        {currentUser[pf] ? (
                          <>
                            <IoIosCheckmarkCircle color="green" />
                            {pf === "identification_state" && "identification"}
                            {pf === "image_url" && "Profile Pic"}
                            {pf !== "image_url" &&
                              pf !== "identification_state" &&
                              pf}
                          </>
                        ) : (
                          <>
                            <MdOutlineCancel color="red" />
                            {pf === "identification_state" && "identification"}
                            {pf === "image_url" && "Profile Pic"}
                            {pf !== "image_url" &&
                              pf !== "identification_state" &&
                              pf}
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
