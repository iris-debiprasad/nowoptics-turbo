import { AlertColor, Box, Button, styled } from "@mui/material";
import * as React from "react";
import { KeyboardArrowRight } from "@mui/icons-material";
import style from "./Nav.module.scss";
import { navProps } from "@root/host/src/types/Header.types";
import { NAV_ITEMS } from "@root/host/src/constants/header.constants";
import LoginForm from "../authentication/LoginForm/LoginForm";
import { signOut } from "next-auth/react";
import { useSnackBar } from "../../contexts/Snackbar/SnackbarContext";
import {
  AppEvents,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import Link from "next/link";
import { useRouter } from "next/router";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import { GetPublicStoreLocatorGrid } from "@/service/storeLocator.service";
import { findClosestCoordinate } from "@root/host/src/utils/calculateDistance";
import { STORE_ERROR_MESSAGE } from "@root/host/src/constants/store.constants";
import { AxiosError } from "axios";
import { LocationDTO } from "@root/host/src/types/SideBar.types";
import EyeExamFlow from "../eyeExamFlow/EyeExamFlow";
import { clearAllCookie } from "@root/host/src/utils/cookie.utils";
import { useAppDispatch, useAppSelector } from "@/store/useStore";
import { clearLocalStorage } from "@root/host/src/utils/common.utils";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { getLatLong } from "@root/host/src/utils/getLocation.utils";
import { setCount } from "@/store/reducer/favorite-products";

const CustomButton = styled(Button)({
  "&:hover": {
    backgroundColor: "transparent",
  },
});

const GetNavBar = ({
  navItems,
  clearStore,
  session,
  setCartBadgeCount,
}: navProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);
  const router = useRouter();
  const [openLoader, setOpenLoader] = React.useState(false);
  const [updatedUser, setUpdatedUser] = React.useState<string>("");

  const [showEyeExamFlow, setShowEyeExamFlow] = React.useState<boolean>(false);

  const { showSnackBar } = useSnackBar();

  const [userLocation, setUserLocation] = React.useState<LocationDTO | null>(
    null
  );

  const loginDropdownRef = React.useRef<HTMLUListElement>(null);
  React.useEffect(() => {
    if (navigator.geolocation) {
      getLatLong((lat, long) => {
        setUserLocation({
          latitude: lat,
          longitude: long,
        });
      });
    }
  }, []);
  React.useEffect(() => {
    const updatedUserData = JSON.parse(
      localStorage?.getItem("updatedUser") as string
    );
    if (
      updatedUserData &&
      (session?.user as any)?.authData?.PatientId === updatedUserData?.PatientId
    ) {
      setUpdatedUser(
        updatedUserData?.FirstName + " " + updatedUserData?.LastName
      );
    }
  }, [
    typeof window !== "undefined" && localStorage?.getItem("updatedUser"),
    session,
  ]);

  const getStoreGridData = async (page: number) => {
    GetPublicStoreLocatorGrid(
      page.toString(),
      "",
      "",
      userLocation?.latitude.toString(),
      userLocation?.longitude.toString()
    )
      .then(({ data }) => {
        const closestCoordinate = findClosestCoordinate(
          userLocation,
          data.Result.Results
        );

        localStorage.setItem(
          "selectedStore",
          JSON.stringify(closestCoordinate)
        );
        clearStore();
      })
      .catch((err) => {
        const errorMessage = (err as AxiosError).message
          ? (err as AxiosError).message
          : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };
  const handleLogoutClick = () => {
    setOpenLoader(true);
    signOut({ redirect: false })
      .then(() => {
        localStorage.setItem("isLogout", "true");
        localStorage.removeItem("isLogout");
        setOpenLoader(false);
        //Removing token from cookie
        clearAllCookie();
        showSnackBar(
          "Signed out successfully",
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
        );
        clearLocalStorage();
        sessionStorage.clear();
        if (!document.hasFocus()) {
          window.location.reload();
        } else {
          router.replace("/");
        }
        clearStore();
        setCartBadgeCount && setCartBadgeCount(0);
        dispatch(setCount(0));
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
    if (navigator.geolocation) {
      getLatLong((lat, long) => {
        if (lat && long) {
          getStoreGridData(1);
        } else {
          clearStore();
        }
      });
    } else {
      clearStore();
    }
  };

  React.useEffect(() => {
    window.addEventListener(AppEvents.SHOW_LOGIN_MENU, () => {
      const loginButton = document.getElementById("My Account7");
      if (loginButton) {
        loginButton.click();
      }
    });

    window.addEventListener(AppEvents.LOGOUT, handleLogoutClick);

    return () => {
      window.removeEventListener(AppEvents.SHOW_LOGIN_MENU, () => {});
      window.removeEventListener(AppEvents.LOGOUT, handleLogoutClick);
    };
  }, [navItems, clearStore, session]);

  // This implementation is for the My Account dropdown, we need the dropdown to close
  // after clicking a link like "forgot my password" and "create my account"
  // so the popup doesn't stay open while we are changing routes
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).tagName === "A") {
        (event.target as HTMLElement).blur();
      }
    };

    const div = loginDropdownRef.current;
    if (div) {
      div.addEventListener("click", handleClick);
      return () => div.removeEventListener("click", handleClick);
    }
  }, []);

  const currentParams =
    Object.keys(router?.query).length > 0 && router?.query?.ParentOrderId
      ? Object.keys(router?.query)
          .map((key) => key + "=" + router?.query[key])
          .join("&")
      : "";

  return (
    <>
      <BackdropLoader openLoader={openLoader} />
      {showEyeExamFlow && (
        <EyeExamFlow
          isVisible={showEyeExamFlow}
          toggle={() => setShowEyeExamFlow(false)}
        />
      )}
      {navItems?.map((navItem) => {
        const filterLinkMenu = navItem.subMenu.filter(
          (subMenuItem) =>
            ((subMenuItem.cdcViewShow && isCDC) || !subMenuItem.cdcViewShow) &&
            ((subMenuItem.cdcViewHide && !isCDC) || !subMenuItem.cdcViewHide) &&
            ((navItem.agentViewHide && !isAgent) || !navItem.agentViewHide)
        );
        if (
          navItem?.type === NAV_ITEMS.NAV_TYPES.TEXT &&
          ((navItem.cdcViewShow && isCDC) || !navItem.cdcViewShow) &&
          ((navItem.cdcViewHide && !isCDC) || !navItem.cdcViewHide) &&
          ((navItem.agentViewHide && !isAgent) || !navItem.agentViewHide)
        ) {
          return (
            <Link
              key={navItem.name + navItem.id}
              href={navItem.url}
              className={style.navItemBtn}
            >
              <CustomButton key={navItem.id} className={style.navLink}>
                {t(`nav.${navItem.name}`)}
              </CustomButton>
            </Link>
          );
        } else if (
          navItem?.type === NAV_ITEMS.NAV_TYPES.DROPDOWN &&
          ((navItem.cdcViewShow && isCDC) || !navItem.cdcViewShow) &&
          ((navItem.cdcViewHide && !isCDC) || !navItem.cdcViewHide) &&
          ((navItem.agentViewHide && !isAgent) || !navItem.agentViewHide)
        ) {
          return (
            <ul key={navItem.name + navItem.id} className={style.navList}>
              <li className={style.navItemBtn}>
                <CustomButton
                  className={style.navLink}
                  classes={{ endIcon: style.navEndIcon }}
                  data-testid={`nav-button-dropdown-${navItem.name}`}
                  id={navItem.name + navItem.id}
                  endIcon={<KeyboardArrowRight />}
                  disabled
                >
                  {t(`nav.${navItem.name}`)} {/* Desktop Nav options */}
                </CustomButton>

                <ul
                  className={`${style.dropdown} ${
                    filterLinkMenu.length > 7 && style.splitDropdown
                  }`}
                >
                  <div>
                    {filterLinkMenu.slice(0, 7).map(
                      (subMenuItem, index) =>
                        subMenuItem.type === NAV_ITEMS.NAV_TYPES.TEXT && (
                          <li
                            key={navItem.name + subMenuItem.id + index}
                            className={style.menuBtn}
                          >
                            {subMenuItem.name === "Eye Exam" ? (
                              <Link
                                href="#"
                                className={`${
                                  index === filterLinkMenu.length - 1
                                    ? style.menuLinkRemoveBorder
                                    : style.menuLinkBorder
                                }`}
                                id={subMenuItem.name + subMenuItem.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShowEyeExamFlow(true);
                                }}
                              >
                                {t(`nav.${subMenuItem.name}`)}
                              </Link>
                            ) : (
                              <Link
                                href={
                                  subMenuItem?.query && currentParams
                                    ? `${subMenuItem.url}?${currentParams}`
                                    : subMenuItem?.url
                                }
                                className={`${
                                  index === filterLinkMenu.length - 1
                                    ? style.menuLinkRemoveBorder
                                    : style.menuLinkBorder
                                }`}
                              >
                                {t(`nav.${subMenuItem.name}`)}
                                {/* Desktop Nav options dropdown */}
                              </Link>
                            )}
                          </li>
                        )
                    )}
                  </div>
                  {filterLinkMenu.length > 7 && (
                    <div>
                      {filterLinkMenu.slice(7).map(
                        (subMenuItem, index) =>
                          subMenuItem.type === NAV_ITEMS.NAV_TYPES.TEXT && (
                            <li
                              key={navItem.name + subMenuItem.id + index}
                              className={style.menuBtn}
                            >
                              {subMenuItem.name === "Eye Exam" ? (
                                <Link
                                  href="#"
                                  className={`${
                                    index === filterLinkMenu.length - 1
                                      ? style.menuLinkRemoveBorder
                                      : style.menuLinkBorder
                                  }`}
                                  id={subMenuItem.name + subMenuItem.id}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowEyeExamFlow(true);
                                  }}
                                >
                                  {t(`nav.${subMenuItem.name}`)}
                                </Link>
                              ) : (
                                <Link
                                  href={
                                    subMenuItem?.query && currentParams
                                      ? `${subMenuItem.url}?${currentParams}`
                                      : subMenuItem?.url
                                  }
                                  className={`${
                                    index === filterLinkMenu.length - 1
                                      ? style.menuLinkRemoveBorder
                                      : style.menuLinkBorder
                                  }`}
                                >
                                  {t(`nav.${subMenuItem.name}`)}
                                  {/* Desktop Nav options dropdown */}
                                </Link>
                              )}
                            </li>
                          )
                      )}
                    </div>
                  )}
                </ul>
              </li>
            </ul>
          );
        } else if (
          navItem.type === NAV_ITEMS.NAV_TYPES.COMPONENT_DROPDOWN &&
          ((navItem.cdcViewShow && isCDC) || !navItem.cdcViewShow) &&
          ((navItem.cdcViewHide && !isCDC) || !navItem.cdcViewHide) &&
          ((navItem.agentViewHide && !isAgent) || !navItem.agentViewHide)
        ) {
          return (
            <ul
              key={navItem.name + navItem.id}
              className={`${style.navList} ${style["navList--login"]}`}
            >
              <li className={style.navItemBtn}>
                <CustomButton
                  className={style.navLink}
                  classes={{ endIcon: style.navEndIcon }}
                  id={navItem.name + navItem.id}
                  endIcon={<KeyboardArrowRight />}
                  disabled
                >
                  {t(`nav.${navItem.name}`)}
                </CustomButton>

                <ul
                  className={`${style["dropdown--login"]} ${
                    !session ? style["no-session"] : ""
                  }`}
                  ref={loginDropdownRef}
                >
                  <li>
                    {!session ? (
                      <LoginForm
                        formHead={t("nav.Sign Into Your Account")}
                        formMessage=""
                        cstmStyles="dropDown"
                      />
                    ) : (
                      <Box className={style.myAccountWrapper}>
                        <Box className={style.menuHeading}>
                          {t("nav.Welcome")} -{" "}
                          {(session?.user as any)?.authData?.userType ===
                          USER_TYPE.ASSOCIATE
                            ? session?.user.name
                            : updatedUser
                            ? updatedUser
                            : (session?.user as any)?.authData?.FirstName +
                              " " +
                              (session?.user as any)?.authData?.LastName}
                        </Box>
                        {navItem?.subMenu
                          .filter(
                            (subMenuItem) =>
                              ((subMenuItem.cdcViewShow && isCDC) ||
                                !subMenuItem.cdcViewShow) &&
                              ((subMenuItem.cdcViewHide && !isCDC) ||
                                !subMenuItem.cdcViewHide)
                          )
                          .map((subMenuItem) => {
                            return (
                              <Link
                                href={subMenuItem.url}
                                key={subMenuItem.name + subMenuItem.name}
                                className={style.myAccLink}
                              >
                                <Button className={style.logoutButton}>
                                  {t(`nav.${subMenuItem.name}`)}
                                </Button>
                              </Link>
                            );
                          })}
                        <Button
                          onClick={handleLogoutClick}
                          className={`${style.logoutButton} ${style.myAccLink}`}
                        >
                          {t("nav.Sign out")}
                        </Button>
                      </Box>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
          );
        }
      })}
    </>
  );
};
export default GetNavBar;
