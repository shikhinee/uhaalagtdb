import React, { useState, useContext, useEffect } from "react";
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

  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const getCardData = async () => {
      try {
        // Replace this with your request function
        const response = await request({
          url: `branch/getCardByUserId`,
          method: "GET",
        });

        if (response.success) {
          setCardData(response.value[0]);
        }
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    getCardData();
  }, []);

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

export default EditCard;
