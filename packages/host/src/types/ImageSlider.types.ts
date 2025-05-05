import { ProductDTO } from "./order-common.types";

export type Props = {
  slideType: string;
  name?: boolean;
  productData?: ProductSliderData[];
  patientCartData?: CartSliderData[];
  patientProductData?: CartSliderData[];
  sliderData?: SliderDTO[];
  infinite?: boolean;
  onAddToCart?: (Id: string) => void;
  showFavIcon?: boolean;
  addToCartWrapper?: string;
  addToCart?: string;
  productUnbxdData?: ProductDTO[];
  sliderLength?: number;
  isContactLens?: boolean;
  showDetails?: boolean;
};

interface images {
  color: string;
  image: string[];
  sku?: string;
}

export interface Product {
  ProductCode?: string;
  ProductName?: string;
  Description?: string;
  Image?: Image;
  Variants?: Product[];

  oldPrice?: string;
  newPrice?: string;
  isLiked?: boolean;
}

interface Image {
  ImageUrl: string;
  IsMobileOnly: boolean;
}

export interface Section {
  Type: string;
  Heading: string;
  SubHeading: string;
  Description: string | null;
  Images: Image[];
  AnchorUrl: string | null;
  AnchorText: string | null;
  Products: Product[];
  Disclaimer: string | null;
}

export interface SliderDTO {
  pageData?: Section[];
  Products?: Product[];
}
export interface ProductSliderData {
  images?: images[];
  name: string;
  oldPrice?: string;
  newPrice: string;
  isLiked?: boolean;
  image?: string;
}

export interface CartSliderData {
  name: string;
  price: string;
  isLiked?: boolean;
  image?: string;
  id?: string;
  productId: number;
  modelNumber?: string;
  sku?: string;
  title?: string;
  productCode?: string;
}

//TODO: need to review with ayush
export interface ArrowDTO {
  onClick?: any;
  btnType: string;
}
export interface SliderItemDTO {
  image: string;
  description: string;
}
export interface ImageSliderItemDTO {
  name: string;
  rating: number;
  duration: string;
  description: string;
}
export interface MultiImgDTO {
  productcode: number;
  name?: string;
  items: Array<SliderItemDTO>;
}
export interface IconSliderItemDTO {
  image: string;
  name: string;
}

interface PhoneNumber {
  PhoneNumber: string;
  Type: string;
}

type ReviewDTO = {
  Id?: number;
  AuthorImage: string;
  AuthorName: string;
  City: string;
  Rating: number | null;
  State: string;
  Text: string;
};

export type SingleSliderDTO = {
  reviews: ReviewDTO[];
  brand?: string;
};

export type Promotion = {
  PromotionalText: string;
  Disclaimer: string;
};

type StoresDTO = {
  BrandName: string;
  AddressLine1: string;
  Latitude: number;
  Longitude: number;
  PhoneNumber: PhoneNumber[];
  OpenAt: string | null;
  CloseAt: string | null;
  Distance?: string | number;
  City?: string;
  StateCode?: string;
  ZipCode?: string;
  Id?: string;
};

export type StoreOfferSliderDTO = {
  Promotions?: Promotion[];
  NearByStores?: StoresDTO[];
  sectionName: "PromotionSection" | "NearBySection";
};
