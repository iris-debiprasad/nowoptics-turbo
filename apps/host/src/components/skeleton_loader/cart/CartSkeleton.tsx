import React from "react";
import { Skeleton } from "@mui/material";

import CartProductSectionSkeleton from "./cartProductSection/CartProductSection";
import CartShippingSkeleton from "./cartShipping/CartShipping";
import CartSummarySkeleton from "./cartSummary/CartSummary";
import ImageSliderSkeleton from "./imageSlider/ImageSlider";
import style from "./CartSkeleton.module.scss";

const CartSkeleton = () => {
  return (
    <div className={style.cartSkeleton}>
      <div className={style.container}>
        <div className={style.title}>
          <Skeleton height={40} width={100} variant="rectangular" />
          <Skeleton height={25} width={150} variant="rectangular" />
        </div>

        <div className={style.user}>
          <Skeleton height={30} width={220} variant="rectangular" />
        </div>

        <div className={style.details}>
          <div className={style.detailsLeft}>
            <CartProductSectionSkeleton />
          </div>

          <div className={style.detailsRight}>
            <div className={style.rightContainer}>
              <div className={style.rightContainerTop}>
                <CartShippingSkeleton />
              </div>
              <div>
                <CartSummarySkeleton />
              </div>
            </div>
          </div>
        </div>

        <div className={style.actionButtons}>
          <Skeleton height={36} width={200} variant={"rounded"} />
          <Skeleton height={36} width={240} variant={"rounded"} />
          <Skeleton height={36} width={160} variant={"rounded"} />
        </div>

        <div className={style.accordionTitle}>
          <Skeleton height={30} width={300} variant="rectangular" />
        </div>

        <div className={style.accordion}>
          <ImageSliderSkeleton />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
