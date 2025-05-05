import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CartSkeleton from "@/components/skeleton_loader/cart/CartSkeleton";

const CartComponent = dynamic(() => import("order/Cart"), { 
  ssr: false,
  loading: () => <CartSkeleton />,
});

const index = () => {
  return (
    <>
      <Head>
        <title>Add to Cart - Stanton Optical</title>
        <meta
          name="description"
          content="Explore our wide range of eyeglasses, sunglasses and contact lens offering. Add trending and latest frame in cart today. Shop now."
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <div>
        <CartComponent />
      </div>
    </>
  );
};

export default index;
