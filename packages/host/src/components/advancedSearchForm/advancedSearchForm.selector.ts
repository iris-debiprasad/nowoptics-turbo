import { RootState } from "../../store/store";
import { createSelector } from "@reduxjs/toolkit";

export const GetAdvancedSearchFormState = createSelector(
  [(state: RootState) => state?.searchAdvanced?.data],
  (data) => {
    const formData = {
      id: data?.Id,
      firstName: data?.UserFirstName,
      lastName: data?.UserLastName,
      email: data?.Email,
      phone: data?.PhoneNumber,
      countryCode: data?.CountryCode,
      dob: data?.Dob,
    };
    return formData;
  }
);
