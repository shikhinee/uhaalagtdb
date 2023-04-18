import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { GlobalContext } from "context/state";
import Header from "components/Header";

const UserRequests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { request, showToast } = useContext(GlobalContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await request({
        url: `user/getUserRequests?limit=${limit}&position=${position}`,
        method: "GET",
      });

      if (response.success) {
        setRows(response.value);
      }
      setLoading(false);
    };

    fetchData();
  }, [limit, position]);

  const handleAcceptUser = useCallback(
    async (userID) => {
      try {
        const response = await request({
          url: `user/acceptUser?userID=${userID}`,
          method: "GET",
        });

        if (response.success) {
          showToast("Ажилтан бүртгэгдлээ", { role: "success" });
          setRows((rows) => rows.filter((row) => row.userID !== userID));
        }
      } catch (error) {
        showToast(error, { role: "success" });
        console.error("Error accepting user:", error);
      }
    },
    [request]
  );

  const handleDeclineUser = useCallback(
    async (userID) => {
      try {
        const response = await request({
          url: `user/declineUser?userID=${userID}`,
          method: "GET",
        });

        if (response.success) {
          showToast("Хүсэлт устгагдлаа", { role: "success" });
          setRows((rows) => rows.filter((row) => row.userID !== userID));
        }
      } catch (error) {
        showToast(error, { role: "success" });
        console.error("Error declining user:", error);
      }
    },
    [request]
  );

  const columns = [
    {
      field: "userID",
      headerName: "User ID",
      width: 120,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
    },
    {
      field: "branchID",
      headerName: "Branch ID",
      width: 150,
    },
    {
      field: "userStatus",
      headerName: "User Status",
      width: 150,
    },
    {
      field: "depID",
      headerName: "Department ID",
      width: 150,
    },
    {
      field: "accept",
      headerName: "Accept",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: colors.greenAccent[600],
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
            },
          }}
          onClick={() => handleAcceptUser(params.row.userID)}
        >
          Зөвшөөрөх
        </Button>
      ),
    },
    {
      field: "decline",
      headerName: "Decline",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: colors.redAccent[600],
            "&:hover": {
              backgroundColor: colors.redAccent[700],
            },
          }}
          onClick={() => handleDeclineUser(params.row.userID)}
        >
          Цуцлах
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Шинэ ажилтны хүсэлт"
        subtitle="Шинэ ажилтны хүсэлтүүдийг зохицуулах"
      />
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

export default UserRequests;
