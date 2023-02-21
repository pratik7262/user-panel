import {  MenuOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../theme";
import MUIDrawer from "./MUIDrawer";
import { UserProfile } from "./userPropfile";

const Pages = ({ to, text, onClick }) => {
  return (
    <Link onClick={onClick} style={{ textDecoration: "none" }} to={to}>
      <Typography
        sx={{ color: colors.grey[100], fontWeight: 700 }}
        variant="h5"
      >
        {text}
      </Typography>
    </Link>
  );
};

export const Topbar = ({ setDisplayNone, setDisplayBlock }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MUIDrawer onClose={onClose} setOpen={setOpen} open={open} />
      <Box
        display="flex"
        position="sticky"
        top="0"
        bgcolor={colors.primary[400]}
        justifyContent="space-between"
        alignItems="center"
        p={1}
        zIndex={2}
      >
        <Box
          display="flex"
          width="500px"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton edge="start" size="large" onClick={() => setOpen(true)}>
            <MenuOutlined sx={{ color: colors.grey[100] }} />
          </IconButton>
          <Pages to="/" text="Home" onClick={setDisplayBlock} />
          <Pages to="/properties" text="New Properties" onClick={setDisplayBlock} />
          <Pages to="/marketplace" text="Marketplace" onClick={setDisplayBlock} />
          <Pages to="/about" text="About Us" onClick={setDisplayNone} />
          <Pages to="/help" text="Help" onClick={setDisplayNone} />
        </Box>
        {localStorage.getItem("token") ? (
          <Box> 
            <UserProfile/>
          </Box>
        ) : (
          <Box display="flex" width="150px" justifyContent="space-between">
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/signup">
              <Button variant="contained" color="success">
                Sign Up
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};
