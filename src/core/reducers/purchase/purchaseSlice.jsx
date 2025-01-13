import { createSlice } from "@reduxjs/toolkit";
import { loading_status } from "../../../app/config/Constant";
import { getPurchaseById, getPurchaseList } from "../../thunk/purchase";

const initialState = {
  purchaseList: [],
  purchaseInfo: {
    purchase_id: "",
    user_id: "",
    ticket_id: "",
    purchase_date: "",
    ticket_date: "",
    price_amount: "",
    payment_status: "",
    payment_method: "",
    ticket_status: "",
  },
  loading: loading_status.idle,
  error: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseList.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getPurchaseList.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.purchaseList = action.payload
        state.error = null;
      })
      .addCase(getPurchaseList.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.purchaseList = [];
        state.error = action.error.message;
      })
      .addCase(getPurchaseById.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getPurchaseById.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.purchaseInfo = action.payload
        state.error = null;
      })
      .addCase(getPurchaseById.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default purchaseSlice.reducer;
export const selectPurchaseList = (state) => state.purchase.purchaseList;
export const selectPurchaseInfo = (state) => state.purchase.purchaseInfo;
