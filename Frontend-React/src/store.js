import {configureStore} from "@reduxjs/toolkit";
import userAuthReducer from "./slice/authUserSlice"
const store = configureStore({
    reducer: {
        userAuth: userAuthReducer
    }
})

export default store;