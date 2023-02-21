import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { colors } from "../theme";

export const Header = (props) => {
  return (
      <Box sx={{ mb: "30px" }}>
        <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "5px" }}>
          {props.title}
        </Typography>
      </Box>
  );
};
