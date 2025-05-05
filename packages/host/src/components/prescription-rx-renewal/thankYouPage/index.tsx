import { Box, Button } from "@mui/material";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import Image from "next/image";
import style from "./thankYouPage.module.scss";
import { useRouter } from "next/router";
const ThankYouPage = () => {
  const router = useRouter();
  return (
    <div className={style.thankYouPageWrapper}>
      <Box className={style.thankYouBanner}>
        <Image
          alt="Prescription renewal"
          className={style.heroBanner}
          src={ImageUrlConstants.THANK_YOU_PAGE.THANK_YOU_BANNER}
          width={1400}
          height={338}
          layout="responsive"
        />
      </Box>
      <div className={style.thankYouMiddleSection}>
        <p className={style.almostDoneText}>You&apos;re almost done!</p>
        <p className={style.chooseOptionText}>
          Choose one of the following options.
        </p>
      </div>
      <div className={style.thankYouCardSection}>
        <div className={style.imageContainer}>
          <Box className={style.imageSection}>
            <Image
              onClick={() => router.push("/catalog/eyeglasses")}
              className={style.bannerImage}
              width={390}
              height={400}
              layout="responsive"
              src={ImageUrlConstants.THANK_YOU_PAGE.GLASSES_CARD}
              alt="Rx"
            />
          </Box>
          <Box className={style.imageSection}>
            <Image
              className={style.bannerImage}
              onClick={() => router.push("/catalog/contacts")}
              width={390}
              height={400}
              layout="responsive"
              src={ImageUrlConstants.THANK_YOU_PAGE.CONTACTS_CARD}
              alt="Laptop"
            />
          </Box>
          <Box className={style.imageSection}>
            <Image
              className={style.bannerImage}
              onClick={() => router.push("/cart")}
              width={390}
              height={400}
              layout="responsive"
              src={ImageUrlConstants.THANK_YOU_PAGE.RENEWAL_CARD}
              alt="Glasses"
            />
          </Box>
        </div>
        <p className={style.bottomText}>
          *Your new prescription will be used for your eyewear purchase.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
