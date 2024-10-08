import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userBasicDetails: null,
    currentUser: null,
    isLoggedIn: false,
    isLoading: false,
    signUpOneComplete: false
}

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        signupOne(state, action){
            state.signUpOneComplete = true
            state.userBasicDetails = action.payload
        },
        // signup(state, action){
        //     state.currentUser = {
        //         ...state.userBasicDetails, ...action.payload
        //     }
        // },
        login(state, action){
            state.currentUser = action.payload
            state.isLoggedIn = true
        },
        logout(state, action){
            state.currentUser = null
            state.isLoggedIn = false
        },
    }
})

export const {signupOne, login} = userAuthSlice.actions


export default userAuthSlice.reducer