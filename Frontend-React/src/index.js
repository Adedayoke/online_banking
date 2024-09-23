import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BankProvider } from "./context/BankContext";
import { CusCareProvider } from "./context/CusCareContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BankProvider>
      <CusCareProvider>
        <App />
      </CusCareProvider>
    </BankProvider>
  </Provider>
);
