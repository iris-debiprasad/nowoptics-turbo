import { Skeleton } from "@mui/material";

import styles from "./CartShipping.module.scss";

const CartShippingSkeleton = () => {
  return (
    <div className={styles.skeletonShippingContainer}>
      <Skeleton key={`title`} animation="wave" height={20} width="30%" />
      <div className={styles.shippingDetail}>
        <Skeleton
          className={styles.circularSkelton}
          key={`avtar`}
          variant="circular"
          width={30}
          height={30}
        />
        <Skeleton
          key={`estimated_delivery`}
          animation="wave"
          height={20}
          width="60%"
        />
      </div>
    </div>
  );
};

export default CartShippingSkeleton;
