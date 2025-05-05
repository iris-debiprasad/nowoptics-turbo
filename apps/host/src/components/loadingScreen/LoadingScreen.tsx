import * as React from "react";
import { TableCell, TableRow } from "@mui/material";
import { LoadingScreenPropsDTO } from "@/types/loadingScreen.types";

import style from "./LoadingScreen.module.scss";

const LoadingScreen = (props: LoadingScreenPropsDTO) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell colSpan={6} className={style.loadingScreenText}>{props.screenType}</TableCell>
    </TableRow>
  );
};

export default LoadingScreen;