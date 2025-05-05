import Image from "next/image";
import * as React from "react";
import { useCallback, useEffect, useMemo } from "react";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  AlertColor,
  Tooltip,
  FormControlLabel,
  Switch,
  FormGroup,
  Skeleton,
  styled,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  NavDataPatient,
  NavDataAssociate,
  SettingsData,
} from "@/constants/menu.constants";
import GetNavBar from "./GetNavBar";
import {
  sideDrawerProps,
  NavItem,
  NavStoreDataDTO,
  EventJourney,
} from "@/types/Header.types";
import {
  DOCTOR_CONSULTATION_STORAGE_KEY,
  NAV_ITEMS,
  NEED_HELP,
} from "@/constants/header.constants";
import SideBar from "../sidebar/SideBar";
import IconSVG from "../iconsvg/IconSVG";
import LoginForm from "../authentication/LoginForm/LoginForm";
import { useSnackBar } from "../../contexts/Snackbar/SnackbarContext";
import style from "./Nav.module.scss";
import CartIcon from "../../../../assets/Images/icons/CartNewIcon.svg";
import LocationIcon from "../../../../assets/Images/icons/LocationIcon.svg";
import FavoriteIcon from "../../../../assets/Images/icons/FavoriteIcon.svg";
import menuIcon from "../../../../assets/Images/icons/menuIcon.svg";
import crossIcon from "../../../../assets/Images/icons/crossIcon.svg";
import rightArrow from "../../../../assets/Images/icons/rightArrow.svg";
import settingsIcon from "../../../../assets/Images/icons/settingsIcon.svg";
import { STORE_ERROR_MESSAGE } from "@/constants/store.constants";
import {
  AppEvents,
  BRAND,
  DATE_FORMAT,
  EVENT_TYPES,
  KEYBOARD_KEYS,
  SNACKBAR_COLOR_TYPE,
  SO_DEFAULT_STORE_CONTACT_NUMBER,
  MEL_DEFAULT_STORE_NUMBER,
  SO_DEFAULT_STORE_NUMBER,
  USER_TYPE,
  SO_DEFAULT_STORE_ID,
  GUIDED_SALES_MESSAGES,
} from "@/constants/common.constants";
import { GetAuthenticatedUserPermission } from "@/service/userPermission.service";
import { useDispatch } from "react-redux";
import {
  FETCH_USER_PERMISSION,
  AUTO_LOGOUT_ENABLED,
  UPDATE_IP_ADDRESS,
} from "@/store/reducer/userPermissionSlice";
import {
  GetPublicStoreLocatorGrid,
  getStoreWorkingHour,
  GetUserStoreDetails,
} from "@/service/storeLocator.service";
import { LocationDTO } from "@/types/SideBar.types";
import SettingsDrawer from "../settings/Settings";
import Link from "next/link";
import { useRouter } from "next/router";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import dayjs from "dayjs";
import { NavProps, StoreDetailsDTO } from "@/types/nav.types";
import EyeExamFlow from "../eyeExamFlow/EyeExamFlow";
import { getLatLong } from "@/utils/getLocation.utils";
import { clearAllCookie } from "@/utils/cookie.utils";
import useNonInitialEffect from "@/hooks/useNonInitialEffect";
import useMenuPermission from "@/hooks/useMenuPermission";
import {
  getAgentCartBadgeCount,
  getAgentCartBadgeCountUsingCartId,
  getAssociateCartBadgeCount,
  GetEventJourney,
  getPatientCartBadgeCount,
  getPatientFavourites,
} from "@/service/common.service";
import { updateAgent, updateCDC } from "@/store/reducer/cdcViewReducer";
import { useAppDispatch, useAppSelector } from "@/store/useStore";
import Notifications from "../nav/Notifications";
import {
  checkBrand,
  clearLocalStorage,
  getGuestToLocalStorage,
  getSelectedPatientFromLocalStorage,
  getStoreIdForDefaultStore,
  unformatPhoneNumber,
} from "@/utils/common.utils";
import { getCartOrderCountForPatientAndGuest } from "@/service/common.service";
import { updateCartId } from "@/store/reducer/cartIdReducer";
import { ERROR_MESSAGE } from "@/constants/auth.constants";
import { timezoneConverter } from "@/utils/timezone.utils";
import useAppLogo from "@/hooks/useAppLogo";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useHasInHousePxsContext } from "@/contexts/ HasInHousePxs/ HasInHousePxsContext";
import {
  callGo,
  getGuestCartData,
  getPatientCartData,
  onSubmitScarabEvent,
} from "@/utils/scarabController.utils";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { getWeekday } from "@/utils/storeHourFormatter";
import { updateLangCode } from "@/store/reducer/languageCodeReducer";
import Cookies from "js-cookie";
import { GetPermissionConfig } from "@/config/permissionConfig";
import CommonPermission from "@/constants/common-permission.constants";

const CustomBadgeContent = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "var(--primary-color)",
    color: "var(--tertiary-font-color)",
  },
}));

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "transparent",
  },
});

const FAVORITES_LS_KEY = "user-favorites";

export default function NavCustomer(props: NavProps) {
  const { t } = useTranslation();
  const { showSnackBar } = useSnackBar();
  const [openLoader, setOpenLoader] = React.useState(false);
  const [permissionLoaded, setPerMissionLoded] = React.useState(false);
  const [cartBadgeCount, setCartBadgeCount] = React.useState<number>(0);
  const [currentLanguage, setCurrentLanguage] = React.useState(i18n.language);
  const router = useRouter();
  const isCartUpdated = useAppSelector((state) => state.cartId.data);
  const isPendingCartCountApiCall = useAppSelector(
    (state) => state.cartId.isPendingCartCountApiCall
  );
  const cartCountForMRSOrder = useAppSelector(
    (state) => state.cartId.cartCountForMRSOrder
  );
  const patientData = useAppSelector((state) => state.guidedSales.data);
  const [isPageLoading, setIsPageLoading] = React.useState(false);

  const [getPosAppintmentsPermisison] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [CommonPermission.APPOINTMENTS.GET_POS_APPOINTMENTS],
    })
  ) as boolean[];

  useEffect(() => {
    setIsPageLoading(true);
  }, []);

  const {
    userHasInHousePxs: { primary: userHasInHousePxs },
    checkPrescriptionData,
  } = useHasInHousePxsContext();
  const [shouldEndGuidedSalesMeeting, setShouldEndGuidedSalesMeeting] =
    React.useState(false);

  const menuPermission: any = useMenuPermission();
  /**
   *  Apply permission to all menu and sub menu recursively
   * @param menus
   * @returns
   */

  const getPatienNavData = useCallback(() => {
    const MY_ACCOUNT_MENU_URL = "/my-account";
    const DOCTOR_CONSULTATION_SUBMENU_URL = "/my-account/ask-a-doctor";
    /* If user does not have in house Prescriptions it will filter My Accont submenu
     * the item Ask an Eye Doctor */
    const items = [...NavDataPatient];
    const SelectedItem = items.find((it) => it.url === MY_ACCOUNT_MENU_URL);

    if (!SelectedItem || userHasInHousePxs) return items;

    const filteredSubMenu: NavItem[] = [];

    /*If the user doesn't have In house prescriptions, it filters the Ask an Eye doctor Menu*/
    for (let i = 0; i < SelectedItem.subMenu.length; i++) {
      if (
        SelectedItem.subMenu[i].url === DOCTOR_CONSULTATION_SUBMENU_URL &&
        !userHasInHousePxs
      ) {
        continue;
      }
      filteredSubMenu.push(SelectedItem.subMenu[i]);
    }

    const updatedItem = { ...SelectedItem, subMenu: filteredSubMenu };

    /* Creates a copy of the current values to avoid modifying the original value */
    const updatedItems = items.map((it) =>
      it.url === MY_ACCOUNT_MENU_URL ? updatedItem : it
    );

    return updatedItems;
  }, [userHasInHousePxs, props.session]);

  const [navData, setNavData] = React.useState<NavItem[]>(getPatienNavData());

  const getMenuByPermission = (menus: NavItem[]): NavItem[] =>
    menus.filter((menu) => {
      if (menu.permissionKey) {
        if (menuPermission[menu.permissionKey]) {
          if (menu.subMenu && menu.subMenu.length) {
            menu.subMenu = getMenuByPermission(menu.subMenu) as NavItem[];
          }
          return menu;
        }
      } else {
        return menu;
      }
    });

  const getMenuForDoctorStore = (menus: NavItem[]): NavItem[] => {
    return menus.map((item) => {
      if (item.subMenu && item.subMenu.length > 0) {
        return {
          ...item,
          subMenu: item.subMenu.filter(
            (subItem) =>
              subItem.permissionKey !== "inventoryCountPermission" &&
              subItem.permissionKey !== "inventoryAdjustmentPermission"
          ),
        };
      }
      return item;
    });
  };
  const selectedStoreForNav =
    typeof window !== "undefined" && localStorage.getItem("selectedStore");
  const updatePermission = (userType: string) => {
    const PatienNavData = getPatienNavData();

    if (props.session) {
      let NavData: NavItem[] = PatienNavData;
      if (userType === USER_TYPE.PATIENT) {
        NavData = PatienNavData as NavItem[];
      } else if (userType === USER_TYPE.ASSOCIATE) {
        // Shallow coping Associate Menu to avoid data modification
        const associateNavData = JSON.parse(JSON.stringify(NavDataAssociate));
        NavData = getMenuByPermission(associateNavData);
        if (selectedStoreForNav) {
          const isDoctorStore =
            JSON.parse(selectedStoreForNav)?.StoreType === "D";
          if (isDoctorStore) {
            NavData = getMenuForDoctorStore(NavData);
          }
        }
      }
      setNavData(NavData);
    } else {
      setNavData(PatienNavData);
    }
  };

  useEffect(() => {
    const authData = props.session?.user.authData as any;
    updatePermission(authData?.userType);
  }, [props.session, menuPermission, userHasInHousePxs, selectedStoreForNav]);

  const windowTemp = props.window;
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [storeId, setStoreId] = React.useState<string | null>(
    SO_DEFAULT_STORE_ID
  );
  const [logoutTrigger, setLogoutTrigger] = React.useState(false);
  const [storeData, setStoreData] = React.useState<NavStoreDataDTO | null>(
    null
  );

  const memoizedStoreData = useMemo(
    () => storeData,
    [
      storeData?.Id,
      storeData?.BrandName,
      storeData?.StoreNumber,
      storeData?.CloseAt,
      storeData?.OpenAt,
      storeData?.WebDescription,
      storeData?.TimeZoneCode,
    ]
  );

  const [employeeStoreData, setEmployeeStoreData] =
    React.useState<NavStoreDataDTO | null>(null);
  const [userLocation, setUserLocation] = React.useState<LocationDTO | null>(
    null
  );
  const [sideBarOC, setSideBarOC] = React.useState(false);
  const [isLockSidebar, setIsLockSidebar] = React.useState(false);
  const [isForceClose, setIsForceClose] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container =
    windowTemp !== undefined ? () => windowTemp().document.body : undefined;

  const [isApiCall, setIsApiCall] = React.useState<Boolean>(false);
  const [showCDCView, setShowCDCView] = React.useState<Boolean>(false);
  const [showAgentView, setShowAgentView] = React.useState<Boolean>(false);
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);

  const [isCDC, setIsCDC] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [statusMessage, setStatusMessage] = React.useState("");
  const [role, setRole] = React.useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = React.useState<string | null>(
    null
  );
  const [cartIdForAgent, setCartIdForAgent] = React.useState<string | null>(
    null
  );
  const [patientIdForAgentView, setPatientIdForAgentView] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    const authData = props.session?.user.authData as any;
    setRole(authData?.userType ? authData?.userType : null);
  }, [props.session]);

  React.useEffect(() => {
    (async () => {
      if (
        memoizedStoreData &&
        memoizedStoreData.CloseAt &&
        memoizedStoreData.OpenAt &&
        memoizedStoreData.TimeZoneCode &&
        memoizedStoreData.Id
      ) {
        const storeTimezone = timezoneConverter(memoizedStoreData.TimeZoneCode);

        const closeTimeParts = memoizedStoreData.CloseAt.split(":");
        const openTimeParts = memoizedStoreData.OpenAt.split(":");

        const currentTime = new Date();

        //      const storeHour = getWeekday(storeData.WorkingHours);
        const storeHour = await getStoreWorkingHour(
          memoizedStoreData.Id.toString(),
          dayjs().format(DATE_FORMAT)
        )
          .then(({ data }) => {
            if (data?.Result) {
              return getWeekday(data.Result);
            } else {
              return [];
            }
          })
          .catch((err) => {
            return [];
          });

        const options = { timeZone: storeTimezone };
        const currentTimeInStoreTimezone = new Date(
          currentTime.toLocaleString("en-US", options)
        );

        const currentDay = currentTimeInStoreTimezone.getDay();

        const openTime = new Date();
        openTime.setHours(
          parseInt(openTimeParts[0], 10),
          parseInt(openTimeParts[1], 10),
          parseInt(openTimeParts[2], 10)
        );
        openTime.toLocaleString("en-US", options);

        const closeTime = new Date();
        closeTime.setHours(
          parseInt(closeTimeParts[0], 10),
          parseInt(closeTimeParts[1], 10),
          parseInt(closeTimeParts[2], 10)
        );
        closeTime.toLocaleString("en-US", options);

        if (storeHour[currentDay] && storeHour[currentDay].status == "CLOSED") {
          setStatusMessage(t("nav.CLOSED"));
        } else if (
          currentTimeInStoreTimezone >= openTime &&
          currentTimeInStoreTimezone <= closeTime
        ) {
          setStatusMessage(
            t("nav.CLOSES_AT") +
              `${new Date(
                `2024-01-01T${memoizedStoreData?.CloseAt}`
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}`
          );
        } else {
          setStatusMessage(
            t("nav.OPENS_AT") +
              `${new Date(
                `2024-01-01T${memoizedStoreData?.OpenAt}`
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}`
          );
        }
      } else {
        if (memoizedStoreData) {
          setStatusMessage(t("nav.CLOSED"));
        } else {
          setStatusMessage("");
        }
      }
    })();
  }, [memoizedStoreData, i18n.language]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const defaultStoreId =
      typeof window !== "undefined" && localStorage.getItem("defaultStoreId");
    if (!defaultStoreId) {
      getStoreIdForDefaultStore();
    }
  }, [typeof window !== "undefined" && localStorage.getItem("defaultStoreId")]);

  const handleLogout = () => {
    signOut({ redirect: false })
      .then(() => {
        localStorage.setItem("isLogout", "true");
        localStorage.removeItem("isLogout");
        //Removing all cookie
        setOpenLoader(false);
        //Removing token from cookie
        clearAllCookie();
        //TODO: We will use snackbar when we will finalize the message
        // showSnackBar(
        //   "Signed out successfully",
        //   SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
        // );
        clearLocalStorage();
        sessionStorage.clear();
        props.onLogout && props.onLogout();
        setStoreData(
          localStorage.getItem("selectedStore")
            ? JSON.parse(localStorage.getItem("selectedStore") as string)
            : null
        );
        router.replace("/");
      })
      .catch((err) => {
        setOpenLoader(false);
        showSnackBar(
          err.response
            ? err.response.data.Error.Description
            : "Something went wrong",
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const getStoreDetailsById = (storeId: string, isPatient?: boolean) => {
    if (storeId) {
      GetUserStoreDetails(storeId, dayjs().format(DATE_FORMAT))
        .then(({ data }) => {
          setStoreData({
            BrandName: data.Result?.BrandName || "",
            StoreNumber: data.Result?.StoreNumber || "",
            CloseAt: data.Result?.CloseAt || "",
            OpenAt: data.Result?.OpenAt || "",
            WebDescription: data.Result?.WebDescription || "",
            TimeZoneCode: data.Result?.TimeZoneCode || "",
          });
          if (data.Result) {
            if (
              isPatient &&
              (Number(data.Result?.StoreNumber) === MEL_DEFAULT_STORE_NUMBER ||
                Number(data.Result?.StoreNumber) === SO_DEFAULT_STORE_NUMBER)
            ) {
              setStoreData(null);
            } else {
              localStorage.setItem(
                "selectedStore",
                JSON.stringify(data.Result)
              );
              props.handleStore(data.Result);
            }
          }
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err?.response?.data?.Error?.Message
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  /**
   *  Check whether Eye Care Specialist View is enable or disable
   */
  const checkAgentView = async () => {
    const isAgentUser = localStorage.getItem("isAgentUser");
    const eventId = localStorage.getItem("GuidedSalesEventId");
    if (isAgentUser === "1" && eventId) {
      GetEventJourney(eventId)
        .then((resp) => {
          const data = resp.data?.Result as EventJourney[];
          if (data) {
            const callEnded = data.find(
              (event) => event.JourneyActionCode === "CallEnded"
            );
            if (callEnded) {
              localStorage.removeItem("GuidedSalesEventId");
              localStorage.removeItem("isContinueShopping");
              localStorage.removeItem("CurrentSelectedPatient");
              dispatch(updateAgent(false));
            } else {
              dispatch(updateAgent(true));
            }
          } else {
            localStorage.removeItem("GuidedSalesEventId");
            dispatch(updateAgent(false));
          }
        })
        .catch((err) => {
          localStorage.removeItem("GuidedSalesEventId");
          dispatch(updateAgent(false));
          showSnackBar(
            ERROR_MESSAGE.GUIDED_SALE_AGENT_VIEW_FAIL,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    } else {
      localStorage.removeItem("GuidedSalesEventId");
      dispatch(updateAgent(false));
    }
  };

  React.useEffect(() => {
    if (props.session) {
      localStorage.setItem(
        "user",
        JSON.stringify(props.session.user?.authData)
      );

      if (
        props.session.user &&
        (props.session.user as any).authData?.PatientId &&
        !location.pathname.includes("my-account")
      ) {
        checkPrescriptionData((props.session.user as any).authData?.PatientId);
      }

      if (
        (props.session.user as any)?.authData?.userType === USER_TYPE.ASSOCIATE
      ) {
        localStorage.setItem(
          "empUserName",
          JSON.stringify(props.session.user?.name || "")
        );
        i18n.changeLanguage("en");
        localStorage.setItem("language", "en");
      }
      localStorage.setItem("session", JSON.stringify(props.session));

      if (
        (props.session.user as any)?.authData?.userType ===
          USER_TYPE.ASSOCIATE &&
        !isApiCall
      ) {
        GetAuthenticatedUserPermission()
          .then((res) => {
            setPerMissionLoded(true);
            setOpenLoader(true);
            setEmployeeStoreData(res.data.Result.SelectedStore);
            dispatch(FETCH_USER_PERMISSION(res.data.Result));
            dispatch(UPDATE_IP_ADDRESS(res.data.Result.UserIpAddress));
            dispatch(AUTO_LOGOUT_ENABLED(res.data.Result?.IsAutoLogoutEnabled));
            const isUserLocked: boolean = res.data.Result.IsLocked;
            const selectedStore: StoreDetailsDTO | null =
              res.data.Result.SelectedStore;

            const isUserCDC: boolean = res.data.Result.IsCDCUser;
            localStorage.setItem("userId", res.data.Result.UserId);
            setIsLockSidebar(isUserLocked);
            if (isUserCDC) {
              setShowCDCView(true);
              setSelectedStoreId(selectedStore?.Id.toString() || null);
              const checkCDCView = Boolean(
                Number(localStorage.getItem("isCDCUser"))
              );
              const storeData = JSON.parse(
                localStorage.getItem("selectedStore") as string
              );
              if (checkCDCView || !storeData) {
                setIsCDC(true);
                props.handleCDCView(true);
                localStorage.setItem("isCDCUser", "1");
                localStorage.removeItem("selectedStore");
              } else {
                setIsCDC(false);
                props.handleCDCView(false);

                if (!Boolean(localStorage.getItem("selectedStore"))) {
                  if (selectedStore?.Id) {
                    getStoreDetailsById(selectedStore.Id.toString());
                  }
                } else {
                  const storeData = JSON.parse(
                    localStorage.getItem("selectedStore") as string
                  );
                  props.handleStore(storeData);
                  setStoreData(storeData);
                }
              }
            } else {
              if (!selectedStore && isUserLocked) {
                //Signing out user if store is not found and user is locked
                showSnackBar(
                  STORE_ERROR_MESSAGE.AUTO_LOGOUT_ERROR_MESSAGE,
                  SNACKBAR_COLOR_TYPE.ERROR as AlertColor
                );
                setLogoutTrigger(true);
                handleLogout();
              } else if (isUserLocked && Boolean(selectedStore)) {
                // isLocked = true && SelectedStore = Data
                // Sidebar will not open
                setIsLockSidebar(true);
                // set the selected store <--
                getStoreDetailsById(selectedStore?.Id.toString() || "");
              } else if (!isUserLocked && Boolean(selectedStore)) {
                // isLocked = false && SelectedStore = Data
                // Sidebar will open
                // set the selected store <--
                if (!Boolean(localStorage.getItem("selectedStore"))) {
                  getStoreDetailsById(selectedStore?.Id.toString() || "");
                } else {
                  const storeData = JSON.parse(
                    localStorage.getItem("selectedStore") as string
                  );
                  props.handleStore(storeData);
                  setStoreData(storeData);
                }
                // Normal flow like user/patient. Can change store
              } else if (!isUserLocked && !Boolean(selectedStore)) {
                // isLocked = false && SelectedStore = null
                // Force to select store from auth store grid API
                // Add message

                // After Store selected, set the selected store and normal flow like user/patient. Can change store

                if (!Boolean(localStorage.getItem("selectedStore"))) {
                  setSideBarOC(true);
                  setIsForceClose(true);
                } else {
                  const storeData = JSON.parse(
                    localStorage.getItem("selectedStore") as string
                  );
                  props.handleStore(storeData);
                  setStoreData(storeData);
                }
              }
            }
          })
          .catch((err) => {
            const errorMessage =
              err && err.response?.data?.Error?.Message
                ? err.response?.data?.Error?.Message
                : STORE_ERROR_MESSAGE.AUTO_LOGOUT_ERROR_MESSAGE;
            showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
            //TODO: We have added  node env check to avoid auto logout in development mode
            // Signing out user if error occurs
            if (process.env.NODE_ENV !== "development") {
              setLogoutTrigger(true);
              handleLogout();
            } else {
              //TODO: This code is for development purpose will remove once upper code will be uncommented
              const storeData = JSON.parse(
                localStorage.getItem("selectedStore") as string
              );
              props.handleStore(storeData);
              setStoreData(storeData);
            }
          })
          .finally(() => {
            setIsApiCall(true);
            setOpenLoader(false);
            checkAgentView();
          });
      } else {
        if (
          (props.session.user as any)?.authData?.userType === USER_TYPE.PATIENT
        ) {
          /* Doctor consultation implementation, this checks the existing
           * prescriptions for the user and check if it contains in-house prescriptions
           * if it does enables doctor consultation menus */

          if (Boolean(localStorage.getItem("selectedStore"))) {
            const storeData = JSON.parse(
              localStorage.getItem("selectedStore") as string
            );
            props.handleStore(storeData);
            setStoreData(storeData);
          } else if (userLocation) {
            getStoreGridData(1);
          } else if (Boolean(localStorage.getItem("user"))) {
            const userData = JSON.parse(localStorage.getItem("user") as string);

            getStoreDetailsById(userData?.StoreId.toString() || "", true);
          } else {
            setStoreData(null);
          }
        }
      }
    } else {
      const isEmployee = localStorage.getItem("isEmployee") || "";
      if (!Boolean(isEmployee)) {
        if (Boolean(localStorage.getItem("selectedStore"))) {
          const storeData = JSON.parse(
            localStorage.getItem("selectedStore") as string
          );
          props.handleStore(storeData);
          setStoreData(storeData);
        } else if (userLocation) {
          getStoreGridData(1);
        } else {
          setStoreData(null);
        }
      }
    }
  }, [props.session, userLocation, employeeStoreData]);

  useEffect(() => {
    if (
      (props.session?.user as any)?.authData?.userType === USER_TYPE.PATIENT
    ) {
      if (localStorage.getItem("isComingFromLoginForm")) {
        onSubmitScarabEvent(
          "setCustomerId",
          (props.session?.user as any)?.authData?.PatientId
        );
        getPatientCartData((props.session?.user as any)?.authData, router);
        localStorage.removeItem("isComingFromLoginForm");
      }
    }
  }, [(props.session?.user as any)?.authData?.userType]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSessionData = JSON.parse(
        localStorage.getItem("session") as string
      );
      if (props.sessionStatus === "loading") {
        return;
      } else if (
        !userSessionData?.user &&
        props.sessionStatus === "unauthenticated"
      ) {
        if (
          !router.pathname.startsWith("/catalog") &&
          !router.pathname.startsWith("/product")
        ) {
          getGuestCartData(router);
        }
      } else if (
        (userSessionData?.user as any)?.authData?.userType === USER_TYPE.PATIENT
      ) {
        if (
          !router.pathname.startsWith("/catalog") &&
          !router.pathname.startsWith("/product")
        ) {
          getPatientCartData((userSessionData?.user as any)?.authData, router);
        }
      }
    }
  }, [router.pathname, props.sessionStatus]);

  useEffect(() => {
    if (window) {
      window.addEventListener(AppEvents.STORE_CHANGE, () => {
        const storeData = JSON.parse(
          localStorage.getItem("selectedStore") as string
        );
        setStoreData(storeData);
      });
      return () => {
        window.removeEventListener(AppEvents.STORE_CHANGE, () => {});
      };
    }
  }, []);

  // TODO : Storing data in local storage and cookie - Need to find better solution

  const getStoreGridData = async (page: number) => {
    GetPublicStoreLocatorGrid(
      page.toString(),
      "",
      "",
      userLocation?.latitude.toString(),
      userLocation?.longitude.toString()
    )
      .then(({ data }) => {
        const closestCoordinate = data.Result.Results && data.Result.Results[0];
        if (closestCoordinate) {
          setStoreData({
            BrandName: closestCoordinate?.BrandName || "",
            StoreNumber: closestCoordinate?.StoreNumber || "",
            CloseAt: closestCoordinate?.CloseAt || "",
            OpenAt: closestCoordinate?.OpenAt || "",
            WebDescription: closestCoordinate?.WebDescription || "",
            TimeZoneCode: closestCoordinate?.TimeZoneCode || "",
            Id: closestCoordinate?.Id,
          });
          localStorage.setItem(
            "selectedStore",
            JSON.stringify(closestCoordinate)
          );
          props.handleStore(closestCoordinate);
        }
      })
      .catch((err) => {
        const errorMessage = (err as AxiosError).message
          ? (err as AxiosError).message
          : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  React.useEffect(() => {
    getLatLong((lat, long) => {
      setUserLocation({
        latitude: lat,
        longitude: long,
      });
    });
  }, []);

  type Anchor = "top" | "left" | "bottom" | "right";

  const [settingsState, setSettingsState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleCDCUser = (e: any) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      localStorage.setItem("isCDCUser", "0");
      if (!Boolean(localStorage.getItem("selectedStore"))) {
        if (selectedStoreId) {
          getStoreDetailsById(selectedStoreId);
        } else {
          setSideBarOC(true);
        }
      }

      if (localStorage.getItem("selectedStore")) {
        const storeData = JSON.parse(
          localStorage.getItem("selectedStore") as string
        );
        props.handleStore(storeData);
        setStoreData(storeData);
      }

      if (selectedStoreId || localStorage.getItem("selectedStore")) {
        setIsCDC(isChecked);
        props.handleCDCView(isChecked);
      }
    } else {
      localStorage.setItem("isCDCUser", "1");
      localStorage.removeItem("selectedStore");
      setIsCDC(isChecked);
      props.handleCDCView(isChecked);
    }
  };

  const handleAgentUser = (isChecked: boolean) => {
    setShouldEndGuidedSalesMeeting(false);
    setShowAgentView(isChecked);
    localStorage.setItem("isAgentUser", isChecked ? "1" : "0");
    dispatch(updateAgent(false));
    setStoreData(null);
    localStorage.setItem("selectedStore", "");
    if (isLockSidebar) {
      setSideBarOC(!isLockSidebar);
    } else {
      setSideBarOC(!sideBarOC);
    }
    window.dispatchEvent(new Event(AppEvents.END_MEETING));
  };

  useEffect(() => {
    // Listen for changes in localStorage
    const handleAgentViewChange = (event: StorageEvent) => {
      if (
        event.key === "isAgentUser" &&
        event.newValue === "0" &&
        event.oldValue === "1"
      ) {
        handleAgentUser(false);
      } else if (
        event.key === "isAgentUser" &&
        event.newValue === "1" &&
        event.oldValue === "0"
      ) {
        dispatch(updateAgent(true));
      }
    };

    // Add an event listener for storage changes
    window.addEventListener("storage", handleAgentViewChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleAgentViewChange);
    };
  }, [router]);

  useEffect(() => {
    dispatch(updateCDC(isCDC));
  }, [isCDC]);

  useNonInitialEffect(() => {
    setShowAgentView(isAgent);
    localStorage.setItem("isAgentUser", isAgent ? "1" : "0");
    const setDefaultStore = () => {
      if (isAgent) {
        const defaultStoreId = localStorage.getItem("defaultStoreId");
        if (defaultStoreId) {
          getStoreDetailsById(defaultStoreId);
        }
      }
    };
    setDefaultStore();
    window.addEventListener(AppEvents.SET_DEFAULT_STORE, setDefaultStore);
    return () => {
      window.removeEventListener(AppEvents.SET_DEFAULT_STORE, setDefaultStore);
    };
  }, [isAgent]);

  const toggleSettingsDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === EVENT_TYPES.KEYDOWN &&
        ((event as React.KeyboardEvent).key === KEYBOARD_KEYS.TAB ||
          (event as React.KeyboardEvent).key === KEYBOARD_KEYS.SHIFT)
      ) {
        return;
      }
      setSettingsState({ ...settingsState, [anchor]: open });
    };
  const handleAutoLogout = () => {
    handleLogout();
    showSnackBar(
      "Your session has expired. Please sign in to continue.",
      SNACKBAR_COLOR_TYPE.ERROR as AlertColor
    );
  };
  useNonInitialEffect(() => {
    if (props.session) {
      if (
        (props.session?.user as any)?.authData?.userType === USER_TYPE.PATIENT
      ) {
        const expirationTime = (props.session?.user as any)?.authData?.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = expirationTime - currentTime;
        if (timeUntilExpiration > 0) {
          const timeoutId = setTimeout(
            handleAutoLogout,
            timeUntilExpiration * 1000
          );
          return () => clearTimeout(timeoutId);
        } else if (timeUntilExpiration < 0) {
          handleAutoLogout();
        }
      }
    }
  }, [props.session]);

  const getCartBadgeCountAssociate = () => {
    getAssociateCartBadgeCount(storeId as string)
      .then((res) => {
        const result = res.data.Result;
        setCartBadgeCount(result);
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err?.response?.data?.Error?.Message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const getCartBadgeCountPatient = (patientId: string) => {
    getPatientCartBadgeCount(patientId, SO_DEFAULT_STORE_ID as string)
      .then((res) => {
        const result = res.data.Result.BadgeCount;
        setCartBadgeCount(result);
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err?.response?.data?.Error?.Message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const getCartBadgeCountOfPatientForAgentView = (patientId: string) => {
    getAgentCartBadgeCount(patientId)
      .then((res) => {
        const result = res.data.Result.BadgeCount;
        setCartIdForAgent(res.data.Result.Id);
        setCartBadgeCount(result);
        localStorage.setItem("CartCount", result);
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err?.response?.data?.Error?.Message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const getCartCountOfPatientForAgentViewUsingCartId = (cartId: string) => {
    getAgentCartBadgeCountUsingCartId(cartId)
      .then((res) => {
        const result = res.data.Result;
        setCartBadgeCount(result);
        localStorage.setItem("CartCount", result);
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err?.response?.data?.Error?.Message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  useEffect(() => {
    let selectedpatient = getSelectedPatientFromLocalStorage();
    if (isAgent && selectedpatient?.Id) {
      getCartBadgeCountOfPatientForAgentView(selectedpatient?.Id);
    }
    setPatientIdForAgentView(selectedpatient?.Id);
    setCartIdForAgent(selectedpatient?.storeCartId);
  }, [
    patientData,
    isAgent,
    typeof window !== "undefined" &&
      localStorage.getItem("CurrentSelectedPatient"),
  ]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      const selectedpatientDetails = getSelectedPatientFromLocalStorage();
      if (
        event.key === "CurrentSelectedPatient" &&
        selectedpatientDetails.storeCartId
      ) {
        getCartCountOfPatientForAgentViewUsingCartId(
          selectedpatientDetails.storeCartId
        );
      } else if (
        event.key === "CartCount" &&
        event.newValue !== cartBadgeCount.toString() &&
        selectedpatientDetails?.Id
      ) {
        getCartBadgeCountOfPatientForAgentView(
          selectedpatientDetails?.Id as string
        );
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  const getPatientFavouritesList = (patientId: string) => {
    let storeDet = localStorage.getItem("selectedStore");
    const parsedStoreDet = JSON.parse(storeDet || "{}");
    if (parsedStoreDet?.Id || SO_DEFAULT_STORE_ID) {
      getPatientFavourites(
        patientId,
        parsedStoreDet?.Id?.toString() || SO_DEFAULT_STORE_ID
      )
        .then((res) => {
          const result = res.data.Result.Results.map(
            (product: any) =>
              product.ProductCode || product?.masterProductId?.toString()
          );
          if (result && result.length) {
            localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(result));
          }
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err?.response?.data?.Error?.Message
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  useEffect(() => {
    if (
      (props.session?.user as any)?.authData?.userType === USER_TYPE.PATIENT
    ) {
      const cartId = localStorage.getItem("patient_cartId");
      if (cartId) {
        dispatch(updateCartId(cartId));
      }
    } else {
      const cartId = getGuestToLocalStorage();
      if (cartId) {
        dispatch(updateCartId(cartId));
      }
    }
  }, [(props.session?.user as any)?.authData?.userType, menuPermission]);

  useEffect(() => {
    if (isAgent) {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("orderGroupId")
      ) {
        let selectedpatient = getSelectedPatientFromLocalStorage();
        if (selectedpatient?.Id)
          getCartBadgeCountOfPatientForAgentView(selectedpatient?.Id);
      } else if (isCartUpdated.cartId) {
        getCartCountOfPatientForAgentViewUsingCartId(
          isCartUpdated?.cartId as unknown as string
        );
      }
    } else if (
      (props.session?.user as any)?.authData?.userType ===
        USER_TYPE.ASSOCIATE &&
      storeId
    ) {
      getCartBadgeCountAssociate();
    } else if (
      (props.session?.user as any)?.authData?.userType === USER_TYPE.PATIENT
    ) {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("orderGroupId")
      ) {
        getCartBadgeCountPatient(
          (props.session?.user as any)?.authData?.PatientId
        );
      } else if (isCartUpdated.cartId) {
        getCartOrderCount(isCartUpdated.cartId);
      }
    } else if (!props.session) {
      const guestCartId = getGuestToLocalStorage();
      if (guestCartId && isCartUpdated.cartId) {
        getCartOrderCount(isCartUpdated.cartId);
      } else if (!guestCartId) {
        setCartBadgeCount(0);
      }
    }
  }, [isCartUpdated]);

  useEffect(() => {
    if (
      (props.session?.user as any)?.authData?.userType ===
        USER_TYPE.ASSOCIATE &&
      storeId &&
      isPendingCartCountApiCall &&
      !cartCountForMRSOrder
    ) {
      getCartBadgeCountAssociate();
    }
  }, [isPendingCartCountApiCall]);

  useEffect(() => {
    if (
      (props.session?.user as any)?.authData?.userType ===
        USER_TYPE.ASSOCIATE &&
      storeId &&
      cartCountForMRSOrder
    ) {
      getCartBadgeCountAssociate();
    }
  }, [cartCountForMRSOrder]);

  const getCartOrderCount = async (cartId: string) => {
    getCartOrderCountForPatientAndGuest(cartId)
      .then((res) => {
        setCartBadgeCount(res.data.Result);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setCartBadgeCount(0);
        }
        showSnackBar(
          err.response
            ? err?.response?.data?.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  useEffect(() => {
    getStoreDetails();
    window.addEventListener(AppEvents.STORE_CHANGE, () => {
      getStoreDetails();
    });

    return () => {
      window.removeEventListener(AppEvents.STORE_CHANGE, () => {});
    };
  }, [typeof window !== "undefined" && localStorage.getItem("selectedStore")]);

  useEffect(() => {
    const guestCartId = getGuestToLocalStorage();
    if (!props.session && !guestCartId) {
      setCartBadgeCount(0);
    } else if (
      (props.session?.user as any)?.authData?.userType ===
        USER_TYPE.ASSOCIATE &&
      !isAgent &&
      storeId &&
      menuPermission["cartPermission"]
    ) {
      getCartBadgeCountAssociate();
    }
  }, [
    (props.session?.user as any)?.authData?.userType,
    storeId,
    menuPermission,
    props.session,
  ]);

  useEffect(() => {
    if (
      (props.session?.user as any)?.authData?.userType === USER_TYPE.PATIENT
    ) {
      localStorage.removeItem("patient_cartId");
      getCartBadgeCountPatient(
        (props.session?.user as any)?.authData?.PatientId
      );
      getPatientFavouritesList(
        (props.session?.user as any)?.authData?.PatientId
      );
    }
  }, [(props.session?.user as any)?.authData?.userType]);

  const getStoreDetails = () => {
    const storeDetails = localStorage.getItem("selectedStore");

    if (storeDetails) {
      setStoreId(JSON.parse(storeDetails)?.Id);
    }
  };
  const getSettingsByPermission = (settings: NavItem[]): NavItem[] => {
    return settings.filter((setting) => {
      if (setting.permissionKey) {
        if (menuPermission[setting.permissionKey]) {
          if (setting.subMenu && setting.subMenu.length) {
            setting.subMenu = getSettingsByPermission(setting.subMenu);
          }

          return setting;
        }
      } else {
        return setting;
      }
    });
  };

  useEffect(() => {
    if (
      !(
        router.pathname.startsWith("/catalog") ||
        router.pathname.startsWith("/product") ||
        isAgent ||
        (typeof window !== "undefined" &&
          localStorage.getItem("isAgentUser") === "1")
      ) &&
      typeof window !== "undefined" &&
      localStorage.getItem("isContinueShopping") === "true"
    ) {
      localStorage.removeItem("isContinueShopping");
    }
  }, [router.pathname]);

  function notificationsLabel(count: number) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const appLogo = useAppLogo();

  React.useEffect(() => {
    if (localStorage.getItem("language")) {
      let currentLanguage = localStorage.getItem("language") as string;
      localStorage.setItem("language", currentLanguage);
      i18n.changeLanguage(currentLanguage);
      dispatch(updateLangCode(currentLanguage));
      setCurrentLanguage(currentLanguage);
    } else {
      localStorage.setItem("language", currentLanguage);
      i18n.changeLanguage(currentLanguage);
      dispatch(updateLangCode(currentLanguage));
      setCurrentLanguage(currentLanguage);
    }
  }, []);

  React.useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    dispatch(updateLangCode(newLanguage));
    localStorage.setItem("language", newLanguage);
    Cookies.set("language", newLanguage);
    setCurrentLanguage(newLanguage);
    // [IR-2064] - Redirect to stanton-access page if user is on stanton-access-spa page and language is english
    if (
      (router.pathname === "/stanton-access-spa" ||
        router.pathname === "/stanton-access-spa/") &&
      newLanguage === "en"
    ) {
      router.push("/stanton-access/");
    }
  };

  return (
    <>
      <BackdropLoader openLoader={openLoader} />
      <Box className={style.nav}>
        <CssBaseline />
        <AppBar component="nav" className={style.navBar}>
          <div className={style.navBarWrapper}>
            <Toolbar className={style.navToolBar}>
              <Box className={style.navItems}>
                <GetNavBar
                  session={props.session}
                  navItems={navData}
                  clearStore={() => {
                    props.onLogout && props.onLogout();
                    setStoreData(
                      localStorage.getItem("selectedStore")
                        ? JSON.parse(
                            localStorage.getItem("selectedStore") as string
                          )
                        : null
                    );
                    setCartBadgeCount(0);
                  }}
                  setCartBadgeCount={setCartBadgeCount}
                />
              </Box>

              <Box className={style.mobileBookEyeExam}>
                {isPageLoading ? (
                  <>
                    {!isAgent && (
                      <Box
                        className={`${style.appointmentSection} ${
                          (props.session?.user as any)?.authData?.userType !==
                            USER_TYPE.ASSOCIATE && style.rowReverse
                        }`}
                      >
                        {(props.session?.user as any)?.authData?.userType ===
                        USER_TYPE.ASSOCIATE ? (
                          <>
                            {isCDC ? (
                              <>
                                <Button
                                  className={style.appointmentBtn}
                                  aria-label="supportNumber"
                                  tabIndex={0}
                                  data-testid="supportNumber"
                                  component={Link}
                                  href="https://nowoptics.franconnect.net/fc/"
                                  target="_blank"
                                >
                                  {t("HEADER.SUPPORT_NUMBER")}
                                </Button>
                              </>
                            ) : getPosAppintmentsPermisison ? (
                              <>
                                <Button
                                  className={style.appointmentBtn}
                                  aria-label="appointments"
                                  tabIndex={0}
                                  onClick={() => router.push("/appointments")}
                                  data-testid="Appointments"
                                >
                                  {t("HEADER.APPOINTMENTS")}
                                </Button>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <>
                            <Button
                              className={style.appointmentBtn}
                              aria-label="BookEyeExam"
                              tabIndex={0}
                              onClick={() => router.push("/book-eye-exam")}
                              data-testid="BookEyeExam"
                            >
                              {t("HEADER.BOOK_EYE_EXAM")}
                            </Button>
                          </>
                        )}
                      </Box>
                    )}
                  </>
                ) : (
                  <Skeleton height={60} width={142} variant="rectangular" />
                )}
              </Box>

              <Box className={`${style.iconButtonSection}`}>
                <Box className={style.navHead}>
                  {(props.session?.user as any)?.authData?.userType !==
                    USER_TYPE.ASSOCIATE && (
                    <>
                      <Button
                        endIcon={
                          <Image
                            src={LocationIcon}
                            alt="location"
                            width={16}
                            height={21}
                          />
                        }
                        onClick={() => {
                          if (isLockSidebar) {
                            setSideBarOC(!isLockSidebar);
                          } else {
                            setSideBarOC(!sideBarOC);
                          }
                        }}
                        sx={{ cursor: "pointer" }}
                        className={style.navHeadTitle}
                      >
                        <span className={style.storeDetails}>
                          {storeData
                            ? `${storeData?.WebDescription || ""}`
                            : t("nav.SELECT_STORE")}
                        </span>
                        <span className={style.mobileStoreDetails}>
                          {!storeData && t("nav.SELECT_STORE")}
                        </span>
                      </Button>
                      {/* IR-2322 TODO: Could be required for associate view */}
                      {/* {statusMessage && (
                        <span className={style.closed}>{statusMessage}</span>
                      )} */}
                    </>
                  )}
                  {(props.session?.user as any)?.authData?.userType ===
                    USER_TYPE.ASSOCIATE &&
                    permissionLoaded &&
                    !showAgentView &&
                    (showCDCView ? (
                      <>
                        {!isCDC ? (
                          <Tooltip
                            disableHoverListener={!Boolean(storeData)}
                            disableTouchListener={!Boolean(storeData)}
                            disableInteractive={!Boolean(storeData)}
                            disableFocusListener={!Boolean(storeData)}
                            title={
                              <Typography component={"h1"}>
                                {storeData?.StoreNumber}-
                                {storeData?.WebDescription || ""} |{" "}
                                {statusMessage}
                              </Typography>
                            }
                          >
                            <Button
                              endIcon={
                                <Image
                                  src={LocationIcon}
                                  alt="location"
                                  width={16}
                                  height={21}
                                />
                              }
                              onClick={() => {
                                if (isLockSidebar) {
                                  setSideBarOC(!isLockSidebar);
                                } else {
                                  setSideBarOC(!sideBarOC);
                                }
                              }}
                              sx={{
                                cursor: "pointer",
                                borderRight: "none !important",
                              }}
                              className={style.navHeadTitle}
                            >
                              {storeData
                                ? `${storeData?.StoreNumber}`
                                : t("nav.SELECT_STORE")}
                            </Button>
                          </Tooltip>
                        ) : null}

                        <div
                          className={style.cdcSwitch}
                          style={{
                            marginTop: "2px !important",
                            marginLeft: "10px !important",
                          }}
                        >
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={isCDC}
                                  onChange={handleCDCUser}
                                />
                              }
                              label="DC view"
                            />
                          </FormGroup>
                        </div>
                      </>
                    ) : (
                      <>
                        <Tooltip
                          disableHoverListener={!Boolean(storeData)}
                          disableTouchListener={!Boolean(storeData)}
                          disableInteractive={!Boolean(storeData)}
                          disableFocusListener={!Boolean(storeData)}
                          title={
                            <Typography component={"h1"}>
                              {storeData?.StoreNumber}-
                              {storeData?.WebDescription || ""} |{" "}
                              {statusMessage}
                            </Typography>
                          }
                        >
                          <Button
                            endIcon={
                              <Image
                                src={LocationIcon}
                                alt="location"
                                width={16}
                                height={21}
                              />
                            }
                            onClick={() => {
                              if (isLockSidebar) {
                                setSideBarOC(!isLockSidebar);
                              } else {
                                setSideBarOC(!sideBarOC);
                              }
                            }}
                            sx={{
                              cursor: "pointer",
                              borderRight: "none !important",
                            }}
                            className={style.navHeadTitle}
                          >
                            {storeData
                              ? `${storeData?.StoreNumber}`
                              : t("nav.SELECT_STORE")}
                          </Button>
                        </Tooltip>
                      </>
                    ))}
                  {(props.session?.user as any)?.authData?.userType ===
                    USER_TYPE.ASSOCIATE &&
                    permissionLoaded &&
                    showAgentView && (
                      <>
                        <Tooltip
                          disableHoverListener={!Boolean(storeData)}
                          disableTouchListener={!Boolean(storeData)}
                          disableInteractive={!Boolean(storeData)}
                          disableFocusListener={!Boolean(storeData)}
                          title={
                            <Typography component={"h1"}>
                              {storeData?.StoreNumber}-
                              {storeData?.WebDescription || ""} |{" "}
                              {statusMessage}
                            </Typography>
                          }
                        >
                          <Button
                            endIcon={
                              <Image
                                src={LocationIcon}
                                alt="location"
                                width={16}
                                height={21}
                              />
                            }
                            onClick={() => {
                              if (!isAgent) {
                                if (isLockSidebar) {
                                  setSideBarOC(!isLockSidebar);
                                } else {
                                  setSideBarOC(!sideBarOC);
                                }
                              }
                            }}
                            sx={{
                              cursor: "pointer",
                              borderRight: "none !important",
                            }}
                            className={style.navHeadTitle}
                          >
                            {storeData
                              ? `${
                                  isAgent
                                    ? storeData.WebDescription
                                    : storeData?.StoreNumber
                                }`
                              : t("nav.SELECT_STORE")}
                          </Button>
                        </Tooltip>
                        <div
                          className={style.cdcSwitch}
                          style={{
                            marginTop: "2px !important",
                            marginLeft: "10px !important",
                          }}
                        >
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={isAgent}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (!isChecked) {
                                      setShouldEndGuidedSalesMeeting(true);
                                    }
                                  }}
                                />
                              }
                              label="Eye Care Specialist View"
                            />
                          </FormGroup>
                        </div>
                      </>
                    )}
                  <SideBar
                    anchor="left"
                    sideBarOC={sideBarOC}
                    setSideBarOC={() => setSideBarOC(false)}
                    changeStoreOpen={false}
                    handleNewStore={() => {
                      const storeData = JSON.parse(
                        localStorage.getItem("selectedStore") as string
                      );
                      props.handleStore(storeData);
                      setStoreData(storeData);
                    }}
                    forceClose={isForceClose}
                    handleForceClose={() => setIsForceClose(false)}
                    handleCloseTrigger={(isSetStore: boolean) => {
                      if (showCDCView) {
                        if (
                          !isSetStore &&
                          !Boolean(localStorage.getItem("selectedStore"))
                        ) {
                          localStorage.setItem("isCDCUser", "1");
                          localStorage.removeItem("selectedStore");
                          setIsCDC(true);
                          props.handleCDCView(true);
                        } else {
                          setIsCDC(false);
                          props.handleCDCView(false);
                          localStorage.setItem("isCDCUser", "0");
                        }
                      }
                    }}
                  />
                </Box>
                <Box
                  className={style.navIcon}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <IconButton>
                    <CustomBadgeContent>
                      <Image
                        src={FavoriteIcon}
                        alt="favorite"
                        width={25}
                        height={23}
                      />
                    </CustomBadgeContent>
                  </IconButton>
                </Box>
                {(props.session?.user as any)?.authData?.userType ===
                  USER_TYPE.ASSOCIATE &&
                  !isCDC &&
                  !isAgent &&
                  menuPermission["operationCommandPermission"] &&
                  storeData && (
                    <Notifications
                      setShowAutoLogOutTimer={props.setShowTimerModal}
                      showAutoLogoutTimer={props.showTimerModal}
                      userId={(props.session?.user as any)?.id}
                      storeData={{
                        ...storeData,
                        Id: storeData.Id ? storeData.Id : storeId,
                      }}
                    />
                  )}
                {(props.session?.user as any)?.authData?.userType ===
                  USER_TYPE.ASSOCIATE &&
                  !isCDC &&
                  !isAgent &&
                  menuPermission["cartPermission"] && (
                    <Box
                      className={style.navIcon}
                      onClick={() => {
                        router.push("/pending-cart");
                      }}
                    >
                      <IconButton
                        aria-label={notificationsLabel(cartBadgeCount)}
                      >
                        <CustomBadgeContent badgeContent={cartBadgeCount}>
                          <Image
                            src={CartIcon}
                            alt="cart"
                            width={20}
                            height={22}
                          />
                        </CustomBadgeContent>
                      </IconButton>
                    </Box>
                  )}

                {isAgent ||
                (props.session?.user as any)?.authData?.userType !==
                  USER_TYPE.ASSOCIATE ? (
                  <Box
                    className={style.navIcon}
                    onClick={() => {
                      if (isAgent) {
                        router.push(
                          `/cart?patientId=${patientIdForAgentView}&cartId=${cartIdForAgent}`
                        );
                      } else {
                        router.push("/cart");
                      }
                    }}
                  >
                    <IconButton aria-label={notificationsLabel(cartBadgeCount)}>
                      <CustomBadgeContent badgeContent={cartBadgeCount}>
                        <Image
                          src={CartIcon}
                          alt="cart"
                          width={20}
                          height={22}
                        />
                      </CustomBadgeContent>
                    </IconButton>
                  </Box>
                ) : null}

                {(props.session?.user as any)?.authData?.userType ===
                  USER_TYPE.ASSOCIATE &&
                  !isAgent &&
                  getSettingsByPermission(SettingsData).length > 0 && (
                    <>
                      <Button
                        className={style.settingsBtn}
                        onClick={toggleSettingsDrawer("right", true)}
                        disabled={logoutTrigger}
                      >
                        <Image
                          src={settingsIcon}
                          alt="settings"
                          width={20}
                          height={20}
                        />
                      </Button>
                      <SettingsDrawer
                        settings={getSettingsByPermission(SettingsData)}
                        anchor="right"
                        settingsState={settingsState}
                        toggleSettingsDrawer={toggleSettingsDrawer}
                      />
                    </>
                  )}
                {(props.session?.user as any)?.authData?.userType !==
                  USER_TYPE.ASSOCIATE && (
                  <CustomButton
                    className={`${style.navLink} ${style.languageButton}`}
                    onClick={() =>
                      handleLanguageChange(
                        currentLanguage === "en" ? "de" : "en"
                      )
                    }
                  >
                    {currentLanguage === "en" ? "Español" : "English"}
                  </CustomButton>
                )}
              </Box>
            </Toolbar>
          </div>
        </AppBar>
      </Box>
      {shouldEndGuidedSalesMeeting && (
        <ConfirmationModal
          content={GUIDED_SALES_MESSAGES.AGENT_VIEW_OFF}
          open={shouldEndGuidedSalesMeeting}
          handleClose={() => {
            setShouldEndGuidedSalesMeeting(false);
          }}
          performAction={() => handleAgentUser(false)}
          Id={0}
          btnOneText="No"
          btnTwoText="Yes"
        />
      )}
    </>
  );
}
