import * as React from "react";

import IconButton from "@mui/material/IconButton";
import { Container, Divider, Drawer, Box, AlertColor } from "@mui/material";

import IconSVG from "../iconsvg/IconSVG";
import SelectAStore from "./SelectAStore";
import YourClosestStore from "./YourClosestStore";

import style from "./SideBar.module.scss";

import {
  YOUR_CLOSEST_STORE_CONSTANTS,
  SELECT_A_STORE_CONSTANTS,
} from "../../constants/SideBarConstants";
import ChangeStore from "./ChangeStore";
import { getDetails } from "../../utils/getSessionData";
import { AppEvents, USER_TYPE } from "../../constants/common.constants";
import {
  SchedulerStoreSelectActionTypeDTO,
  StoreAddressType,
  StoreDetailsDTO,
} from "../../types/SideBar.types";
import { useAppSelector } from "@root/host/src/store/useStore";
import { getLatLong } from "@root/host/src/utils/getLocation.utils";

export type Anchor = "top" | "left" | "bottom" | "right";
export type Props = {
  anchor: Anchor;
  sideBarOC: boolean;
  setSideBarOC: () => void;
  changeStoreOpen: boolean;
  showSnackBar?: (message: string, type: AlertColor) => void;
  handleNewStore?: () => void;
  forceClose?: boolean;
  handleForceClose?: () => void;
  openSelectStore?: boolean;
  changeStoreSelectCallBack?: (
    storeData: StoreDetailsDTO,
    actionType: SchedulerStoreSelectActionTypeDTO
  ) => void;
  handleCloseTrigger?: (isSetStore: boolean) => void;
  brandName?: string;
  hasSameDayDelivery?: boolean;
  handleShippingModeOnStoreChangeForCustomer?: (
    store: StoreAddressType
  ) => void;
  isBookEyeExam?: boolean;
};

export type ShowSnackBar = (message: string, type: AlertColor) => void;

// TODO: Added new props (changeStoreOpen, showSnackBar) for selecting the store.

export default function SideBar({
  anchor,
  sideBarOC,
  setSideBarOC,
  changeStoreOpen,
  showSnackBar,
  handleNewStore,
  forceClose,
  handleForceClose,
  openSelectStore = false,
  changeStoreSelectCallBack,
  handleCloseTrigger,
  brandName,
  hasSameDayDelivery,
  handleShippingModeOnStoreChangeForCustomer,
  isBookEyeExam,
}: Props) {
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);
  const [sideBarStatus, setSideBarStatus] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [role, setRole] = React.useState<string | null>(null);
  const [showStores, setShowStores] = React.useState(true);
  const [isLocation, setIsLocation] = React.useState<null | number>(null);
  React.useEffect(() => {
    if (navigator.geolocation) {
      getLatLong((lat, long) => {
        setIsLocation(lat);
      });
    }
  }, [sideBarStatus[anchor]]);

  React.useEffect(() => {
    if (
      Boolean(localStorage.getItem("selectedStore")) &&
      localStorage.getItem("selectedStore") !== "null"
    ) {
      setShowStores(false);
    } else {
      setShowStores(true);
    }
  }, [sideBarStatus[anchor]]);

  React.useEffect(() => {
    if (sideBarOC) {
      const _sideBarStatus = { ...sideBarStatus };
      _sideBarStatus[anchor] = sideBarOC;
      setSideBarStatus(_sideBarStatus);
    }
  }, [sideBarOC]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function getUserData() {
    return getDetails().then(function (data) {
      setRole(data?.authData?.userType ? data?.authData?.userType : null);
    });
  }
  React.useEffect(() => {
    getUserData();
  }, [sideBarOC]);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (!Boolean(forceClose)) {
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }
        if (anchor === "left" && open === false) {
          setSideBarOC();
          handleCloseTrigger && handleCloseTrigger(false);
        }
        setSideBarStatus({ ...sideBarStatus, [anchor]: open });
      }
    };

  const closeDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      if (anchor === "left" && open === false) {
        setSideBarOC();
        handleCloseTrigger && handleCloseTrigger(true);
      }
      setSideBarStatus({ ...sideBarStatus, [anchor]: open });
    };

  const handleNewStoreChange = () => {
    window.dispatchEvent(new Event(AppEvents.STORE_CHANGE));
    if (handleNewStore) {
      handleNewStore();
    }
  };

  const list = (anchor: Anchor) => (
    <Box px={4} className={style.sidebarContainer} role="presentation">
      <Box className={style.sidebarHeader}>
        {!Boolean(forceClose) ? (
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <IconSVG
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              fillP="#A9AFBB"
              name="close_icon"
            />
          </IconButton>
        ) : null}
      </Box>

      {!changeStoreOpen ? (
        <>
          {!openSelectStore ? (
            <>
              <Box className={style.headerDrawer}>
                {role !== USER_TYPE.ASSOCIATE || isAgent ? (
                  <>
                    {!showStores && (
                      <h2
                        className={style.yourClosestStoreHeading}
                        role="heading"
                        aria-label={SELECT_A_STORE_CONSTANTS.HEADING}
                        tabIndex={0}
                      >
                        {YOUR_CLOSEST_STORE_CONSTANTS.HEADING}
                      </h2>
                    )}
                    {showStores && (
                      <h2
                        className={style.yourClosestStoreHeading}
                        role="heading"
                        aria-label={SELECT_A_STORE_CONSTANTS.HEADING}
                        tabIndex={0}
                      >
                        {SELECT_A_STORE_CONSTANTS.HEADING}
                      </h2>
                    )}
                  </>
                ) : (
                  <h2
                    className={style.yourClosestStoreHeading}
                    role="heading"
                    aria-label={SELECT_A_STORE_CONSTANTS.HEADING}
                    tabIndex={0}
                  >
                    {SELECT_A_STORE_CONSTANTS.HEADING}
                  </h2>
                )}
              </Box>
              <Divider />
              {role !== USER_TYPE.ASSOCIATE || isAgent ? (
                <>
                  {!showStores && (
                    <YourClosestStore
                      setShowStores={(value: boolean) => setShowStores(value)}
                      handleClose={toggleDrawer(anchor, false)}
                      handleShippingModeOnStoreChangeForCustomer={
                        handleShippingModeOnStoreChangeForCustomer
                      }
                    />
                  )}
                  {showStores && (
                    <SelectAStore
                      handleClose={toggleDrawer(anchor, false)}
                      handleNewStore={handleNewStoreChange}
                      handleForceClose={handleForceClose}
                      closeDrawer={closeDrawer(anchor, false)}
                      brandName={brandName}
                      hasSameDayDelivery={hasSameDayDelivery}
                      handleShippingModeOnStoreChangeForCustomer={
                        handleShippingModeOnStoreChangeForCustomer
                      }
                      isBookEyeExam={isBookEyeExam}
                    />
                  )}
                </>
              ) : (
                <SelectAStore
                  handleClose={toggleDrawer(anchor, false)}
                  handleNewStore={handleNewStoreChange}
                  handleForceClose={handleForceClose}
                  closeDrawer={closeDrawer(anchor, false)}
                  forceClose={forceClose}
                  brandName={brandName}
                  isBookEyeExam={isBookEyeExam}
                />
              )}
            </>
          ) : (
            <>
              <Box className={style.headerDrawer}>
                <h2
                  className={style.yourClosestStoreHeading}
                  role="heading"
                  aria-label={SELECT_A_STORE_CONSTANTS.HEADING}
                  tabIndex={0}
                >
                  {SELECT_A_STORE_CONSTANTS.HEADING}
                </h2>
              </Box>
              <Divider />
              <SelectAStore
                handleClose={toggleDrawer(anchor, false)}
                handleNewStore={handleNewStoreChange}
                handleForceClose={handleForceClose}
                forceClose={forceClose}
                closeDrawer={closeDrawer(anchor, false)}
                brandName={brandName}
                hasSameDayDelivery={hasSameDayDelivery}
                handleShippingModeOnStoreChangeForCustomer={
                  handleShippingModeOnStoreChangeForCustomer
                }
                isBookEyeExam={isBookEyeExam}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Box
            className={style.headerDrawer}
            role="heading"
            aria-label="Change Store"
            tabIndex={0}
          >
            <h2 className={style.yourClosestStoreHeading}>Change Store</h2>
          </Box>
          <Divider />
          <ChangeStore
            changeStoreSelectCallBack={changeStoreSelectCallBack}
            handleClose={toggleDrawer(anchor, false)}
            showSnackBar={showSnackBar as ShowSnackBar}
            role={role}
          />
        </>
      )}
    </Box>
  );

  return (
    <React.Fragment key={anchor}>
      <Drawer
        anchor={anchor}
        open={sideBarStatus[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <Container sx={{ padding: 0 }}>{list(anchor)}</Container>
      </Drawer>
    </React.Fragment>
  );
}
