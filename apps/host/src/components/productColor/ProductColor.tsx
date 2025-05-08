import { Box, Tooltip } from "@mui/material";
import React from "react";
import style from "./ProductColor.module.scss";
import ProductColorProp from "@root/host/src/types/productColor.types";
import { ProductColorCode } from "@root/host/src/constants/product-colors.constants";

function ProductColor(props: ProductColorProp) {
  const productColorCodes = ProductColorCode as any;

  const getProductColorCode = (color: string) => {
    const colorCodes = productColorCodes[color] as string[];
    if (colorCodes && colorCodes.length > 0) {
      if (colorCodes.length > 1) {
        return (
          <Box
            className={`${style.colorDivWrapper} ${
              props.getActiveBorder(props.index) && style.activeColorDiv
            }`}
            onClick={(event) => {
              props.changeVariant();
            }}
            onMouseEnter={props.mouseEnter ? props.mouseEnter : () => {}}
            onMouseLeave={props.mouseLeave ? props.mouseLeave : () => {}}
          >
            <Box className={style.colorDiv}>
              <Box
                className={style.subColorDivLeft}
                sx={{ backgroundColor: colorCodes[0] }}
              />
              <Box
                className={style.subColorDivRight}
                sx={{ backgroundColor: colorCodes[1] }}
              />
            </Box>
          </Box>
        );
      } else {
        return (
          <Box
            className={`${style.colorDivWrapper} ${
              props.getActiveBorder(props.index) && style.activeColorDiv
            }`}
            onMouseEnter={props.mouseEnter ? props.mouseEnter : () => {}}
            onMouseLeave={props.mouseLeave ? props.mouseLeave : () => {}}
          >
            <Box
              sx={{ backgroundColor: colorCodes[0] }}
              className={style.colorDiv}
              onClick={(event) => {
                props.changeVariant();
              }}
            />
          </Box>
        );
      }
    } else {
      return (
        <Box
          className={`${style.colorDivWrapper} ${
            props.getActiveBorder(props.index) && style.activeColorDiv
          }`}
          onMouseEnter={props.mouseEnter ? props.mouseEnter : () => {}}
          onMouseLeave={props.mouseLeave ? props.mouseLeave : () => {}}
        >
          <Box
            sx={{ backgroundColor: props.color }}
            className={style.colorDiv}
            onClick={(event) => {
              props.changeVariant();
            }}
          />
        </Box>
      );
    }
  };

  return (
    <Tooltip
      key={props.color}
      title={props.color.charAt(0).toUpperCase() + props.color.slice(1)}
      arrow
      placement="top"
    >
      {getProductColorCode(props.color)}
    </Tooltip>
  );
}

export default ProductColor;
