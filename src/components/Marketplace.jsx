import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import { Header } from "./Header";
import InvestModal from "./InvestModal";

function Marketplace() {
  const [open, setOpen] = React.useState(false);
  const [propertyInfo, setPropertyInfo] = useState({});
  const [investedProperties, setInvestedProperties] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getProperties = async () => {
    const resp = await fetch(
      "http://localhost:5000/api/listed//alllistedproperty",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await resp.json();
    setInvestedProperties(json.listedProperty);
    console.log(json.listedProperty)
  };
  useEffect(() => {
    getProperties();
  }, []);

  const columns = [
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
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { propertyId } }) => {
        return (
          <Button color="blue" variant="contained">
            details
          </Button>
        );
      },
    },
    {
      field: "invest",
      headerName: "Invest Property",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { propertyId, name, user } }) => {
        let isOwner = false;
        const setIsOwner = () => {
          if (user === localStorage.getItem("userId")) {
            isOwner = true;
            return isOwner;
          }
          return false;
        };
        return (
          <Button
            disabled={setIsOwner()}
            onClick={() => {
              setPropertyInfo({ propertyId, name, user });
              handleOpen();
            }}
            color="blue"
            variant="contained"
          >
            Invest
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Box m="10px 10px 0">
        <Header title="Marketplace" />
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
          <DataGrid rows={investedProperties} columns={columns} />
          <InvestModal
            propertyInfo={propertyInfo}
            open={open}
            url="http://localhost:5000/api/invested/investinlistedproperty"
            handleClose={handleClose}
          />
        </Box>
      </Box>
    </>
  );
}

export default Marketplace;
