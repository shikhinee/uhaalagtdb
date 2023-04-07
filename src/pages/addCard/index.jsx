import React from "react";
import { Box, Typography } from "@mui/material";
import CardForm from "components/CardForm";

const AddCard = () => {
  const onSubmitSuccess = () => {
    console.log("Card added successfully!");
  };

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Add Card
      </Typography>
      <CardForm onSubmitSuccess={onSubmitSuccess} />
    </Box>
  );
};

export default AddCard;
