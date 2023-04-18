import React, { useContext, useEffect, useState, useCallback } from "react";
import { Box, Button, useTheme, Modal, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { GlobalContext } from "context/state";
import Header from "components/Header";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { request, showToast } = useContext(GlobalContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [position, setPosition] = useState(0);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [promoteUserModalOpen, setPromoteUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  const handleResetPassword = (userID) => {
    setSelectedUserId(userID);
    setResetPasswordModalOpen(true);
  };

  const handlePromoteUser = (userID) => {
    setSelectedUserId(userID);
    setPromoteUserModalOpen(true);
  };
  const confirmResetPassword = async () => {
    const response = await request({
      url: `user/resetPassword?userID=${selectedUserId}`,
      method: "GET",
    });
    if (response.success) {
      showToast("Нууц үг шинэчлэгдлээ");
    }
    setResetPasswordModalOpen(false);
  };

  const confirmPromoteUser = async () => {
    const response = await request({
      url: `user/addAdmin?userID=${selectedUserId}`,
      method: "GET",
    });
    if (response.success) {
      showToast("Тушаал дэвшүүллээ");
    }
    setPromoteUserModalOpen(false);
  };
  const columns = [
    {
      field: "userStatus",
      headerName: "Хэрэглэгчийн статус",
      width: 180,
      renderCell: ({ row: { userStatus } }) => {
        let icon, text, bgColor;

        switch (userStatus) {
          case "branchAdmin":
            icon = <SecurityOutlinedIcon />;
            text = "Салбарын Админ";
            bgColor = colors.greenAccent[600];
            break;
          case "Accepted":
            icon = <LockOpenOutlinedIcon />;
            text = "Ажилтан";
            bgColor = colors.greenAccent[700];
            break;
          case "Admin":
            icon = <AdminPanelSettingsOutlinedIcon />;
            text = "Админ";
            bgColor = colors.greenAccent[700];
            break;
        }

        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={bgColor}
            borderRadius="4px"
          >
            {icon}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {text}
            </Typography>
          </Box>
        );
      },
    },
    { field: "userID", headerName: "Хэрэглэгчийн ID", width: 100 },
    { field: "username", headerName: "Хэрэглэгчийн нэр", width: 150 },
    { field: "role", headerName: "Үүрэг", width: 100 },
    { field: "branchID", headerName: "Салбарын ID", width: 120 },
    { field: "depID", headerName: "Албаны ID", width: 150 },
    {
      field: "resetPassword",
      headerName: "Нууц үг шинэчлэх",
      width: 180,
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
          onClick={() => handleResetPassword(params.row.userID)}
        >
          Нууц үг шинэчлэх
        </Button>
      ),
    },
    {
      field: "promoteUser",
      headerName: "Дэвших",
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
          onClick={() => handlePromoteUser(params.row.userID)}
        >
          Дэвших
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Ажилчид" subtitle="Ажилчдыг удирдах" />
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
          open={resetPasswordModalOpen}
          onClose={() => setResetPasswordModalOpen(false)}
          aria-labelledby="reset-password-modal"
          aria-describedby="modal-to-reset-password"
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
            <Typography id="reset-password-modal" variant="h6" component="h2">
              Та нууц үгийг сэргээх гэж байна.
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
                onClick={() => setResetPasswordModalOpen(false)}
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
                onClick={confirmResetPassword}
                color="primary"
              >
                Баталгаажуулах
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={promoteUserModalOpen}
          onClose={() => setPromoteUserModalOpen(false)}
          aria-labelledby="promote-user-modal"
          aria-describedby="modal-to-promote-user"
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
            <Typography id="promote-user-modal" variant="h6" component="h2">
              Зохицуулагч болгох
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
                onClick={() => setPromoteUserModalOpen(false)}
                color="primary"
              >
                Цуцлах
              </Button>
              <Button
                style={{
                  backgroundColor: colors.greenAccent[600],
                  "&:hover": {
                    backgroundColor: colors.greenAccent[700],
                  },
                }}
                onClick={confirmPromoteUser}
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
