import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import Header from "../../components/Header";
import { UserContext } from "context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  // Check if user data is available
  if (!user) {
    return <div>Loading...</div>;
  }

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
