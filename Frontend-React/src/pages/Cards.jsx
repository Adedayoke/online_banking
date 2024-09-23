import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cardImg from "../assets/card des2.png";
import cardBack from "../assets/card back.png";
import VCard from "../assets/virtual card.png";
import { CusCareContext } from "../context/CusCareContext";
import { toast } from "react-toastify";
import LinkCard from "../components/LinkCard";

const apiUrl = process.env.REACT_APP_API_URL;
const Cards = () => {
  const { currentUser } = useSelector((state) => state.userAuth);
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [linkAccountPage, setLinkedAccountsPage] = useState()
  const { setCustomerCarePage, setCustomerCareMessage } =
    useContext(CusCareContext);
  useEffect(() => {
    async function fetchUserCards() {
      if (!currentUser?.email) return; // Ensure currentUser is defined

      try {
        const response = await axios.get(
          `${apiUrl}/users/user-cards/${currentUser.email}`
        );
        setLinkedAccounts(response.data.reverse());
      } catch (error) {
        toast.error("Error fetching Cards, reload page");
      }
    }

    fetchUserCards();
  }, [currentUser]);

  function handleCusOvMessage() {
    setCustomerCarePage(true);
    setCustomerCareMessage("link account");
  }
  return (
    <div className="z-20 w-full h-[90%] md:h-full left-0 md:absolute md:left-[10%] lg:left-[13%] md:w-[90%] lg:w-[87%] p-4">
      <div className="h-[50%] ">
        <h1 className="font-xl font-semibold">External Bank Cards</h1>
        <div className="flex overflow-x-auto overflow-y-hidden customCard-scroller gap-10 mt-4">
        <div
            className="min-w-[300px] customCard h-[187px] rounded-2xl cursor-pointer border-2 border-dashed border-gray-300  relative bg-lightgray flex items-center justify-center "
            onClick={() => setLinkedAccountsPage(true)}
          >
            <span className="text-2xl text-gray-300">+</span>
          </div>
          {linkedAccounts.map((acct, i) => (
            <div key={i} className="debitCard customCard min-w-[300px] h-[187px] rounded-2xl">
              <div
                style={{
                  backgroundImage: `url("${cardImg}")`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="card-front w-full h-full rounded-2xl shadow-soft cursor-pointer"
              >
                <p className="absolute left-[28px] top-4 tracking-[1.5px] text-[18px] flex items-center justify-center  text-white font-bold">
                  {acct?.card_type}
                </p>
                <p className="absolute left-[28px] top-[105px] tracking-[1.5px] text-[18px] flex items-center justify-center  text-white font-bold">
                  <span className="mr-6">
                    {acct?.card_number
                      .toString()
                      .split("")
                      .slice(0, 4)
                      .join("")}
                  </span>
                  <span className="mr-6">
                    {acct?.card_number
                      .toString()
                      .split("")
                      .slice(4, 8)
                      .join("")}
                  </span>
                  <span className="mr-6">
                    {acct?.card_number
                      .toString()
                      .split("")
                      .slice(8, 12)
                      .join("")}
                  </span>
                  <span className="mr-6">
                    {acct?.card_number
                      .toString()
                      .split("")
                      .slice(12, 16)
                      .join("")}
                  </span>
                </p>
                <p className="absolute left-[150px] text-[15px] top-[131px] text-white">{`${acct?.expire_month}/${acct?.expire_year}`}</p>
                <p className="absolute left-[28px] text-white bottom-2">
                  {acct?.cardholder_name}
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
              ></div>
            </div>
          ))}
          
        </div>
      </div>
      <div className="h-[50%]">
        <h1 className="font-xl font-semibold">Virtal Card (Coming Soon)</h1>
        <div>
          <div
            className="w-[300px] h-[187px] rounded-2xl cursor-not-allowed opacity-50  relative flex items-center justify-center "
            style={{
              backgroundImage: `url("${VCard}")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
          </div>
        </div>
      </div>
      {linkAccountPage && <LinkCard setLinkedAccountsPage={setLinkedAccountsPage} setLinkedAccounts={setLinkedAccounts} linkedAccount={linkedAccounts} />}
    </div>
  );
};

export default Cards;
