import { Button, Grid, Modal, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { colors } from "../theme";

const InvestModal = ({ handleClose, open, propertyInfo, url }) => {
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
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: propertyInfo.name,
        price: propertyInfo.price,
        sellerId: propertyInfo.user,
        units: units,
        propertyId: propertyInfo.propertyId,
      }),
    });
    console.log(propertyInfo);
    const json = await response.json();
    if (json.resMSG) {
      alert(json.resMSG);
      setDisabled(false)
      handleClose();
    } else {
      alert("Some Error Occured");
      setDisabled(false)
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
                disabled={disabled}
                type="submit"
                color="primary"
                variant="contained"
                sx={{ margin: "8px 0" }}
                fullWidth
              >
                Invest
              </Button>
            </form>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
};

export default InvestModal;
