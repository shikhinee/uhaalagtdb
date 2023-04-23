import React from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const TokenExpiredModal = ({ open, onModalClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={onModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ maxWidth: "xs" }}
    >
      <DialogTitle id="alert-dialog-title">{"Анхааруулга"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Таны аюулгүй байдлын үүднээс нэвтэрснээс хойш 15 минут болсон тул
          системээс гаргалаа. Ахин нэвтэрнэ үү.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onModalClose();
            navigate("/login");
          }}
          color="primary"
          autoFocus
          sx={{ font: "normal" }}
        >
          Дахин нэвтрэх
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TokenExpiredModal;
