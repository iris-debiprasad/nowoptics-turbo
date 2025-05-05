import { RootState } from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

export const GetPermissionConfig = createSelector(
  [
    (state: RootState) => state?.userPermission?.data,
    (payload) => payload.permissionName,
  ],
  (permissionData, payload: string | string[]) => {
    const permissionList: string[] = permissionData.Actions;
    if(typeof payload === "string") {
      const permission = permissionList?.includes((payload as string)?.toLowerCase());
      return permission;
    } else if(Array.isArray(payload)) {
      const permissions = payload.map(permission => {
        return permissionList?.indexOf(permission?.toLocaleLowerCase()) > -1 ? true : false;
      })
      return permissions;
    }
  }
);