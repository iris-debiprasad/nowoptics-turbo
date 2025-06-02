interface Image {
  ImageUrl: string;
  IsMobileOnly: boolean;
  AltText: string;
}

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

export interface pageDataPropsDTO {
  pageData: Section;
  brand?: string;
  stockUpFrameData?: any[];
  frameSliderData?: any[];
  sliderIndex?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface homePageDataPropsDTO {
  pageData: Section | Section[];
}

export interface HomePageDTO {
  CarouselSection: Section[];
  CategorySection: Section[];
  InformationSection: Section[];
  LifeStyleSection: Section[];
  TrendSection: Section[];
  ShopByShapeSection: Section[];
  SecondInformationSection: Section[];
  DonationSection: Section[];
  MilitaryDiscountSection: Section[];
  InsuranceSection: Section[];
  MeetStanSection: Section[];
}