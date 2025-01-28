import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridToolbarContainer,
} from "@mui/x-data-grid";

function EditToolbar({ setIsAddModalOpen }) {
  const handleClick = () => {
    setIsAddModalOpen(true);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add User
      </Button>
    </GridToolbarContainer>
  );
}

function UsersList({users }) {
  const [rows, setRows] = useState();
  React.useEffect(() => {
    setRows(
      users.map((user) => ({
        ...user,
        id: user.id || user.user_id,
        phone: user.phone ? `0${user.phone.slice(1)}` : user.phone, 
      }))
    );
  }, [users, setRows]);
  

  const columns = [
    { field: "first_name", headerName: "Prénom", width: 150, editable: true },
    { field: "last_name", headerName: "Nom", width: 150, editable: true },
    {
      field: "phone",
      headerName: "Téléphone",
      width: 150,
      renderCell: (params) => (
        <a href={`tel:${params.value}`} style={{ textDecoration: "underline" }}>
          {params.value}
        </a>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => (
        <a href={`mailto:${params.value}`} style={{ textDecoration: "underline" }}>
          {params.value}
        </a>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: EditToolbar }}
      />
    </Box>
  );
}

export default UsersList;
