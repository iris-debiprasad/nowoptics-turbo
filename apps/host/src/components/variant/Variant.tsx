import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  generateProductLink,
  getProductImage,
  isDefaultImage,
} from "@root/host/src/utils/common.utils";
import style from "./Variant.module.scss";
import IconSVG from "../iconsvg/IconSVG";
import Link from "next/link";
import ProductColor from "../productColor/ProductColor";
import FrameLoaderImage from "@root/assets/Images/icons/frame-loader.svg";
import { VariantDTO, VariantProps } from "@root/host/src/types/order-common.types";
import Image from "next/image";
import { IUnbxd } from "@root/host/src/types/unbxd.type";
import { getUnbxd } from "@root/host/src/utils/unbxdController.utils";
import { getDetails } from "@root/host/src/utils/getSessionData";
import { USER_TYPE } from "@root/host/src/constants/common.constants";

function Variant(props: VariantProps) {
  const [userRole, setUserRole] = useState();
  const [hoveredColorIndex, setHoveredColorIndex] = useState(-1);
  const { product, variantColors } = props;
  const [variant, setVariant] = useState<VariantDTO>(product.variants?.[0]);
  const [indexOfColor, setIndexOfColor] = useState<number>(0);
  const productImage = getProductImage(variant) || FrameLoaderImage;
  const [imageSrc, setImageSrc] = useState<any>(FrameLoaderImage);

  useEffect(() => {
    getDetails().then((user) => {
      setUserRole(user?.authData?.userType ? user?.authData?.userType : null);
    });
  }, []);

  const changeVariant = (colorIndex: number) => {
    setVariant(product.variants[colorIndex]);
    setIndexOfColor(colorIndex);
  };

  const showActiveBorder = (index: number) => {
    if (indexOfColor === index) {
      return true;
    }
    return false;
  };

  const loadProductImageData = () => {
    const image = new window.Image();
    image.onload = () => {
      setImageSrc(image.src);
    };
    image.src =
      hoveredColorIndex && hoveredColorIndex > -1
        ? getProductImage(product.variants[hoveredColorIndex])
        : productImage;
  };

  useEffect(() => {
    if (product) {
      loadProductImageData();
    }
  }, [product, hoveredColorIndex]);

  const productClickAnalytics = () => {
    const payload = {
      pid: `${product.uniqueId}`,
      requestId: `${localStorage.getItem("unbxd-request-id")}`,
    };
    const Unbxd: IUnbxd | null = getUnbxd();
    if (userRole !== USER_TYPE.ASSOCIATE) {
      if (Unbxd && typeof Unbxd.track === "function") {
        Unbxd.track("click", payload);
      } else {
        console.error("unbxdAnalytics.js is not loaded!");
      }
    }
  };

  return (
    <Box key={product.id} onClick={productClickAnalytics}>
      <Link
        href={{
          pathname: `/product/${generateProductLink(
            variant.modelnumber,
            variant.vTitle,
            variant.sku,
            variant.productgroup
          )}`,
          query: {
            pid: product.uniqueId,
            sku: variant.sku,
          },
        }}
        as={`/product/${generateProductLink(
          variant.modelnumber,
          variant.vTitle,
          variant.sku,
          variant.productgroup
        )}`}
      >
        <Box className={style.product}>
          <Box
            className={`${style.imageWrapper} ${
              isDefaultImage(productImage) && style.noImageBg
            }`}
          >
            {isDefaultImage(productImage) ? (
              <IconSVG
                width="136"
                height="60"
                viewBox="0 0 136 60"
                fill="none"
                fillP="#F9FAFC"
                name="mountain_medium_icon"
              />
            ) : (
              <div
                id={`product${product.id}`}
                className={style.productImageStyle}
              >
                <Image
                  alt={variant.vTitle}
                  className={style.productImage}
                  width={404}
                  height={200}
                  layout="responsive"
                  src={imageSrc}
                />
              </div>
            )}
          </Box>
          <Box className={style.colorDivWrapper}>
            {variantColors?.map((color, idx) => {
              return (
                <ProductColor
                  key={idx}
                  color={color}
                  index={idx}
                  getActiveBorder={() => showActiveBorder(idx)}
                  changeVariant={() => {
                    changeVariant(variantColors?.indexOf(color));
                  }}
                  mouseEnter={() => {
                    setHoveredColorIndex(idx);
                  }}
                  mouseLeave={() => {
                    setHoveredColorIndex(-1);
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default Variant;
