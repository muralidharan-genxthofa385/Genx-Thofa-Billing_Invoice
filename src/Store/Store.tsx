import { configureStore } from '@reduxjs/toolkit';
import gstCustomerList from '../Features/GstCustomerFetch/GstCusFetchSlice'
import customer from '../Features/CustomersSliceFolder/CustomersSlice'

export const store = configureStore({
    reducer:{
gstfbx:gstCustomerList,
customer:customer


    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;