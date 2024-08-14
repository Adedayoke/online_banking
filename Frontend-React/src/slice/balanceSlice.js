import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: []
    
}

const userBalanceSlice = createSlice({
    name: "userBalanceDetails",
    initialState,
    reducers: {
        setTransaction(state, action){
            state.transactions = action.payload
        },
        
    }
})

export const {setTransaction} = userBalanceSlice.actions


export default userBalanceSlice.reducer