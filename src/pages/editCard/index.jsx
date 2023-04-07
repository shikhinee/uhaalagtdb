import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { GlobalContext } from "context/state";
import CardForm from "components/CardForm";

const EditCard = () => {
  const { request } = useContext(GlobalContext);

  const [cardID, setCardID] = useState("");
  const [cardData, setCardData] = useState(null);

  const handleCardIDChange = (e) => {
    setCardID(e.target.value);
  };

  const handleEditCardClick = async () => {
    try {
      // Replace this with your request function
      const response = await request({
        url: `branch/getCard?cardID=${cardID}`,
        method: "GET",
      });

      if (response.success) {
        setCardData(response.value);
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  return (
    <Box>
      <Card>
        <CardHeader title="Edit Card" />
        <CardContent>
          <TextField
            label="Enter Card Number"
            value={cardID}
            onChange={handleCardIDChange}
          />
          <Button onClick={handleEditCardClick}>Edit Card</Button>
        </CardContent>
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

export default EditCard;
