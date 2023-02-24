import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useRegister } from "hooks/useRegister";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, isLoading } = useRegister();
  const handleRegister = async (e) => {
    e.preventDefault();
    await register(username, password);
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
      <Button disablled={isLoading} type="submit" variant="contained">
        Register
      </Button>
      {error && (
        <Typography variant="h4" className="error">
          {error}
        </Typography>
      )}
    </form>
  );
};

export default RegisterPage;
