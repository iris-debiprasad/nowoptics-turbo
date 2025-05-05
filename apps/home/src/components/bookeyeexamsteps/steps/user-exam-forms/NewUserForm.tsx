import {
  CountryCode,
  Gender,
  ReservationFormFull,
} from "@/types/bookEyeExamSteps.types";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DATE_FORMAT,
  INPUT_MASK,
  isEmailValidRegex,
  isMobileNumberValidRegex,
  isNameValidRegex,
  isZipcodeValidRegex,
} from "@root/host/src/constants/common.constants";
import React, { FunctionComponent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import style from "./../Steps.module.scss";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;
import dayjs from "dayjs";
import { useMaskInput } from "@root/host/src/hooks/useMaskInput";
import i18n from "@root/host/src/language/i18n";
import { UserMarketingConsentProps } from "@root/host/src/types/UserMarketingConsent.types";

import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

const UserMarketingConsent = dynamic(
  () => import("Host/UserMarketingConsent"),
  { ssr: false },
) as FunctionComponent<UserMarketingConsentProps<ReservationFormFull>>;

//TODO: Will Refactor latter IR24-4905
interface ZipCodeMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const ZipCodeMask = forwardRef<HTMLInputElement, ZipCodeMaskProps>(
  function ZipCodeMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-0000"
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite="shift"
      />
    );
  },
);

interface Props {
  dob: string;
  back: () => void;
  phoneNumber: string;
  genders: Gender[];
  countryCodes: CountryCode[];
  createNewPatient: (data: ReservationFormFull) => void;
}

function NewUserForm({
  dob,
  phoneNumber,
  back,
  genders,
  createNewPatient,
}: Props) {
  const methods = useForm<ReservationFormFull>({
    mode: "onChange",
    defaultValues: {
      phoneNumber,
      dob: dayjs(dob).format(DATE_FORMAT),
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      zipCode: "",
      isMarketingConsent: false,
    },
  });

  const [maskedZipCode, setMaskedZipCode] = React.useState("");
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setMaskedZipCode(value);

    const unMaskedZip = value.replace(/-/g, "");
    methods.setValue("zipCode", unMaskedZip);
    methods.trigger("zipCode");
  };

  const registerFormValidation = () => {
    methods.register("firstName", {
      maxLength: {
        value: 50,
        message: i18n.t("BOOK_EYE_EXAM.FIRST_NAME_CHAR_LIMIT") + "50",
      },
      required: {
        value: true,
        message: i18n.t("BOOK_EYE_EXAM.FIRST_NAME_ERROR"),
      },
      validate: (name) => {
        return isNameValidRegex.test(name)
          ? true
          : i18n.t("BOOK_EYE_EXAM.INVALID_FIRSTNAME");
      },
    });
    methods.register("lastName", {
      maxLength: {
        value: 50,
        message: i18n.t("BOOK_EYE_EXAM.LAST_NAME_CHAR_LIMIT") + "50",
      },
      required: {
        value: true,
        message: i18n.t("BOOK_EYE_EXAM.LAST_NAME_ERROR"),
      },
      validate: (name) => {
        return isNameValidRegex.test(name)
          ? true
          : i18n.t("BOOK_EYE_EXAM.INVALID_LASTNAME");
      },
    });
    methods.register("email", {
      required: {
        value: true,
        message: i18n.t("BOOK_EYE_EXAM.INVALID_EMAIL"),
      },
      validate: (email) => {
        if (!isEmailValidRegex.test(email)) {
          return i18n.t("BOOK_EYE_EXAM.INVALID_EMAIL");
        }
        return true;
      },
    });
    methods.register("phoneNumber", {
      required: {
        value: true,
        message: i18n.t("BOOK_EYE_EXAM.MOBILE_NUMBER"),
      },
      validate: (phone) => {
        if (!isMobileNumberValidRegex.test(phone)) {
          return i18n.t("BOOK_EYE_EXAM.INVALID_PHONE");
        }
        return true;
      },
    });
    methods.register("gender", {
      required: {
        value: true,
        message: i18n.t("BOOK_EYE_EXAM.GENDER"),
      },
    });
    methods.register("zipCode", {
      required: {
        value: true,
        message: i18n.t("BOOK_EYE_EXAM.ZIP_CODE_ERROR"),
      },
      validate: (zipcode) => {
        if (!isZipcodeValidRegex.test(zipcode)) {
          return i18n.t("BOOK_EYE_EXAM.INVALID_ZIPCODE");
        }
        return true;
      },
    });
  };

  useEffect(() => {
    registerFormValidation();
  }, []);

  const handleSubmit = (data: ReservationFormFull) => {
    createNewPatient(data);
  };

  const { value: makskedPhoneNumber, ref: maskedPhoneNumberRef } = useMaskInput(
    INPUT_MASK.MOBILE_NUMBER,
    methods.getValues("phoneNumber"),
    (unmaskedValue) => {
      methods.setValue("phoneNumber", unmaskedValue);
    },
  );

  return (
    <Box
      data-testid="left-side-user"
      className={style.leftSideBEEUserWrapper}
      component="form"
      onSubmit={methods.handleSubmit(handleSubmit)}
    >
      <Box className={style.leftSideBEEUserTitle}>
        {i18n.t("BOOK_EYE_EXAM.WE_COULD_NOT")}
      </Box>
      <Box className={style.leftSideBEEUserTitle}>
        {i18n.t("BOOK_EYE_EXAM.PLEASE_ENTER_INFO")}
      </Box>
      <Box className={style.formGroup}>
        <Controller
          name="firstName"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <TextField
                variant="outlined"
                fullWidth
                className={style.textInput}
                placeholder={i18n.t("BOOK_EYE_EXAM.FIRST_NAME")}
                value={field.value}
                error={!!fieldState?.error}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={(e) => {
                  field.onBlur();
                }}
              />
              {!!fieldState?.error && (
                <FormHelperText className={style.error}>
                  {fieldState?.error?.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />
        <Controller
          name="lastName"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <TextField
                variant="outlined"
                fullWidth
                className={style.textInput}
                placeholder={i18n.t("BOOK_EYE_EXAM.LAST_NAME")}
                name="lastName"
                value={field.value}
                error={!!fieldState?.error}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={(e) => {
                  field.onBlur();
                }}
              />
              {!!fieldState?.error && (
                <FormHelperText className={style.error}>
                  {fieldState?.error?.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />
        <Controller
          name="email"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <TextField
                variant="outlined"
                fullWidth
                className={style.textInput}
                placeholder={i18n.t("BOOK_EYE_EXAM.EMAIL")}
                name="Email"
                value={field.value}
                error={!!fieldState?.error}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={(e) => {
                  field.onBlur();
                }}
              />
              {!!fieldState?.error && (
                <FormHelperText className={style.error}>
                  {fieldState?.error?.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />
        <Controller
          name="phoneNumber"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <TextField
                variant="outlined"
                fullWidth
                className={`${style.textInput} ${style.disabled}`}
                placeholder={i18n.t("BOOK_EYE_EXAM.PHONE_NUMBER")}
                value={makskedPhoneNumber}
                disabled
                error={!!fieldState?.error}
                inputRef={maskedPhoneNumberRef}
                onBlur={(e) => {
                  field.onBlur();
                }}
              />
              {!!fieldState?.error && (
                <FormHelperText className={style.error}>
                  {fieldState?.error?.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />
        <Controller
          name="dob"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={2}>
              <TextField
                variant="outlined"
                disabled={true}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconSVG
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#7b7e7b"
                      name="calender_icon"
                    />
                  ),
                }}
                className={`${style.disabled} ${style.textInputDatePicker}`}
                placeholder={field.value}
                value={field.value}
              />
            </Box>
          )}
        />

        <Controller
          name="gender"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={2}>
              <Select
                variant="outlined"
                fullWidth
                value={field.value}
                displayEmpty
                renderValue={(value: any) => {
                  const option: any = genders.find(
                    ({ Code }) => Code === value,
                  );
                  return option
                    ? option.Description
                    : i18n.t("BOOK_EYE_EXAM.SELECT_GENDER");
                }}
                onChange={(e) => {
                  field.onChange(e);
                }}
                onBlur={(e) => {
                  field.onBlur();
                }}
                className={style.selectInput}
                error={!!fieldState?.error}
              >
                {genders.map((option: any) => (
                  <MenuItem key={option.Id} value={option.Code}>
                    {option.Description}
                  </MenuItem>
                ))}
              </Select>
              {!!fieldState?.error && (
                <FormHelperText className={style.error}>
                  {fieldState?.error?.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />

        <Controller
          name="zipCode"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={2}>
              <TextField
                variant="outlined"
                error={!!fieldState?.error}
                className={style.textInput}
                placeholder={i18n.t("BOOK_EYE_EXAM.ZIP_CODE")}
                fullWidth
                value={maskedZipCode}
                onChange={handleZipCodeChange}
                onBlur={(e) => {
                  field.onBlur();
                }}
                InputProps={{
                  inputComponent: ZipCodeMask as any,
                }}
              />
              {!!fieldState?.error && (
                <FormHelperText className={style.error}>
                  {fieldState?.error?.message}
                </FormHelperText>
              )}
            </Box>
          )}
        />
      </Box>

      <UserMarketingConsent
        control={methods.control as any}
        fieldName="isMarketingConsent"
      />

      <Box className={style.leftSideBEEUserActionWrapper}>
        <Button
          className={style.leftSideBEEUserBackBtn}
          startIcon={
            <IconSVG
              width="9"
              height="12"
              viewBox="0 0 9 15"
              fill="none"
              fillP="#ffff"
              name="arrow_solid_left"
            />
          }
          onClick={back}
        >
          {i18n.t("BOOK_EYE_EXAM.BACK")}
        </Button>

        <Button
          type="submit"
          variant="outlined"
          size="medium"
          className={style.submitButton}
        >
          {i18n.t("BOOK_EYE_EXAM.NEXT")}
        </Button>
      </Box>
    </Box>
  );
}

export default NewUserForm;
