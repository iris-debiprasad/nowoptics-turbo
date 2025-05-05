import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import { LoggedOut } from "./logged-out";
import type { Props as MobileMenuProps } from "..";
import { USER_TYPE } from "@/constants/common.constants";
import { LoggedIn } from "./logged-in";

export interface Props
  extends Pick<
    MobileMenuProps,
    "session" | "onClose" | "getStoreGridData" | "clearStore"
  > { }

export function SessionSection({
  session,
  ...rest
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();

  const isLoggedIn: boolean = session !== null;
  const user: any = isLoggedIn && session?.user.authData;
  const isPatient: boolean = user?.userType === USER_TYPE.PATIENT;
  const userFullName = `${user.FirstName} ${user.LastName}`;

  return (
    <section className={styles.account}>
      <p className={styles.account__title}>
        {t("NEW_MOBILE_NAV.MY_ACCOUNT.TITLE")}
        {isLoggedIn ? (
          <span className={styles.account__user}>
            {" "}
            - {t("NEW_MOBILE_NAV.MY_ACCOUNT.WELCOME")}{" "}
            {isLoggedIn ? userFullName : ""}
          </span>
        ) : (
          <></>
        )}
      </p>

      {!isLoggedIn ? <LoggedOut onClose={rest.onClose} /> : <></>}
      {isLoggedIn && isPatient ? <LoggedIn {...rest} /> : <></>}
    </section>
  );
}
