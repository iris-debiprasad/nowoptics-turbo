import {
  CountryCode,
  ReservationFormPartial,
} from "@/types/bookEyeExamSteps.types";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
} from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import style from "./../Steps.module.scss";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  DATE_FORMAT,
  INPUT_MASK,
  isMobileNumberValidRegex,
} from "@root/host/src/constants/common.constants";
import i18n from "@root/host/src/language/i18n";

// const IconSVG = dynamic(() => import("Host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;
import dayjs from "dayjs";
import AddGTMEvent from "@root/host/src/utils/gtmEvent";
import { GA_TAG_EVENTS } from "@root/host/src/constants/google-analytics.constants";
import { useMaskInput } from "@root/host/src/hooks/useMaskInput";
import IconSVG from "@root/host/src/components/iconsvg/IconSVG";

interface Props {
  dob: string;
  createNewUser: (data: ReservationFormPartial) => void;
  findPatientDetails: (data: ReservationFormPartial) => void;
  back: () => void;
  countryCodes: CountryCode[];
  multiplePatient: boolean;
  selectedCountryCode: string;
}
function ReservationForm({
  dob,
  createNewUser,
  findPatientDetails,
  back,
  countryCodes,
  multiplePatient,
  selectedCountryCode,
}: Props) {
  const methods = useForm<ReservationFormPartial>({
    mode: "onSubmit",
    defaultValues: {
      phoneNumber: "",
      dob: dayjs(dob).format(DATE_FORMAT),
      IsdCode: selectedCountryCode,
      firstName: "",
    },
  });

  useEffect(() => {
    methods.register("phoneNumber", {
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.MOBILE_NUMBER'),
      },
      validate: (phone) => {
        if (!isMobileNumberValidRegex.test(phone)) {
          return i18n.t('BOOK_EYE_EXAM.INVALID_PHONE');
        }
        return true;
      },
    });
    methods.register("dob", {
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.DOB'),
      },
    });

    methods.register("IsdCode", {
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.COUNTRY_CODE'),
      },
    });
  }, []);

  useEffect(() => {
    methods.register("firstName", {
      required: {
        value: multiplePatient,
        message: i18n.t('BOOK_EYE_EXAM.FIRST_NAME_ERROR'),
      },
    });
  }, [multiplePatient]);

  const newUserHandler = (data: ReservationFormPartial) => {
    AddGTMEvent({
      event: GA_TAG_EVENTS.BOOK_EYE_EXAM_Q2,
      newOrExisting: GA_TAG_EVENTS.NEW,
    });
    createNewUser(data);
  };

  const { value: makskedPhoneNumber, ref: maskedPhoneNumberRef } = useMaskInput(
    INPUT_MASK.MOBILE_NUMBER,
    methods.getValues('phoneNumber'),
    (unmaskedValue) => {
      methods.setValue('phoneNumber', unmaskedValue);
    }
  );

  return (
    <Box
      data-testid="left-side-user"
      className={style.leftSideBEEUserWrapper}
      component="form"
    >
      <Box className={style.leftSideBEEUserTitle}>
        {multiplePatient
          ? i18n.t('BOOK_EYE_EXAM.WE_FOUND_MORE_THAN')
          : ""}
      </Box>
      <Box mt={4} className={style.leftSideBEEUserSubTitle}>
        {multiplePatient
          ? i18n.t("BOOK_EYE_EXAM.PLEASE_ENTER_FIRST_NAME")
          : i18n.t("BOOK_EYE_EXAM.PLEASE_ENTER_PHONE_NUMBER")}
      </Box>
      <Box className={style.formGroup}>
        {multiplePatient && (
          <Controller
            name="firstName"
            control={methods.control}
            render={({ field, fieldState }) => (
              <Box mt={3}>
                <TextField
                  variant="outlined"
                  className={style.textInput}
                  placeholder={i18n.t('BOOK_EYE_EXAM.FIRST_NAME')}
                  value={field.value}
                  error={!!fieldState?.error}
                  fullWidth
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
        )}
        <Controller
          name="phoneNumber"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Box mt={3}>
              <TextField
                variant="outlined"
                className={style.textInput}
                placeholder={i18n.t('BOOK_EYE_EXAM.PHONE_NUMBER')}
                value={makskedPhoneNumber}
                error={!!fieldState?.error}
                fullWidth
                inputProps={{
                  maxLength: 14,
                  pattern: "[0-9]*",
                }}
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
                disabled
                fullWidth
                value={field.value}
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
      </Box>
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
          {i18n.t('BOOK_EYE_EXAM.BACK')}
        </Button>
        <Button
          type="button"
          variant="outlined"
          size="medium"
          className={style.leftSideBEEUserNewBtn}
          onClick={methods.handleSubmit(findPatientDetails)}
        >
          {i18n.t('BOOK_EYE_EXAM.CONTINUE')}
        </Button>
      </Box>
    </Box>
  );
}

export default ReservationForm;
