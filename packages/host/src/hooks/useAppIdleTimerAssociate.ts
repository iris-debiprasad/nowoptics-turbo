import { USER_TYPE } from "@/constants/common.constants";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";
import { useAppSelector } from "@/store/useStore";
import { getDetails } from "@/utils/getSessionData";
import { useContext, useEffect, useRef, useState } from "react";

interface Props {
  onPrompt: () => void;
}

const useAppIdleTimerAssociate = (props: Props) => {
  const env = useContext(RuntimeVarContext);
  const [authStatus, setAuthStatus] = useState("");
  const [userRole, setUserRole] = useState();
  const [showPrompt, setShowPrompt] = useState(false);
  const timerRef = useRef<any>();
  const IsAutoLogoutEnabled = useAppSelector(
    (state) => state.userPermission.data.IsAutoLogoutEnabled
  );
  const tabId = useAppSelector((state) => state.cdcView.data.currentTabId);
  const startTimer = () => {
    const threshold =
      Number(env?.NEXT_PUBLIC_IDLE_TIMEOUT_IN_MS as string) -
      Number(env?.NEXT_PUBLIC_IDLE_TIMEOUT_PROMPT_MS as string);

    if (timerRef.current) {
      timerRef.current.postMessage({ command: "start", interval: threshold });
    }
  };

  const handleResetTimer = (reset: boolean) => {
    if (timerRef.current) {
      timerRef.current.postMessage({ command: "stop" });
    }
    if (reset) {
      startTimer();
    }
  };

  useEffect(() => {
    if (
      env?.NEXT_PUBLIC_AUTO_LOGOUT_ENABLE === "true" &&
      userRole === USER_TYPE.ASSOCIATE &&
      env?.NEXT_PUBLIC_IDLE_TIMEOUT_IN_MS &&
      env?.NEXT_PUBLIC_IDLE_TIMEOUT_PROMPT_MS &&
      IsAutoLogoutEnabled
    ) {
      startTimer();
    } else {
      handleResetTimer(false);
    }
  }, [userRole, IsAutoLogoutEnabled]);

  useEffect(() => {
    getDetails().then((user) => {
      setUserRole(user?.authData?.userType ? user?.authData?.userType : null);
    });
    if (
      typeof window !== undefined &&
      env?.NEXT_PUBLIC_AUTO_LOGOUT_ENABLE === "true" &&
      userRole === USER_TYPE.ASSOCIATE
    ) {
      timerRef.current = new Worker("/worker/ideleTimerWorker.js");
      timerRef.current.onmessage = function (e: any) {
        if (e.data === "tick") {
          props.onPrompt();
          setShowPrompt(true);
        }
      };
    }
    return () => {
      timerRef.current?.terminate();
    };
  }, [authStatus, userRole]);

  return {
    handleResetTimer,
    setAuthStatus,
    showPrompt,
    setShowPrompt,
  };
};

export default useAppIdleTimerAssociate;
