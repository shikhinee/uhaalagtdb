import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
  Input,
  useTheme,
} from "@mui/material";
import { tokens } from "theme";
import { GlobalContext } from "context/state";

const CardForm = ({ defaultData, editMode, onSubmitSuccess, adminMode }) => {
  const { request, showToast } = useContext(GlobalContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [previewImage, setPreviewImage] = useState();
  const [formData, setFormData] = useState(
    editMode || adminMode
      ? defaultData
      : {
          cardID: "0",
          frstnm: "",
          lstnm: "",
          addrs: "",
          phnehome: "",
          phnewrk: "",
          imglnk: "",
          cmpnnm: "",
          pstn: "",
          eml: "",
          webaddrs: "",
          webaddrS_1: "",
        }
  );
  const [file, setFile] = useState(null);

  useEffect(() => {
    if ((editMode || adminMode) && defaultData) {
      setFormData(defaultData);
    }
  }, [adminMode, editMode, defaultData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    console.log("File to upload:", file);
    try {
      const response = await request({
        url: adminMode
          ? "branch/editCardAdmin"
          : editMode
          ? "branch/editCard"
          : "branch/addCard",
        method: "POST",
        body: formData,
      });
      if (response.errors) {
        console.error("Error submitting card data:", response);
        return;
      }
      if (file) {
        console.log("Uploading image for cardID:", formData.cardID);
        const imageUploadResponse = await handleImageUpload(
          formData.cardID,
          file
        );
        if (imageUploadResponse.errors) {
          console.error("Error uploading card image:", imageUploadResponse);
          return;
        }
        setFormData({ ...formData, imglnk: imageUploadResponse.imglnk });
      }
      onSubmitSuccess();
    } catch (error) {
      showToast(error, { role: "error" });
    }
  };

  const handleImageUpload = async (cardID) => {
    console.log("cardID: ", cardID);
    try {
      const response = await request({
        url: adminMode
          ? `branch/editCardImage?cardID=${cardID}`
          : "branch/addCardImage",
        method: "POST",
        body: {
          cardID: cardID,
          img: file,
        },
        isfile: true,
      });
      return response;
    } catch (error) {
      showToast(error, { role: "error" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setPreviewImage(event.target.result);
    };

    reader.readAsDataURL(file);
    setFile(file);
  };
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 3, marginTop: 3, backgroundColor: colors.primary[400] }}
      >
        <Typography sx={{ mb: 2 }} variant="h5" align="center" gutterBottom>
          {editMode || adminMode ? "Картны мэдээлэл засах" : "Картны бүртгэл"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Нэр"
                name="frstnm"
                value={formData.frstnm}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Овог"
                name="lstnm"
                value={formData.lstnm}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Хаяг"
                name="addrs"
                value={formData.addrs}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Гэрийн утас"
                name="phnehome"
                value={formData.phnehome}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ажлын утас"
                name="phnewrk"
                value={formData.phnewrk}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Компанийн нэр"
                name="cmpnnm"
                value={formData.cmpnnm}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Албан тушаал"
                name="pstn"
                value={formData.pstn}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Имэйл"
                name="eml"
                value={formData.eml}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="https://www.facebook.com/id"
                name="webaddrs"
                value={formData.webaddrs}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="https://www.instagram.com/id"
                name="webaddrS_1"
                value={formData.webaddrS_1}
                onChange={handleChange}
                fullWidth
                sx={{
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
            </Grid>
            <Grid xs={12} item alignItems="center">
              <Grid>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  id="file-input" // add id attribute
                  sx={{
                    display: "none",
                    "& + label": {
                      width: "100%",
                      height: "100%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#4cceac", // set background color
                      color: "white", // set text color
                      cursor: "pointer",
                      borderRadius: "4px",
                      padding: "10px",
                      "&:hover": {
                        backgroundColor: "#3da58a", // set hover background color
                      },
                    },
                  }}
                />
                <label htmlFor="file-input">
                  <Typography component="span" sx={{ cursor: "pointer" }}>
                    Upload Image
                  </Typography>
                </label>
              </Grid>
              {previewImage && (
                <Grid item>
                  <img
                    src={previewImage}
                    alt="Preview"
                    width="50"
                    height="50"
                  />
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ alignSelf: "center", marginTop: 2 }}
                fullWidth
              >
                {editMode || adminMode ? "Засах" : "Нэмэх"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CardForm;
