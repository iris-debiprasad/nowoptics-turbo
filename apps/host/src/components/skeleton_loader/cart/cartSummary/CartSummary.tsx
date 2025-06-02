import { Skeleton } from "@mui/material";

import styles from "./CartSummary.module.scss";

const CartSummarySkeleton = () => {
  return (
    <div className={styles.skeletonSummaryContainer}>
      <Skeleton key={`title`} animation="wave" height={20} width="60%" />
      <div className={styles.orderPriceContainer}>
        <Skeleton
          key={`subtotal_label`}
          animation="wave"
          height={20}
          width="30%"
        />
        <Skeleton
          key={`subtotal_price`}
          animation="wave"
          height={20}
          width="20%"
        />
      </div>
      <hr />
      <div className={styles.orderPriceContainer}>
        <Skeleton
          key={`additional_charge_label_1`}
          animation="wave"
          height={20}
          width="20%"
        />
        <Skeleton
          key={`additional_charge_value_1`}
          animation="wave"
          height={20}
          width="15%"
        />
      </div>
      <div className={styles.orderPriceContainer}>
        <Skeleton
          key={`additional_charge_label_2`}
          animation="wave"
          height={20}
          width="14%"
        />
        <Skeleton
          key={`additional_charge_value_2`}
          animation="wave"
          height={20}
          width="15%"
        />
      </div>
      <div className={styles.orderPriceContainer}>
        <Skeleton
          key={`total_label`}
          animation="wave"
          height={20}
          width="25%"
        />
        <Skeleton
          key={`total_price`}
          animation="wave"
          height={20}
          width="20%"
        />
      </div>
      <div className={styles.actionButton}>
        <Skeleton
          variant={"rounded"}
          key={`secure_checkout_button`}
          animation="wave"
          height={36}
          width="80%"
        />
      </div>
    </div>
  );
};

export default CartSummarySkeleton;
