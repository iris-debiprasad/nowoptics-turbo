
import { StoreHourInputDateDTO } from "../../../host/src/types/SideBar.types";


export interface AcceptedInsurancePlansDTO {
  id: number;
  name: string;
}

export type StoreIdDTO = {
  pid: string | undefined;
};

export interface PhoneNumber {
  PhoneNumber: string;
  Type: string;
}

export type StoreDetailsDTO = {
  AddressLine1: string;
  BrandName: string;
  City: string;
  CloseAt: string | null;
  Distance: number | null
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
  LocationPageName: string;
};

interface ImageData {
  ImageUrl: string;
  IsMobileOnly?: boolean;
  AltText?: string;
}

interface Feature {
  Id?: number;
  Heading: string;
  Description: string;
  Image: ImageData;
}

interface AboutEyeCareSectionDTO {
  Type: string;
  Heading: string;
  Description: string;
  AnchorUrl: string;
  AnchorText: string;
  Features: Feature[];
  Image: ImageData;
}

interface QnADTO {
  Id?: number;
  Question: string;
  Answer: string;
}

interface ReviewDTO {
  Id?: number;
  AuthorImage: string;
  AuthorName: string;
  Rating: number | null;
  Text: string;
  City: string;
  State: string;
}

type Promotion = {
  Id?: number;
  PromotionalText: string;
  Disclaimer: string;
};

type PromotionSectionDTO = {
  Type: string;
  Heading: string;
  Promotions: Promotion[];
  AnchorUrl: string;
  AnchorText: string;
};

type StoresDTO = {
  BrandName: string;
  AddressLine1: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: PhoneNumber[];
  OpenAt: string
}

type FAQSectionDTO = {
  Type: string;
  Heading: string;
  Image: ImageData;
  AnchorUrl: string,
  AnchorText: string,
  FAQs: QnADTO[];
};
type NearBySectionDTO = {
  Type: string;
  Heading: string;
};

type ReviewSectionDTO = {
  Type: string;
  Heading: string;
  Reviews: ReviewDTO[];
};



export type StoreContentDTO = {
  AboutEyeCareSection: AboutEyeCareSectionDTO;
  PromotionSection: PromotionSectionDTO;
  FAQSection: FAQSectionDTO;
  NearBySection: NearBySectionDTO;
  ReviewSection: ReviewSectionDTO;
};

export interface StoreDetailsPageDTO {
  pid: string;
  storeData?: StoreContentDTO;
}
