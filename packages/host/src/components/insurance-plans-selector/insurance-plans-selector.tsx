import Image from "next/image";
import React from "react";

import ArrowDownIcon from "../../../../assets/Images/icons/arrowDownIconFilled.svg";
import styles from "./insurance-plans-selector.module.scss";
import { StoresList } from "./stores-list";
import { StoreInsurancePlans } from "./store-insurance-plans";
import { getClosestStoreFromCurrentPosition } from "./insurance-plans.api";
import { Store } from "./insurance-plans.interface";
import { useTranslation } from "react-i18next";

export interface SelectedStore {
  id: number;
  name: string;
}

export const InsurancePlansSelector = (): JSX.Element => {
  const { t } = useTranslation();
  const [selectedStore, setSelectedStore] =
    React.useState<SelectedStore | null>(null);

  const [isDropdownDisplayed, setIsDropdownDisplayed] =
    React.useState<boolean>(false);

  /**
   * Asks for the user geolocation, if the user accepts, will select the nearest store for the user,
   * otherwise, user will have to select a store
   */
  React.useEffect(() => {
    const isGeolocationSupported: boolean = !("geolocation" in navigator);
    if (isGeolocationSupported) return;

    (() => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const store: Store | null = await getClosestStoreFromCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          if (store)
            setSelectedStore({ id: store.Id, name: store.WebDescription });
        },
        () => { },
        { enableHighAccuracy: true },
      );
    })();
  }, []);

  const onDropdownToggle = (): void => setIsDropdownDisplayed((prev) => !prev);

  const onStoreSelect = (params: SelectedStore): void => {
    setSelectedStore(params);
    setIsDropdownDisplayed(false);
  };

  return (
    <>
      <p className={styles["aid-text"]}>
        {t("INSURANCE_PLANS_COMPONENT.SELECT_A_STORE")}
      </p>

      <div className={styles.dropdown}>
        <button
          className={styles["dropdown-button"]}
          onClick={onDropdownToggle}
          type="button"
        >
          <span className={styles["dropdown-button__text"]}>
            {!selectedStore
              ? t("INSURANCE_PLANS_COMPONENT.SELECT_STORE")
              : selectedStore.name}
          </span>

          <Image
            alt=""
            className={`${styles["dropdown-button__icon"]} ${isDropdownDisplayed ? styles.open : ""
              }`}
            height={19}
            src={ArrowDownIcon}
            width={12}
          />
        </button>

        <StoresList {...{ onStoreSelect }} open={isDropdownDisplayed} />
      </div>

      <StoreInsurancePlans id={selectedStore?.id} />
    </>
  );
};
