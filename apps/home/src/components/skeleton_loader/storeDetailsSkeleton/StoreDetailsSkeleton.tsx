import React from "react";
import styles from "./StoreDetailsSkeleton.module.scss";
import { Skeleton } from "@mui/material";
import styled from "@emotion/styled";

const StoreDetailsSkeleton = () => {
  return (
    <div className={styles.storeDetailsSkeletonWrapper}>
      <div className={styles.breadCrumb}>
        <Skeleton height={15} width={250} variant="rectangular" />
      </div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.title}>
            <Skeleton height={20} width={250} variant="rectangular" />
            <Skeleton height={30} width={220} variant="rectangular" />
          </div>
          <div className={styles.time}>
            <Skeleton height={20} width={200} variant="rectangular" />
          </div>
          <div className={styles.details}>
            <div className={styles.detailsLeft}>
              <div className={styles.address}>
                <Skeleton height={15} width={200} variant="rectangular" />
                <Skeleton height={15} width={100} variant="rectangular" />
              </div>
              <div>
                <Skeleton height={15} width={100} variant="rectangular" />
              </div>
              <div className={styles.address}>
                <Skeleton height={15} width={120} variant="rectangular" />
                <Skeleton height={15} width={120} variant="rectangular" />
              </div>
            </div>
            <div className={styles.detailsRight}>
              <Skeleton height={35} width={150} variant="rectangular" />
              <div className={styles.detailsRightSubMenu}>
                <Skeleton height={20} width={150} variant="rectangular" />
                <Skeleton height={20} width={150} variant="rectangular" />
                <Skeleton height={20} width={150} variant="rectangular" />
              </div>
            </div>
          </div>
          <div className={styles.timeTable}>
            <div className={styles.row}>
              <Skeleton height={20} width={100} variant="rectangular" />
              <Skeleton height={20} width={100} variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={15} width={30} variant="rectangular" />
              <Skeleton height={15} width={200} variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={15} width={30} variant="rectangular" />
              <Skeleton height={15} width={200} variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={15} width={30} variant="rectangular" />
              <Skeleton height={15} width={200} variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={15} width={30} variant="rectangular" />
              <Skeleton height={15} width={200} variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={15} width={30} variant="rectangular" />
              <Skeleton height={15} width={200} variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={15} width={30} variant="rectangular" />
              <Skeleton height={15} width={200} variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={15} width={30} variant="rectangular" />
              <Skeleton height={15} width={200} variant="rectangular" />
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Skeleton variant="rectangular" width={780} height={439} />
        </div>
        <div className={styles.headerRightMobile}>
          <Skeleton variant="rectangular" width="100%" height={230} />
        </div>
      </div>
      <div className={styles.infoSection}>
        <div className={styles.title}>
          <Skeleton variant="rectangular" width={780} height={40} />
        </div>
        <div className={styles.titleMobile}>
          <Skeleton variant="rectangular" width="80%" height={40} />
        </div>
        <div className={styles.text}>
          <span className={styles.line}>
            <Skeleton height={20} width="60%" variant="rectangular" />
            <Skeleton height={20} width="40%" variant="rectangular" />
          </span>
          <span className={styles.line}>
            <Skeleton height={20} width="40%" variant="rectangular" />
            <Skeleton height={20} width="30%" variant="rectangular" />
            <Skeleton height={20} width="30%" variant="rectangular" />
          </span>
          <span className={styles.line}>
            <Skeleton height={20} width="30%" variant="rectangular" />
            <Skeleton height={20} width="30%" variant="rectangular" />
            <Skeleton height={20} width="40%" variant="rectangular" />
          </span>
          <span className={styles.line}>
            <Skeleton height={20} width="10%" variant="rectangular" />
            <Skeleton height={20} width="20%" variant="rectangular" />
            <Skeleton height={20} width="70%" variant="rectangular" />
          </span>
        </div>
      </div>
      <div className={styles.detailsSection}>
        <div className={styles.map}>
          <Skeleton variant="rectangular" width={434} height={600} />
        </div>
        <div className={styles.mapMobile}>
          <Skeleton variant="rectangular" width={375} height={200} />
        </div>
        <div className={styles.detailsRight}>
          <div className={styles.detailsRightInfoCard}>
            <Skeleton height={70} width={70} variant="circular" />
            <div className={styles.infoText}>
              <Skeleton height={25} width={500} variant="rectangular" />
              <Skeleton height={15} width={700} variant="rectangular" />
              <Skeleton height={15} width={300} variant="rectangular" />
            </div>
            <div className={styles.infoTextMobile}>
              <Skeleton height={25} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
            </div>
          </div>
          <div className={styles.detailsRightInfoCard}>
            <Skeleton height={70} width={70} variant="circular" />
            <div className={styles.infoText}>
              <Skeleton height={25} width={500} variant="rectangular" />
              <Skeleton height={15} width={700} variant="rectangular" />
              <Skeleton height={15} width={300} variant="rectangular" />
            </div>
            <div className={styles.infoTextMobile}>
              <Skeleton height={25} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
            </div>
          </div>
          <div className={styles.detailsRightInfoCard}>
            <Skeleton height={70} width={70} variant="circular" />
            <div className={styles.infoText}>
              <Skeleton height={25} width={500} variant="rectangular" />
              <Skeleton height={15} width={700} variant="rectangular" />
              <Skeleton height={15} width={300} variant="rectangular" />
            </div>
            <div className={styles.infoTextMobile}>
              <Skeleton height={25} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
            </div>
          </div>
          <div className={styles.detailsRightInfoCard}>
            <Skeleton height={70} width={70} variant="circular" />
            <div className={styles.infoText}>
              <Skeleton height={25} width={500} variant="rectangular" />
              <Skeleton height={15} width={700} variant="rectangular" />
              <Skeleton height={15} width={275} variant="rectangular" />
            </div>
            <div className={styles.infoTextMobile}>
              <Skeleton height={25} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
              <Skeleton height={15} width="80%" variant="rectangular" />
            </div>
          </div>
          <Skeleton sx={{ alignSelf: "center" }} height={35} width={200} variant="rectangular" />
        </div>
      </div>
      <div className={styles.offerSection}>
        <Skeleton variant="rectangular" width={780} height={40} />
        <div className={styles.row}>
          <Skeleton variant="rectangular" width={360} height={300} />
          <Skeleton variant="rectangular" width={360} height={300} />
          <Skeleton variant="rectangular" width={360} height={300} />
        </div>
        <div className={styles.row}>
          <Skeleton variant="rectangular" width={180} height={35} />
        </div>
      </div>
      <div className={styles.offerSectionMobile}>
        <Skeleton variant="rectangular" width={350} height={40} />
        <Skeleton variant="rectangular" width="80%" height={300} />
        <Skeleton variant="rectangular" width={180} height={35} />
      </div>
      <div className={styles.faqSection}>
        <div className={styles.faqLeft}>
          <Skeleton variant="rectangular" width={565} height={450} />
        </div>
        <div className={styles.faqRight}>
          <div className={styles.title}>
            <Skeleton variant="rectangular" width="80%" height={40} />
          </div>
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton sx={{ alignSelf: "center", marginTop: "20px" }} variant="rectangular" width="30%" height={40} />
        </div>
      </div>
    </div>
  );
};

export default StoreDetailsSkeleton;
