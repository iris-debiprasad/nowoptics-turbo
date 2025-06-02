import { AlertColor } from "@mui/material";

export interface PaperCaptureType {
  Category: string;
  Id: number;
  Remark: string;
  SubCategory: string;
  UploadedOn: string;
  OrderCartGroupId: number;
  OrderGroupId: number;
  IsEditable: boolean;
}

export interface PaperCaptureUploadModalProps {
  setOpenPaperCaptureUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
  headingText: string;
  dragNDropText: string;
  descriptionText?: string;
  sectionHeading?: string;
  patientId: string;
  getPapers?: () => Promise<void>;
  setPaperCaptureUploadModalID?: React.Dispatch<React.SetStateAction<number>>;
  isPaperCaptureFromPromotionsModal?: boolean;
  paperCaptureCategoryResponse?: {
    PaperCaptureCategoryId: number;
    PromoCodeApplied: string;
  };
  addPromotionInCart?: (code: string) => void;
  cartId?: string;
  isFromOrder?: boolean;
  setSnackbar?: (message: string, type: AlertColor) => void;
  fetchRecaptchaToken?: (action: string) => Promise<string | undefined>;
}
