import { phoneRegex, isEmailValidRegex, SNACKBAR_COLOR_TYPE } from '@root/host/src/constants/common.constants';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Button,
  AlertColor,
} from '@mui/material';
import { BaseSyntheticEvent, ChangeEvent } from 'react';
import DOB from './DOB/DOB';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './CcpaBlueprintForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useRecaptchaToken } from '@/hooks/useGoogleRecaptcha';
import { CcpaRequest, saveCcpaData } from '@/service/ccpa.service';
import { useSnackBar } from '@/contexts/Snackbar/SnackbarContext';
import { STORE_ERROR_MESSAGE } from '@root/host/src/constants/store.constants';

export const CcpaBlueprintForm = (props: any) => {
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const { showSnackBar } = useSnackBar();

  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = form;
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FieldValues> = async (
    data: FieldValues,
    e?: BaseSyntheticEvent
  ) => {
    e?.preventDefault();

    const checkboxSendCopy: boolean = data.sendCopy;
    const checkboxDeleteInfo: boolean = data.deleteInformation;
    const checkboxPromotionalCommunication: boolean = data.promotionalCommunication;

    if (!checkboxSendCopy && !checkboxDeleteInfo && !checkboxPromotionalCommunication) {
      setError('deleteInformation', {
        type: 'custom',
        message: t('CCPA.SELECT_AT_LEAST'),
      });
    } else {
      const recaptchaToken = await fetchRecaptchaToken("ccpa");
      const request: CcpaRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: `${data.yyyy}-${data.mm}-${data.dd}`,
        email: data.email,
        Telephone: {
          isdCode: "",
          phoneNumber: data.telephone.replace(/[^0-9.]/g, ''),
        },
        SendCopy: data.sendCopy,
        DeleteCopy: data.deleteInformation,
        PromotionalCommunication: data.promotionalCommunication,
        Referrer: "SO"
      }
      saveCcpaData(request, recaptchaToken as string).then(data => {
        props.updateSuccess(true);
      }).catch((err) => {
        showSnackBar(
          err.response
            ? err.response?.data?.Error?.Description
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
    }
  };

  return (
    <>
      <form
        method="post"
        className={styles.ccpaForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={1}>
          <Stack direction="row" spacing="10">
            <TextField
              placeholder={t('CCPA.FIRST_NAME')}
              fullWidth={true}
              error={!!errors.firstName}
              className={styles.namePush}
              helperText={
                errors.firstName &&
                errors.firstName?.type === 'required' &&
                t('CCPA.THIS_IS')
              }
              type="text"
              {...register('firstName', {
                required: true,
              })}
            />
            <TextField
              placeholder={t('CCPA.LAST_NAME')}
              fullWidth={true}
              error={!!errors.lastName}
              helperText={
                errors.lastName &&
                errors.lastName?.type === 'required' &&
                t('CCPA.THIS_IS')
              }
              type="text"
              {...register('lastName', {
                required: true,
              })}
            />
          </Stack>
          <Stack>
            <TextField
              placeholder={t('CCPA.TELEPHONE')}
              fullWidth={true}
              error={!!errors.telephone}
              helperText={
                (errors.telephone &&
                  errors.telephone?.type === 'required' &&
                  t('CCPA.THIS_IS')) ||
                (errors.telephone &&
                  errors.telephone.message &&
                  errors?.telephone?.message.toString())
              }
              type="phone"
              {...register('telephone', {
                required: true,
                validate: (value) => {
                  const currentLength = value
                    .replace(/[^0-9.]/g, '')
                    .slice(0, 10)
                    .trim().length;
                  return currentLength === 10 || t('CCPA.PLEASE_ENTER');
                },
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const currentPhone: string = e.target.value
                  .replace(/[^0-9.]/g, '')
                  .slice(0, 10);
                let formatedPhone: string = '';

                if (currentPhone.length <= 3) {
                  formatedPhone = currentPhone.replace(phoneRegex, '$1');
                } else if (currentPhone.length <= 6) {
                  formatedPhone = currentPhone.replace(phoneRegex, '($1) $2');
                } else {
                  formatedPhone = currentPhone.replace(
                    phoneRegex,
                    '($1) $2-$3'
                  );
                }

                setValue('telephone', formatedPhone);

                if (currentPhone.length === 10) {
                  clearErrors('telephone');
                }
              }}
            />
          </Stack>
          <Stack>
            <TextField
              placeholder={t('CCPA.EMAIL')}
              fullWidth={true}
              error={!!errors.email}
              helperText={
                (errors.email &&
                  errors.email?.type === 'required' &&
                  t('CCPA.THIS_IS')) ||
                (errors.email &&
                  errors.email.message &&
                  errors?.email?.message.toString())
              }
              type="email"
              {...register('email', {
                required: true,
                validate: (value) => {
                  return (
                    isEmailValidRegex.test(value) || t('CCPA.PLEASE_ENTER_A')
                  );
                },
              })}
            />
          </Stack>
          <Stack>
            <DOB form={form} />
          </Stack>
          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('sendCopy', {
                    value: false,
                  })}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value) {
                      clearErrors('deleteInformation');
                    }
                  }}
                />
              }
              label={t('CCPA.SEND_ME_A_COPY')}
            />
          </Stack>
          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('promotionalCommunication', {
                    value: false,
                  })}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value) {
                      clearErrors('deleteInformation');
                    }
                  }}
                />
              }
              label={t('CCPA.PROMOTIONAL_COMMUNICATION')}
            />
          </Stack>
          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('deleteInformation', {
                    value: false,
                  })}
                />
              }
              label={t('CCPA.DELETE_MY')}
            />
          </Stack>
          <Stack>
            {errors.deleteInformation && (
              <div className={styles.errorCheckbox}>
                {errors?.deleteInformation?.message?.toString()}
              </div>
            )}
          </Stack>
          <Stack className={styles.ccpaButtonWrapper}>
            <Button className={styles.primaryButton} type="submit">
              {t('CCPA.SUBMIT_REQUEST')}
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
