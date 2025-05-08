import { AppEvents, USER_TYPE } from "@root/host/src/constants/common.constants";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getDetails } from "@root/host/src/utils/getSessionData";

export default function useIsAssociate(): boolean {
  const [isAssociateUser, setIsAssociateUser] = useState(false);

  const { data } = useSession();

  const isAssociate = async () => {
    const user = await getDetails();

    if (!user) {
      return false;
    }

    if (user.authData?.userType === USER_TYPE.ASSOCIATE) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    isAssociate().then((data) => {
      setIsAssociateUser(data);
    });
    window.addEventListener(AppEvents.LOGIN_SUCCESS, () => {
      isAssociate().then((data) => {
        setIsAssociateUser(data);
      });
    });

    return () => {
      window.removeEventListener(AppEvents.LOGIN_SUCCESS, () => {});
    };
  }, [data]);
  return isAssociateUser;
}
