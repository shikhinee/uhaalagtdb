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
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const Departments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { request } = useContext(GlobalContext);
  const [departments, setDepartments] = useState([]);
  const { branchID } = useParams();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedDepartment, setEditedDepartment] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await request({
        url: `branch/getDepartments?branchID=${branchID}`,
        model: "getDepartments",
      });

      if (response.success) {
        setDepartments(response.value);
      }
    };

    fetchDepartments();
  }, [branchID]);

  const handleAddDepartment = async () => {
    const depID = Math.floor(Math.random() * 100000000);
    const body = {
      depID,
      branchID: parseInt(branchID),
      depName: newDepartment,
    };

    const response = await request({
      url: "branch/addDepartment",
      method: "POST",
      body,
      model: "addDepartment",
    });

    if (response.success) {
      setDepartments([...departments, body]);
      setNewDepartment("");
    }

    setOpenAddModal(false);
  };

  const handleEditClick = (department) => {
    setEditedDepartment(department);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    const response = await request({
      url: `branch/removeDepartment?departmentID=${departmentToDelete.depID}`,
      method: "DELETE",
      model: "removeDepartment",
    });

    if (response.success) {
      setDepartments((prevDepartments) =>
        prevDepartments.filter(
          (department) => department.depID !== departmentToDelete.depID
        )
      );
    }

    setOpenDeleteModal(false);
  };

  const handleEditConfirm = async () => {
    const body = {
      depID: editedDepartment.depID,
      branchID: parseInt(branchID),
      depName: editedDepartment.depName,
    };

    const response = await request({
      url: "branch/editDepartment",
      method: "POST",
      body,
      model: "editDepartment",
    });

    if (response.success) {
      setDepartments((prevDepartments) =>
        prevDepartments.map((department) =>
          department.depID === editedDepartment.depID
            ? editedDepartment
            : department
        )
      );
    }

    setOpenEditModal(false);
  };

  const columns = [
    { field: "depID", headerName: "ID" },
    { field: "depName", headerName: "Нэр", flex: 1 },
    {
      field: "edit",
      headerName: "Засах",
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
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
  ];

  return (
    <Box m="20px">
      <Header title="Хэлтсүүд" subtitle={`${branchID} салбарын хэлтсүүд `} />
      <Button
        variant="contained"
        style={{
          backgroundColor: colors.greenAccent[600],
          "&:hover": {
            backgroundColor: colors.greenAccent[700],
          },
        }}
        onClick={() => setOpenAddModal(true)}
        sx={{ mt: 2 }}
      >
        Хэлтэс нэмэх
      </Button>
      {/* Add Department Modal */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="add-department-modal"
        aria-describedby="modal-to-add-department"
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
          <Typography id="add-department-modal" variant="h6" component="h2">
            Хэлтэс нэмэх
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="depname"
            label="Хэлтсийн нэр"
            type="text"
            fullWidth
            variant="outlined"
            value={newDepartment}
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
            onChange={(e) => setNewDepartment(e.target.value)}
          />
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
              onClick={() => setOpenAddModal(false)}
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
              onClick={handleAddDepartment}
              color="primary"
            >
              Нэмэх
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Edit Department Modal */}
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-department-modal"
        aria-describedby="modal-to-edit-department"
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
          <Typography id="edit-department-modal" variant="h6" component="h2">
            Хэлтэс засах
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="depName"
            label="Хэлтсийн нэр"
            type="text"
            fullWidth
            variant="outlined"
            value={editedDepartment?.depName}
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
              setEditedDepartment({
                ...editedDepartment,
                depName: e.target.value,
              })
            }
          />
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
              onClick={() => setOpenEditModal(false)}
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
              onClick={handleEditConfirm}
              color="primary"
            >
              Засах
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Delete Department Modal */}
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="delete-department-modal"
        aria-describedby="modal-to-delete-department"
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
          <Typography id="delete-department-modal" variant="h6" component="h2">
            Хэлтэс устгах
          </Typography>
          <Typography variant="body1" gutterBottom>
            Та энэ хэлтсийг устгахдаа итгэлтэй байна уу?
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
              onClick={() => setOpenDeleteModal(false)}
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
              onClick={handleDeleteConfirm}
              color="primary"
            >
              Устгах
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
          rows={departments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.depID}
          style={{ height: 400, width: "100%" }}
          sx={{ mt: 2 }}
        />
      </Box>
    </Box>
  );
};

export default Departments;
