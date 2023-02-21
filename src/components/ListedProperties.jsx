import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import { Header } from "./Header";

const ListedProperties = () => {
  const [listedProperty, setlistedProperty] = useState([]);
  const deleteListedProperty = async (id) => {
    let res = await fetch(
      "http://localhost:5000/api/listed/deleteListedProperty",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );

    const json=await res.json()
    alert(json.resMSG)
  };
  const getProperties = async () => {
    const resp = await fetch(
      "http://localhost:5000/api/listed/specificlistedproperty",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await resp.json();
    setlistedProperty(json.listedProperty);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const columns = [
    {
      field: "genaratedPropertyId",
      headerName: "id",
      flex: 1,
      renderCell: ({ row: { genaratedPropertyId } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {genaratedPropertyId}
          </Typography>
        );
      },
    },
    {
      field: "name",
      headerName: "Property",
      flex: 1,
      renderCell: ({ row: { name } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {name}
          </Typography>
        );
      },
    },
    {
      field: "units",
      headerName: "Units",
      headerAlign: "left",
      type: Date,
      align: "left",
      renderCell: ({ row: { units } }) => {
        return (
          <Typography variant="h5" color={colors.grey[100]}>
            {units}
          </Typography>
        );
      },
    },

    {
      field: "details",
      headerName: "Details",
      align: "center",
      headerAlign: "center",
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
      field: "delete",
      headerName: "Delete",
      align: "center",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { _id } }) => {
        return (
          <Button
            onClick={() => {
              deleteListedProperty(_id);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Box m="10px 10px 0">
        <Header title="Listed Properties" />
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
          <DataGrid rows={listedProperty} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default ListedProperties;
