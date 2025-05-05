import { createSlice } from "@reduxjs/toolkit";

export const exchangeMenuSlice = createSlice({
    name: "exchangeMenu",
    initialState: {
        data: {
        },
    },
    reducers: {
        ADD_EXCHANGE_MENU: (state, action) => {
            state.data = action.payload;
        },
        resetExchangeMenu: (state) => {
            state.data = {};
        },
    },
});

export const { ADD_EXCHANGE_MENU, resetExchangeMenu } = exchangeMenuSlice.actions;
