import { Dayjs } from "dayjs"

export interface RegistrationFormDTO {
  firstName: {
    value: string
    error: boolean
    errorMessage: string
  }
  lastName: {
    value: string
    error: boolean
    errorMessage: string
  }
  mobileNumber: {
    value: string
    error: boolean
    errorMessage: string
  }
  dob: {
    value: Dayjs | null
    error: boolean
    errorMessage: string
  }
  email: {
    value: string
    error: boolean
    errorMessage: string
  }
  zipCode: {
    value: string
    error: boolean
    errorMessage: string
  }
}

export interface LoginFormDTO {
  mobileNumber: {
    value: string
    error: boolean
    errorMessage: string
  }
  passWord: {
    value: string
    error: boolean
    errorMessage: string
  }
}
