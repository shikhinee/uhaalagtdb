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

const Cards = () => {
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
        url: `branch/getCardRequests?limit=${limit}&position=${position}`,
        method: "GET",
        model: "getCardRequests",
      });

      if (response.success) {
        setRows(response.value);
      }
      setLoading(false);
    };

    fetchData();
  }, [limit, position]);
  const handleAcceptCard = useCallback(
    async (cardID) => {
      try {
        const response = await request({
          url: `branch/acceptCard?cardID=${cardID}`,
          method: "GET",
        });

        if (response.success) {
          // Remove the accepted card from the table
          setRows((rows) => rows.filter((row) => row.cardID !== cardID));
        }
      } catch (error) {
        console.error("Error accepting card:", error);
      }
    },
    [request]
  );
  const columns = [
    {
      field: "accept",
      headerName: "Хүсэлт",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAcceptCard(params.row.cardID)}
        >
          Зөвшөөрөх
        </Button>
      ),
    },
    { field: "cardID", headerName: "Картын дугаар", width: 100 },
    { field: "userID", headerName: "Хэрэглэгчийн дугаар", width: 150 },
    { field: "branchID", headerName: "Салбарын дугаар", width: 120 },
    { field: "frstnm", headerName: "Нэр", width: 150 },
    { field: "lstnm", headerName: "Овог", width: 150 },
    { field: "addrs", headerName: "Хаяг", width: 200 },
    { field: "phnehome", headerName: "Гар утасны дугаар", width: 150 },
    { field: "phnewrk", headerName: "Ажлын утасны дугаар", width: 150 },
    { field: "imglnk", headerName: "Зургийн холбоос", width: 200 },
    { field: "cmpnnm", headerName: "Компанийн нэр", width: 150 },
    { field: "pstn", headerName: "Албан тушаал", width: 150 },
    { field: "eml", headerName: "И-мэйл", width: 200 },
    { field: "webaddrs", headerName: "Веб хаяг", width: 200 },
    { field: "webaddrS_1", headerName: "Веб хаяг 1", width: 200 },
  ];

  return (
    <Box m="20px">
      <Header
        title="КАРТЫН ХҮСЭЛТҮҮД"
        subtitle="Картын хүсэлтүүдийг зохицуулах"
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
          getRowId={(row) => row.cardID}
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

export default Cards;
