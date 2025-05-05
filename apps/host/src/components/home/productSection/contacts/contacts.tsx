import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { generateProductLink, getProductImage, isDefaultImage } from "@/utils/common.utils";
import style from "./contacts.module.scss";
import Link from "next/link";
import ClLoader from "@root/assets/Images/icons/cl-loader.svg";
import { VariantProps } from "@/types/order-common.types";
import Image from "next/image";
import IconSVG from "@/components/iconsvg/IconSVG";

function Contacts(props: VariantProps) {
    const { product } = props;
    const variant = product.variants?.[0];
    const productImage = getProductImage(product.variants?.[0]) || ClLoader;
    const [imageSrc, setImageSrc] = useState<any>(ClLoader);

    const loadProductImageData = () => {
        const image = new window.Image();
        image.onload = () => {
            setImageSrc(image.src);
        };
        image.src = productImage;
    };

    useEffect(() => {
        if (product) {
            loadProductImageData();
        }
    }, [product]);

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
                                    src={imageSrc}
                                />
                            </div>
                        )}
                        <Box className={style.body__row}>
                            <div>
                                <p className={style.body__name}>
                                    {product.title || product.modelnumber}
                                </p>
                                <p className={style.body__brand}>
                                    {product.brand || ""}
                                </p>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Link>
        </Box>
    );
}

export default Contacts;
