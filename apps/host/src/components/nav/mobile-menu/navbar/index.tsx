import Link from "next/link";
import { useTranslation } from "react-i18next";
import { NAV_ITEMS } from "@/constants/header.constants";
import {
  MOBILE_NAV_ITEMS,
  MODIFY_APPOINTMENT_COOKIE,
} from "@/constants/mobile-menu.constants";
import { SubMenu, SubMenuItem } from "./sub-menu";
import type { Props as MobileMenuProps } from "..";
import sharedStyles from "../index.module.scss";
import { unformatPhoneNumber } from "@/utils/common.utils";
import { SO_DEFAULT_STORE_CONTACT_NUMBER } from "@/constants/common.constants";
import { updateLangCode } from "@/store/reducer/languageCodeReducer";
import React from "react";
import { useAppDispatch } from "@/store/useStore";
import i18n from "@/language/i18n";
import { useRouter } from "next/router";
import { Cookies } from "@/utils/cookie.utils";

export interface Props extends Pick<MobileMenuProps, "onClose"> {
  isUserLoggedIn: boolean;
}

export function Navbar({
  onClose,
  isUserLoggedIn,
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [language, setLanguage] = React.useState<string>(() => i18n.language);

  const onLanguageChange = (newLang: string): void => {
    i18n.changeLanguage(newLang);
    dispatch(updateLangCode(newLang));
    localStorage.setItem("language", newLang);
    setLanguage(newLang);
    onClose();
    // [IR-2064] - Redirect to stanton-access page if user is on stanton-access-spa page and language is english
    if (
      (router.pathname === "/stanton-access-spa" ||
        router.pathname === "/stanton-access-spa/") &&
      newLang === "en"
    ) {
      router.push("/stanton-access/");
    }
  };

  const onModifyAppointmentLinkClick = (): void => {
    if (isUserLoggedIn) {
      router.push("/my-account/my-appointments");
    } else {
      Cookies.create(MODIFY_APPOINTMENT_COOKIE, "true");
      router.push("/my-account");
    }

    onClose();
  };

  return (
    <>
      {MOBILE_NAV_ITEMS.map((item) => {
        switch (item.type) {
          case NAV_ITEMS.NAV_TYPES.DROPDOWN:
            const subMenuItems: SubMenuItem[] = item.subMenu.map((el) => ({
              url: el.url,
              name: t(`NEW_MOBILE_NAV.ITEMS.${item.name}.${el.name}`),
              id: el.id,
            }));

            return (
              <SubMenu
                {...{ onClose }}
                label={t(`NEW_MOBILE_NAV.ITEMS.${item.name}.NAME`)}
                items={subMenuItems}
              />
            );

          case NAV_ITEMS.NAV_TYPES.TEXT:
            return (
              <Link
                href={item.url}
                className={`${sharedStyles.link} ${sharedStyles.uppercase}`}
                onClick={onClose}
              >
                {t(`NEW_MOBILE_NAV.ITEMS.${item.name}`)}
              </Link>
            );
          default:
            return <></>;
        }
      })}

      <Link
        className={`${sharedStyles.link} ${sharedStyles.uppercase}`}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onModifyAppointmentLinkClick();
        }}
      >
        {t("NEW_MOBILE_NAV.ITEMS.MODIFY_YOUR_APPOINTMENT")}
      </Link>

      <Link
        className={`${sharedStyles.link} ${sharedStyles.uppercase}`}
        href="/order-status"
        onClick={onClose}
      >
        {t("NEW_MOBILE_NAV.ITEMS.ORDER_STATUS")}
      </Link>

      <Link
        className={`${sharedStyles.link} ${sharedStyles.uppercase}`}
        href={`tel:${unformatPhoneNumber(SO_DEFAULT_STORE_CONTACT_NUMBER)}`}
        onClick={onClose}
      >
        {t("NEW_MOBILE_NAV.ITEMS.HELP")}
      </Link>

      <Link
        className={`${sharedStyles.link} ${sharedStyles.uppercase}`}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onLanguageChange(language === "en" ? "de" : "en");
        }}
      >
        {t("NEW_MOBILE_NAV.ITEMS.LANG")}
      </Link>
    </>
  );
}
