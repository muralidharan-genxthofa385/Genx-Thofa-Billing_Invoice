import { createSlice } from "@reduxjs/toolkit";

interface customerForm{
    rendernew_customerForm:boolean,
}


const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customerList: [],
    selectedCustomer: null, 
  },
  reducers: {
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
    setSelectedCustomer: (state, action) => { 
      state.selectedCustomer = action.payload;
    },
  
  },
});

export const { setCustomerList, setSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;
