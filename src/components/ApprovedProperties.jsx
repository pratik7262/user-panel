import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import { Header } from "./Header";

const ApprovedProperties = () => {
  const [approvedProperties, setApprovedProperties] = useState([]);
  const fetchData = async () => {
    const responce = await fetch(
      "http://localhost:5000/api/property/specificapprovedproperties",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await responce.json();
    setApprovedProperties(json.properties);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
      headerName: "Property",
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
      headerName: "Date Of Approval",
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
      flex: 1,
      renderCell: () => {
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
      headerAlign: "center",
      renderCell: () => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            backgroundColor={colors.greenAccent[500]}
          >
            <Typography variant="h5" color={colors.grey[100]}>
              Approved
            </Typography>
          </Box>
        );
      },
    },
  ];
  
  return (
    <Box m={2}>
      <Header title="Approved Properties" />
      <Box
        m="40px 0 0 0"
        height="65vh"
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
        <DataGrid rows={approvedProperties} columns={columns} />
      </Box>
    </Box>
  );
};

export default ApprovedProperties;
