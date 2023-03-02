import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { GlobalContext } from "context/state";

const LoginPage = () => {
  const context = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    context
      .request({
        url: `login`,
        model: "login",
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        if (res.success) {
          navigate("/");
        }
      });
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
      <Button type="submit" variant="contained">
        Log in
      </Button>
    </form>
  );
};

export default LoginPage;
