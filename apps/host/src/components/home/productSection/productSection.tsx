import React, { useEffect } from "react";
import { Box, ToggleButtonGroup, ToggleButton, styled, toggleButtonGroupClasses, Grid, Button } from "@mui/material";
import style from "./productSection.module.scss";
import { ProductDTO } from "@/types/order-common.types";
import { getVariantColor } from "@/utils/common.utils";
import Frames from "./frames/frames";
import Contacts from "./contacts/contacts";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`&`]: {
        backgroundColor: '#f4f4f4',
        borderRadius: '2rem'
    },
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5),
        border: 0,
        borderRadius: '2rem',
        textTransform: 'none',
        fontWeight: 'normal',
        padding: "5px 11px",
        [`&.${toggleButtonGroupClasses.selected}`]: {
            backgroundColor: '#ffffff',
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2)"
        },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
    },
}));

const ProductSection = (props: any) => {
    const router = useRouter();
    const { t } = useTranslation();
    const [alignment, setAlignment] = React.useState("Eyeglasses");
    const [products, setProducts] = React.useState([]);
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string
    ) => {
        setAlignment(newAlignment);
    };

    useEffect(() => {
        switch (alignment) {
            case "Eyeglasses":
                setProducts(props.eyeglasses || []);
                break;
            case "Sunglasses":
                setProducts(props.sunglasses || []);
                break;
            case "Contacts":
                setProducts(props.contacts || []);
                break;
            default:
                break;
        }

    }, [alignment])

    return (
        <>
            <Box className={style.toggleButtonWrapper}>
                <div className={style.toogleContainer}>
                    <StyledToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton className={style.toggleBtn} value="Eyeglasses">
                            {t("nav.Eyeglasses")}
                        </ToggleButton>
                        <ToggleButton className={style.toggleBtn} value="Sunglasses">
                            {t("nav.Sunglasses")}
                        </ToggleButton>
                        <ToggleButton className={style.toggleBtn} value="Contacts">
                            {t("nav.Contacts")}
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                    <Link className={style.link} href={alignment == "Contacts" ? "/catalog/contacts/" : alignment == "Eyeglasses" ? "/catalog/eyeglasses/" : "/catalog/sunglasses/"}>
                        {t("HOME_PAGE.VIEW_ALL") + " >"}
                    </Link>
                </div>
                <Grid container className={style.productsContainer}>
                    {products && products.map((product: ProductDTO, index: number) => {
                        const variantColors = getVariantColor(product.variants);
                        return (
                            <Grid className={style.productsCard} key={index} item md={3}>
                                <div key={product.uniqueId}>
                                    {alignment == "Contacts" ?
                                        <Contacts product={product} variantColors={variantColors} /> :
                                        <Frames product={product} variantColors={variantColors} />}
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
                <Button
                    className={style.appointmentBtn}
                    aria-label="BookEyeExam"
                    tabIndex={0}
                    onClick={() => router.push(alignment == "Contacts" ? "/catalog/contacts/" : alignment == "Eyeglasses" ? "/catalog/eyeglasses/" : "/catalog/sunglasses/")}
                    data-testid="BookEyeExam"
                >
                    <span>{t("HEADER.SHOP_NOW")}</span>
                </Button>
            </Box>
        </>
    );
}

export default ProductSection;