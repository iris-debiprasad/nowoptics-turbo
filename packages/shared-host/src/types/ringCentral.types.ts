import { AlertColor } from "@mui/material";

export interface RingCentralCallDataDTO {
  Id: number | null;
  PatientId: number | null;
  AcceptedUserId: number | null;
  PhoneNumber: string;
  Status: string | "Proceeding " | "VoiceMail " | "Disconnected";
  StoreNumber: string | null;
  StoreId?: number | null;
}

export interface RingCentralPopUpDTO {
  ringCentralData: RingCentralCallDataDTO;
  open: boolean;
  close: () => void;
  showSnackBar: (message: string, typeColor: AlertColor) => void;
}

export interface RingCentralCallNotiItemDTO {
  ringCentralDataItem: RingCentralCallDataDTO;
  handleAcceptClick: (id: number) => void;
}

export interface RingCentralCallNotiItemsDTO {
  ringCentralData: RingCentralCallDataDTO[];
  open: boolean;
  close: (event: React.SyntheticEvent | Event, reason?: string) => void;
  handleAcceptClick: (id: number) => void;
}

export interface RingCentralAcceptPayloadDTO {
  Id: string;
  AcceptedUserId: string;
}
