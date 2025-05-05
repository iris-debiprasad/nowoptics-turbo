import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

export const favoriteProductsSlice = createSlice({
  name: "favorite-products",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    incrementCount: (state) => {
      state.count += 1;
    },
    decrementCount: (state) => {
      const newCount = state.count - 1;
      state.count = newCount >= 0 ? newCount : 0;
    },
  },
});

export const selectCount = (state: RootState) =>
  state.favoriteProducts.count;

export const { setCount, decrementCount, incrementCount } =
  favoriteProductsSlice.actions;
