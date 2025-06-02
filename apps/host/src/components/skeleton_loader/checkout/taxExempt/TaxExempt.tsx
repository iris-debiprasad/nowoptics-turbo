import { Skeleton } from "@mui/material";

import styles from "./TaxExempt.module.scss";

const TaxExemptSkeleton = () => {
  return (
    <div className={styles.payment}>
      <div className={styles.paymentTopContainer}>
        <Skeleton height={20} width={"30%"} animation="wave" />
        <div className={styles.paymentTaxExempt}>
          <Skeleton
            className={styles.circularSkelton}
            height={30}
            width={30}
            variant="circular"
          />
          <Skeleton height={20} width={80} animation="wave" />
        </div>
      </div>
      <hr />
      <div className={styles.paymentBottomContainer}>
        <Skeleton
          className={styles.circularSkelton}
          height={30}
          width={30}
          variant="circular"
        />
        <Skeleton height={20} width={"20%"} animation="wave" />
      </div>
    </div>
  );
};

export default TaxExemptSkeleton;
