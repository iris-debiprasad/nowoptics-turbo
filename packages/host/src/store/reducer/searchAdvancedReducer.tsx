import { ISD_CODE } from "@root/host/src/constants/common.constants";
import { createSlice } from "@reduxjs/toolkit";

export const searchAdvancedSlice = createSlice({
  name: "searchAdvanced",
  initialState: {
    data: {
      Id: "",
      UserFirstName: "",
      UserLastName: "",
      Email: "",
      PhoneNumber: "",
      CountryCode: ISD_CODE,
      Dob: "",
    },
  },
  reducers: {
    FETCH_SEARCH_ADVANCED_DATA: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { FETCH_SEARCH_ADVANCED_DATA } = searchAdvancedSlice.actions;
export default searchAdvancedSlice.reducer;
