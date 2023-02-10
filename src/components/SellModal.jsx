import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../theme";

const SellModal = ({ handleClose, open, propertyInfo }) => {
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

  const [units, setUnits] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/listed/listproperty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: propertyInfo.id,
        name: propertyInfo.name,
        units: units,
      }),
    });
    const json = await response.json();

    if (json.resMSG) {
      alert(json.resMSG);
      handleClose()
    } else {
      alert("Please Verify Your Email First");
    }
  };

  const onChange = (e) => {
    setUnits(e.target.value);
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
