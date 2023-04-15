import React, { useState, useContext, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Grid,
  Link,
  Card,
  CardContent,
} from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import { GlobalContext } from "context/state";

const RegisterPage = () => {
  const context = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  const [branchID, setBranchID] = useState(null);
  const [depID, setDepID] = useState(null);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  console.log("register page rendered");

  useEffect(() => {
    context
      .request({
        url: "branch/getBranches",
        method: "GET",
      })
      .then((res) => {
        if (res.success) {
          setBranches(res.value);
        }
      });
  }, []);

  useEffect(() => {
    if (!branchID) {
      setDepartments([]);
      return;
    }

    context
      .request({
        url: `branch/getDepartments?branchID=${branchID}`,
        method: "GET",
      })
      .then((res) => {
        if (res.success) {
          setDepartments(res.value);
        }
      });
  }, [branchID]);

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
          branchID: branchID,
          userStatus: "Requested",
          depID: depID,
        },
      })
      .then((res) => {
        if (res.success) {
          navigate("/");
        }
      });
  };

  return (
    <Grid container component="main" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card sx={{ minWidth: 400, mt: 4 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Бүртгүүлэх
              </Typography>
              <form
                sx={{
                  width: "100%", // Fix IE 11 issue.
                  mt: 1,
                }}
                onSubmit={handleRegister}
              >
                <TextField
                  required
                  fullWidth
                  label="Хэрэглэгчийн ID"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <TextField
                  required
                  fullWidth
                  label="Хэрэглэгчийн нэр"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <Autocomplete
                  fullWidth
                  value={
                    branchID
                      ? branches.find((branch) => branch.id === branchID)
                      : null
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setBranchID(newValue.id);
                    } else {
                      setBranchID(null);
                    }
                  }}
                  options={branches}
                  getOptionLabel={(option) => option.branchName}
                  getOptionSelected={(option, value) => option.id === value.id}
                  filterOptions={(options) => options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Салбар"
                      margin="normal"
                      sx={{ mb: 2 }}
                      inputProps={{ readOnly: true }}
                    />
                  )}
                />
                <Autocomplete
                  fullWidth
                  value={
                    departments.find((department) => department.id === depID) ||
                    null
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setDepID(newValue.id);
                    } else {
                      setDepID("");
                    }
                  }}
                  options={departments}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  filterOptions={(options) => options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Алба"
                      margin="normal"
                      sx={{ mb: 2 }}
                      inputProps={{ readOnly: true }}
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Бүртгүүлэх
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Та аль хэдийн бүртгэгдсэн байна уу? Нэвтрэх
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default React.memo(RegisterPage);
