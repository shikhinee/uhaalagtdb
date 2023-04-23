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
  Container,
  useTheme,
} from "@mui/material";
import { tokens } from "theme";
import Autocomplete from "@mui/lab/Autocomplete";
import { GlobalContext } from "context/state";

const RegisterPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const context = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState(null);
  const [branchID, setBranchID] = useState("");
  const [depID, setDepID] = useState("");
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

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
        } else {
          setDepartments([]);
        }
      });
  }, [branchID, context]);

  const handleRegister = (e) => {
    e.preventDefault();
    context
      .request({
        url: `user/register`,
        model: "login",
        method: "POST",
        ismessage: true,
        body: {
          userID: parseInt(userID, 10),
          username: username,
          password: password,
          role: "",
          branchID: branchID,
          userStatus: "Requested",
          depID: depID,
        },
      })
      .then((res) => {
        if (res.success) {
          navigate("/");
          context.showToast("Амжилттай бүртгэгдлээ", {
            role: "success",
          });
        } else {
          context.showToast(res.value, {
            role: "success",
          });
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
          maxWidth: "xs",
        }}
      >
        <Card sx={{ maxWidth: "sm", mt: 4, backgroundColor: "#434957" }}>
          <CardContent>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "xs",
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
                  label="Ажилтны код"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  margin="normal"
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
                />
                <TextField
                  required
                  fullWidth
                  label="Хэрэглэгчийн нэр"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
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
                />
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
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
                />
                <FormControl
                  fullWidth
                  margin="normal"
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
                >
                  <InputLabel htmlFor="branch-select">Салбар</InputLabel>
                  <Select
                    value={branchID}
                    onChange={(e) => setBranchID(e.target.value)}
                    label="Салбар"
                  >
                    {branches.map((branch) => (
                      <MenuItem key={branch.branchID} value={branch.branchID}>
                        {branch.branchName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  sx={{
                    minWidth: 250,
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
                >
                  <InputLabel htmlFor="department-select">Алба</InputLabel>
                  <Select
                    value={depID}
                    onChange={(e) => setDepID(e.target.value)}
                    label="Алба"
                    disabled={!branchID}
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.depID} value={department.depID}>
                        {department.depName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                    <Link
                      sx={{ color: colors.primary[600] }}
                      href="/login"
                      variant="body2"
                    >
                      Та аль хэдийн бүртгэгдсэн байна уу? Нэвтрэх
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default React.memo(RegisterPage);
