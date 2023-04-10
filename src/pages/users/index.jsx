import React, { useContext, useEffect, useState, useCallback } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { GlobalContext } from "context/state";
import Header from "components/Header";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { request } = useContext(GlobalContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await request({
        url: `user/getAllUsers?limit=${limit}&position=${position}`,
        method: "GET",
      });

      if (response.success) {
        setRows(response.value);
      }
      setLoading(false);
    };

    fetchData();
  }, [limit, position]);

  const handleResetPassword = useCallback(
    async (userID) => {
      await request({
        url: `user/resetPassword?userID=${userID}`,
        method: "GET",
      });
    },
    [request]
  );

  const handlePromoteUser = useCallback(
    async (userID) => {
      await request({
        url: `user/addAdmin?userID=${userID}`,
        method: "GET",
      });
    },
    [request]
  );

  const columns = [
    { field: "userID", headerName: "User ID", width: 100 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "branchID", headerName: "Branch ID", width: 120 },
    { field: "userStatus", headerName: "User Status", width: 150 },
    { field: "depID", headerName: "Department ID", width: 150 },
    {
      field: "resetPassword",
      headerName: "Reset Password",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleResetPassword(params.row.userID)}
        >
          Reset Password
        </Button>
      ),
    },
    {
      field: "promoteUser",
      headerName: "Promote",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePromoteUser(params.row.userID)}
        >
          Promote
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Manage Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScoller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.userID}
          pageSize={limit}
          onPageChange={(params) => {
            setPosition(params.page * limit);
          }}
          pagination
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Users;
