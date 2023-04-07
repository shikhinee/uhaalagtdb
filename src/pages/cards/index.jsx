import React, { useContext, useEffect, useState } from "react";
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

  const columns = [
    { field: "cardID", headerName: "Card ID", width: 120 },
    { field: "userID", headerName: "User ID", width: 120 },
    { field: "branchID", headerName: "Branch ID", width: 120 },
    { field: "frstnm", headerName: "First Name", width: 150 },
    { field: "lstnm", headerName: "Last Name", width: 150 },
    { field: "addrs", headerName: "Address", width: 200 },
    { field: "phnehome", headerName: "Phone Home", width: 150 },
    { field: "phnewrk", headerName: "Phone Work", width: 150 },
    { field: "imglnk", headerName: "Image Link", width: 200 },
    { field: "cmpnnm", headerName: "Company Name", width: 150 },
    { field: "pstn", headerName: "Position", width: 150 },
    { field: "eml", headerName: "Email", width: 200 },
    { field: "webaddrs", headerName: "Web Address", width: 200 },
    { field: "webaddrS_1", headerName: "Web Address 1", width: 200 },
  ];

  return (
    <Box m="20px">
      <Header title="CARD REQUESTS" subtitle="Managing the Card Requests" />
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
