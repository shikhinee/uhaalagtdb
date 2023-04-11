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
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { request } = useContext(GlobalContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardData, setModalCardData] = useState({
    cardID: "",
    isActive: false,
  });
  const openModal = (cardID, isActive) => {
    setModalCardData({ cardID, isActive });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmCardStatusChange = () => {
    handleToggleCard(modalCardData.cardID, modalCardData.isActive);
    closeModal();
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await request({
        url: `branch/getCards?limit=${limit}&position=${position}`,
        method: "GET",
        model: "getCards",
      });

      if (response.success) {
        setRows(response.value);
      }
      setLoading(false);
    };

    fetchData();
  }, [limit, position]);
  const handleViewCard = (cardID) => {
    navigate(`/card/${cardID}`);
  };

  const handleEditCard = (cardID) => {
    navigate(`/edit/${cardID}`);
  };
  const handleToggleCard = useCallback(
    async (cardID, isActive) => {
      try {
        const response = await request({
          url: `branch/${
            isActive ? "activateCard" : "deactivateCard"
          }?cardID=${cardID}`,
          method: "GET",
        });

        if (response.success) {
          // Update card status in the table
          setRows((rows) =>
            rows.map((row) =>
              row.cardID === cardID ? { ...row, crdst: isActive } : row
            )
          );
        }
      } catch (error) {
        console.error("Error toggling card:", error);
      }
    },
    [request]
  );

  const columns = [
    {
      field: "view",
      headerName: "Харах",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: colors.blueAccent[600],
            "&:hover": {
              backgroundColor: colors.blueAccent[700],
            },
          }}
          onClick={() => handleViewCard(params.row.cardID)}
        >
          Харах
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Засах",
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
          onClick={() => handleEditCard(params.row.cardID)}
        >
          Засах
        </Button>
      ),
    },
    { field: "cardID", headerName: "Картын дугаар", width: 150 },
    { field: "userID", headerName: "Хэрэглэгчийн дугаар", width: 180 },
    { field: "branchID", headerName: "Салбарын дугаар", width: 150 },
    { field: "crdst", headerName: "Картны статус", width: 150 },
    { field: "frstnm", headerName: "Нэр", width: 150 },
    { field: "lstnm", headerName: "Овог", width: 150 },
    { field: "addrs", headerName: "Хаяг", width: 200 },
    { field: "phnehome", headerName: "Гар утасны дугаар", width: 180 },
    { field: "phnewrk", headerName: "Ажлын утасны дугаар", width: 180 },
    { field: "imglnk", headerName: "Зургийн холбоос", width: 200 },
    { field: "cmpnnm", headerName: "Компанийн нэр", width: 200 },
    { field: "pstn", headerName: "Албан тушаал", width: 150 },
    { field: "eml", headerName: "И-мэйл", width: 200 },
    { field: "webaddrs", headerName: "Веб хаяг", width: 200 },
    { field: "webaddrS_1", headerName: "Веб хаяг 1", width: 200 },
  ];

  return (
    <Box m="20px">
      <Header title="Картууд" subtitle="Картуудыг харах ба удирдах" />
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
        <Modal
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="toggle-card-status-modal"
          aria-describedby="modal-to-toggle-card-status"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="toggle-card-status-modal"
              variant="h6"
              component="h2"
            >
              Та картын төлөвийг өөрчлөх гэж байна.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
              <Button
                style={{
                  marginRight: 10,
                  color: colors.grey[100],
                  backgroundColor: colors.redAccent[600],
                  "&:hover": {
                    backgroundColor: colors.redAccent[700],
                  },
                }}
                onClick={closeModal}
                color="primary"
              >
                Цуцлах
              </Button>
              <Button
                style={{
                  color: colors.grey[100],
                  backgroundColor: colors.greenAccent[600],
                  "&:hover": {
                    backgroundColor: colors.greenAccent[700],
                  },
                }}
                onClick={confirmCardStatusChange}
                color="primary"
              >
                Баталгаажуулах
              </Button>
            </Box>
          </Box>
        </Modal>
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
