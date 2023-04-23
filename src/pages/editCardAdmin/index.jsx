import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import Header from "components/Header";
import { useParams } from "react-router-dom";
import { GlobalContext } from "context/state";
import CardForm from "components/CardForm";

const EditCardAdmin = () => {
  const context = useContext(GlobalContext);
  const { cardID } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const getCardData = async () => {
      try {
        const response = await context.request({
          url: `branch/getCard?cardID=${cardID}`,
          method: "GET",
          token: localStorage.getItem("token"),
        });

        if (response.success) {
          setCardData(response.value);
        }
      } catch (error) {
        context.showToast(error, {
          role: "error",
        });
      }
    };

    getCardData();
  }, [cardID]);
  return (
    <Box m="20px">
      <Header title="Ажилтны карт засах" />
      {cardData && (
        <CardForm
          defaultData={cardData}
          adminMode
          onSubmitSuccess={() => setCardData(null)}
        />
      )}
    </Box>
  );
};

export default EditCardAdmin;
