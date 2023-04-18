import React from "react";
import { Box, Typography } from "@mui/material";
import CardForm from "components/CardForm";
import Header from "components/Header";

const AddCard = () => {
  const onSubmitSuccess = () => {
    console.log("Card added successfully!");
  };

  return (
    <Box>
      <Header title="Картаа нэмэх" />
      <CardForm onSubmitSuccess={onSubmitSuccess} />
    </Box>
  );
};

export default AddCard;
