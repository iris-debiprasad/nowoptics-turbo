import React from "react";
import { useTranslation } from "react-i18next";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { Navbar } from "./navbar";
import { useAppDispatch } from "@/store/useStore";
import styles from "./index.module.scss";
import i18n from "@/language/i18n";
import { updateLangCode } from "@/store/reducer/languageCodeReducer";
import { useRouter } from "next/router";
import { unformatPhoneNumber } from "@/utils/common.utils";
import { SO_DEFAULT_STORE_CONTACT_NUMBER } from "@/constants/common.constants";
import { SessionSection } from "./session-section";
import { Session } from "next-auth";

export interface Props {
  clearStore: () => void;
  getStoreGridData: (page: number) => Promise<void>
  onClose: () => void;
  open: boolean;
  session: Session | null;
}

export function MobileMenu({
  open,
  ...rest
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
    rest.onClose();
    // [IR-2064] - Redirect to stanton-access page if user is on stanton-access-spa page and language is english
    if (
      (router.pathname === "/stanton-access-spa" ||
        router.pathname === "/stanton-access-spa/") &&
      newLang === "en"
    ) {
      router.push("/stanton-access/");
    }
  };

  return (
    <Drawer
      {...{ open}}
      onClose={rest.onClose}
      
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: "100%",
          zIndex: 2001, // One above guided sales floating button
        },
      }}
    >
      <header className={styles.header}>
        <IconButton onClick={rest.onClose}>
          <CloseIcon />
        </IconButton>

        <div>
          <IconButton>
            <CloseIcon />
          </IconButton>

          <IconButton>
            <CloseIcon />
          </IconButton>

          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
      </header>

      <section className={styles.body}>
        <Link className={styles.button} href="/book-eye-exam" onClick={rest.onClose}>
          {t("NEW_MOBILE_NAV.BOOK_EYE_EXAM")}
        </Link>

        <div className={styles.menu_container}>
          <Navbar onClose={rest.onClose} />

          <Link
            className={`${styles.link} ${styles.uppercase}`}
            href={`tel:${unformatPhoneNumber(SO_DEFAULT_STORE_CONTACT_NUMBER)}`}
            onClick={rest.onClose}
          >
            {t("NEW_MOBILE_NAV.ITEMS.HELP")}
          </Link>

          <Link
            className={`${styles.link} ${styles.uppercase}`}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onLanguageChange(language === "en" ? "de" : "en");
            }}
          >
            {t("NEW_MOBILE_NAV.ITEMS.LANG")}
          </Link>
        </div>
      </section>

      <SessionSection {...rest} />
    </Drawer>
  );
}
