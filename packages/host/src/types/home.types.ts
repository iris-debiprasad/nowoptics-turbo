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
  
  export interface HomePageDTO {
    HeaderBannerSection: Section[];
    BookEyeExamSection: Section[];
    ReferSection: Section[];
    BuyNowSection: Section[];
    InsuranceSection: Section[];
    ContactLensesSection: Section[];
    FramesSection: Section[];
    FeaturedServicesSection: Section[];
    CategorySection: Section[];
  }

export interface pageDataPropsDTO {
  pageData: Section;
  brand?: string;
  stockUpFrameData?: any[],
  frameSliderData?: any[]
}

export interface FAQItem {
  question: string;
  answer: string;
}
