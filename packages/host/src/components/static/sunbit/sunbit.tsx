import React from "react";
import Image from "next/image";
import { ResponsiveBanner } from "@/components/responsive-banner";
import styles from "./sunbit.module.scss";
import { StoresList } from "@/components/insurance-plans-selector/stores-list";
import { SelectedStore } from "@/components/insurance-plans-selector";
import { useTranslation } from "react-i18next";

import ArrowDownIcon from "../../../../../assets/Images/icons/arrowDownIconFilled.svg";

export const Sunbit = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectedStore, setSelectedStore] =
    React.useState<SelectedStore | null>(null);
  const [isDropdownDisplayed, setIsDropdownDisplayed] =
    React.useState<boolean>(false);

  const onDropdownToggle = (): void => setIsDropdownDisplayed((prev) => !prev);

  const onStoreSelect = (params: SelectedStore): void => {
    setSelectedStore(params);
    setIsDropdownDisplayed(false);
  };
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <>
      <ResponsiveBanner
        mobile={{
          alt: "Sunbit: Pay-over-time",
          src:
            BASE_IMAGE_URL +
            "transform/2d8e99a0-c4f1-4127-b7de-1957df12175b/1080x19202_SO_sunbitLP_mobile",
        }}
        tabletAndDesktop={{
          alt: "Sunbit: Pay-over-time",
          src:
            BASE_IMAGE_URL +
            "transform/50b33d36-9e8b-44c0-a7a6-feca1fc47d41/1366x330_SO_sunbitLP_desktop",
        }}
      />

      <article className={styles.container}>
        <h1 className="informational-page-title">
          {t(`SUNBIT.BUY_NOW_PAY_OVER_TIME`)}
        </h1>

        <p>{t(`SUNBIT.WE_ACCEPT_SUNBIT`)}</p>

        <ul>
          <li>{t(`SUNBIT.GET_WHAT_YOU_NEED`)}</li>
          <li>{t(`SUNBIT.THE_PROCESS_IS`)}</li>
          <li>{t(`SUNBIT.HIGH_APPROVAL_RATE`)}</li>
          <li>{t(`SUNBIT.NO_HARD_CREDIT_CHECK`)}</li>
          <li>{t(`SUNBIT.SIMPLE_TRANSPARENT`)}</li>
        </ul>

        <div className={styles.insurance}>
          <h2 className="text-center">
            {t(`SUNBIT.SEE_IF_YOUR_NEAREST_STORE_ACCEPTS`)}
          </h2>

          <div className={styles.dropdown}>
            <button
              className={styles["dropdown-button"]}
              onClick={onDropdownToggle}
              type="button"
            >
              <span className={styles["dropdown-button__text"]}>
                {!selectedStore ? t("SUNBIT.SELECT_STORE") : selectedStore.name}
              </span>

              <Image
                alt=""
                className={`${styles["dropdown-button__icon"]} ${
                  isDropdownDisplayed ? styles.open : ""
                }`}
                height={19}
                src={ArrowDownIcon}
                width={12}
              />
            </button>

            <StoresList {...{ onStoreSelect }} open={isDropdownDisplayed} />
          </div>
        </div>
      </article>
    </>
  );
};
