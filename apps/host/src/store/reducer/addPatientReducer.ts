import { createSlice } from "@reduxjs/toolkit";

export const addPatientSlice = createSlice({
  name: "addPatient",
  initialState: {
    data: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      CountryCode: "",
      Dob: "",
      Zipcode: "",
    },
  },
  reducers: {
    UPDATE_ADD_PATIENT_DATA: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { UPDATE_ADD_PATIENT_DATA } = addPatientSlice.actions;
export default addPatientSlice.reducer;
