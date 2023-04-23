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
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Branch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const [branches, setBranches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editedBranch, setEditedBranch] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newBranch, setNewBranch] = useState({ branchName: "" });
  const generateRandomID = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };
  useEffect(() => {
    const fetchBranches = async () => {
      const response = await context.request({
        url: "branch/getBranches",
        model: "getBranches",
      });

      if (response.success) {
        setBranches(response.value);
      }
    };

    fetchBranches();
  }, []);
  const handleAddConfirm = async () => {
    const body = {
      branchID: generateRandomID(),
      branchName: newBranch.branchName,
    };

    const response = await context.request({
      url: "branch/addBranch",
      method: "POST",
      body,
      model: "addBranch",
    });

    if (response.success) {
      context.showToast("Салбар нэмэгдлээ.", { role: "success" });
      setBranches((prevBranches) => [...prevBranches, response.value]);
      setNewBranch({ branchName: "" });
    }

    setOpenAddModal(false);
  };
  const handleEditClick = (branch) => {
    setEditedBranch(branch);
    setOpenModal(true);
  };
  const handleDeleteClick = (branch) => {
    setBranchToDelete(branch);
    setOpenDeleteModal(true);
  };
  const handleDeleteConfirm = async () => {
    // Perform the delete request
    const response = await context.request({
      url: `branch/removeBranch?branchID=${branchToDelete.branchID}`,
      method: "DELETE",
      model: "removeBranch",
    });

    // On successful deletion, update the branches state
    if (response.success) {
      setBranches((prevBranches) =>
        prevBranches.filter(
          (branch) => branch.branchID !== branchToDelete.branchID
        )
      );
      context.showToast("Амжилттай устгагдлаа", { role: "success" });
    }

    setOpenDeleteModal(false);
  };
  const handleConfirm = async () => {
    const body = {
      branchID: editedBranch.branchID,
      branchName: editedBranch.branchName,
    };

    const response = await context.request({
      url: "branch/editBranch",
      method: "POST",
      body,
      model: "editBranch",
    });

    if (response.success) {
      // Update the branches state after successful edit
      setBranches((prevBranches) =>
        prevBranches.map((branch) =>
          branch.branchID === editedBranch.branchID ? editedBranch : branch
        )
      );
      context.showToast("Салбарын мэдээллийг шинэчиллээ", { role: "success" });
    }

    setOpenModal(false);
  };
  const handleViewDepartments = (branchID) => {
    navigate(`/departments/${branchID}`);
  };

  const columns = [
    { field: "branchID", headerName: "ID", disableClickEventBubbling: true },
    {
      field: "branchName",
      headerName: "Нэр",
      flex: 1,
      disableClickEventBubbling: true,
    },
    {
      field: "edit",
      headerName: "Засах",
      sortable: false,
      filterable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            style={{
              backgroundColor: colors.greenAccent[600],
              "&:hover": {
                backgroundColor: colors.greenAccent[700],
              },
            }}
            onClick={() => handleEditClick(params.row)}
          >
            Засах
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Устгах",
      sortable: false,
      filterable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            style={{
              backgroundColor: colors.redAccent[600],
              "&:hover": {
                backgroundColor: colors.redAccent[700],
              },
            }}
            onClick={() => handleDeleteClick(params.row)}
          >
            Устгах
          </Button>
        );
      },
    },
    {
      field: "viewDepartments",
      headerName: "Хэлтсийг Харах",
      sortable: false,
      filterable: false,
      width: 180,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            style={{
              backgroundColor: colors.blueAccent[500],
              "&:hover": {
                backgroundColor: colors.blueAccent[700],
              },
            }}
            onClick={() => handleViewDepartments(params.row.branchID)}
          >
            Хэлтсийг Харах
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Салбарууд" subtitle="Салбар удирдах хэсэг" />
      <Button
        variant="contained"
        style={{
          backgroundColor: colors.greenAccent[600],
          "&:hover": {
            backgroundColor: colors.greenAccent[700],
          },
        }}
        onClick={() => setOpenAddModal(true)}
      >
        Салбар нэмэх
      </Button>
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="add-branch-modal"
        aria-describedby="modal-to-add-branch"
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
          <Typography id="add-branch-modal" variant="h6" component="h2">
            Салбар нэмэх
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="newBranchName"
            label="Салбарын нэр"
            type="text"
            fullWidth
            value={newBranch.branchName}
            sx={{
              "& label.Mui-focused": {
                color: colors.primary[600], // Change color of label on focus
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary[600], // Change outline color on focus
                },
                "& .MuiInputBase-input": {
                  color: colors.primary[600], // Change input text color
                },
                "&::placeholder": {
                  color: colors.primary[600], // Change placeholder color
                },
              },
            }}
            onChange={(e) =>
              setNewBranch({ ...newBranch, branchName: e.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              onClick={() => setOpenAddModal(false)}
              color="primary"
              variant="contained"
              style={{
                marginRight: 10,
                backgroundColor: colors.redAccent[600],
                "&:hover": {
                  backgroundColor: colors.redAccent[700],
                },
              }}
            >
              Цуцлах
            </Button>
            <Button
              onClick={handleAddConfirm}
              color="primary"
              variant="contained"
              style={{
                backgroundColor: colors.greenAccent[600],
                "&:hover": {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
            >
              Нэмэх
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-branch-modal"
        aria-describedby="modal-to-delete-branch"
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
          <Typography id="delete-branch-modal" variant="h6" component="h2">
            Салбар устгах
          </Typography>
          <Typography>
            Та "{branchToDelete?.branchName}" салбарыг устгахдаа итгэлтэй байна
            уу?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              onClick={() => setOpenDeleteModal(false)}
              color="primary"
              variant="contained"
              style={{
                marginRight: 10,
                backgroundColor: colors.redAccent[600],
                "&:hover": {
                  backgroundColor: colors.redAccent[700],
                },
              }}
            >
              Цуцлах
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="secondary"
              variant="contained"
              style={{
                backgroundColor: colors.greenAccent[600],
                "&:hover": {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
            >
              Батлах
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="edit-branch-modal"
        aria-describedby="modal-to-edit-branch"
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
          <Typography id="edit-branch-modal" variant="h6" component="h2">
            Салбар засах
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="branchName"
            label="Салбарын нэр"
            type="text"
            fullWidth
            value={editedBranch?.branchName || ""}
            sx={{
              "& label.Mui-focused": {
                color: colors.primary[600], // Change color of label on focus
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary[600], // Change outline color on focus
                },
                "& .MuiInputBase-input": {
                  color: colors.primary[600], // Change input text color
                },
                "&::placeholder": {
                  color: colors.primary[600], // Change placeholder color
                },
              },
            }}
            onChange={(e) =>
              setEditedBranch((prev) => ({
                ...prev,
                branchName: e.target.value,
              }))
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              onClick={() => setOpenModal(false)}
              color="primary"
              variant="contained"
              style={{
                marginRight: 10,
                backgroundColor: colors.redAccent[600],
                "&:hover": {
                  backgroundColor: colors.redAccent[700],
                },
              }}
            >
              Цуцлах
            </Button>
            <Button
              onClick={handleConfirm}
              color="primary"
              variant="contained"
              style={{
                backgroundColor: colors.greenAccent[600],
                "&:hover": {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
            >
              Батлах
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
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
          className="no-cell-focus"
          disableSelectionOnClick
          rows={branches}
          columns={columns}
          getRowId={(row) => row.branchID}
        />
      </Box>
    </Box>
  );
};

export default Branch;
