import {
  AppointmentDetails,
  ExistingAppointmentType,
  Gender,
  PatientResponseDTO,
  ReservationFormFull,
} from "@root/home/src/types/bookEyeExamSteps.types";
import dayjs from "dayjs";
import {
  AlertColor,
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  DATE_FORMAT,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
  isEmailValidRegex,
  isMobileNumberValidRegex,
  isNameValidRegex,
  isZipcodeValidRegex,
} from "@root/host/src/constants/common.constants";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import style from "./../Steps.module.scss";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { useIMask } from "react-imask";
import { GetExistingAppointmentDetails } from "@root/home/src/service/storeLocator.service";
import { useSnackBar } from "@root/home/src/contexts/Snackbar/SnackbarContext";
import { useMaskInput } from "@root/host/src/hooks/useMaskInput";
import i18n from "@root/host/src/language/i18n";
import IconSVG from "@shared/host/IconSVG";
import UserMarketingConsent from "@root/host/src/components/UserMarketingConsent/index";


interface Props {
  back: () => void;
  genders: Gender[];
  patientDetails: PatientResponseDTO;
  bookAppointment: (patientId: ReservationFormFull) => void;
  editable: boolean;
  appointmentDate: string;
  setBlockedAppointmentDate: (date: string[]) => void;
  blockedAppointmentDate: string[];
  rescheduleAppointmentDetails: AppointmentDetails | null;
  appointmentBookingType: number;
}

function ExistingUserForm({
  genders,
  patientDetails,
  back,
  bookAppointment,
  editable,
  appointmentDate,
  setBlockedAppointmentDate,
  blockedAppointmentDate,
  rescheduleAppointmentDetails,
  appointmentBookingType
}: Props) {
  const { showSnackBar } = useSnackBar();

  const methods = useForm<ReservationFormFull>({
    mode: "onChange",
    defaultValues: {
      phoneNumber: patientDetails.PhoneNumber.PhoneNumber,
      dob: dayjs(patientDetails.Dob).format(DATE_FORMAT),
      firstName: patientDetails.FirstName,
      lastName: patientDetails.LastName,
      email: patientDetails.Email,
      zipCode: patientDetails.ZipCode,
      gender: patientDetails.Gender || "",
      isMarketingConsent: patientDetails.IsMarketingConsent
    },
  });

  const [zipCodeMaskOpts, setzipCodeMaskOpts] = React.useState({
    mask: INPUT_MASK.ZIP_CODE,
  });
  const {
    ref: zipMaskRef,
    typedValue: zipValue,
    setTypedValue,
  } = useIMask(zipCodeMaskOpts);
  const [existingAppointment, setExistingAppointment] =
    useState<ExistingAppointmentType | null>(null);
  const registerFormValidation = () => {
    methods.register("firstName", {
      maxLength: {
        value: 50,
        message: i18n.t('BOOK_EYE_EXAM.FIRST_NAME_CHAR_LIMIT') + "50",
      },
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.FIRST_NAME_ERROR'),
      },
      validate: (name) => {
        return isNameValidRegex.test(name)
          ? true
          : i18n.t('BOOK_EYE_EXAM.INVALID_FIRSTNAME');
      },
    });
    methods.register("lastName", {
      maxLength: {
        value: 50,
        message: i18n.t('BOOK_EYE_EXAM.LAST_NAME_CHAR_LIMIT') + "50",
      },
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.LAST_NAME_ERROR'),
      },
      validate: (name) => {
        return isNameValidRegex.test(name)
          ? true
          : i18n.t('BOOK_EYE_EXAM.INVALID_LASTNAME');
      },
    });
    methods.register("email", {
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.INVALID_EMAIL'),
      },
      validate: (email) => {
        if (!isEmailValidRegex.test(email)) {
          return i18n.t('BOOK_EYE_EXAM.INVALID_EMAIL');
        }
        return true;
      },
    });
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
    methods.register("gender", {
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.GENDER'),
      },
    });
    methods.register("zipCode", {
      required: {
        value: true,
        message: i18n.t('BOOK_EYE_EXAM.ZIP_CODE_ERROR'),
      },
      validate: (zipcode) => {
        if (!isZipcodeValidRegex.test(zipcode)) {
          return i18n.t('BOOK_EYE_EXAM.INVALID_ZIPCODE');
        }
        return true;
      },
    });
  };

  useEffect(() => {
    if (editable) {
      registerFormValidation();
    }
    setTypedValue(patientDetails.ZipCode);
  }, []);

  const checkExistingAppointmentDetails = (formData: ReservationFormFull) => {
    GetExistingAppointmentDetails(patientDetails.Id, appointmentDate, rescheduleAppointmentDetails?.AppointmentId)
      .then((resp) => {
        const data = resp.data as ExistingAppointmentType;
        if (data?.Result?.HasAppointments) {
          setExistingAppointment(data);
        } else {
          setExistingAppointment(null);
          bookAppointment(formData)
        }
      })
      .catch((error) => {
        setExistingAppointment(null);
        const errorResponse: any = error.response?.data?.Error;
        const message =
          errorResponse && errorResponse.Message
            ? errorResponse.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  const { value: makskedPhoneNumber, ref: maskedPhoneNumberRef } = useMaskInput(
    INPUT_MASK.MOBILE_NUMBER,
    methods.getValues('phoneNumber'),
    (unmaskedValue) => {
      methods.setValue('phoneNumber', unmaskedValue);
    }
  );

  return (
    <>
      <Box
        data-testid="left-side-user"
        className={style.leftSideBEEUserWrapper}
        component="form"
        onSubmit={methods.handleSubmit(checkExistingAppointmentDetails)}
      >
        {(appointmentBookingType !== 1) && <Box className={style.leftSideBEEUserTitle}>We found your profile.</Box>}
        <Box mt={4} className={style.leftSideBEEUserSubTitle}>
          {i18n.t('BOOK_EYE_EXAM.PLEASE_CHECK_YOUR_INFO')}
        </Box>
        {/* TODO: will do this changes on IR24-138 
        <Box className={style.leftSideBEEUserSubTitle}>
          {
            editable && "(Note: You can update your demographic information from My Account or Medical Form.)"
          }
        </Box> */}
        <Box className={style.formGroup}>
          <Controller
            name="firstName"
            control={methods.control}
            render={({ field, fieldState }) => (
              <Box mt={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  disabled={!editable}
                  className={`${style.textInput} ${
                    editable ? "" : style.disabled
                  }`}
                  placeholder={i18n.t('BOOK_EYE_EXAM.FIRST_NAME')}
                  value={field.value}
                  error={!!fieldState?.error}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isNameValidRegex.test(value) || !value) {
                      field.onChange(e);
                    }
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
                  placeholder={i18n.t('BOOK_EYE_EXAM.LAST_NAME')}
                  name="lastName"
                  value={field.value}
                  error={!!fieldState?.error}
                  disabled={!editable}
                  className={`${style.textInput} ${
                    editable ? "" : style.disabled
                  }`}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isNameValidRegex.test(value) || !value) {
                      field.onChange(e);
                    }
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
                  disabled
                  className={`${style.textInput} ${style.disabled}`}
                  placeholder={i18n.t('BOOK_EYE_EXAM.EMAIL')}
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
                  placeholder={i18n.t('BOOK_EYE_EXAM.PHONE_NUMBER')}
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
                      ({ Code }) => Code === value
                    );
                    return option ? option.Description : i18n.t('BOOK_EYE_EXAM.SELECT_GENDER');
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                  }}
                  disabled={!editable}
                  className={`${style.textInput} ${
                    editable ? "" : style.disabled
                  }`}
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
                  disabled={true}
                  className={`${style.textInput} ${style.disabled}`}
                  placeholder={i18n.t('BOOK_EYE_EXAM.ZIP_CODE')}
                  fullWidth
                  onChange={(e) => {
                    methods.setValue("zipCode", zipValue);
                    methods.trigger("zipCode");
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                  }}
                  inputRef={zipMaskRef}
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
            {i18n.t('BOOK_EYE_EXAM.BACK')}
          </Button>
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            className={style.submitButton}
            disabled={
              blockedAppointmentDate.find((date) => date === appointmentDate)
                ? true
                : false
            }
          >
            {i18n.t('BOOK_EYE_EXAM.NEXT')}
          </Button>
        </Box>
      </Box>
      <Modal
        open={existingAppointment ? true : false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.existingAppointmentModalWrapper}>
          <Box className={style.modalInner}>
            <Box className={style.title}>
              {existingAppointment?.SuccessMessage}
            </Box>
            <hr />
            <Box mt={2} className={style.subTitle}>
              <ul className={style.appointmentList}>
                {existingAppointment?.Result.Appointments.map((data, index) => (
                  <li key={index}>
                    {index + 1}.{dayjs(appointmentDate).format(DATE_FORMAT)}{" "}
                    {data.AppointmentStartTime} {data.AppointmentType}
                  </li>
                ))}
              </ul>
            </Box>
            <Box mt={3} className={style.actionWrapper}>
              <Button
                className={style.cancelButton}
                onClick={() => {
                  setExistingAppointment(null);
                  setBlockedAppointmentDate([
                    ...blockedAppointmentDate,
                    appointmentDate,
                  ]);
                }}
              >
                {i18n.t('BOOK_EYE_EXAM.CANCEL')}
              </Button>
              <Button
                className={style.continueButton}
                onClick={() => {
                  const formData = methods.getValues();
                  bookAppointment(formData);
                }}
              >
                {i18n.t('BOOK_EYE_EXAM.CONTINUE')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ExistingUserForm;
