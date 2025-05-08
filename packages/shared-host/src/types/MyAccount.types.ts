import { Dayjs } from "dayjs";

export interface eyeEntityDTO {
  Sphere: string;
  Cylinder: string;
  Axis: string | null;
  Add: string | null;
  PDown: string | null;
  Pout: string | null;
  MonoPd: string | null;
  BrandId: string | null;
  BaseCurve: string | null;
  Diameter: string | null;
}

export interface AddPrescriptionDTO {
  IsSpectacleRx: boolean;
  PatientId: string;
  PatientPaperCaptureId: string | null;
  CreatedAtStoreId: string;
  ExpirationDate: Dayjs | string;
  RightEyeEntity: eyeEntityDTO;
  LeftEyeEntity: eyeEntityDTO;
  Id?: string;
}
