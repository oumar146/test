import React, { useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditStock from "./EditStock";



function ProductsList({ refresh, setRefresh, rows, setRows, data }) {
  React.useEffect(() => {
    const transformedRows = data.flatMap((item) =>
      item.stock.map((stockItem,index) => ({
        id: item.product_id + "-" + stockItem.size + index,
        product_id : item.product_id,
        product_name: item.product_name,
        description: item.description,
        creation_date: item.creation_date,
        price: item.price,
        category_name: item.category_name,
        image_url: item.image_url,
        gender_name: item.gender_name,
        reference: item.reference,
        creator_name: item.creator_name,
        creator_email: item.creator_email,
        size: stockItem.size,
        quantity: stockItem.quantity,
      }))
    );
    setRows(transformedRows);
  }, [data, setRows]);

  const [selectedRows, setSelectedRows] = useState([]); // Pour passer les données à DeletePopUp
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (id) => () => {
    const rowToEdit = rows.find((row) => row.id === id);
    setSelectedRows(rowToEdit);
    setIsEditModalOpen(true);
  };

  const columns = [
    { field: "product_name", headerName: "Nom", width: 200, editable: true },
    {
      field: "price",
      headerName: "Prix",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "size",
      headerName: "Taille",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantité",
      type: "number",
      width: 100,
      editable: true,
    },
    { field: "reference", headerName: "Référence", width: 220 },

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
      <DataGrid
        rows={rows}
        columns={columns}
      />
      {isEditModalOpen && data && selectedRows && (
        <EditStock
          data={selectedRows}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </Box>
  );
}

export default ProductsList;
