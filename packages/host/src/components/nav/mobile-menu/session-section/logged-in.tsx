import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MOBILE_MY_ACCOUNT_ITEMS } from "@/constants/mobile-menu.constants";
import type { Props as MyAccountProps } from ".";
import sharedStyles from "../index.module.scss";
import styles from "./index.module.scss";
import { useHasInHousePxsContext } from "@/contexts/ HasInHousePxs/ HasInHousePxsContext";
import { NavItem } from "@/types/Header.types";
import { signOut } from "next-auth/react";
import { clearAllCookie } from "@/utils/cookie.utils";
import { SNACKBAR_COLOR_TYPE } from "@/constants/common.constants";
import { AlertColor } from "@mui/material";
import { clearLocalStorage } from "@/utils/common.utils";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { useRouter } from "next/router";
import { getLatLong } from "@/utils/getLocation.utils";

const DOCTOR_CONSULTATION_URL = "/my-account/ask-a-doctor";

interface Props extends Omit<MyAccountProps, "session"> { }

export function LoggedIn({
  clearStore,
  getStoreGridData,
  onClose,
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    userHasInHousePxs: { primary: userHasInHousePxs },
  } = useHasInHousePxsContext();
  const { showSnackBar } = useSnackBar();

  const getPatientNavData = () => {
    /*
     * If user does not have in house Prescriptions it will filter My Account
     * submenu the item Ask an Eye Doctor
     */
    if (userHasInHousePxs) return MOBILE_MY_ACCOUNT_ITEMS;

    const navigationWithoutDrConsultation: NavItem[] =
      MOBILE_MY_ACCOUNT_ITEMS.filter(
        (item) => item.url !== DOCTOR_CONSULTATION_URL,
      );

    return navigationWithoutDrConsultation;
  };

  const onLogout = () => {
    signOut({ redirect: false })
      .then(() => {
        localStorage.setItem("isLogout", "true");
        localStorage.removeItem("isLogout");
        clearAllCookie();
        showSnackBar(
          "Signed out successfully",
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor,
        );
        clearLocalStorage();
        sessionStorage.clear();
        router.replace("/");
        clearStore();
        onClose();
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err?.response?.data?.Error?.Message
            : "Something went wrong",
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
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

    clearStore();
  };

  return (
    <div className={styles.logged_in}>
      <nav className={styles.logged_in__menu}>
        {getPatientNavData().map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className={`${sharedStyles.link} ${sharedStyles.uppercase}`}
          >
            {t(`NEW_MOBILE_NAV.MY_ACCOUNT.LOGGED_IN.ITEMS.${item.name}`)}
          </Link>
        ))}
      </nav>

      <button
        className={`${sharedStyles.button} ${styles.logged_in__log_out}`}
        type="button"
        onClick={onLogout}
      >
        {t("NEW_MOBILE_NAV.MY_ACCOUNT.LOGGED_IN.ITEMS.LOG_OUT")}
      </button>
    </div>
  );
}
