import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface State {
  isMobileMenuDisplayed: boolean;
}

const initialState: State = {
  isMobileMenuDisplayed: false,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuDisplayed = !state.isMobileMenuDisplayed
    },
  },
});

export const selectIsMobileMenuDisplayed = (state: RootState) =>
  state.header.isMobileMenuDisplayed;

export const { toggleMobileMenu } = headerSlice.actions;
