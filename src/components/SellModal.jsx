import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../theme";

const SellModal = ({ handleClose, open, propertyInfo }) => {
  console.log(propertyInfo);
  const paperStyle = {
    padding: 20,
    height: "30vh",
    margin: "20px auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: colors.primary[400],
    borderRadius: "5px",
    p: 4,
  };

  const [details, setDetails] = useState({ units: 0, price: 0 });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/api/listed/listproperty",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          propertyId: propertyInfo.propertyId,
          name: propertyInfo.name,
          units: details.units,
          price: details.price,
          id:propertyInfo.id
        }),
      }
    );

    const json = await response.json();

    if (json.resMSG) {
      alert(json.resMSG);
      handleClose();
    } else {
      alert("Some Error Occured");
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid mt={4}>
          <Paper elevation={10} style={paperStyle}>
            <form onSubmit={onSubmit}>
              <TextField
                label="Units"
                placeholder="Enter No Of Units"
                fullWidth
                required
                sx={{ my: 1 }}
                name="units"
                onChange={onChange}
              />
              <TextField
                label="Price"
                placeholder="Enter Price At which You Want To Sell"
                fullWidth
                required
                sx={{ my: 1 }}
                name="price"
                onChange={onChange}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ margin: "8px 0" }}
                fullWidth
              >
                Add To Marketplace
              </Button>
            </form>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
};

export default SellModal;
