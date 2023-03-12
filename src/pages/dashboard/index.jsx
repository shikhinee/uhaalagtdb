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
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Typography variant="h5">
          Welcome back, {context.username} ({context.role})
        </Typography>
      </Box>
      <Box mt="20px">
        <Typography variant="body1">Your User ID is:: {context.contextID}</Typography>
        <Typography variant="body1">
          Your Branch ID is: {context.branchID}
        </Typography>
        <Typography variant="body1">
          Your Department ID is: {context.depID}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
