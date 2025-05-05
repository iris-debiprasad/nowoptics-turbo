import { createSlice } from "@reduxjs/toolkit";

export const rootSlice = createSlice({
  name: "root",
  initialState: {
    products: [],
    productOnPage: {}
  },
  reducers: {
    setProducts: (state, products) => {
      state.products = products.payload;
    },
    setProductOnPage: (state, action) => {
      const  page = action.payload.page as string;
      const productsList = action.payload.products;
      state.productOnPage = {...state.productOnPage, [page]: productsList}
    },
    resetProductOnPage: (state) => {
      state.productOnPage = {}
      state.products = [];
    }
  },
});
