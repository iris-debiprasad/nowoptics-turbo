import { createSlice } from "@reduxjs/toolkit";

export const cartIdSlice = createSlice({
  name: "cartId",
  initialState: {
    data: {
      cartId: null,
      cartIndex: 0,
    },
    isPendingCartCountApiCall: false,
    cartCountForMRSOrder: 0,
  },
  reducers: {
    updateCartId: (state, action) => {
      state.data.cartId = action.payload;
      state.data.cartIndex = Math.random();
      state.isPendingCartCountApiCall = false;
    },
    pendingCartCountApiCall: (state, action) => {
      state.isPendingCartCountApiCall = action.payload;
    },
    updateCartCountForMRSOrder: (state, action) => {
      state.cartCountForMRSOrder = action.payload;
    },
  },
});

export const {
  updateCartId,
  pendingCartCountApiCall,
  updateCartCountForMRSOrder,
} = cartIdSlice.actions;
