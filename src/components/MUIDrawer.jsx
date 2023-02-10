import {
  AddBusinessOutlined,
  BallotOutlined,
  CheckCircleOutline,
  PendingOutlined,
  VolunteerActivismOutlined,
} from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../theme";

const Item = ({ to, icon, text }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={to}>
      <Box my={2} display="flex" width="100%" alignItems="center">
        <IconButton>{icon}</IconButton>
        <Typography variant="h5" color={colors.grey[100]}>
          {text}
        </Typography>
      </Box>
    </Link>
  );
};

const MUIDrawer = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        py={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
        width="200px"
        bgcolor={colors.primary[500]}
        height="100%"
      >
        <Box mt="60px">
          <Item
            to="/properties/sell"
            icon={<AddBusinessOutlined sx={{ color: colors.grey[100] }} />}
            text="Add Property"
          />
          <Item
            to="/properties/pendingapproval"
            icon={<PendingOutlined sx={{ color: colors.grey[100] }} />}
            text="Pending Approvals"
          />
          <Item
            to="/properties/approvedproperties"
            icon={<CheckCircleOutline sx={{ color: colors.grey[100] }} />}
            text="Approved Properties"
          />
          <Item
            to="/properties/holdings"
            icon={<VolunteerActivismOutlined  sx={{ color: colors.grey[100] }} />}
            text="Holdings"
          />
          <Item
            to="/properties/listedproperties"
            icon={<BallotOutlined sx={{ color: colors.grey[100] }} />}
            text="Listed Properties"
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default MUIDrawer;
