import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { colors } from "../theme";
export const Header = (props) => {
  return (
    <Paper  elevation={4} sx={{p:2,bgcolor:colors.primary[400],maxWidth:350}}>
      <Box sx={{ mb: "30px" }}>
        <Typography variant="h2" color={colors.grey[100]} sx={{ mb: "5px" }}>
          {props.title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {props.subtitle}
        </Typography>
      </Box>
    </Paper>
  );
};
