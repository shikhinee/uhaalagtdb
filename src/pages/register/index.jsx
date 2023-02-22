import React, { useState, useContext } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { ApiContext } from "context/ApiContext";
import { UserContext } from "context/UserContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const api = useContext(ApiContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // generate a random 8 digit number for userID
      const userID = JSON.stringify(
        Math.floor(10000000 + Math.random() * 90000000)
      );
      const data = {
        userID,
        username,
        password,
        role: "user",
        branchID: "0",
        userStatus: "Requested",
        depID: "0",
      };
      const response = await api.makeRequest("user/register", "POST", data);
      setUser(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <Typography variant="h4">Register</Typography>
      <TextField
        required
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <TextField
        required
        type="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
