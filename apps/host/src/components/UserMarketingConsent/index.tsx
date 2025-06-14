import Image from "next/image";
import { Controller, FieldValues, Path } from "react-hook-form";
import { Box, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import React from "react";
import i18n from "@root/host/src/language/i18n";
import style from "./index.module.scss";
import CloseIcon from "@root/assets/Images/icons/crossIcon.svg";
import { SO_DEFAULT_STORE_CONTACT_NUMBER } from "@root/host/src/constants/common.constants";
import { UserMarketingConsentProps } from "@root/host/src/types/UserMarketingConsent.types";
import ConsentMessage from "./consentMessage";
import Link from "next/link";

export default function UserMarketingConsent<T extends FieldValues>({
  control,
  fieldName,
  disabled
}: Readonly<UserMarketingConsentProps<T>>): React.JSX.Element {
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);

  const togglePopupDisplay = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    setIsPopupOpen((prev) => !prev);
  };

  const closePopup = (): void => {
    setIsPopupOpen(false);
  };

  React.useEffect(() => {
    if (isPopupOpen) {
      window.addEventListener("click", closePopup);
    } else {
      window.removeEventListener("click", closePopup);
    }
  }, [isPopupOpen]);

  return (
    <Box className={`${style.consent} ${style.consent__wrapper}`}>
      <div className={style.privacyContent}>
        <p className={style.consent__text}>
          {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P5")}
          {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P6")}
          {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P7")}
          <Link
            className={style.privacyModalLink}
            target="_blank"
            href={"/privacy-policy/"}
          >
            {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P8")}
          </Link>
        </p>
      </div>
      <Controller
        control={control}
        name={fieldName as Path<T>}
        render={({ field }) => (
          <FormControlLabel
            className={style.consent__toggler}
            control={<Checkbox disabled={disabled} checked={field.value} />}
            label={
              <p className={style.consent__text}>
                <ConsentMessage />
              </p>
            }
            {...field}
          />
        )}
      />

      {isPopupOpen ? (
        <Box className={style.popup}>
          <Box className={style.popup__header}>
            <p className={style.popup__title}>
              {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT_POPUP_TITLE")}
            </p>

            <IconButton onClick={closePopup}>
              <Image src={CloseIcon} alt="Close" width={16} height={16} />
            </IconButton>
          </Box>
          <ul className={style.popup__list}>
            <li>
              {i18n.t(
                "BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT_PRIVACY_POLICY.P1",
              )}
            </li>
            <li>
              {i18n.t(
                "BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT_PRIVACY_POLICY.P2",
              )}
            </li>
          </ul>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
