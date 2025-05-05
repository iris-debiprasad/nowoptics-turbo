import { Dayjs } from "dayjs";

export type SelectOption = {
  Id: number;
  Code: string;
  Description: string;
};

export interface ProductSelectionStep2TableDataResultDTO {
  Bridge: number;
  EffectiveDiameter: number;
  EyeSize: number;
  Id: number;
  ItemNumber: string | null;
  ManufacturerColor: string | null;
  MasterProductId: number;
  OrderDate: Dayjs | null;
  OrderNumber: string | null;
  ProductName: string | null;
  ProductVariantId: number;
  Temple: number;
  VariantNumber: string | null;
  VerticalLensHeight: number;
}

export type Order = "asc" | "desc" | null;

export type addPOFFormDTO = {
  frameName: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  eyeSize: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  mount: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  temple: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  color: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  bridge: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  holdPOF: {
    value: boolean;
    error: boolean;
    errorMessage: string;
  };
  verticalLensHeight: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  id?: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
};

export type remakeExchangeDTO = {
  remakeExchangeTypeStep1?: remakeExchangeTypeStep1DTO;
  productSelectionStep2?: productSelectionStep2DTO;
  selectPerceptions?: SelectPerceptionsDTO;
};

export type remakeExchangeTypeStep1DTO = {
  remakeType: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
  remakeReason: {
    value: string | null;
    error: boolean;
    errorMessage: string;
  };
};

export type productSelectionStep2DTO = {
  barcode: {
    value: string | null | number;
    error: boolean;
    errorMessage: string;
    valueObject: any;
  };
  searchProduct: {
    value: boolean;
    error: boolean;
    errorMessage: string;
  };
  purchaseOriginalFrame: {
    value: boolean;
    error: boolean;
    errorMessage: string;
    valueObject?: any;
  };
  continueWithOriginalFrame: {
    value: boolean;
    error: boolean;
    errorMessage: string;
  };
  addPOF: {
    value: string | null;
    error: boolean;
    errorMessage: string;
    valueObject: null | any;
    isSearchPOF: boolean;
  };
};

export type SelectPerceptionsDTO = {
  value: boolean | number | null;
  error: boolean;
  errorMessage: string;
  valueObject: null | any;
};
