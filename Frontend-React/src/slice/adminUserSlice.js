import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foundUser: [],
    viewUser: null,
    currentViewTransactions: []
    
}

const adminSlice = createSlice({
    name: "adminFunctions",
    initialState,
    reducers: {
        searchUser(state, action){
            state.foundUser = action.payload
        },
        setViewUser(state, action){
            state.viewUser = action.payload
        },
        setcurrentViewTransactions(state, action){
            state.currentViewTransactions = action.payload
        },
    }
})

export const {searchUser, setViewUser, setcurrentViewTransactions} = adminSlice.actions


export default adminSlice.reducer