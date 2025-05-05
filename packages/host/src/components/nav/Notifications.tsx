import styled from "@emotion/styled";
import { AlertColor, Badge, Box } from "@mui/material";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import style from "./Nav.module.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import {
  getLatestNotificationCount,
  getNegotiateData,
  resetNotificationCount,
} from "@/service/common.service";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRouter } from "next/router";
import { AppEvents, RING_CENTRAL_CALL_NOTIFICATION_STACK_LENGTH, SNACKBAR_COLOR_TYPE } from "@/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@/constants/auth.constants";
import { useDispatch } from "react-redux";
import { updateCartCountForMRSOrder } from "@root/host/src/store/reducer/cartIdReducer";
import {
  acceptRingCentralNotification,
  getAllIPAddressesForGivenStore,
} from "@/service/ringCentral.service";
import {
  RingCentralAcceptPayloadDTO,
  RingCentralCallDataDTO,
  RingCentralPopUpDTO,
  RingCentralCallNotiItemsDTO,
} from "@/types/ringCentral.types";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/hooks/useStore";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

const RingCentralPopUp = dynamic(
  () => import("appointments/RingCentralPopUp"),
  {
    ssr: false,
  }
) as FunctionComponent<RingCentralPopUpDTO>;
const RingCentralCallNotification = dynamic(
  () => import("appointments/RingCentralCallNotification"),
  {
    ssr: false,
  }
) as FunctionComponent<RingCentralCallNotiItemsDTO>;

const CustomBadgeContent = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "var(--tertiary-text-color)",
    color: "var(--primary-text-color)",
  },
}));

const ringCentralDataInit = {
  Id: null,
  PatientId: null,
  AcceptedUserId: null,
  PhoneNumber: "",
  Status: "",
  StoreNumber: "",
  StoreId: null,
};

export default function Notifications({
  userId,
  storeData,
  setShowAutoLogOutTimer,
  showAutoLogoutTimer,
}: {
  userId: string;
  storeData: any;
  setShowAutoLogOutTimer: React.Dispatch<React.SetStateAction<boolean>>;
  showAutoLogoutTimer: boolean;
}) {
  const env = useContext(RuntimeVarContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const { showSnackBar } = useSnackBar();
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const [badgeCount, setBadgeCount] = useState(0);

  const [showRingCentNotification, setShowRingCentNotification] =
    useState<boolean>(false);
  const [showRingCentActionPopUp, setShowRingCentActionPopUp] =
    useState<boolean>(false);
  const [ringCentralNotiData, setRingCentralNotiData] = useState<
    RingCentralCallDataDTO[]
  >([]);
  const [ringCentralActionData, setRingCentralActionData] =
    useState<RingCentralCallDataDTO>(ringCentralDataInit);
  const [isInStoreUser, setIsInStoreUser] = useState<boolean>(false);
  const loggedInUserIPAddress = useAppSelector(
    (state) => state.userPermission.data.UserIpAddress
  );

  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);

  const maxReconnectAttempts = env?.NEXT_PUBLIC_WEBSOCKET_RECONNECT_ATTEMPTS;
  const reconnectDelay = env?.NEXT_PUBLIC_WEBSOCKET_RECONNECT_DELAY;

  const shouldReconnectHandler = (closeEvent: WebSocketEventMap["close"]) => {
    if (reconnectAttempt < Number(maxReconnectAttempts)) {
      setReconnectAttempt((prev) => prev + 1);
      return true; // Reconnect will be attempted
    }
    return false; // Stop trying to reconnect after max attempts
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        if (storeData?.StoreNumber) {
          sendMessage(storeData.StoreNumber);
        }
      },
      shouldReconnect: shouldReconnectHandler,
      reconnectInterval: Number(reconnectDelay),
    },
    isConnected
  );

  const closeConnection = () => {
    setIsConnected(false); // Passing false unsubscribes from the WebSocket
  };

  const openConnection = () => {
    setIsConnected(true); // Reconnect WebSocket
  };

  useEffect(() => {
    if (storeData?.StoreNumber && readyState === ReadyState.CLOSED) {
      openConnection();
    }
  }, [storeData?.StoreNumber, readyState]);

  useEffect(() => {
    window.addEventListener(AppEvents.STORE_CHANGE, () => {
      closeConnection();
    });
    return () => {
      window.removeEventListener(AppEvents.STORE_CHANGE, () => {});
    };
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowRingCentNotification(false);
    setRingCentralNotiData([]);
  };

  const handleAcceptClick = async (id: number) => {
    const userId = localStorage?.getItem("userId");
    const selectedCallNotificationDataItem = ringCentralNotiData.filter(
      (item) => item.Id === id
    );
    const filteredCallNotiDataItems = ringCentralNotiData.filter(
      (item) => item.Id !== id
    );
    const { Id } = selectedCallNotificationDataItem[0];

    if (!Id || !userId) return;

    const data: RingCentralAcceptPayloadDTO = {
      AcceptedUserId: userId,
      Id: String(Id),
    };

    try {
      const resp = await acceptRingCentralNotification(data);
      if (resp) {
        // Hide notification and update state with filtered data
        setShowRingCentNotification(false);
        setRingCentralNotiData(filteredCallNotiDataItems);

        // Save data to session storage if items are available
        if (filteredCallNotiDataItems.length > 0) {
          sessionStorage.setItem(
            "ringCentralCallNotiData",
            JSON.stringify(filteredCallNotiDataItems)
          );
        }

        // Set action modal data and show the action popup & set action data to session;
        setRingCentralActionData(selectedCallNotificationDataItem[0]);
        setShowRingCentActionPopUp(true);
        addRemoveRingCenDataToSession(
          selectedCallNotificationDataItem[0],
          false,
          true,
          true
        );
        sessionStorage.setItem("IsRingCentActionPopUpOpen", "true");
      }
    } catch (err: any) {
      const errorMessage = err.response
        ? err.response.data.Error.Message
        : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
      // if accept api fails , roll back to previous state
      if (err?.response?.status === 500) {
        //TODO: Check if we need to some sepecific message;
      }
      showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
    }
  };

  function notificationsLabel(count: number) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const extractBadgeCount = (message: any) => {
    const messageObj = JSON.parse(message.data);

    if (messageObj.states || messageObj.states === null) return;

    // Check for autologout.
    if (
      storeData?.StoreNumber &&
      storeData?.StoreNumber === messageObj.StoreNumber &&
      messageObj?.RequestToLogout &&
      messageObj.ShowOnUI &&
      !messageObj?.RingCentralcallData &&
      !showAutoLogoutTimer
    ) {
      setShowAutoLogOutTimer(true);
    } else if (
      // Check if we should display the RingCentral notification.
      messageObj?.RingCentralcallData &&
      storeData?.StoreNumber &&
      messageObj.StoreNumber === storeData?.StoreNumber &&
      messageObj.ShowOnUI && // ShowOnUI will be true only for call accept message or call notification if RingCentral Data is available.
      isInStoreUser
    ) {
      const { Id, PatientId, AcceptedUserId, PhoneNumber, Status } =
        messageObj?.RingCentralcallData;
      const userId = localStorage?.getItem("userId");

      // Check if the notification should be handled or not based on AcceptedUserId and Id.
      if (
        !Status && // Staus will come as null if call is accepted;
        AcceptedUserId &&
        AcceptedUserId === Number(userId) &&
        ringCentralActionData.Id === Id
      ) {
        //A. CASE WHERE THE CALL IS ACCEPTED BY THE CURRENT USER;
        const data = {
          StoreNumber: messageObj?.StoreNumber,
          Id,
          PatientId: ringCentralActionData.PatientId,
          AcceptedUserId,
          PhoneNumber: ringCentralActionData.PhoneNumber,
          Status: ringCentralActionData.Status,
          StoreId: messageObj?.StoreId,
        };
        setRingCentralActionData(data);
        addRemoveRingCenDataToSession(data, false, true, true); // Update ringCentral action pop-up data to session.
        //Rest of the call notfication stack data already added to session while accepting call, no need save it again;
      } else if (
        !Status &&
        AcceptedUserId &&
        AcceptedUserId !== Number(userId)
      ) {
        //B. CASE WHERE THE CALL IS NOT ACCEPTED BY THE CURRENT USER;

        if (showRingCentActionPopUp) {
          //1. if  action modal(2nd pop-up) was already open for user and notification data was saved to session;
          // Check the session storage and Filter the data based on Id and update the seesion for call notification ;
          filterAndUpdateCallNotificionToSession(Id);
        } else {
          //2. Filter the call which is accepted by other user to remove from call notification stack;
          const filteredCallNotificationData = ringCentralNotiData.filter(
            (item) => item.Id !== Id
          );

          // Check if filteredCallNotificationData array is empty close the call notfication;
          if (filteredCallNotificationData.length === 0) {
            setShowRingCentNotification(false);
          }
          setRingCentralNotiData(filteredCallNotificationData);
        }
      } else if (Status === "Proceeding" && !AcceptedUserId) {
        //C. CASE WHERE ACCEPTEDUSERID IS NULL & STATUS IS PROCEDDING , IT IS JUST CALL NOTIFICATION ;

        const data = {
          StoreNumber: messageObj?.StoreNumber,
          Id,
          PatientId,
          AcceptedUserId,
          PhoneNumber,
          Status,
          StoreId: messageObj?.StoreId,
        };
        // if action modal is alreday opened for current user, save the data to session;

        if (showRingCentActionPopUp) {
          // set callNotification data to session;

          const sessionCallNotifItems = sessionStorage?.getItem(
            "ringCentralCallNotiData"
          );
          const parsedNotificationItems = sessionCallNotifItems
            ? JSON.parse(sessionCallNotifItems)
            : [];

          const updatedNotificationItems = [data, ...parsedNotificationItems];
          sessionStorage.setItem(
            "ringCentralCallNotiData",
            JSON.stringify(
              updatedNotificationItems.slice(0, Number(RING_CENTRAL_CALL_NOTIFICATION_STACK_LENGTH))
            )
          );
        } else {
          // add data to the start of the callNotifiData array;
          let ringCentCallNoticationDataTemp = [data, ...ringCentralNotiData];
          setRingCentralNotiData(
            ringCentCallNoticationDataTemp.slice(0, Number(RING_CENTRAL_CALL_NOTIFICATION_STACK_LENGTH))
          );
          setShowRingCentNotification(true);
          sessionStorage.removeItem("ringCentralCallNotiData");
        }
      }
    } else if (
      messageObj?.RingCentralcallData &&
      storeData?.StoreNumber &&
      messageObj.StoreNumber === storeData?.StoreNumber &&
      !messageObj.ShowOnUI
    ) {
      const { Id, AcceptedUserId, Status } = messageObj?.RingCentralcallData;
      if (
        !AcceptedUserId &&
        (Status === "Disconnected" || Status === "Voicemail")
      ) {
        //D. CASE WHERE CALL NOT ANSWERED OR DISCONNECTED, CLOSE NOTIFICATION POP-UP;
        // Remove the notification items from the callNotification array and seession if action pop is open;

        if (showRingCentActionPopUp) {
          // 1.Where action modal is alreday open;
          filterAndUpdateCallNotificionToSession(Id);
        } else {
          // 2.Where action modal is not open;

          const filteredNotificationItmes = ringCentralNotiData.filter(
            (item) => item.Id !== Id
          );
          if (filteredNotificationItmes.length === 0) {
            setShowRingCentNotification(false);
          }
          setRingCentralNotiData(filteredNotificationItmes);
        }
      }
    } else if (messageObj.ShowOnUI) {
      // Handle cart notifications
      if (messageObj.CartCount != null) {
        dispatch(updateCartCountForMRSOrder(messageObj.CartCount));
      } else {
        setBadgeCount(messageObj.ProximityOrderCount + messageObj.BopisCount);
      }
    } else {
      setBadgeCount(0);
    }
  };

  const filterAndUpdateCallNotificionToSession = (Id: number) => {
    const sessionCallNotifItems = sessionStorage?.getItem(
      "ringCentralCallNotiData"
    );
    const parsedNotificationItems = sessionCallNotifItems
      ? JSON.parse(sessionCallNotifItems)
      : null;

    if (parsedNotificationItems?.length) {
      const filteredNotificationItems = parsedNotificationItems.filter(
        (item: RingCentralCallDataDTO) => item.Id !== Id
      );
      if (filteredNotificationItems.length) {
        sessionStorage.setItem(
          "ringCentralCallNotiData",
          JSON.stringify(filteredNotificationItems)
        );
      } else {
        sessionStorage.removeItem("ringCentralCallNotiData"); // remove the ringCentralCallNotiData;
      }
    }
  };

  const getWebSocketURL = async () => {
    if (!userId && !storeData?.Id) return;

    try {
      const res = await getNegotiateData(`${userId}_${storeData.Id}`);
      setSocketUrl(res?.data?.url);
    } catch (err: any) {
      showSnackBar(
        err.response
          ? err?.response?.data?.Error?.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
  };
  useEffect(() => {
    getWebSocketURL();
  }, [userId, storeData?.Id]);

  const subscribeNotifications = async () => {
    if (!storeData?.Id) return;
    try {
      const res = await getLatestNotificationCount(storeData?.Id);
      setBadgeCount(
        res?.data?.Result?.ProximityOrderCount + res?.data?.Result?.BopisCount
      );
    } catch (err: any) {
      showSnackBar(
        err.response
          ? err?.response?.data?.Error?.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
      setBadgeCount(0);
    }
  };

  const checkIfStoreUser = async () => {
    if (!storeData?.Id || !loggedInUserIPAddress) return;
    setIsInStoreUser(false);

    try {
      const {
        data: {
          Result: { IPAddresses },
        },
      } = await getAllIPAddressesForGivenStore(String(storeData.Id));
      const ipList = IPAddresses?.split(",");
      const isUserInStore = ipList?.includes(loggedInUserIPAddress);

      if (isUserInStore) {
        setIsInStoreUser(true);
      }
    } catch (err: any) {
      showSnackBar(
        err.response?.data?.Error?.Message ||
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
  };

  useEffect(() => {
    subscribeNotifications();
    checkIfStoreUser();
  }, [storeData?.Id]);

  useEffect(() => {
    let data = sessionStorage?.getItem("ringCentralData");
    if (data) {
      let { rcData, isOpenNotification, isOpenRCActionModal } =
        JSON.parse(data);
      setRingCentralActionData(rcData);
      isOpenNotification && setShowRingCentNotification(true);
      isOpenRCActionModal && setShowRingCentActionPopUp(true);
    }
  }, []);

  useEffect(() => {
    lastMessage && extractBadgeCount(lastMessage);
  }, [lastMessage]);

  const addRemoveRingCenDataToSession = (
    rcData: RingCentralCallDataDTO | null,
    isOpenNotification: boolean,
    isOpenRCActionModal: boolean,
    isSet: boolean
  ) => {
    let dataToSet = {
      isOpenNotification,
      isOpenRCActionModal,
      rcData,
    };

    if (isSet) {
      sessionStorage.setItem("ringCentralData", JSON.stringify(dataToSet));
    } else {
      sessionStorage.removeItem("ringCentralData");
    }
  };

  const showCallNotiUsingSession = () => {
    const callNotificationData = sessionStorage.getItem(
      "ringCentralCallNotiData"
    );

    const parsedcallNotificationData = callNotificationData
      ? JSON.parse(callNotificationData)
      : null;
    if (parsedcallNotificationData?.length) {
      setRingCentralNotiData([...parsedcallNotificationData]);
      setShowRingCentNotification(true);
      sessionStorage.removeItem("ringCentralCallNotiData");
    }
  };

  const handleRingCentActioModalClose = () => {
    setShowRingCentActionPopUp(false);
    sessionStorage.removeItem("IsRingCentActionPopUpOpen");
    setRingCentralActionData(ringCentralDataInit);
    addRemoveRingCenDataToSession(null, false, false, false); // remove session data;
    showCallNotiUsingSession(); // check for any missed call notification , if it is still procedding;
  };

  const handleResetNotification = async () => {
    if (!storeData?.Id) return;

    try {
      const res = await resetNotificationCount(storeData.Id);
      if (res?.data?.Result === true) {
        setBadgeCount(0);
      }
      router.push(
        {
          pathname: "/operations/operation-command-center",
          query: { proximityJobs: true },
        },
        "/operations/operation-command-center"
      );
    } catch (err: any) {
      showSnackBar(
        err.response
          ? err?.response?.data?.Error?.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
  };

  return (
    <>
      <Box className={style.navBadge} onClick={handleResetNotification}>
        <IconButton aria-label={notificationsLabel(badgeCount)}>
          <CustomBadgeContent badgeContent={badgeCount}>
            <NotificationsNoneIcon color="action" />
          </CustomBadgeContent>
        </IconButton>
      </Box>

      {showRingCentNotification && (
        <RingCentralCallNotification
          open={showRingCentNotification}
          close={handleClose}
          handleAcceptClick={handleAcceptClick}
          ringCentralData={ringCentralNotiData}
        />
      )}

      {showRingCentActionPopUp && (
        <RingCentralPopUp
          ringCentralData={ringCentralActionData}
          open={showRingCentActionPopUp}
          close={handleRingCentActioModalClose}
          showSnackBar={showSnackBar}
        />
      )}
    </>
  );
}
