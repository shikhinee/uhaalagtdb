import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { GlobalContext } from "context/state";

const LoginPage = () => {
  const context = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(context);
  const onSuccessLogin = async ({ token }) => {
      // context.setModel({ model: "token", res: token });
      if (context.reslogin.token) {
      context.request({
        url: "branch/getBranches",
        model: "getBranches",
        token: context.reslogin.token,
      });    
        context.request({
        url: `user/getAllUsers?limit=2&position=2`,
        model: "getAllUsers",
        token: context.reslogin.token,
      });
    }


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
          onSuccessLogin(res.value);
          console.log(context.reslogin.token)
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
