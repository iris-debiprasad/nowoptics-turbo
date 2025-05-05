import { AlertColor } from "@mui/material/Alert";

export type SnackBarContextActions = {
  showSnackBar: (text: string, typeColor: AlertColor) => void;
};

export interface SnackBarContextProviderProps {
  children: React.ReactNode;
}
