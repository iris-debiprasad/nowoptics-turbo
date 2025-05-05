import * as React from "react";
import {
  Popover,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import style from "./TableFilter.module.scss";
import { TableFilterDTO } from "@/types/TableFilter.types";
import Image from "next/image";
import ErrorIcon from "@root/assets/Images/icons/error.svg";
import { ERROR_MESSAGE } from "@/constants/auth.constants";
import {
  BLOCKED_FILTER_CHARACTERS_FLOAT,
  BLOCKED_FILTER_CHARACTERS_NUMBER,
  BLOCKED_FILTER_CHARACTERS_STRING,
  VARIABLE_TYPES,
} from "@/constants/common.constants";

const INITIAL_STATE = {
  filterOperator: {
    value: "",
    error: false,
  },
  filterTextValue: {
    value: "",
    error: false,
  },
};

export default function TableFilter(props: TableFilterDTO) {
  const {
    open,
    anchorEl,
    handleClose,
    options,
    filterStateValues,
    setFilterStateValues,
    handleFilterClear,
    hanleFilterClick = () => {},
    setIsFilterApplied,
    isFilterApplied,
  } = props;

  const [filterformValue, setFilterformValue] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    const defaultValue = options.find(
      (option) => option?.value === "eq" || option?.value === "contain"
    );
    setFilterformValue({
      filterTextValue: {
        value: filterStateValues.filterTextValue || "",
        error: false,
      },
      filterOperator: {
        value:
          filterStateValues.filterOpertor || (defaultValue?.value as string),
        error: false,
      },
    });
  }, []);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilterformValue({
      ...filterformValue,
      filterOperator: {
        value: event.target.value,
        error: false,
      },
    });
  };

  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterformValue({
      ...filterformValue,
      filterTextValue: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const handleRadioGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterformValue({
      filterOperator: {
        value: e.target.value,
        error: false,
      },
      filterTextValue: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const hanleFilterActionClick = () => {
    const formFields = Object.keys(filterformValue);
    let newFormValues = { ...filterformValue };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue =
        filterformValue[currentField as keyof typeof filterformValue].value;
      if (!currentValue) {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField as keyof typeof filterformValue],
            error: true,
          },
        };
      } else {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField as keyof typeof filterformValue],
            error: false,
          },
        };
      }
    }
    setFilterformValue(newFormValues);
    if (
      !newFormValues.filterOperator.error &&
      !newFormValues.filterTextValue.error
    ) {
      setFilterStateValues({
        tableHeader: filterStateValues.tableHeader,
        filterTextValue: filterformValue.filterTextValue.value,
        filterOpertor: filterformValue.filterOperator.value,
        filterType: filterStateValues.filterType,
      });
      setIsFilterApplied && setIsFilterApplied(!isFilterApplied);
      handleClose();
      hanleFilterClick();
    }
  };

  const handleClear = () => {
    const defaultValue = options.find(
      (option) => option?.value === "eq" || option?.value === "contain"
    );
    setFilterformValue({
      ...INITIAL_STATE,
      filterOperator: {
        value: defaultValue?.value as string,
        error: false,
      },
    });
    handleFilterClear && handleFilterClear();
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        className={style.filterContainer}
        data-testid="filter-popover"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box className={style.filterWrapper}>
          <Typography className={style.headingStyle}>
            Show items with values that contains
          </Typography>
          {filterStateValues.filterType !== "boolean" ? (
            <>
              <Select
                className={style.dropdownStyle}
                fullWidth
                value={filterformValue.filterOperator.value}
                onChange={handleSelectChange}
                displayEmpty={true}
                renderValue={(newValue) => {
                  const option: any = options.find(
                    ({ value }) => value === newValue
                  );
                  return newValue ? option?.label : "Select Filter";
                }}
                MenuProps={{ classes: { list: style.menuItemStyle } }}
                data-testid="filter-select"
              >
                {options.map(({ value, label }, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={value}
                      data-testid="menu-select"
                    >
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText className={style.errorText}>
                {filterformValue.filterOperator.error ? (
                  <span>{ERROR_MESSAGE.FILTER_ERROR}</span>
                ) : null}
              </FormHelperText>
              <TextField
                error
                variant="outlined"
                fullWidth
                type={
                  filterStateValues.filterType === "number" ||
                  filterStateValues.filterType === "float"
                    ? "number"
                    : "text"
                }
                InputProps={{
                  classes: {
                    root: style.textInput,
                    error: filterformValue.filterTextValue.error
                      ? style.inputError
                      : "",
                  },
                }}
                placeholder={`${filterformValue.filterOperator.value} ..`}
                name="filterText"
                value={filterformValue.filterTextValue.value}
                onKeyDown={(evt) => {
                  if (filterStateValues.filterType === VARIABLE_TYPES.NUMBER) {
                    BLOCKED_FILTER_CHARACTERS_NUMBER.includes(evt.key) &&
                      evt.preventDefault();
                  } else if (
                    filterStateValues.filterType === VARIABLE_TYPES.FLOAT
                  ) {
                    BLOCKED_FILTER_CHARACTERS_FLOAT.includes(evt.key) &&
                      evt.preventDefault();
                  } else {
                    BLOCKED_FILTER_CHARACTERS_STRING.includes(evt.key) &&
                      evt.preventDefault();
                  }
                }}
                onChange={handleFilterTextChange}
                data-testid="filter-text"
              />
              {filterformValue.filterTextValue.error ? (
                <div className={style.errorContainer}>
                  <Image
                    alt="error-icon"
                    src={ErrorIcon}
                    width={20}
                    height={20}
                  />
                  <span className={style.errorText}>
                    Please enter a filter text
                  </span>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleRadioGroupChange}
                value={filterformValue.filterTextValue.value}
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option.label}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </>
          )}

          <div className={style.actionWrapper}>
            <Button
              variant="contained"
              className={style.filterButton}
              onClick={hanleFilterActionClick}
              data-testid="filter-button"
            >
              Filter
            </Button>
            <Button
              variant="contained"
              className={style.clearButton}
              onClick={handleClear}
              data-testid="clear-button"
            >
              Clear
            </Button>
          </div>
        </Box>
      </Popover>
    </div>
  );
}
