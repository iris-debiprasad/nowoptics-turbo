import { useTranslation } from "react-i18next";
import sharedStyles from "../index.module.scss";
import Link from "next/link";
import styles from "./index.module.scss";
import { Props as MobileMenuProps } from "..";

interface Props extends Pick<MobileMenuProps, "onClose"> {}

export function LoggedOut({ onClose }: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.logged_out}>
      <p>{t("NEW_MOBILE_NAV.MY_ACCOUNT.LOGGED_OUT.DESCRIPTION")}</p>

      <Link className={sharedStyles.button} href="/my-account?st=sign-in" onClick={onClose}>
        {t("NEW_MOBILE_NAV.MY_ACCOUNT.LOGGED_OUT.CTA")}
      </Link>

      <p className={styles.logged_out__no_account}>
        {t("NEW_MOBILE_NAV.MY_ACCOUNT.LOGGED_OUT.NO_ACCOUNT.P1")}{" "}
        <Link href="/my-account?st=sign-up" onClick={onClose}>
          {t("NEW_MOBILE_NAV.MY_ACCOUNT.LOGGED_OUT.NO_ACCOUNT.P2")}
        </Link>
      </p>
    </div>
  );
}
