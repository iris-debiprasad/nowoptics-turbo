import { Dispatch, SetStateAction } from "react";

export interface EyeExamFlowPropsTypes {
  isVisible: boolean;
  toggle: () => void;
}

export interface NotFoundViewPropsTypes {
  isVisible: boolean;
  toggle: () => void;
}

export interface AppointmentsListPropsTypes {
  isVisible: boolean;
  toggle: () => void;
  selectedAppointmentId: string | null;
  setSelectedAppointmentId: Dispatch<SetStateAction<string | null>>;
  data: AppointmentType[] | null;
  handleAppointementListContinueClick: () => void;
}

export interface SelectExamPropsTypes {
  isVisible: boolean;
  toggle: () => void;
  data: examType[] | null;
  selectedExams: number[];
  setSelectedExams: Dispatch<SetStateAction<number[]>>;
  handleAddToCart: () => void;
}

export interface AppointmentType {
  BookingSource?: string;
  CreatedOn: string;
  Employee: string;
  End: string;
  ExamOnly?: boolean;
  Id: number;
  OnSiteDoctor?: string | null;
  PatientId: number;
  Start: string;
  Status?: string;
  Store?: string;
  Type?: string;
}

export interface examType {
  Code: string;
  Description: string;
  FinalPrice: number;
  MasterProductId: number;
  ProductVariantId: number;
  RetailPrice: number;
  VariantNumber: string;
}

export interface eyeExamAddToCartPayloadType {
  appointmentId?: string;
  CreatedByStoreId: string;
  CreatedForStoreId?: string;
  PatientId: number | undefined;
  OrderCategoryId?: number;
  OrderCategoryCode?: string;
  orders: {
    ShippingModeId?: number;
    OrderTypeId?: number;
    OrderTypeCode?: string;
    LineItems: {
      MasterProductId: number;
      ProductVariantId?: number;
      Quantity: number;
    }[];
    ParentOrderId?: number | null;
    ParentOrderGroupId?: number;
  }[];
  cartId?: string;
  Id?: string;
}
