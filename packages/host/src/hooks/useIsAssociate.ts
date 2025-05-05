import { AppEvents } from "@/constants/common.constants";
import { isAssociate } from "@/utils/common.utils";
import { useEffect, useState } from "react";

export default function useIsAssociate(): boolean {
  const [isAssociateUser, setIsAssociateUser] = useState(false);

  useEffect(() => {
    setIsAssociateUser(isAssociate());
    window.addEventListener(AppEvents.LOGIN_SUCCESS, () => {
      setIsAssociateUser(isAssociate());
    });

    return () => {
      window.removeEventListener(AppEvents.LOGIN_SUCCESS, () => {});
    };
  }, []);

  return isAssociateUser;
}
