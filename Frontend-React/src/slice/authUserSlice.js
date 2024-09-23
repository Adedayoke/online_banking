import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userBasicDetails: null,
    currentUser:null,
    isLoggedIn: false,
    isLoading: false,
    signUpOneComplete: false,
    userSetPin: "",
    userToken: "",
    currency: "",
    symbol: "",
    // rateToUSD: 1
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        signupOne(state, action) {
            state.signUpOneComplete = true;
            state.userBasicDetails = action.payload;
        },
        login(state, action) {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
            // // state.userToken = action.payload.token
            // if(action.payload){
            //     localStorage.setItem("user", JSON.stringify(action.payload));
            // }
        },
        refreshUser(state, action) {
            state.currentUser = action.payload;
            // if(action.payload){
            //     localStorage.setItem("user", JSON.stringify(action.payload));
            // }
        },
        logout(state) {
            state.currentUser = null;
            state.isLoggedIn = false;
            localStorage.removeItem("user");
        },
        setUserTemPin(state, action) {
            state.userSetPin = action.payload;
            // localStorage.setItem("user", JSON.stringify({ ...state.currentUser, userSetPin: action.payload }));
        },
        setCurrencySymbol(state, action){
            state.currency = action.payload.currency
            state.symbol = action.payload.symbol
            // state.rateToUSD = action.payload.rateToUSD
        }
    }
});

export const { signupOne, login, setUserTemPin, refreshUser, logout, setCurrencySymbol } = userAuthSlice.actions;

export default userAuthSlice.reducer;
