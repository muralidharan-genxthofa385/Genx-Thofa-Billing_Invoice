import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface customerDetails {
  NewCustomerName: string;
  NewCustomerCompany: string;
  NewCustomerEmail: string;
  NewCustomerPhone: string;
  placeofsupply: string;
  Receiveables: number;
  unusedCredit: number;
}

interface cusgstFetch {
  customerDetailsArray: customerDetails[];
}

const initialState: cusgstFetch = {
  customerDetailsArray: [],
};

// 🔥 ASYNC THUNK: posts to API and updates store
export const customerSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {
  getCustomerDetail:(state,action:PayloadAction<customerDetails>)=>{
    state.customerDetailsArray.push(action.payload);
  }
    
  }
});

export const { getCustomerDetail } = customerSlice.actions;
export default customerSlice.reducer;
