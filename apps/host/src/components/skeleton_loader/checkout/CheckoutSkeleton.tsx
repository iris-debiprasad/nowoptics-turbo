import React from "react";
import { Skeleton } from "@mui/material";

import styles from "./CheckoutSkeleton.module.scss";
import CartProductSectionSkeleton from "../cart/cartProductSection/CartProductSection";
import CartShippingSkeleton from "../cart/cartShipping/CartShipping";
import CartSummarySkeleton from "../cart/cartSummary/CartSummary";
import TaxExemptSkeleton from "./taxExempt/TaxExempt";
import ShipToPatientSkeleton from "./shipToPatient/ShipToPatient";

const CheckoutSkeleton = () => {
  return (
    <div className={styles.checkoutSkeleton}>
      <div className={styles.container}>
        <div className={styles.user}>
          <Skeleton height={40} width={180} variant="rectangular" />
        </div>
        <div className={styles.title}>
          <Skeleton height={25} width={150} variant="rectangular" />
          <Skeleton height={25} width={150} variant="rectangular" />
        </div>
        <div className={styles.details}>
          <div className={styles.detailsLeft}>
            <ShipToPatientSkeleton />
            <Skeleton height={30} width={150} variant="rectangular" />
            <div className={styles.items}>
              <CartProductSectionSkeleton showSummarySection={false} />
            </div>
            <Skeleton height={40} width={180} variant="rounded" />
          </div>
          <div className={styles.detailsRight}>
            <div className={styles.rightContainer}>
              <div className={styles.rightContainerTop}>
                <CartShippingSkeleton />
              </div>
              <div className={styles.rightContainerBottom}>
                <TaxExemptSkeleton />
              </div>
              <div className={styles.rightContainerBottom}>
                <CartSummarySkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
