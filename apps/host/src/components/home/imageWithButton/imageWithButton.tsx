import { Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import style from "./imageWithButton.module.scss";
import { PropsDTO } from "@/types/ImageWithButton.type";
import { useRouter } from "next/router";

const ImageWithButton = (props: PropsDTO) => {
  const router = useRouter();

  return (
    <div className={style.imageContainer}>
      <div className={style.image}>
        <Image
          className={props.borderRadius ? style.borderRadius : ""}
          src={props.image}
          alt={props.imageAlt ? props.imageAlt : props.btnName}
          layout="responsive"
          width={479}
          height={345}
        />
      </div>

      {props.btnName && <Button
        className={style.categoryBtn}
        tabIndex={0}
        onClick={() => router.push(props.btnLink ? props.btnLink : "")}
      >
        <span>{props.btnName}</span>
      </Button>}

      {props.disclaimer && <Button
        className={style.disclaimerBtn}
        onClick={() => router.push(props.btnLink ? props.btnLink : "")}
      >
        <span>{props.disclaimer}</span>
      </Button>}

    </div>
  );
};

export default ImageWithButton;
