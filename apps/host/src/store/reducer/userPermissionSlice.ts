import { createSlice } from "@reduxjs/toolkit";

export const userPermissionSlice = createSlice({
  name: "userPermission",
  initialState: {
    data: {
      Actions: [],
      FirstName: "",
      LastName: "",
      IsLocked: false,
      SelectedStore: "",
      IsAutoLogoutEnabled: false,
      UserIpAddress: "",
    },
  },
  reducers: {
    FETCH_USER_PERMISSION: (state, action) => {
      const permissionData = action.payload;
      if (permissionData.Actions) {
        permissionData.Actions = permissionData.Actions.map((action: string) =>
          action.toLowerCase()
        );
      }
      state.data = permissionData;
    },
    AUTO_LOGOUT_ENABLED: (state, action) => {
      state.data.IsAutoLogoutEnabled = action.payload;
    },
    UPDATE_IP_ADDRESS: (state, action) => {
      state.data.UserIpAddress = action.payload;
    },
  },
});

export const { FETCH_USER_PERMISSION, AUTO_LOGOUT_ENABLED, UPDATE_IP_ADDRESS } =
  userPermissionSlice.actions;
export default userPermissionSlice.reducer;
