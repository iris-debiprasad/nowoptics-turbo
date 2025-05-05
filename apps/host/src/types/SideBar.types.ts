import { AlertColor } from "@mui/material";
import { Dayjs } from "dayjs";

export interface StoreHoursDTO {
  day: string;
  status: string;
}
export interface StoreHourInputDateDTO {
  Id: number;
  ScheduleDate: string;
  OpenAt: string;
  CloseAt: string;
}
export interface AllStoreAddressesDTO {
  name: string;
  timing: string;
  labName?: string;
  distance: string;
  address: string;
  full_address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  telephone: string;
}

export interface PhoneNumber {
  PhoneNumber: string;
  Type: string;
}

export type StoreAddressType = {
  AddressLine1: string;
  BrandName: string;
  City: string;
  CloseAt: string | null;
  HasSameDayDelivery: boolean;
  Id: number;
  Latitude: number | null;
  Longitude: number | null;
  OpenAt: string | null;
  PhoneNumber: PhoneNumber[] | null;
  RowNumber?: number | null;
  StateCode: string;
  StoreNumber: string;
  WebDescription: string | null;
  ZipCode: string;
  IsOnSiteDoctorAvailable: boolean;
  Distance?: number | null;
  TimeZoneCode?: string;
  LocationPageName?: string;
  storeHours?: any;
  StoreOpeningDateTime?: string;
  IsSpeakSpanish: boolean;
};

export type LocationDTO = {
  latitude: number;
  longitude: number;
};

export type ClosestStoreDTO = {
  setShowStores: (value: boolean) => void;
  handleClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleShippingModeOnStoreChangeForCustomer?: (
    store: StoreAddressType
  ) => void;
};

export type SelectStoreDTO = {
  handleClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleNewStore?: () => void;
  handleForceClose?: () => void;
  forceClose?: boolean;
  closeDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
  brandName?: string;
  hasSameDayDelivery?: boolean;
  handleShippingModeOnStoreChangeForCustomer?: (
    store: StoreAddressType
  ) => void;
  isBookEyeExam?: boolean;
};

export type ChangeStoreDTO = {
  handleClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  showSnackBar: (message: string, type: AlertColor) => void;
  changeStoreSelectCallBack?: (
    storeData: StoreDetailsDTO,
    actionType: SchedulerStoreSelectActionTypeDTO
  ) => void;
  role?: string | null;
};

export type StoreDetailsDTO = {
  AddressLine1: string;
  BrandName: string;
  City: string;
  CloseAt: string | null;
  Distance: number | null;
  HasSameDayDelivery: boolean;
  IsOnSiteDoctorAvailable: boolean | null;
  IsSpeakSpanish: boolean | null;
  LandMarks: string;
  Id: number;
  Latitude: number;
  Longitude: number;
  OpenAt: string | null;
  PhoneNumber: PhoneNumber[];
  StateCode: string;
  StoreNumber: string;
  StoreOpeningDateTime: string;
  TimeZone: string;
  TimeZoneCode: string;
  TotalCount: number;
  WebDescription: string;
  WorkingHours: StoreHourInputDateDTO[];
  ZipCode: string;
};
export interface DateFormDTO {
  fromDate: {
    value: Dayjs | null;
    error: boolean;
    errorMessage: string;
  };
  toDate: {
    value: Dayjs | null;
    error: boolean;
    errorMessage: string;
  };
}

export type SchedulerStoreSelectActionTypeDTO = "CREATE" | "RESCHEDULE";
