import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useLogin } from "hooks/useLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        label="username"
        variant="outlined"
        margin="normal"
        type="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={isLoading} type="submit" variant="contained">
        Log in
      </Button>
      {error && <Typography variant="h4">{error}</Typography>}
    </form>
  );
};

export default LoginPage;
