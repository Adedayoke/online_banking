import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiverAccountName: null,
  amount: null,
  receiverBank: null,
  receiverAccountNumber: null,
  transferType: ""
};

const userCurrentTransferSlice = createSlice({
  name: "userCurrentTransfer",
  initialState,
  reducers: {
    setCurrentTransfer(state, action) {
      const { receiverAccountName, receiverBank, receiverAccountNumber, transferType } = action.payload;
      state.receiverAccountName = receiverAccountName;
      state.receiverBank = receiverBank;
      state.receiverAccountNumber = receiverAccountNumber;
      state.transferType = transferType;
    },
    setCurrentTransferAmount(state, action) {
      state.amount = action.payload;
    },
  },
});

export const { setCurrentTransfer, setCurrentTransferAmount } = userCurrentTransferSlice.actions;

export default userCurrentTransferSlice.reducer;
