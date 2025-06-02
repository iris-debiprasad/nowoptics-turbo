import { createSlice } from "@reduxjs/toolkit";

export const warrantyMenuSlice = createSlice({
  name: "exchangeMenu",
  initialState: {
    data: {},
  },
  reducers: {
    WARRANTY_MENU: (state, action) => {
      state.data = action.payload;
    },
    resetWarrantyMenu: (state) => {
      state.data = {};
    },
  },
});

export const { WARRANTY_MENU, resetWarrantyMenu } = warrantyMenuSlice.actions;
