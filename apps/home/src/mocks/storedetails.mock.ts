import { StoreContentDTO, StoreDetailsDTO } from "@/types/store.type";

export const MockStoreContent: StoreContentDTO =
{
  AboutEyeCareSection:
  {
    Type: "AboutEyeCareSection",
    Heading: "About Eye Care",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    Image: {
      ImageUrl: "https://example.com/image.jpg",
      IsMobileOnly: false,
      AltText: "Eye Care Image",
    },
    AnchorText: "Learn More",
    AnchorUrl: "https://example.com/eye-care",
    Features: [
      {
        Heading: "Feature 1",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        Image: {
          ImageUrl: "https://example.com/feature1.jpg",
          IsMobileOnly: false,
          AltText: "Feature 1 Image",
        },
      },
      {
        Heading: "Feature 2",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        Image: {
          ImageUrl: "https://example.com/feature2.jpg",
          IsMobileOnly: false,
          AltText: "Feature 2 Image",
        },
      },
    ],
  },

  PromotionSection:
  {
    AnchorText: "View Promotions",
    AnchorUrl: "https://example.com/promotions",
    Heading: "Promotions",
    Promotions: [
      {
        PromotionalText: "Get 50% off on selected frames",
        Disclaimer: "Terms and conditions apply",
      },
      {
        PromotionalText: "Free lens upgrade with purchase",
        Disclaimer: "Limited time offer",
      },
    ],
    Type: "PromotionSection",
  },
  FAQSection:
  {
    Type: "FAQSection",
    AnchorText: "View FAQs",
    AnchorUrl: "https://example.com/faqs",
    FAQs: [
      {
        Question: "Question 1",
        Answer: "Answer 1",
      },
      {
        Question: "Question 2",
        Answer: "Answer 2",
      },
    ],
    Heading: "Frequently Asked Questions",
    Image: {
      ImageUrl: "https://example.com/faqs.jpg",
      IsMobileOnly: false,
      AltText: "FAQs Image",
    },
  },
  NearBySection:
  {
    Type: "NearBySection",
    Heading: "Nearby Stores",
  },

  ReviewSection:
  {
    Type: "ReviewSection",
    Heading: "Customer Reviews",
    Reviews: [
      {
        AuthorImage: "https://example.com/author1.jpg",
        AuthorName: "John Doe",
        City: "New York",
        Rating: 5,
        State: "NY",
        Text: "Great service and quality products!",
      },
      {
        AuthorImage: "https://example.com/author2.jpg",
        AuthorName: "Jane Smith",
        City: "Los Angeles",
        Rating: 4,
        State: "CA",
        Text: "I had a wonderful experience shopping here.",
      },
    ],
  }
};


export const MockStoreDetails: StoreDetailsDTO =
{
  AddressLine1: "123 Example St",
  BrandName: "My Store",
  City: "Cityville",
  CloseAt: "18:00", // Replace with null if closing time is not available
  Distance: null,
  HasSameDayDelivery: true,
  IsOnSiteDoctorAvailable: true,
  IsSpeakSpanish: false,
  LandMarks: '',
  Id: 1,
  Latitude: 37.123456,
  Longitude: -122.987654,
  OpenAt: "09:00", // Replace with null if opening time is not available
  PhoneNumber: [
    { PhoneNumber: "123-456-7890", Type: "General" },
    { PhoneNumber: "987-654-3210", Type: "Customer Service" },
  ],
  StateCode: "CA",
  StoreNumber: "STORE001",
  StoreOpeningDateTime: "2023-07-01T09:00:00",
  TimeZone: "Pacific Standard Time",
  TimeZoneCode: "PST",
  TotalCount: 1,
  WebDescription: "Welcome to our store!",
  ZipCode: "12345",
  WorkingHours: [
    { Id: 1, ScheduleDate: "2023-07-01", OpenAt: "09:00", CloseAt: "18:00" },
    { Id: 2, ScheduleDate: "2023-07-02", OpenAt: "09:00", CloseAt: "17:00" },
  ],
  LocationPageName: ""
};



