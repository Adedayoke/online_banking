import {configureStore} from "@reduxjs/toolkit";
import userAuthReducer from "./slice/authUserSlice"
import userBalanceReducer from "./slice/balanceSlice"
import adminFunctionsReducer from "./slice/adminUserSlice"
const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        userBalanceDetails: userBalanceReducer,
        adminFunctions: adminFunctionsReducer,
    }
})

export default store;