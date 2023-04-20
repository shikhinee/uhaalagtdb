import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import CardForm from "components/CardForm";
import Header from "components/Header";
import { GlobalContext } from "context/state";

const AddCard = () => {
  const context = useContext(GlobalContext);
  const onSubmitSuccess = () => {
    context.showToast("Амжилттай!", { role: "success" });
  };

  return (
    <Box m="20px">
      <Header title="Картаа нэмэх" />
      <CardForm onSubmitSuccess={onSubmitSuccess} />
    </Box>
  );
};

export default AddCard;
