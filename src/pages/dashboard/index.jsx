import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import Header from "../../components/Header";
import { GlobalContext } from "context/state";
import jwtDecode from "jwt-decode";
const Dashboard = () => {
  const context = useContext(GlobalContext);
  console.log("context", context);
  // Check if context data is available
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Нүүр хуудас"
          subtitle="TDB бизнес картны платформд тавтай морил"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
