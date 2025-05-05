export type warrantyOrderDTO = {
  productSelectionStep2?: productSelectionStep2DTO;
  selectPerceptions?: SelectPerceptionsDTO;
};

export type productSelectionStep2DTO = {
  barcode: {
    value: string | null | number;
    error: boolean;
    errorMessage: string;
    valueObject: null | any;
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
  selectedOptions: {
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
  warrantyDetails: {
    id: string | number;
    code: string;
    description: string;
    frameWarrantyClick: boolean;
    lensWarrantyClick: boolean;
    frameAndLensWarrantyClick: boolean;
  };
  continueWithOriginalPackage: {
    value: boolean;
    error: boolean;
    errorMessage: string;
  };
};

export type SelectPerceptionsDTO = {
  value: string | null;
  error: boolean;
  errorMessage: string;
  valueObject: any;
};
