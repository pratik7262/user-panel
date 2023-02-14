import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import DetailsModal from "./DetailsModal";
import { Header } from "./Header";
import SellModal from "./SellModal";

function Portfolio() {
  const [open, setOpen] = React.useState(false);//states open of invest modal
  const [dOpen, setDopen] = React.useState(false);//states open of detaols modal

  const [propertyInfo, setPropertyInfo] = useState({});//sets property info of details and invest modal
  const [investedProperties, setInvestedProperties] = useState([]);//states all invested properties
  const handleOpen = () => setOpen(true);//handle open of invest modal
  const handleDopen = () => {
    setDopen(true);
  };//handles open of details modal
  const handleClose = () => {
    setOpen(false);
    setDopen(false);
  };//handles onclose
  
  const getProperties = async () => {
    const resp = await fetch(
      "http://localhost:5000/api/invested/specificinvestedproperty",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    const json = await resp.json();
    console.log(json);
    setInvestedProperties(json.investedProperty);
  };

  //function for getting details
  const getDetails = async (id) => {
    const responce = await fetch(
      `http://localhst:5000/api/property/propertyinfo/${id}`
    );

    const json = await responce.json();
    console.log(json);
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
      renderCell: ({ row: { id } }) => {
        return (
          <Button
            color="blue"
            onClick={() => {
              handleDopen();
              getDetails(id)
            }}
            variant="contained"
          >
            details
          </Button>
        );
      },
    },
    {
      field: "sell",
      headerName: "Sell Property",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { id, name } }) => {
        return (
          <Button
            onClick={() => {
              setPropertyInfo({ id: id, name: name });
              handleOpen();
            }}
            color="blue"
            variant="contained"
          >
            sell
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Box m="10px 10px 0">
        <Header title="Holdings" />
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
          <SellModal
            propertyInfo={propertyInfo}
            open={open}
            handleClose={handleClose}
          />
          <DetailsModal handleClose={handleClose}  open={dOpen} />
        </Box>
      </Box>
    </>
  );
}

export default Portfolio;
