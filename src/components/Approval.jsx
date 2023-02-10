import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import { Header } from "./Header";

const Approval = () => {
  const theme = useTheme();
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
    const json=await responce.json();
    setPendingProperties(json.properties)
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    {
      field: "title",
      headerName: "Property",
      flex: 1,
      renderCell: ({ row: {title} }) => {
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
      align:"center",
      flex: 1,
      renderCell: ({ row: { details } }) => {
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
            backgroundColor={theme.palette.error.main}
          >
            <Typography variant="h5" color={colors.grey[100]}>
              Pending
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m={2}>
      <Header title="Pending Approvals" />
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
        <DataGrid rows={pendingProperties} columns={columns} />
      </Box>
    </Box>
  );
};

export default Approval;
