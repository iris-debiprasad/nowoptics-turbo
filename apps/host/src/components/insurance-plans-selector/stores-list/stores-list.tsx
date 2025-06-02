import React from "react";
import { useTranslation } from "react-i18next";
import { useStoresList } from "./use-stores-list";
import styles from "./stores-list.module.scss";
import { Store } from "../insurance-plans.interface";

interface OnStoreSelectParams {
  id: number;
  name: string;
}

interface Props {
  open: boolean;
  onStoreSelect: (params: OnStoreSelectParams) => void;
}

export const StoresList = ({ open, onStoreSelect }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { data, loadMoreElementRef, onSearchInputChange, updatePage } = useStoresList();
  const [filteredStores, setFilteredStores] = React.useState<Store[] | null>();

  const getTabIndex = () => (open ? 0 : -1);

  React.useEffect(() => {
    if (data.stores) {
      const stores = data.stores.filter(store => store.WebDescription && store.LocationPageName)
      if (!stores || !stores.length) {
        updatePage();
      } else {
        setFilteredStores(stores);
      }
    } else {
      setFilteredStores([]);
    }
  }, [data.stores])
  return (
    <section className={`${styles.plans} ${open ? styles.open : ""}`}>
      <header className={styles["plans__header"]}>
        <input
          className={styles.plans__filter}
          placeholder={t("INSURANCE_PLANS_COMPONENT.SEARCH_PLACEHOLDER")}
          type="text"
          tabIndex={getTabIndex()}
          onChange={onSearchInputChange}
        />
      </header>

      <div className={styles.plans__list}>
        {filteredStores?.map((store) => {
          const storeDetails: string = `${store.AddressLine1}, ${store.City}, ${store.StateCode} ${store.ZipCode}`;
          const storeDescription: string = `${store.WebDescription} ${storeDetails}`;

          return (
            <p
              className={styles["store-item"]}
              key={store.Id}
              tabIndex={getTabIndex()}
              onClick={() =>
                onStoreSelect({ id: store.Id, name: store.WebDescription })
              }
              title={storeDescription}
            >
              <span className={styles["store-item__name"]}>
                {store.WebDescription}
              </span>{" "}
              {storeDetails}
            </p>
          );
        })}

        <span ref={loadMoreElementRef} className={styles["scrollSpan"]} />

        {!data.isFetchingStores && data.pageCount <= 0 && (
          <p className={styles["plans__no-stores"]}>
            {t("INSURANCE_PLANS_COMPONENT.NO_STORES_FOUND")}
          </p>
        )}
      </div>
    </section>
  );
};
