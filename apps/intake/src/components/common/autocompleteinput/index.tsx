import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { FunctionComponent, memo } from "react";
import styles from "./AutocompleteInput.module.scss";
import MultiSelectIcon from "@root/assets/Images/icons/icon-multiselect.svg";
import Image from "next/image";

export type BaseAutocompleteInputProps = Omit<React.ComponentProps<typeof Autocomplete> & {
  placeholder?: string;
}, "renderInput">

const AutocompleteInput: FunctionComponent<BaseAutocompleteInputProps> = (props) => {
  return (
    <Autocomplete
      {...props}
      disableCloseOnSelect
      popupIcon={
        <Image
          src={MultiSelectIcon}
          alt="multi-select-icon"
          height={24}
          width={24}
        />
      }
      classes={{ root: styles.autocompleteContainer }}
      data-testid="autocomplete"
      ChipProps={{
        classes: {
          root: styles.chipRoot,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          classes={{ root: styles.autocompleteInput }}
          placeholder={props.placeholder}
        />
      )}
    />
  );
};

export default AutocompleteInput;
