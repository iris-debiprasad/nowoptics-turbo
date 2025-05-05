import { createSlice } from '@reduxjs/toolkit';

export const langCodeSlice = createSlice({
  name: 'langCode',
  initialState: {
    data: {
      langCode: null,
    },
  },
  reducers: {
    updateLangCode: (state, action) => {
      state.data.langCode = action.payload;
    },
  },
});

export const { updateLangCode } = langCodeSlice.actions;
