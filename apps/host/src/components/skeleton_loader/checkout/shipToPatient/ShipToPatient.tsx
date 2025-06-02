import { Skeleton } from "@mui/material";

import styles from "./ShipToPatient.module.scss";

const ShipToPatientSkeleton = () => {
  return (
    <div className={styles.shipToPatient}>
      <Skeleton height={25} width={"30%"} variant="rectangular" />
      <div className={styles.addressFormFields}>
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
        <Skeleton height={36} width={"100%"} variant="rounded" />
      </div>
      <div className={styles.billingShippingAddress}>
        <Skeleton
          className={styles.circularSkelton}
          key={`avtar`}
          variant="circular"
          width={30}
          height={30}
        />
        <Skeleton height={20} width={"40%"} variant="rectangular" />
      </div>
    </div>
  );
};

export default ShipToPatientSkeleton;
