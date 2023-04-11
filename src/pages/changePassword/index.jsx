import React, { useState, useContext } from "react";
import { Button, TextField, Typography, Box, useTheme } from "@mui/material";
import { GlobalContext } from "context/state";
import { tokens } from "theme";
const ChangePassword = () => {
  const context = useContext(GlobalContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(
        "Шинэ нууц үг ба баталгаажуулах нууц үг хоорондоо таарахгүй байна!"
      );
      return;
    }

    context
      .request({
        url: "user/changePassword",
        method: "POST",
        ismessage: true,
        body: {
          oldPassword: currentPassword,
          newPassword: newPassword,
        },
      })
      .then((res) => {
        if (res.success) {
          alert("Нууц үг амжилттай солигдлоо!");
        }
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleChangePassword}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4">Нууц үг солих</Typography>
      <TextField
        required
        type="password"
        label="Одоогийн нууц үг"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
      />
      <TextField
        required
        type="password"
        label="Шинэ нууц үг"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
      />
      <TextField
        required
        type="password"
        label="Нууц үг баталгаажуулах"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        color="primary"
        style={{
          backgroundColor: colors.greenAccent[600],
          "&:hover": {
            backgroundColor: colors.greenAccent[700],
          },
        }}
        type="submit"
        variant="contained"
      >
        Нууц үг солих
      </Button>
    </Box>
  );
};

export default ChangePassword;
