import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { generateProductLink, getProductImage, isDefaultImage } from "@root/host/src/utils/common.utils";
import style from "./frames.module.scss";
import Link from "next/link";
import FrameLoaderImage from "@root/assets/Images/icons/frame-loader.svg";
import { VariantDTO, VariantProps } from "@root/host/src/types/order-common.types";
import Image from "next/image";
import IconSVG from "@/components/iconsvg/IconSVG";
import ProductColor from "@/components/productColor/ProductColor";

function Frames(props: VariantProps) {
    const [hoveredColorIndex, setHoveredColorIndex] = useState(-1);
    const { product, variantColors } = props;
    const [variant, setVariant] = useState<VariantDTO>(product.variants?.[0]);
    const [indexOfColor, setIndexOfColor] = useState<number>(0);
    const productImage = getProductImage(variant) || FrameLoaderImage;
    const [imageSrc, setImageSrc] = useState<any>(FrameLoaderImage);

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

    return (
        <Box key={product.id}>
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
                        className={`${style.imageWrapper} ${isDefaultImage(productImage) && style.noImageBg
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
                                    onMouseEnter={() => {
                                        const images = JSON.parse(product.variants[0].images);
                                        if (images && images[1])
                                            setImageSrc(images[1]);
                                    }}
                                    onMouseLeave={() => {
                                        const images = JSON.parse(product.variants[0].images);
                                        if (images && images[0])
                                            setImageSrc(images[0]);
                                    }}
                                />
                            </div>
                        )}
                        <Box>
                            <div className={style.body__colors}>
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
                            </div>
                        </Box>
                        <Box className={style.body__row}>
                            <div>
                                <p className={style.body__name}>
                                    {product.title || product.modelnumber}
                                </p>
                                <p className={style.body__brand}>
                                    {product.brand || ""}
                                </p>
                            </div>
                            <p
                                className={`${style["body__prices-group"]} ${style["body__prices-group--desktop"]}`}
                            >
                                {variant.price &&
                                    variant.price > 0 &&
                                    variant.price != variant.ourPrice && (
                                        <span className={style["body__price-line-through"]}>
                                            ${variant.price}
                                        </span>
                                    )}

                                <span className={style["body__price"]}>
                                    $
                                    {variant.ourPrice && variant.ourPrice > 0
                                        ? variant.ourPrice
                                        : "0.00"}
                                </span>
                            </p>
                        </Box>
                    </Box>
                </Box>
            </Link>
        </Box>
    );
}

export default Frames;
