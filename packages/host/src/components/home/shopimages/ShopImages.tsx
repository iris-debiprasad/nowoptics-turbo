import ImageWithButton from "@/components/imagewithbutton/ImageWithButton";
import { Section } from "@/types/home.types";
import style from "./ShopImages.module.scss";

const ShopImages = (props: { pageData: Section[] }) => {
  return (
    <div className={style.shopImageContainer}>
      {props?.pageData?.map((shop: Section, index: number) => (
        <ImageWithButton
          imageAlt={shop.Images[0].AltText}
          image={shop.Images[0].ImageUrl}
          btnName={shop.AnchorText as string}
          btnLink={shop.AnchorUrl as string}
          key={index}
        />
      ))}
    </div>
  );
};

export default ShopImages;
