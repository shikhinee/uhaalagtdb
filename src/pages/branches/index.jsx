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
  const { request } = useContext(GlobalContext);
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
      const response = await request({
        url: "branch/getBranches",
        model: "getBranches",
      });

      if (response.success) {
        setBranches(response.value);
      }
    };

    fetchBranches();
  }, []);
  const handleCellClick = (params, event) => {
    if (
      event.target.tagName === "DIV" &&
      event.target.classList.contains("MuiDataGrid-cell")
    ) {
      navigate(`/departments/${params.row.branchID}`);
    }
  };
  const handleAddConfirm = async () => {
    const body = {
      branchID: generateRandomID(),
      branchName: newBranch.branchName,
    };

    const response = await request({
      url: "branch/addBranch",
      method: "POST",
      body,
      model: "addBranch",
    });

    if (response.success) {
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
    const response = await request({
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
    }

    setOpenDeleteModal(false);
  };
  const handleConfirm = async () => {
    const body = {
      branchID: editedBranch.branchID,
      branchName: editedBranch.branchName,
    };

    const response = await request({
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
    }

    setOpenModal(false);
  };
  const columns = [
    { field: "branchID", headerName: "ID" },
    {
      field: "branchName",
      headerName: "Name",
      flex: 1,
      // Add the cell click handler
      cellClassName: "clickable",
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddModal(true)}
      >
        Add Branch
      </Button>
      {/* Add the new modal */}
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
            Add Branch
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="newBranchName"
            label="Branch Name"
            type="text"
            fullWidth
            value={newBranch.branchName}
            onChange={(e) =>
              setNewBranch({ ...newBranch, branchName: e.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button onClick={() => setOpenAddModal(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddConfirm} color="primary">
              Add
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
            Delete Branch
          </Typography>
          <Typography>
            Are you sure you want to delete the branch "
            {branchToDelete?.branchName}"?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button onClick={() => setOpenDeleteModal(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Confirm
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
            Edit Branch
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="branchName"
            label="Branch Name"
            type="text"
            fullWidth
            value={editedBranch?.branchName || ""}
            onChange={(e) =>
              setEditedBranch((prev) => ({
                ...prev,
                branchName: e.target.value,
              }))
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button onClick={() => setOpenModal(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
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
          rows={branches}
          columns={columns}
          getRowId={(row) => row.branchID}
          onCellClick={handleCellClick}
        />
      </Box>
    </Box>
  );
};

export default Branch;
