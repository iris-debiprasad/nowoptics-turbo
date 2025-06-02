import {
  SnackBarContextActions,
  SnackBarContextProviderProps,
} from "@root/host/src/types/SnackbarContext.types";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { createContext, useContext } from "react";

const SnackBarContext = createContext({} as SnackBarContextActions);

const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [severity, setSeverity] = React.useState<AlertColor>("info");

  const showSnackBar = (text: string, type: AlertColor) => {
    setMessage(text);
    setSeverity(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSeverity("info");
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        data-testid="snackbar-comp"
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          className="toast-message"
          variant="filled"
          elevation={6}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error("useSnackBar must be used within an SnackBarProvider");
  }

  return context;
};

export { SnackBarProvider, useSnackBar };
