import { Session } from "next-auth";
import { StoreAddressType } from "./SideBar.types";

export type StoreDetailsDTO = {
  Description: string;
  Id: number;
  Name: string;
};

export interface NavProps {
  window?: () => Window;
  onLogout?: () => void;
  handleStore: (store: StoreAddressType | null) => void;
  handleCDCView: (view: boolean) => void;
  session: Session | null;
  sessionStatus?: string;
  setShowTimerModal: React.Dispatch<React.SetStateAction<boolean>>;
  showTimerModal: boolean;
}

export interface CartItem {
  Item: string;
  Price: number;
  Quantity: number;
}

export interface ModifiedItem {
  item: string;
  price: number;
  quantity: number;
}
