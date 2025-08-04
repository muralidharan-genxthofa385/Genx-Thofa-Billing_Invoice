import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchInvoice } from "../service/invoiceService";


interface InvoiceState {
  allInvoices: any[];
  filteredInvoices: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


export const getinvoices = createAsyncThunk('invoice/getInvoices', async () => {
  const response = await fetchInvoice();
  return response.data.data;
});
const initialState: InvoiceState = {
  allInvoices: [],
  filteredInvoices: [],
  status: 'idle',
  error: null,
};


const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    allInvoices: [],
    filteredInvoices: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    filterInvoices: (state, action) => {
      const { customerType, status, fromDate, toDate } = action.payload;
      state.filteredInvoices = state.allInvoices.filter((inv: any) => {
        const invoiceDate = new Date(inv.invoice_date);
        const from = new Date(fromDate);
        const to = new Date(toDate);

        const matchType = customerType ? inv.customer?.customer_type === customerType : true;
        const matchStatus = status ? inv.status === status : true;
        const matchDate = fromDate && toDate ? invoiceDate >= from && invoiceDate <= to : true;

        const notDeleted = inv.is_deleted === false; // optional condition

        return matchType && matchStatus && matchDate && notDeleted;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getinvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getinvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allInvoices = action.payload;
        state.filteredInvoices = action.payload; // default to all
      })
      .addCase(getinvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { filterInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
