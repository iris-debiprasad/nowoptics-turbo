import { createSlice } from "@reduxjs/toolkit";

export const addPofReducerSlice = createSlice({
    name: "addPofReducer",
    initialState: {
        data: {
        },
    },
    reducers: {
        ADD_POF: (state, action) => {
            state.data = action.payload;
        },
        resetPofState: (state) => {
            state.data = {};
        },
    },
});

export const { ADD_POF, resetPofState } = addPofReducerSlice.actions;
