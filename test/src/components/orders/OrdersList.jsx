import React, { useState, useEffect } from "react";
import config from "../../config";
import axios from "axios";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditPopUp from "./EditPopUp";



function OrdersList({ refresh, setRefresh, rows, setRows, data }) {
  React.useEffect(() => {
    setRows(data.map((item) => ({ ...item, id: item.id || item.product_id })));
  }, [data, setRows]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/order/status`);
        setStatuses(response.data.status);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatuses();
  }, []);

  const handleEditClick = (id) => () => {
    const rowToEdit = rows.find((row) => row.id === id);
    setSelectedRows(rowToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => () => {
    const rowToDelete = rows.find((row) => row.id === id);
    setSelectedRows([rowToDelete]);
  };


  const columns = [
    { field: "order_id", headerName: "Référence", width: 220 },
    {
      field: "product_name",
      headerName: "Nom",
      width: 200,
      editable: true,
    },
    {
      field: "product_price",
      headerName: "Prix",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "user_email",
      headerName: "Email Utilisateur",
      width: 250,
      editable: false,
    },
    {
      field: "user_phone",
      headerName: "Téléphone Utilisateur",
      width: 150,
      editable: false,
    },
    {
      field: "quantity",
      headerName: "Quantité",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Montant Total",
      type: "number",
      width: 150,
      editable: false,
    },
    {
      field: "created_at",
      headerName: "Date de Création",
      width: 200,
      editable: false,
    },
    {
      field: "order_status",
      headerName: "Statut",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
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
      <DataGrid rows={rows} columns={columns} />

      {isEditModalOpen && data && selectedRows && statuses && (
        <EditPopUp
          data={selectedRows}
          statuses={statuses}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}

export default OrdersList;
