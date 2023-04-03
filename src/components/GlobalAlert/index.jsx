import React, { useContext } from "react";
import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { GlobalContext } from "context/state";

const GlobalAlert = () => {
  const { alert } = useContext(GlobalContext);
  console.log("rendered");

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={alert.open}
      autoHideDuration={6000} // Add autoHideDuration
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        alert.open = false; // Update the alert state to close the Snackbar
      }}
    >
      <MuiAlert
        className="global-alert"
        elevation={6}
        variant="filled"
        severity={alert.severity}
      >
        {alert.message}"test"
      </MuiAlert>
    </Snackbar>
  );
};

export default GlobalAlert;
