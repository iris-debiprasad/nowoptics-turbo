import { Session } from "next-auth";

export type TableHeaderOptions = {
  id: string;
  name: string;
  isSort?: boolean;
  isFilter?: boolean;
  type?: string | number | null;
};

export type SelectOptions = {
  value: string | number;
  label: string;
};

export interface sideDrawerProps {
  navItems: headerType;
  handleDrawerToggle: () => void;
  clearStore: () => void;
  session: Session | null;
}
export interface NavItem {
  id: string;
  name: string;
  type: string;
  url: string;
  subMenu: NavItem[];
  permissionKey?: string;
  cdcViewShow?: boolean;
  cdcViewHide?: boolean;
  query?: boolean;
  agentViewHide?: boolean;
}

export type headerType = NavItem[];
export interface navProps {
  navItems: NavItem[];
  clearStore: () => void;
  session: Session | null;
  setCartBadgeCount?: React.Dispatch<React.SetStateAction<number>>;
}

export type NavStoreDataDTO = {
  BrandName: string;
  StoreNumber: string;
  CloseAt: string;
  isLocked?: boolean;
  OpenAt: string;
  WebDescription: string;
  TimeZoneCode: string;
  Id?: number;
};

export type JWT_DecodeDTO = {
  app_displayname: string;
  family_name: string;
  given_name: string;
  unique_name: string;
  brand_name: string;
  close_at: string;
  store_number: string;
};

export type SearchType = "Product" | "Store" | "Patient" | "Order";

export interface SearchProductsDataDTO {
  PatientName: string;
  OrderNumber: string;
  PatientId: number;
  uniqueId: string;
  id: string;
  sku: string;
  title: string;
  color: string[];
  vColor: string[];
  price: number;
  Id: number;
  FirstName: string;
  LastName: string;
  Dob: string;
  PhoneNumber: PhoneType;
  Email: string;
  modelnumber: string;
  CreatedAtStoreNumber: number;
  mPrice?: number;
  productgroup?: string;
}

export interface myAccountProductDetailUrlDTO {
  sku: string;
  title: string;
  modelnumber: string;
}

export interface PhoneType {
  IsdCode: string;
  PhoneNumber: string;
}



export interface EventJourneyPayload {
  EventId: number;
  GuidedSaleDetailId?: string;
  CreatedByUserId?: string;
  CreatedByPatientId?: number;
  AgentUserId?: number;
  ThreadId?: string;
  RecordingId?: string;
  RecordingFilePath?: string;
  MeetingUrl?: string;
  HasAccepted?: boolean;
  IsNeedHelpStarted?: boolean;
  IsRequestSentToMrs?: boolean;
  IsPatientFileCreated?: boolean;
  IsAgentAssigned?: boolean;
  IsAgentNotAvailable?: boolean;
  IsScreenSharingStarted?: boolean;
  IsCartCreated?: boolean;
  IsPaymentQrGenerated?: boolean;
  IsOrderCreated?: boolean;
  IsOrderProcessed?: boolean;
  IsSubmitAgentCommissionEntry?: boolean;
  IsSaveRecordAgent?: boolean;
  IsCallStarted?: boolean;
  IsCallEnded?: boolean;
  IsCallEndedByAgent?: boolean;
  IsCancelByPatient?: boolean;
  IsAccepted?: boolean;
}

export interface EventJourney {
  Id: number;
  EventId: number;
  JourneyActionId: number;
  Remark: string;
  CreatedByPatientId: number;
  CreatedByUserId: number;
  CreatedOnUtc: string;
  JourneyActionCode: string;
  JourneyActionDescription: string;
}