import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Stack, TextField, Select, MenuItem, FormLabel, SelectChangeEvent, FormHelperText } from '@mui/material';
import styles from './DOB.module.scss';
import { useTranslation } from "react-i18next";

interface IOption {
  value: string
  label: string
}

interface IDOBProps {
  form: UseFormReturn
}

const limitDateField = (value: string): string => value.replace(/[^0-9]/g, "").replace(/^0/, "")

const getYearValues = (): IOption[] => {
  const val: IOption[] = []

  for (let index = new Date().getFullYear() - 100; index <= new Date().getFullYear(); index++) {
    val.push({
      label: `${index}`,
      value: `${index}`,
    })
  }

  return val.sort((a, b) => (Number(a.value) < Number(b.value) ? 1 : -1))
}

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate()
}

const DOB = (props: IDOBProps) => {
  const form = props.form
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
  } = form
  const { t } = useTranslation();

  const setDaysInMonth = (year?: string): void => {
    const currentDay: string = getValues().dd
    const currentMonth: number = getValues().mm
    const currentYear: number = year ? year : getValues().yyyy

    const days: number = getDaysInMonth(currentMonth, currentYear)

    if (Number(currentDay) > days) {
      setValue("dd", days)
    } else {
      setValue("dd", currentDay)
    }
  }

  return (
    <>
      <Stack direction="row">
        <FormLabel className={styles.dobLabel}>{t("CCPA.DATE_OF_BIRTH")}*</FormLabel>
      </Stack>
      <Stack direction="row">
        <TextField
          placeholder="MM"
          fullWidth={false}
          inputMode="numeric"
          error={!!errors.mm}
          className={styles.datePush}
          helperText={errors.mm && errors.mm?.type === "required" && t('CCPA.THIS_IS')}
          {...register("mm",
            {
              required: true,
            }
          )}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value

            if (Number(value) > 12) {
              setValue("mm", value.slice(0, length - 1))
            } else {
              setValue("mm", limitDateField(value))
            }

            setDaysInMonth()
            clearErrors("mm")
          }}
          inputProps={{
            inputMode: "numeric",
            maxLength: 2,
            max: 12,
            min: 0,
          }}
        />
        <TextField
          placeholder="DD"
          fullWidth={false}
          className={styles.datePush}
          inputMode="numeric"
          error={!!errors.dd}
          helperText={errors.dd && errors.dd?.type === "required" && t('CCPA.THIS_IS')}
          {...register("dd",
            {
              required: true,
            }
          )}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value: string = e.target.value

            if (Number(value) > 31) {
              setValue("dd", value.slice(0, length - 1))
            } else {
              setValue("dd", limitDateField(value))
            }

            setDaysInMonth()
            clearErrors("dd")
          }}
          inputProps={{
            inputMode: "numeric",
            maxLength: 2,
            max: 31,
          }}
        />
        <div className={styles.selectYearContainer}>
          <Select
            className={styles.selectYear}
            placeholder="YYYY"
            {...register("yyyy", {
              required: true,
            })}
            displayEmpty
            renderValue={(value: any) => {
              const option: any = getYearValues().find(
                (option: IOption) => option.value === value
              );
              return option ? option.value : <span className={styles.greyed}>YYYY</span>;
            }}
            error={!!errors.yyyy}
            style={{ height: '3.51em' }}
            onChange={(e: SelectChangeEvent) => {
              clearErrors("yyyy")
              setDaysInMonth(e.target?.value as string)
            }}
          >
            {getYearValues().map((option: IOption, index: number) => (
              <MenuItem
                value={option.value}
                key={index}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {!!errors.yyyy && (
            <FormHelperText className={styles.error}>
              {errors.yyyy && errors.yyyy?.type === "required" && t('CCPA.THIS_IS')}
            </FormHelperText>
          )}
        </div>
      </Stack>
    </>
  )
}

export default DOB
