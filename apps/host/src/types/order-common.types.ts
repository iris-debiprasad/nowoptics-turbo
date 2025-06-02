export interface valuesProps {
  counts: (string | number)[];
  start: number;
  end: number;
  gap: number;
}
export interface FacetsListProps {
  type: string;
  values: (string | number)[] | valuesProps;
  displayName: string;
  position: number;
  filterField: string;
}

export interface ProductFacetsResponse {
  [key: string]: FacetsListProps;
}

export interface ExpandedDTO {
  bridge_uFilter: boolean;
  color_uFilter: boolean;
  eye_size_uFilter: boolean;
  frame_type_uFilter: boolean;
  gender_uFilter: boolean;
  material_uFilter: boolean;
  ourPrice: boolean;
  promotion_type_uFilter: boolean;
  shape_uFilter: boolean;
  temple_uFilter: boolean;
  frame_category_uFilter: boolean;
  cl_wear_uFilter: boolean;
}

export interface RangeDTO {
  start: number;
  end: number;
  gap: number;
  counts: any[];
}

export interface FilterDTO {
  [key: string]: string[] | number[];
}

export interface VariantDTO {
  variantId: string;
  variantNumber: string;
  price: number;
  ourPrice: number;
  images: string;
  vColor: string[];
  vTitle: string;
  parent_unbxd: boolean;
  parentId: string;
  timeStamp_unbxd: number;
  unbxdFeedId: string;
  id: string;
  sku: string;
  title: string;
  description: string;
  modelnumber: string;
  vendor: string;
  productgroup: string;
  color: string[];
  brand: string[];
  gender: string[];
  shape: string;
  material: string;
  frame_type: string;
  eye_size: number;
  bridge: number;
  temple: number;
  frame_width: string;
  cl_wear: string;
  manufacturer: string;
  sale_quantity: string;
  package_description: string;
  wear_frequency: string;
  contact_lens_material: string;
  doctype: string;
  autosuggest: string;
  autosuggest_unstemmed: string;
  _root_: string;
  score: 0.5;
  vId: string;
  mPrice?: string;
}

export interface ProductDTO {
  uniqueId: string;
  id: string;
  sku: string;
  title: string;
  price: number;
  description: string;
  modelnumber: string;
  vendor: string;
  imageUrl: string[];
  images: string[];
  productgroup: string;
  color: string[];
  brand: string[];
  gender: string[];
  shape: string;
  material: string;
  frame_type: string;
  eye_size: string;
  bridge: string;
  temple: string;
  frame_width: string;
  cl_wear: string;
  manufacturer: string;
  sale_quantity: string;
  package_description: string;
  wear_frequency: string;
  contact_lens_material: string;
  timeStamp_unbxd: number;
  unbxdFeedId: string;
  doctype: string;
  autosuggest: string;
  autosuggest_unstemmed: string;
  unx_popularity_default: number;
  parent_unbxd: boolean;
  frame_category?: string;
  variants: VariantDTO[];
}

export interface VariantProps {
  product: ProductDTO;
  variantColors: string[];
}

export interface SortComponentProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleClickSortBy: (field: string) => void;
  sortField: string;
}

export interface PreselectedProps {
  [key: string]: string[];
}

export interface ContactLensUnbxdResponse {
  uniqueId: string;
  id: string;
  title: string;
  description: string;
  modelnumber: string;
  vendor: string;
  mimages: string;
  productgroup: string;
  shape: string;
  material: string;
  frame_type: string;
  frame_width: string;
  cl_wear: string;
  manufacturer: string;
  sale_quantity: string;
  package_description: string;
  wear_frequency: string;
  contact_lens_material: string;
  frame_category: string;
  mmetatitle: string;
  mmetadescription: string;
  mPrice: number;
  mOurPrice: number;
  timeStamp_unbxd: number;
  unbxdFeedId: string;
  doctype: string;
  autosuggest: string;
  autosuggest_unstemmed: string;
  variantCount: number;
  variantTotal: number;
  parent_unbxd: boolean;
  unx_popularity_default: number;
  _root_: string;
  score: number;
  variants: VariantDTO[];
}

export interface ContactLensProps {
  data: any;
  key?: number;
  showDetails?: boolean;
}

export interface details {
  image: string;
  description: string;
}

export interface specifications {
  name: string;
  value: string;
}

export interface selectLensesProps {
  toggle: () => void;
  isVisible: boolean;
  handleAddPrescription: () => void;
  handleFindPrescription: () => void;
  handleContinueWithoutPrescription: () => void;
}

export interface addPrescriptionProps {
  toggle: () => void;
  isVisible: boolean;
  myAccountAddPrescription?: boolean;
  handleShowPrescription: () => void;
  handleSave: (data: addedDataType) => void;
  handleBack: () => void;
}

export interface addedDataType {
  [key: string]: {
    right: string;
    left: string;
  };
}

export interface findPrescriptionProps {
  toggle: () => void;
  isVisible: boolean;
  handleBackClick: () => void;
}

export interface addNewPrescriptionPopupDataType {
  heading: string;
  description: string;
  leftDescription?: string;
  rightDescription?: string;
}

export interface addNewPrescriptionDataType {
  name: string;
  title: string;
  info: addNewPrescriptionPopupDataType;
  rightData?: string[];
  leftData?: string[];
  type: string;
}

export interface addNewPrescriptionUserInputType {
  [key: string]: {
    right: string;
    left: string;
  };
}

export interface addNewContactsPrescriptionDataType {
  name: string;
  title: string;
  info: addNewPrescriptionPopupDataType;
  options?: string[];
  type: string;
}

export interface prescriptionSummaryType {
  frame_price_before: number;
  frame_price_after: number;
  subtotal: number;
}

export interface stockQuantitySearchListProps {
  userInput: string;
}

export interface stockQualityModalDataType {
  storeId: string;
  location: string;
  quantity: number;
}

export interface GetQueryParamsType {
  email?: string;
  filters?: string;
  pageNumber?: number;
  pageSize?: number;
  sortDescending?: boolean;
  sortField?: string;
}

export interface EyeGlassType {
  CanBeEdited: boolean;
  Date: string;
  ExpirationDate: string;
  Id: number;
  PatientPaperCaptureId: number;
  RxType: string;
  SourceType: string;
  IsExpired?: boolean;
}

export type Order = "asc" | "desc";

export interface stockQuantityDataType {
  Id: number;
  StoreNumber: string;
  StoreLocation: string;
  StoreQuantity: number;
}

// API data Types

export interface ProductDetailVariantType {
  Id: number;
  Description: string;
  VariantNumber: string | null;
  ColorId: number | null;
  ColorDescription: string | null;
  ManufacturerColor: string;
  Model?: string;
  ProductName?: string;
}

export interface ProductDetailFrameDetailType {
  ProductName: string;
  VariantId: number;
  VariantNumber: string;
  Price: number;
  PromotionApplied: null;
  Description: string;
  LensHeight: number | null;
  FrameWidth: number;
  BridgeWidth: number;
  LensWidth: number;
  TempleLength: number;
  Model: string;
  EyeSize: number;
  Material: string;
  Type: string;
  Gender: string;
  FrameType: string;
  Shape: string;
  MasterProductId: number | null;
  Color: string | null;
  ManufacturerColor: string;
  Images: ProductDetailImageType[];
  Variants: ProductDetailVariantType[];
  Brand?: string;
  ListPrice?: number;
}

export interface ProductDetailImageType {
  AlternateText: string;
  ImageType: string;
  ImageUrl: string;
}
export interface ProductDetailContactDetailType {
  ProductName: string;
  ProductDescription: string;
  VariantId: number;
  VariantNumber: string;
  ListPrice: number | null;
  Price: number | null;
  PromotionApplied: null;
  Description: string;
  Model: string;
  MasterProductId?: string;
  VisionType: string;
  Material: string;
  Manufacturer: string;
  Brand: string;
  ContactType: string;
  WaterContent: number;
  AnnualSupplyQty: number;
  BoxQty: number;
  DaysSupply: number;
  Images: ProductDetailImageType[];
  PackSizes: PackType[];
  Colors: ColorType[];
  PromotionalMessage: string;
  SupplyText: string;
  Shape?: string;
  FrameType?: string;
  Type?: string;
  SubBrandId?: number;
}

export interface ColorType {
  ColorId: number;
  Color: string;
}

export interface PackType {
  BoxQty: number;
  IsSelected: boolean;
  MasterProductId: number;
  Model: string;
  ProductName: string;
  AnnualRebatePriceText?: string;
  AnnualPromotionalPriceText?: string;
  AnnualRebatePrice?: number;
  AnnualPromotionalPrice?: number;
  SupplyText?: string;
  IsAnnualSupply?: boolean;
  SixMonthsPromotionalPrice?: number;
  SixMonthsPromotionalPriceText?: string;
  SixMonthsRebatePrice?: number;
  SixMonthsRebatePriceText?: string;
  IsDiagnostic?: boolean;
}

export interface OtcProductDetailType {
  MasterProductId: number;
  ProductName: string;
  ProductDescription: string;
  ListPrice: number;
  Price: number;
  Description: string;
  Model: string;
  Manufacturer: string;
  Brand: string | null; // todo check with masood if we can get brand null as well or not
  MaxSaleQuanity: number;
  Images: ProductDetailImageType[];
  VariantId: string;
}
export interface ProductDetailType {
  ProductType: string;
  FrameDetail?: ProductDetailFrameDetailType | null;
  ContactLensDetail: ProductDetailContactDetailType | null;
  OtcDetail: OtcProductDetailType | null;
  FreeShippingText?: string;
}
export interface CommonTableSkeletonProps {
  rows: number;
  columns: number;
  headSkeletonHeight: number;
  bodySkeletonHeight: number;
}

export interface UNBXD_DTO {
  pid?: String;
  url: String;
  visit_type: String;
  requestId?: String;
  uid?: String;
  t: String;
  referrer?: string;
}

export interface ProductViewProps {
  pid?: string;
  requestId?: string;
  sku?: string;
  productDetails: ProductDetailType | any;
}

export interface LensOptionColorsLevel2 {
  ColorId: number;
  ColorName: string;
}

export interface LensOption {
  MasterProductId: number;
  ProductVariantId: number;
  LensOptionName: string;
  LensOptionId: number;
  ProductVariantNumber: null;
  IsFree: boolean;
  ListPrice: number | null;
  SellingPrice: number | null;
  LensOptionColors: null | LensOptionColorsLevel2[];
}

export interface LensTypeOption {
  MasterProductId: number;
  ProductVariantId: number;
  ProductVariantNumber: null;
  LensTypeOptionId: number;
  LensTypeOptionName: string;
  IsFree: boolean;
  IsIncluded: boolean;
  ListPrice: number | null;
  SellingPrice: number | null;
}

export interface LensMaterial {
  MasterProductId: number;
  ProductVariantId: number;
  LensMaterialId: number;
  LensMaterialName: string;
  LensMaterialDescription: string;
  ProductVariantNumber: null;
  IsFree: boolean;
  LensOptions: null | LensOption[];
  ListPrice: number | null;
  SellingPrice: number | null;
}

export interface LensType {
  LensTypeId: number;
  LensTypeName: string;
  LensTypeCode: string;
  MasterProductId: number;
  ProductVariantId: number;
  ProductVariantNumber: null;
  ListPrice: number;
  SellingPrice: number;
  LensTypeOptions: LensTypeOption[];
  LensMaterials: LensMaterial[];
}
