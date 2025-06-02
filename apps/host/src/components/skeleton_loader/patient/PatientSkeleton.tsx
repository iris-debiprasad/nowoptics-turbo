import React from "react";
import style from "./PatientSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const PatientSkeleton = ({ showTopBar }: { showTopBar: boolean }) => {
  return (
    <div className={style.patientSkeleton}>
      <div className={style.container}>
        {showTopBar && (
          <>
            <Skeleton height={30} width={250} variant="rectangular" />
            <div className={style.patientTabs}>
              {new Array(13).fill("").map((_v, i) => (
                <Skeleton key={i} height={30} width={100} variant="rectangular" />
              ))}
            </div>
          </>
        )}
        <div className={style.patientInfoContainer}>
          <div className={style.profilePic}>
            <Skeleton variant="circular" width={200} height={200} />
          </div>
          <div className={style.patientLeft}>
            <Skeleton height={450} width={"100%"} variant="rectangular" />
            <Skeleton height={100} width={"100%"} variant="rectangular" />
            <Skeleton height={150} width={"100%"} variant="rectangular" />
          </div>
          <div className={style.patientRight}>
            <div className={style.info}>
              <div className={style.infoLeft}>
                <Skeleton variant="rectangular" width={120} height={50} />
                <Skeleton variant="rectangular" width={120} height={50} />
                <Skeleton variant="rectangular" width={120} height={50} />
              </div>
              <div className={style.infoRight}>
                <Skeleton variant="circular" width={150} height={150} />
                <Skeleton variant="circular" width={150} height={150} />
                <Skeleton variant="circular" width={150} height={150} />
                <Skeleton variant="circular" width={150} height={150} />
              </div>
            </div>

            <div className={style.patientMembership}>
              <div className={style.patientMembershipLeft}>
                <Skeleton variant="rectangular" width={450} height={650} />
              </div>
              <div className={style.patientMembershipRight}>
                <Skeleton variant="rectangular" width={450} height={450} />
                <Skeleton variant="rectangular" width={450} height={250} />
                <Skeleton variant="rectangular" width={450} height={150} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSkeleton;
