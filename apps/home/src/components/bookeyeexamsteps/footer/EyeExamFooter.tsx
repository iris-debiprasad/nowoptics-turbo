import { Box, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import style from "./EyeExamFooter.module.scss";
import i18n from "@root/host/src/language/i18n";

const EyeExamFooter = () => {
  return (
    <Box className={style.eyeExamFooter}>
      <ListItem>
        <ListItemText>
          {i18n.t("BOOK_EYE_EXAM.IF_YOU_NEED")}
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          {i18n.t("BOOK_EYE_EXAM.EYE_EXAMS_PROVIDED")} <br /> {i18n.t("BOOK_EYE_EXAM.EYE_EXAMS")}
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          {i18n.t("BOOK_EYE_EXAM.YOU_CAN_UPDATE")}
        </ListItemText>
      </ListItem>
    </Box>
  );
};

export default EyeExamFooter;
