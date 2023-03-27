import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { GlobalContext } from "context/state";

const LoginPage = () => {
  const context = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(context.role);

  const onSuccessLogin = async ({ token, role }) => {
    context.request({
      url: "branch/getBranches",
      model: "getBranches",
      token: token, // Use the token from the response
    });
    context.request({
      url: `user/getAllUsers?limit=2&position=2`,
      model: "getAllUsers",
      token: token, // Use the token from the response
    });
    context.setRole(role);
    context.setlogin(true); // Update the context with the login status
    navigate("/");
  };
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
      .then(async (res) => {
        if (res.success) {
          await localStorage.setItem("token", JSON.stringify(res.value.token));
          context.setModel({ model: "login", res: res.value }); // Add this line to update the context with the login response
          onSuccessLogin(res.value);
        }
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          sx={{
            padding: (theme) => theme.spacing(4),
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: (theme) => theme.spacing(4),
              textAlign: "center",
            }}
          >
            Login
          </Typography>
          <form
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: (theme) => theme.spacing(2),
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" fullWidth>
              Log in
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
