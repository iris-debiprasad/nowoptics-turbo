import { createSlice } from "@reduxjs/toolkit";

export const cdcViewSlice = createSlice({
  name: "cdcView",
  initialState: {
    data: {
      isCDCView: false,
      currentTabId: Math.random(),
      isAgent: false
    },
  },
  reducers: {
    updateCDC: (state, action) => {
      state.data.isCDCView = action.payload;
    },
    updateAgent: (state, action) => {
      state.data.isAgent = action.payload;
    },
  },
});

export const {updateCDC, updateAgent} = cdcViewSlice.actions;
