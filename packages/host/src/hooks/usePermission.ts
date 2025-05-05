import { useEffect } from "react";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";
import { useRouter } from "next/router";
import { useAppSelector } from "@root/host/src/store/useStore";
import { AGENT_VIEW_PAGE_PERMISSION } from "@root/host/src/constants/host-permission.constant";

type PermissionHookProp = {
  PAGE: string[];
  TABS: string[];
};

/**
 * Check the tab permission 
 * Check page permission and redirect to 404
 * @param perMissionConfig 
 * @returns 
 */
const usePermission = (perMissionConfig: PermissionHookProp) => {
  const router = useRouter();
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);
  const page = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: perMissionConfig.PAGE,
    })
  ) as boolean[];

  const agentViewPages = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: AGENT_VIEW_PAGE_PERMISSION,
    })
  ) as boolean[];

  useEffect(() => {
    if (page.every((page) => !page)) {
      router.replace("/404");
    } else if (isAgent && agentViewPages.every((agentViewPage) => !agentViewPage)) {
      router.replace("/404");
    }
  }, [page, isAgent]);
  const tabs = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: perMissionConfig.TABS,
    })
  ) as boolean[];

  return { tabs, page };
};

export default usePermission;
