import {configureStore} from "@reduxjs/toolkit";
import userAuthReducer from "./slice/authUserSlice"
import userBalanceReducer from "./slice/balanceSlice"
const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        userBalanceDetails: userBalanceReducer
    }
})

export default store;