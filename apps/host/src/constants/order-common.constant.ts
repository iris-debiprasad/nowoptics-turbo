export const addToCartInitialPayload = {
    PatientId: null,
    CreatedForStoreId: null,
    CreatedByStoreId: null,
    OrderCategoryId: null,
    Orders: [{}],
  };


  export const orderTypeCode = {
    EXAM: {
      id: 1,
      description: "Exam",
      code: "EX",
    },
    SPECTACLE: {
      id: 2,
      description: "Spectacle",
      code: "SP",
    },
    CONTACT: {
      id: 3,
      description: "Contact Lens",
      code: "CL",
    },
    OTC: {
      id: 4,
      description: "OTC",
      code: "OC",
    },
    LOYALTY_CLUB: {
      id: 5,
      description: "Loyalty Club",
      code: "LC",
    },
    WARRANTY: {
      id: 6,
      description: "Warranty",
      code: "WR",
    },
  };

  export const otcProductType = "OC";



export const productTypeCode = {
  FRAME: "FR",
  OTC: "OTC",
  CONTACT: "CL",
  EXAM: "EX",
  LOYALTY: "LP",
  OC: "OC",
};