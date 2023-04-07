import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Paper,
  Container,
} from "@mui/material";
import { GlobalContext } from "context/state";

const CardForm = ({ defaultData, editMode, onSubmitSuccess }) => {
  const { request } = useContext(GlobalContext);
  const [formData, setFormData] = useState(
    editMode
      ? defaultData
      : {
          cardID: "",
          userID: 0,
          branchID: 0,
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
    try {
      const response = await request({
        url: editMode ? "branch/editCard" : "branch/addCard",
        method: "POST",
        body: formData,
      });
      if (response.success) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Error submitting card data:", error);
    }
  };

  const handleImageUpload = async (cardID, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("cardID", cardID);
        formData.append("image", file);
        const response = await request({
          url: "branch/addCardImage",
          method: "POST",
          body: formData,
          isfile: true,
        });

        if (response.success) {
          setFormData({ ...formData, imglnk: response.imglnk });
        }
      } catch (error) {
        console.error("Error uploading card image:", error);
      }
    }
  };
  const handleSwitchChange = (e) => {
    setFormData({ ...formData, crdst: e.target.checked });
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Business Card
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Card ID"
              name="cardID"
              value={formData.cardID}
              onChange={handleChange}
            />
            <TextField
              label="User ID"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
            />
            <TextField
              label="Branch ID"
              name="branchID"
              value={formData.branchID}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.crdst}
                  onChange={handleSwitchChange}
                />
              }
              label="CRDST"
            />
            <TextField
              label="First Name"
              name="frstnm"
              value={formData.frstnm}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lstnm"
              value={formData.lstnm}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="addrs"
              value={formData.addrs}
              onChange={handleChange}
            />
            <TextField
              label="Phone Home"
              name="phnehome"
              value={formData.phnehome}
              onChange={handleChange}
            />
            <TextField
              label="Phone Work"
              name="phnewrk"
              value={formData.phnewrk}
              onChange={handleChange}
            />
            <TextField
              label="Image Link"
              name="imglnk"
              value={formData.imglnk}
              onChange={handleChange}
            />
            <TextField
              label="Company Name"
              name="cmpnnm"
              value={formData.cmpnnm}
              onChange={handleChange}
            />
            <TextField
              label="Position"
              name="pstn"
              value={formData.pstn}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="eml"
              value={formData.eml}
              onChange={handleChange}
            />
            <TextField
              label="Web Address"
              name="webaddrs"
              value={formData.webaddrs}
              onChange={handleChange}
            />
            <TextField
              label="Web Address 1"
              name="webaddrS_1"
              value={formData.webaddrS_1}
              onChange={handleChange}
            />
            <input
              type="file"
              onChange={(e) => handleImageUpload(formData.cardID, e)}
              accept="image/*"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center", marginTop: 2 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CardForm;
