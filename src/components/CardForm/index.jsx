import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
} from "@mui/material";
import { GlobalContext } from "context/state";

const CardForm = ({ defaultData, editMode, onSubmitSuccess }) => {
  const { request, showToast } = useContext(GlobalContext);
  const [formData, setFormData] = useState(
    editMode
      ? defaultData
      : {
          cardID: "",
          crdst: true,
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
    if (editMode && defaultData) {
      setFormData(defaultData);
    }
  }, [editMode, defaultData]);

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
        url: editMode ? "branch/editCard" : "branch/addCard",
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
      console.error("Error submitting card data:", error);
    }
  };

  const handleImageUpload = async (cardID, file) => {
    console.log("Uploading image for cardID:", cardID);
    try {
      const formData = new FormData();
      formData.append("cardID", cardID);
      formData.append("image", file);
      const response = await request({
        url: "branch/addCardImage",
        method: "POST",
        body: formData,
        isfiles: true,
      });
      return response;
    } catch (error) {
      console.error("Error uploading card image:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {editMode ? "Картны мэдээлэл засах" : "Картны бүртгэл"}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Овог"
                name="lstnm"
                value={formData.lstnm}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Хаяг"
                name="addrs"
                value={formData.addrs}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Гэрийн утас"
                name="phnehome"
                value={formData.phnehome}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ажлын утас"
                name="phnewrk"
                value={formData.phnewrk}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Компанийн нэр"
                name="cmpnnm"
                value={formData.cmpnnm}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Албан тушаал"
                name="pstn"
                value={formData.pstn}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ажилтны код"
                name="cardID"
                value={formData.cardID}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Имэйл"
                name="eml"
                value={formData.eml}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="https://www.facebook.com/id"
                name="webaddrs"
                value={formData.webaddrs}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="https://www.instagram.com/id"
                name="webaddrS_1"
                value={formData.webaddrS_1}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" onChange={handleFileChange} accept="image/*" />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ alignSelf: "center", marginTop: 2 }}
                fullWidth
              >
                {editMode ? "Засах" : "Нэмэх"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CardForm;
