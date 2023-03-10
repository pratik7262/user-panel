import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import { Header } from "./Header";

const Approval = () => {
  const [pendingProperties, setPendingProperties] = useState([]);
  const fetchData = async () => {
    const responce = await fetch(
      "http://localhost:5000/api/property/specificpendingproperties",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await responce.json();
    setPendingProperties(json.properties);
  };

  useEffect(() => {
    fetchData();
  }, [pendingProperties]);

  const deleteProp = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/property/deleteProperty/${id}`,
      {
        method: "GET",
      }
    );

    alert(res.data.resMSG);
  };

  const columns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {id}
          </Typography>
        );
      },
    },
    {
      field: "title",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row: { title } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {title}
          </Typography>
        );
      },
    },
    {
      field: "date",
      headerName: "Date Of Submission",
      headerAlign: "left",
      type: Date,
      align: "left",
      renderCell: ({ row: { date } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {date}
          </Typography>
        );
      },
    },
    {
      field: "price",
      headerName: "Seeling Price",
      flex: 1,
      renderCell: ({ row: { price } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {price}
          </Typography>
        );
      },
    },
    {
      field: "details",
      headerName: "Details",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Button color="blue" variant="contained">
            details
          </Button>
        );
      },
    },
    {
      field: "approved",
      headerName: "Status",
      flex: 1,
      align:'center',
      headerAlign: "center",
      renderCell: () => {
        return (
            <Button color="error" variant="contained">
              Pending
            </Button>
          
        );
      },
    },
    {
      field: "remove",
      headerName: "Delete Property",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        return (
          <Button
            color="error"
            onClick={() => {
              deleteProp(_id);
            }}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box m={2}>
      <Header title="Pending Properties" />
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            border: "none",
            color: colors.grey[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderTop: "none",
            color: colors.blueAccent[700],
          },
          "& .MuiToolbar-gutters": {
            display: "none",
          },
        }}
      >
        <DataGrid rows={pendingProperties} columns={columns} />
      </Box>
    </Box>
  );
};

export default Approval;
