import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Trans } from "react-i18next";
import IconSVG from "../iconsvg/IconSVG";
import style from "./ImageWithButton.module.scss";
import { PropsDTO } from "@/types/ImageWithButton.type";
import Link from "next/link";

const ImageWithButton = (props: PropsDTO) => {
  return (
    <div className={style.shopImageBG}>
      <div className={style.imageShop}>
        <Image
          src={props.image}
          alt={props.imageAlt ? props.imageAlt : props.btnName}
          layout="responsive"
          width={479}
          height={345}
        />
      </div>
      <Link href={props.btnLink}>
        <Button
          className={"catalogBtn"}
          endIcon={
            <IconSVG
              width="9"
              height="15"
              viewBox="0 0 9 15"
              fill="none"
              fillP="#010101"
              name="arrow_solid_right"
            />
          }
        >
          <span>{props.btnName}</span>
        </Button>
      </Link>
    </div>
  );
};

export default ImageWithButton;
