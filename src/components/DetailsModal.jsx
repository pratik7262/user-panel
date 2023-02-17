import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { colors } from "../theme";

const Field = ({ field, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography fontWeight={700} variant="h3">
        {field}:
      </Typography>
      <Typography ml={1} variant="h4">
        {value}
      </Typography>
    </Box>
  );
};

const DetailsModal = ({ handleClose, open, property }) => {
  const paperStyle = {
    padding: 20,
    height: "30vh",
    margin: "20px auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: colors.primary[400],
    borderRadius: "5px",
    p: 4,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Field field="Name" value={property.title} />
              <Field field="Address" value={property.address} />
              <Field field="City" value={property.city} />
              <Field field="State" value={property.state} />
              <Field field="Price" value={property.price} />
              <Field field="area" value={property.area} />
            </Box>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
};

export default DetailsModal;
