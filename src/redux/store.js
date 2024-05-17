import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./api/invoice/invoiceSlice";
import { invoice } from "./api/invoice/invoiceApi";

export const store = configureStore({
  reducer: {
    invoice: invoiceSlice,

    [invoice.reducerPath]: invoice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(invoice.middleware),
});

export default store;
