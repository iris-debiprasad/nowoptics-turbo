import { useTranslation } from "react-i18next";

import { FieldValues } from "react-hook-form";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button } from "@mui/material";
import { type Props as FieldsProps, Fields } from "./fields";
import styles from "./index.module.scss";

export interface Props<T extends FieldValues> extends FieldsProps<T> {
  onRemove?: () => void;
}

export function EnrollFormFieldsElements<T extends FieldValues>({
  onRemove,
  ...rest
}: Readonly<Props<T>>): JSX.Element {
  const { t } = useTranslation();

  if (!onRemove) return <Fields {...rest} />;

  return (
    <>
      <Button className={styles.button} type="button" onClick={onRemove}>
        <RemoveCircleOutlineIcon />
        {t("STANTON_ACCESS.FORM.REMOVE_DEPENDENT_BUTTON")}
      </Button>

      <Fields {...rest} />
    </>
  );
}
