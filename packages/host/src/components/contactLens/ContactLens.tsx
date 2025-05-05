import { USER_TYPE } from "@/constants/common.constants";
import {
  formatToTwoDecimalPlaces,
  getContactLensImage,
} from "@/utils/common.utils";
import { getDetails } from "@/utils/getSessionData";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { generateProductLink } from "@root/host/src/utils/common.utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from "../variant/Variant.module.scss";
import ClLoader from "@root/assets/Images/icons/cl-loader.svg";
import i18n from "@/language/i18n";
import { ContactLensProps } from "@/types/order-common.types";
import Image from "next/image";
import { IUnbxd } from "@/types/unbxd.type";
import { getUnbxd } from "@/utils/unbxdController.utils";

function ContactLens(props: ContactLensProps) {
  const [userRole, setUserRole] = useState();
  const { data, showDetails } = props;
  const productImage = getContactLensImage(data) || ClLoader;
  const languageCode =
    typeof window !== "undefined"
      ? (localStorage?.getItem("language") as string)
      : "en";

  useEffect(() => {
    getDetails().then((user) => {
      setUserRole(user?.authData?.userType ? user?.authData?.userType : null);
    });
  }, []);

  useEffect(() => {
    i18n.changeLanguage(languageCode ? languageCode : "en");
  }, [languageCode]);

  const productClickAnalytics = () => {
    const payload = {
      pid: `${data.uniqueId}`,
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

  const getMaxQtyVariant = (data: any) => {
    let maxElement = data.variants[0];
    for (let variant of data.variants) {
      if (variant.sale_quantity > maxElement.sale_quantity) {
        maxElement = variant;
      }
    }
    return maxElement;
  };

  return (
    <Grid
      item
      lg={4}
      md={4}
      sm={6}
      xs={12}
      padding={0}
      gap={2}
      onClick={productClickAnalytics}
    >
      {data && (
        <Link
          href={{
            pathname: `/product/${generateProductLink(
              data?.modelnumber,
              data?.title,
              getMaxQtyVariant(data)?.sku,
              data?.productgroup
            )}`,
            query: {
              pid: data?.modelnumber,
            },
          }}
          as={`/product/${generateProductLink(
            data?.modelnumber,
            data?.title,
            getMaxQtyVariant(data)?.sku,
            data?.productgroup
          )}`}
        >
          <Box className={style.product}>
            <Box className={style.imageWrapper}>
              <div className={style.productImageStyle}>
                <Image
                  alt={data?.title}
                  className={style.productImage}
                  width={404}
                  height={200}
                  layout="responsive"
                  src={productImage}
                />
              </div>
            </Box>
            {!showDetails ? (
              <Box className={style.colorDivWrapper}>
                <Box className={style.productName} marginTop={4}>
                  {data?.title}
                </Box>
              </Box>
            ) : null}
            {!showDetails ? (
              <Box className={style.productPriceWrapper}>
                {(userRole === USER_TYPE.PATIENT || !userRole) && (
                  <>
                    {data?.mPrice !== data?.mOurPrice && (
                      <span className={style.cutPrice}>
                        ${formatToTwoDecimalPlaces(data?.mPrice)}
                      </span>
                    )}
                    <span>
                      $
                      {data?.mOurPrice
                        ? formatToTwoDecimalPlaces(data?.mOurPrice)
                        : "0.00"}
                    </span>
                  </>
                )}

                {userRole === USER_TYPE.ASSOCIATE && (
                  <span className={style.cutPriceAssociate}>
                    ${formatToTwoDecimalPlaces(data?.mPrice)}
                  </span>
                )}
              </Box>
            ) : (
              <div
                style={{ height: "20px" }}
                className={style.productPriceWrapper}
              />
            )}
          </Box>
        </Link>
      )}
    </Grid>
  );
}

export default ContactLens;
