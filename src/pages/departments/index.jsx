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
            color="secondary"
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
      <Header
        title="АНГИЛЛУУД"
        subtitle={`Тасгийн ${branchID} дугаартай салбарын ангиллуудыг зохион байгуулах`}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddModal(true)}
        sx={{ mt: 2 }}
      >
        Ангилал нэмэх
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
            Ангилал нэмэх
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="depname"
            label="Ангиллын нэр"
            type="text"
            fullWidth
            variant="outlined"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button onClick={() => setOpenAddModal(false)} color="primary">
              Цуцлах
            </Button>
            <Button onClick={handleAddDepartment} color="primary">
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
            Ангилал засах
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="depName"
            label="Ангиллын нэр"
            type="text"
            fullWidth
            variant="outlined"
            value={editedDepartment?.depName}
            onChange={(e) =>
              setEditedDepartment({
                ...editedDepartment,
                depName: e.target.value,
              })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button onClick={() => setOpenEditModal(false)} color="primary">
              Цуцлах
            </Button>
            <Button onClick={handleEditConfirm} color="primary">
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
            Ангилал устгах
          </Typography>
          <Typography variant="body1" gutterBottom>
            Та энэ ангиллыг устгахдаа итгэлтэй байна уу?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button onClick={() => setOpenDeleteModal(false)} color="primary">
              Цуцлах
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Устгах
            </Button>
          </Box>
        </Box>
      </Modal>
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
  );
};

export default Departments;
