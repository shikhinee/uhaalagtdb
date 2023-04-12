import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { GlobalContext } from "context/state";
import CardForm from "components/CardForm";

const EditCardAdmin = () => {
  const { request } = useContext(GlobalContext);
  const { cardID } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const getCardData = async () => {
      try {
        const response = await request({
          url: `branch/getCard?cardID=${cardID}`,
          method: "GET",
          token: localStorage.getItem("token"),
        });

        if (response.success) {
          setCardData(response.value);
          console.log(cardData);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    getCardData();
  }, [cardID]);
  console.log("test", cardData);
  return (
    <Box>
      <Card>
        <CardHeader title="Edit Card" />
      </Card>
      {cardData && (
        <CardForm
          defaultData={cardData}
          editMode
          onSubmitSuccess={() => setCardData(null)}
        />
      )}
    </Box>
  );
};

export default EditCardAdmin;
