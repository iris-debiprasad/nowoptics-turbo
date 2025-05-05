export type StoreSEOData = {
  Id: number;
  StoreNumber: string;
  Type: string;
  Url: string;
  SmallLogoPath: string;
  PosDescription: string;
  WebDescription: string;
  LogoPath: string;
  StoreOpeningDateTime: string;
  StoreClosingDateTime: string;
  StoreWorkingHours: {
    Id: number;
    ScheduleDate: string;
    OpenAt: string;
    CloseAt: string;
  }[];
  Address: {
    AddressLine1: string;
    AddressLine2: null;
    AddressLine3: null;
    ZipCode: string;
    County: string;
    City: string;
    State: string;
    Country: string;
    CountryCode: string;
    Latitude: number;
    Longitude: number;
    Landmark: string;
    StateCode: string;
  };
  Email: string;
  Languages: [];
  GeoLocation: {
    Latitude: string;
    Longitude: string;
  };
  PhoneDetails: [
    {
      PhoneNumber: string;
      PhoneType: string;
      ISD: string;
    },
    {
      PhoneNumber: string;
      PhoneType: string;
      ISD: string;
    }
  ];
  PaymentAccepted: string[];
};

export type ProductSEOData = {
  Type: string;
  Name: string;
  ProductName: string;
  ProductDescription: string;
  Description: string;
  Images: {
    ImageType: string;
    ImageUrl: string;
    AlternateText: string;
  }[];
  Sku: string;
  Mnp: string;
  Brand: {
    Type: string;
    Name: string;
  };
  Review: any;
  Color: string;
  Gender: string;
  Shape: string;
  FrameDetail?: string;
  ProductPrice: number;
  IsProductOutOfStock: boolean;
};
