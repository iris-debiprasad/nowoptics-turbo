import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

function BackdropLoader(props: { openLoader: boolean }) {
  return (
    <>
      {props.openLoader ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1000 }}
          open={props.openLoader}
          data-testid="loader-comp"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <></>
      )}
    </>
  );
}

export default BackdropLoader;
