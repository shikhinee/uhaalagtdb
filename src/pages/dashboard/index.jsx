import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import Header from "../../components/Header";
import { GlobalContext } from "context/state";

const Dashboard = () => {
  const user = useContext(GlobalContext);
  console.log(user);
  // Check if user data is available

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Typography variant="h5">
          Welcome back, {user.username} ({user.role})
        </Typography>
      </Box>
      <Box mt="20px">
        <Typography variant="body1">Your User ID is: {user.userID}</Typography>
        <Typography variant="body1">
          Your Branch ID is: {user.branchID}
        </Typography>
        <Typography variant="body1">
          Your Department ID is: {user.depID}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
