import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CusCareContext = createContext();

const CusCareProvider = ({ children }) => {
  const [customerCarePage, setCustomerCarePage] = useState(false);
  const [customerCareMessage, setCustomerCareMessage] = useState("");
  

  return (
    <CusCareContext.Provider
      value={{ customerCarePage, setCustomerCarePage, setCustomerCareMessage, customerCareMessage }}
    >
      {children}
    </CusCareContext.Provider>
  );
};

export { CusCareContext, CusCareProvider };
