import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { GlobalContext } from "context/state";

const RegisterPage = () => {
  const context = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userID = Math.floor(10000000 + Math.random() * 90000000);
  const handleRegister = (e) => {
    e.preventDefault();
    context
      .request({
        url: `user/register`,
        model: "login",
        method: "POST",
        ismessage: true,
        body: {
          userID: userID,
          username: username,
          password: password,
          role: "branchAdmin",
          branchID: 0,
          userStatus: "Requested",
          depID: 0,
        },
      })
      .then((res) => {
        if (res.success) {
          navigate("/");
        }
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <Typography variant="h4">Register</Typography>
      <TextField
        required
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
