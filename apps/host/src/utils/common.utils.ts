import { selectPatientDataTypes } from "../types/selectPatientAssociateModal.types";
import {
  CheckGuidedSalesEnableForState,
  GetCurrentLocation,
  GetDefaultStoreId,
} from "../service/common.service";
import {
  StoreAddressType,
  StoreDetailsDTO,
} from "@root/host/src/types/SideBar.types";
import { NextRouter } from "next/router";
import {
  AppEvents,
  APPOINTMENT_SELECT_STORE_ACTION,
  BRAND,
  BRAND_NAME_INDEX,
  DATE_FORMAT,
  MASKED_DATE,
  RESTRICTED_AREA_LOCATION,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import {
  ProductDetailType,
  ProductDetailVariantType,
  VariantDTO,
} from "@root/host/src/types/order-common.types";
import {
  addToCartInitialPayload,
  orderTypeCode,
  productTypeCode,
} from "@root/host/src/constants/order-common.constant";
import { SendEventJourney } from "@root/host/src/service/common.service";
import { EventJourneyPayload } from "@root/host/src/types/Header.types";
import { GetUserSate } from "@root/host/src/service/special-offer.service";

type DownloadFileDTO = {
  FileContents: string;
  ContentType: string;
  FileDownloadName: string;
};

export const nameFieldValidator = (name: string) => {
  let validatedName = name
    .trim()
    .split(/[\s,\t,\n]+/)
    .join(" ");
  return validatedName;
};

export const clearLocalStorage = async () => {
  const language = localStorage.getItem("language") || "en";
  const defaultStoreId = localStorage.getItem("defaultStoreId");
  localStorage.clear();
  localStorage.setItem("language", language);
  localStorage.setItem("defaultStoreId", defaultStoreId || "");
  localStorage.setItem("redirectTab", `${Math.random()}`);
  checkBrand();
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const stringToSlug = (title: string) => {
  title = title.replace(/^\s+|\s+$/g, ""); // trim
  title = title.toLowerCase();
  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  let i = 0;
  const l = from.length;
  for (i = 0; i < l; i++) {
    title = title.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  title = title
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return title;
};

export const generateProductLink = (
  modelnumber: string,
  title: string,
  sku?: string | null,
  productgroup?: string | null
) => {
  if (modelnumber && title) {
    const modalTag: string =
      modelnumber !== undefined ? `${stringToSlug(modelnumber)}` : "";
    const nameTag: string =
      title !== undefined ? `-${stringToSlug(title)}` : "";
    if (sku) {
      if (productgroup === "CL") {
        const skuTag = sku.toLowerCase();
        return `${skuTag}-${modalTag}`;
      }
      return `${sku}-${modalTag}${nameTag}`;
    }
    return `${modalTag}${nameTag}`;
  }

  return "";
};

export const setSelectedPatientToLocalStorage = (
  patient: selectPatientDataTypes | {},
  valuesToModify?: Record<string, any>
) => {
  const updatedPatient = { ...patient, ...valuesToModify };

  localStorage.setItem(
    "CurrentSelectedPatient",
    JSON.stringify(updatedPatient)
  );
};

/**
 *  update store card id for guest and
 *  used in subsequent order
 * @param storeCartId
 */
export const setGuestToLocalStorage = (storeCartId: string) => {
  localStorage.setItem("guestCartId", storeCartId);
};

export const getGuestToLocalStorage = () => {
  return localStorage.getItem("guestCartId");
};

export const getSelectedPatientFromLocalStorage = () => {
  let patient = localStorage.getItem("CurrentSelectedPatient");
  return patient ? JSON.parse(patient) : {};
};

export const deleteSelectedPatientFromLocalStorage = () => {
  localStorage.removeItem("CurrentSelectedPatient");
};

export const isMobileDevice = () => {
  let isMobileDevice = false;

  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    isMobileDevice = true;
  } else {
    isMobileDevice = false;
  }
  return isMobileDevice;
};

/**
 * Removes the format of a phone number
 *
 * @param phoneNumber Phone number to be unformatted.
 * @returns unformatted value
 *
 * @example
 * const phoneNumber: string = "(123) 123-4567"
 * const unformattedPhoneNumber: string = unformatPhoneNumber(phoneNumber)
 * console.log(unformattedPhoneNumber) // "1231234567"
 */
export const unformatPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.replace(/[^0-9]/g, "");

/**
 *  book eye exam by changing store
 * @param selectedStore
 */
export const bookEyeExamHandler = (
  router: NextRouter | null,
  selectedStore: StoreDetailsDTO | StoreAddressType
) => {
  localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
  window.dispatchEvent(new Event(AppEvents.STORE_CHANGE));
  if (router) {
    router.push("/book-eye-exam");
  }
};
export const handleBookAppointment = (
  router: NextRouter | null,
  id: string
) => {
  if (router) {
    {
      router.push(
        {
          pathname: `/appointments}`,
          query: {
            actionType: APPOINTMENT_SELECT_STORE_ACTION.CREATE,
            storeIdToLoad: id,
          },
        },
        `/appointments/`
      );
    }
  }
};

export function formatDate(inputDateString: string): string {
  return new Date(inputDateString).toLocaleDateString("en-US");
}

export const getProductImage = (product: VariantDTO) => {
  if (product === undefined || product === null) {
    return null;
  }
  const { images } = product;
  let parsedImages = [];
  if (images !== undefined && images !== null) {
    parsedImages = JSON.parse(images);
  }
  if (parsedImages.length > 0) {
    return parsedImages[0];
  }
  return null;
};

export const getContactLensImage = (product: any) => {
  if (product === undefined || product === null) {
    return null;
  }
  try {
    const { mimages } = product;
    let parsedImages = [];
    if (mimages !== undefined && mimages !== null) {
      parsedImages = JSON.parse(mimages);
    }
    if (parsedImages.length > 0) {
      return parsedImages[0];
    }
    return null;
  } catch (err) {
    return null;
  }
};

export function formatToTwoDecimalPlaces(number: number) {
  if (typeof number === "number") {
    return number.toFixed(2);
  } else {
    return null;
  }
}

export const isDefaultImage = (productImage: string) => {
  return productImage === "mountain_medium_icon";
};

export const getVariantColor = (variants: VariantDTO[]) => {
  let color: string[] = [];
  for (let variant of variants) {
    if (variant && variant.vColor && variant.vColor.length > 0) {
      color = [...color, ...variant.vColor];
    }
  }
  return color;
};

export const DownloadFile = (data: DownloadFileDTO) => {
  const textContent = Buffer.from(data.FileContents, "base64").toString(
    "utf-8"
  );
  const blob = new Blob([textContent], { type: data.ContentType });
  const link = window.URL.createObjectURL(blob);
  const docFile = document.createElement("a");
  docFile.style.display = "none";
  document.body.appendChild(docFile);
  docFile.href = link;
  docFile.download = data.FileDownloadName;
  docFile.click();
};

/**
 *  format "001,002,003" to
 *  "001, 002, 003"
 * @param data
 */
export function formattedCommaSeparatedString(data: string): string {
  return data.split(",").join(", ");
}

export function autoLogoutHandler() {
  const user = localStorage.getItem("user");
  const userType = user ? JSON.parse(user)?.userType : null;

  if (userType === USER_TYPE.ASSOCIATE || userType === USER_TYPE.PATIENT) {
    localStorage.removeItem("selectedStore");
    localStorage.removeItem("user");
  }

  localStorage.removeItem("isCDCUser");
  localStorage.removeItem("empUserName");
  localStorage.removeItem("userId");
  localStorage.removeItem("session");
  //TODO: will remove in future after code refctor
  localStorage.removeItem("isEmployee");
  localStorage.removeItem("empUserName");
}

export const formatPhoneNumber = (number: string, change: boolean) => {
  let phonenumber = "";
  if (change) {
    const cleanedInput = number.replace(/\D/g, "");
    let formattedValue = "";
    for (let i = 0; i < cleanedInput.length; i++) {
      if (i === 0) {
        formattedValue = `(${cleanedInput[i]}`;
      } else if (i === 3) {
        formattedValue += `) ${cleanedInput[i]}`;
      } else if (i === 6) {
        formattedValue += `-${cleanedInput[i]}`;
      } else {
        formattedValue += cleanedInput[i];
      }
    }
    return formattedValue;
  } else {
    if (!!number) {
      phonenumber = phonenumber + `(${number.slice(0, 3)}) `;
      phonenumber = phonenumber + number.slice(3, 6);
      phonenumber = phonenumber + `-${number.slice(6, 10)}`;
    }
    return phonenumber;
  }
};

export const getVooToolData = () => {
  const data: any = {};
  // vooTool data mapping
  data.LeftEyeProgressive = localStorage.getItem("left_eye_progressive");
  data.RightEyeProgressive = localStorage.getItem("right_eye_progressive");
  data.LeftEyeBiFocal = localStorage.getItem("left_eye_bifocal");
  data.RightEyeBiFocal = localStorage.getItem("right_eye_bifocal");
  data.RightPd = localStorage.getItem("right_pd");
  data.LeftPd = localStorage.getItem("left_pd");
  data.RightOCHt = localStorage.getItem("right_oc_ht");
  data.LeftOCHt = localStorage.getItem("left_oc_ht");
  return data;
};

export const getLineItemsArray = (MasterProductIds: number[] | undefined) => {
  if (MasterProductIds === undefined) return [];
  const productDetail = JSON.parse(
    localStorage.getItem("viewProductData") || "{}"
  );

  const lineItemsArray: {
    masterProductId: number;
    productVariantId: number | null;
    quantity: number;
  }[] =
    productDetail?.FrameDetail?.MasterProductId ||
    productDetail?.FrameDetail?.VariantId
      ? [
          {
            masterProductId: productDetail?.FrameDetail?.MasterProductId,
            productVariantId: productDetail?.FrameDetail?.VariantId,
            quantity: 1,
          },
        ]
      : [];

  MasterProductIds.forEach((id) => {
    lineItemsArray.push({
      masterProductId: id,
      productVariantId: null,
      quantity: 1,
    });
  });

  return lineItemsArray;
};

export const modifyAddToCartData = async (
  productData: ProductDetailType | null,
  productDataId: string,
  prescriptionData: any,
  patientId?: string,
  selectedVarient?: ProductDetailVariantType,
  //TODO: update the type of lens material data after gettinf confirmation
  userLensMaterialSelection?: any,
  selectedPrescriptionId?: number,
  userType?: string,
  isFrameOnly?: boolean,
  qty?: number,
  orderTypeCodeOTC?: string,
  orderCategoryCode?: string,
  contactBoxSelection?: {
    [type: string]: number;
  },
  masterProductIds?: number[],
  variantId?: {
    leftVariantId: number | null;
    rightVariantId: number | null;
  }
) => {
  //TODO: Update data type after getting lens type data in cart data
  let data: any = JSON.parse(JSON.stringify(addToCartInitialPayload));
  data.PatientId = patientId;

  const selectedStoreData = localStorage.getItem("selectedStore");
  const selectedRxData = JSON.parse(
    localStorage.getItem("addNewPrescriptionData") || "{}"
  );

  if (selectedStoreData && userType === USER_TYPE.ASSOCIATE) {
    const selectedStore = JSON.parse(selectedStoreData);

    data.CreatedForStoreId = selectedStore.Id;
    data.CreatedByStoreId = selectedStore.Id;
  }

  //TODO: Order category ID will be prent in product data
  data.OrderCategoryCode = orderCategoryCode || "N";
  data.RxId = selectedPrescriptionId;

  data.Orders[0].OrderTypeCode = orderTypeCodeOTC
    ? orderTypeCodeOTC
    : isFrameOnly
    ? orderTypeCode.OTC.code
    : productData?.ProductType;

  data.Orders[0].OrderCategoryCode = "N";

  data.Orders[0].LineItems = [];
  //Creating Line items
  if (selectedRxData?.rxOverrideTypeId) {
    data.Orders[0].RxOverrideTypeId = selectedRxData?.rxOverrideTypeId;
  }
  let lineItem: any = {};

  lineItem.ProductVariantId =
    selectedVarient?.Id || productData?.ContactLensDetail?.VariantNumber;
  lineItem.MasterProductId =
    productData?.FrameDetail?.MasterProductId ||
    productData?.ContactLensDetail?.MasterProductId ||
    productData?.OtcDetail?.MasterProductId;
  lineItem.Quantity = qty ? qty : 1;

  //SPECTACLE case
  if (productData?.ProductType === productTypeCode.FRAME) {
    data.Orders[0].LineItems = getLineItemsArray(masterProductIds || []);
  } else {
    if (productData?.ProductType === orderTypeCode.CONTACT.code) {
      data.Orders[0].LineItems = [];
      if (contactBoxSelection && contactBoxSelection.left > 0) {
        lineItem.Quantity = contactBoxSelection?.left;
        lineItem.ProductVariantId = variantId?.leftVariantId
          ? variantId?.leftVariantId
          : lineItem.ProductVariantId;
        lineItem.Eye = "left";
        data.Orders[0].LineItems = [
          ...data.Orders[0].LineItems,
          { ...lineItem },
        ];
      }
      if (contactBoxSelection && contactBoxSelection.right > 0) {
        lineItem.Quantity = contactBoxSelection?.right;
        lineItem.ProductVariantId = variantId?.rightVariantId
          ? variantId?.rightVariantId
          : lineItem.ProductVariantId;
        lineItem.Eye = "right";
        data.Orders[0].LineItems = [
          ...data.Orders[0].LineItems,
          { ...lineItem },
        ];
      }
    } else {
      data.Orders[0].LineItems.push(lineItem);
    }
  }

  data.Orders[0].Prescription = {};
  if (prescriptionData && !selectedPrescriptionId) {
    data.Orders[0].Prescription.PatientPaperCaptureId =
      prescriptionData?.PatientPaperCaptureId;
    data.Orders[0].Prescription.IsSpectacleRx = prescriptionData?.IsSpectacleRx;
    data.Orders[0].Prescription.ExpirationDate =
      prescriptionData?.ExpirationDate;
    data.Orders[0].Prescription.RightSphere =
      prescriptionData?.RightEyeEntity?.Sphere;
    data.Orders[0].Prescription.LeftSphere =
      prescriptionData?.LeftEyeEntity?.Sphere;
    data.Orders[0].Prescription.RightCylinder =
      prescriptionData?.RightEyeEntity?.Cylinder;
    data.Orders[0].Prescription.LeftCylinder =
      prescriptionData?.LeftEyeEntity?.Cylinder;
    data.Orders[0].Prescription.RightAxis =
      prescriptionData?.RightEyeEntity?.Axis;
    data.Orders[0].Prescription.LeftAxis =
      prescriptionData?.LeftEyeEntity?.Axis;

    data.Orders[0].Prescription.LeftBrandId =
      prescriptionData?.LeftEyeEntity?.BrandId;
    data.Orders[0].Prescription.LeftDiameter =
      prescriptionData?.LeftEyeEntity?.Diameter;
    data.Orders[0].Prescription.LeftBaseCurve =
      prescriptionData?.LeftEyeEntity?.BaseCurve;

    data.Orders[0].Prescription.RightAdd =
      prescriptionData?.RightEyeEntity?.Add;
    data.Orders[0].Prescription.LeftAdd = prescriptionData?.LeftEyeEntity?.Add;
    data.Orders[0].Prescription.RightMonoPd =
      prescriptionData?.RightEyeEntity?.MonoPd;
    data.Orders[0].Prescription.LeftMonoPd =
      prescriptionData?.LeftEyeEntity?.MonoPd;
    data.Orders[0].Prescription.RightPin =
      prescriptionData?.RightEyeEntity?.Pin;
    data.Orders[0].Prescription.LeftPDown =
      prescriptionData?.LeftEyeEntity?.PDown;
    data.Orders[0].Prescription.RightPDown =
      prescriptionData?.RightEyeEntity?.PDown;
    data.Orders[0].Prescription.LeftPout =
      prescriptionData?.LeftEyeEntity?.Pout;
    data.Orders[0].Prescription.RightPout =
      prescriptionData?.RightEyeEntity?.Pout;
    data.Orders[0].Prescription.LeftPin = prescriptionData?.LeftEyeEntity?.Pin;
    data.Orders[0].Prescription.RightPup =
      prescriptionData?.RightEyeEntity?.Pup;
    data.Orders[0].Prescription.LeftPup = prescriptionData?.LeftEyeEntity?.Pup;
    data.Orders[0].Prescription.RightBrandId =
      prescriptionData?.RightEyeEntity?.BrandId;
    data.Orders[0].Prescription.RightDiameter =
      prescriptionData?.RightEyeEntity?.Diameter;
    data.Orders[0].Prescription.RightBaseCurve =
      prescriptionData?.RightEyeEntity?.BaseCurve;
  } else if (selectedPrescriptionId) {
    data.Orders[0].Prescription.PrescriptionId = selectedPrescriptionId;
  } else {
    data.Orders[0].Prescription = null;
  }

  //TODO: Update POF after adding POF flow to the frontend
  // data.Orders[0].POF.ManufacturerId = 1;
  // data.Orders[0].POF.ProductName =
  //   productData?.FrameDetail?.ProductName ||
  //   productData?.ContactLensDetail?.ProductName;
  // data.Orders[0].POF.EyeSize = productData?.FrameDetail?.EyeSize;
  // data.Orders[0].POF.Bridge = productData?.FrameDetail?.BridgeWidth;
  // data.Orders[0].POF.VerticalLensHeight = productData?.FrameDetail?.LensHeight;
  // data.Orders[0].POF.Temple = productData?.FrameDetail?.TempleLength;
  // data.Orders[0].POF.Color = selectedVarient?.ColorDescription;

  if (!userType) {
    data.id = localStorage.getItem("guestCartId");
    data.OrderCategoryCode = "N";
  }
  //INFO: comment for now
  const vooToolData = getVooToolData();
  const voPatientPaperCaptureIDs = localStorage.getItem(
    "VoPatientPaperCaptureIDs"
  );

  data.Orders[0] = {
    ...data.Orders[0],
    ...vooToolData,
    VoPatientPaperCaptureIDs: voPatientPaperCaptureIDs
      ? JSON.parse(voPatientPaperCaptureIDs)
      : [],
  };

  return data;
};

export type TBrand = "SO" | "MEL";

export const setBrand = () => {
  const BASE_BRAND = process.env.NEXT_PUBLIC_BRAND;

  if (!BASE_BRAND) {
    const BASE_URL = window.location.origin;
    if (BASE_URL.includes("myeyelab")) {
      localStorage.setItem("brand", BRAND.MEL);
    } else {
      localStorage.setItem("brand", BRAND.SO);
    }
  } else {
    if (BASE_BRAND === BRAND.MEL) {
      localStorage.setItem("brand", BRAND.MEL);
    } else {
      localStorage.setItem("brand", BRAND.SO);
    }
  }
};

export const checkBrand = (): string => {
  const BASE_BRAND = localStorage.getItem("brand");
  if (BASE_BRAND === BRAND.MEL) {
    return BRAND.MEL;
  } else {
    return BRAND.SO;
  }
};

export const checkBrandBaseURL: () => TBrand = (): TBrand => {
  const BASE_BRAND = process.env.NEXT_PUBLIC_BRAND;
  if (BASE_BRAND === BRAND.MEL) {
    return BRAND.MEL as "MEL";
  } else {
    return BRAND.SO as "SO";
  }
};

export const isMaskedDOB = (date: string) => {
  return date === MASKED_DATE;
};

export const getSmallScreenBreakpoint = () => {
  if (typeof window !== "undefined") {
    return parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--small"),
      10
    );
  }
  return 600; // Default small screen size
};

export const getStoreIdForDefaultStore = async () => {
  try {
    const response = await GetDefaultStoreId();
    localStorage.setItem("defaultStoreId", response.data.Result.Id);
  } catch (error) {
    throw error;
  }
};
/**
 *  Need to add newly created Protected route
 *  for tab routing
 * @param urlPathName
 * @returns
 */

export const isProtectedPath = (urlPathName: string) => {
  return (
    urlPathName.startsWith("/managed-care") ||
    urlPathName.startsWith("/appointments") ||
    urlPathName.startsWith("/doctor-scheduler") ||
    urlPathName.startsWith("/intake") ||
    urlPathName.startsWith("/operations") ||
    urlPathName.startsWith("/patient") ||
    urlPathName.startsWith("/patient-communication") ||
    urlPathName.startsWith("/setup") ||
    urlPathName.startsWith("/job-tracking") ||
    urlPathName.startsWith("/pending-cart") ||
    urlPathName.startsWith("/self-checkin") ||
    urlPathName.startsWith("/orders/pending-web-orders") ||
    urlPathName.startsWith("/job-tracking") ||
    (urlPathName.startsWith("/my-account") && urlPathName !== `/my-account`)
  );
};

export function updateEventJourney(
  eventData: EventJourneyPayload,
  captchaToken: string
) {
  SendEventJourney(eventData, captchaToken)
    .then((resp) => {})
    .catch((err) => {
      console.log(err);
    });
}

export const getLatLongForUser = () => {
  return new Promise((res, rej) => {
    GetCurrentLocation()
      .then((resp) => {
        const locationData = resp.data;
        if (locationData?.location?.lat && locationData?.location?.lng) {
          res({
            lat: locationData.location.lat,
            lng: locationData.location.lng,
          });
        } else {
          res({ lat: null, lng: null });
        }
      })
      .catch((error) => {
        res({ lat: null, lng: null });
      });
  });
};

export const getStateCodeForUser = (lat: any, lng: any) => {
  return new Promise((res, rej) => {
    GetUserSate(lat, lng)
      .then((response: any) => {
        const results = response.data.results;
        if (results && results.length > 0) {
          const addressComponents = results[0].address_components;
          const state = addressComponents.find((component: any) =>
            component.types.includes(RESTRICTED_AREA_LOCATION.AREA_TYPE)
          )?.short_name;
          res(state);
        }
      })
      .catch((error) => {
        res(null);
      });
  });
};

export const checkGuidedSalesEnableForState = (stateCode: string) => {
  return new Promise((res, rej) => {
    CheckGuidedSalesEnableForState(stateCode)
      .then((resp) => {
        const data = resp.data;
        const result = data.Result;
        if (result?.isGuidedSalesAgentEnabled) {
          res(result?.isGuidedSalesAgentEnabled);
        } else {
          res(false);
        }
      })
      .catch((error) => {
        res(false);
      });
  });
};

//TODO: This is added temperoraly to enable guided sales for pilot users only
export const guidedSalesPilotOnlyCheck = (pilotOnly: any) => {
  if (pilotOnly === "true") {
    if (
      typeof window !== "undefined" &&
      window.location.hostname.includes("pilot")
    ) {
      return true;
    }
    return false;
  }
  return true;
};

//NOTE: This is added to check if the user is on the sunglasses or eyeglasses page,
// when ever any path is changed make sure to update this function
export const isSunglassesOrEyeGlasses = (router: NextRouter) => {
  const pathName = router?.pathname?.split("/");
  switch (pathName[2]) {
    case "womens-eyeglasses":
    case "mens-eyeglasses":
    case "youth":
    case "eyeglasses":
    case "womens-sunglasses":
    case "mens-sunglasses":
    case "sunglasses":
      return true;
    default:
      return false;
  }
};

//NOTE: This is added to check if the user is on the contact lense page,
// when ever any path is changed make sure to update this function
export const isContactLense = (router: NextRouter) => {
  const pathName = router?.pathname?.split("/");
  switch (pathName[2]) {
    case "bi-weekly-contacts":
    case "contacts":
    case "daily-contacts":
    case "monthly-contacts":
      return true;
    default:
      return false;
  }
};

export const isAssociate = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  if (userData?.userType === USER_TYPE.ASSOCIATE) {
    return true;
  }
  return false;
};
