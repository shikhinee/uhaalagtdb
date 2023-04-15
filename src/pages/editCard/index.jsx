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
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Карт засах"
            subtitle="Хувийн мэдээллээ өөрчлөх хүсэлт"
          />
        </Box>
      </Box>
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
