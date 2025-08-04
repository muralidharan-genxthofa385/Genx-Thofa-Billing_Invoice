import { configureStore } from '@reduxjs/toolkit';
import gstCustomerList from '../Features/GstCustomerFetch/GstCusFetchSlice'

export const store = configureStore({
    reducer:{
gstfbx:gstCustomerList,

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;