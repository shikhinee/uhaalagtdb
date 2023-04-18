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
  Link,
  useTheme,
} from "@mui/material";
import { tokens } from "theme";
import { GlobalContext } from "context/state";

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    context.showToast("Амжилттай нэвтэрлээ", {
      role: "success",
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await context.request({
        url: `login`,
        model: "login",
        method: "POST",
        body: {
          username: username,
          password: password,
        },
      });

      console.log(res);
      if (res.success) {
        await localStorage.setItem("token", JSON.stringify(res.value.token));
        context.setModel({ model: "login", res: res.value }); // Add this line to update the context with the login response
        onSuccessLogin(res.value);
      }
    } catch (error) {
      context.showToast(error, {
        role: "error",
      });
    }
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
            backgroundColor: "#434957",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: (theme) => theme.spacing(4),
              textAlign: "center",
            }}
          >
            Нэвтрэх
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
              label="Нэвтрэх нэр"
              variant="outlined"
              fullWidth
              value={username}
              sx={{
                marginBottom: "1rem",
                "& label.Mui-focused": {
                  color: colors.primary[600], // Change color of label on focus
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primary[600], // Change outline color on focus
                  },
                  "& .MuiInputBase-input": {
                    color: colors.primary[600], // Change input text color
                  },
                  "&::placeholder": {
                    color: colors.primary[600], // Change placeholder color
                  },
                },
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Нууц үг"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              sx={{
                marginBottom: "1rem",
                "& label.Mui-focused": {
                  color: colors.primary[600], // Change color of label on focus
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primary[600], // Change outline color on focus
                  },
                  "& .MuiInputBase-input": {
                    color: colors.primary[600], // Change input text color
                  },
                  "&::placeholder": {
                    color: colors.primary[600], // Change placeholder color
                  },
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button sx={{ mb: 2 }} type="submit" variant="contained" fullWidth>
              Нэвтрэх
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  sx={{ color: colors.primary[600] }}
                  href="/register"
                  variant="body2"
                >
                  Та бүртгэлгүй юу? Бүртгүүлэх
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
