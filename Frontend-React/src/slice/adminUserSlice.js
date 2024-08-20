import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foundUser: [] 
    
}

const adminSlice = createSlice({
    name: "adminFunctions",
    initialState,
    reducers: {
        searchUser(state, action){
            state.foundUser = action.payload
        },
        
    }
})

export const {searchUser} = adminSlice.actions


export default adminSlice.reducer