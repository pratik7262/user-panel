import {
  Avatar,
  Button,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  Box
} from "@mui/material";
import React from "react";
import { AccountCircleOutlined, Logout } from "@mui/icons-material";
import { useToggle } from "../hooks/useToggle";
import { useState } from "react";
import { useEffect } from "react";
import { colors } from "../theme";


export const UserProfile = () => {
  const { el, open, onClick, onClose } = useToggle();
  const [user, setUser] = useState({})
  const getUser=async ()=>{
        const res=await fetch('http://localhost:5000/api/auth/fetchuser')
        const json=await res.json()
        setUser(json.user)
  }
  useEffect(() => {
    // getUser()
    // eslint-disable-next-line
  }, [])
  
  const logOut=()=>{
    alert('loged out')
  }
  return (
    <Box sx={{ px: 1, mt: 1 }}>
      <Button id="basic-button" onClick={onClick}>
        <AccountCircleOutlined
          sx={{ color: "neutral.light", fontSize: "30px" }}
        />
      </Button>
      <Menu
        anchorEl={el}
        id="basic-menu"
        open={open}
        onClose={onClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <ListItem onClick={logOut} sx={{ pt: 1, pb: 1 }} alignItems="center">
          <ListItemAvatar>
            <Logout sx={{ color: colors.primary[400], fontSize: "30px" }}/>
          </ListItemAvatar>
          <ListItemText
            primary='Log Out'
          />
        </ListItem>
      </Menu>
    </Box>
  );
};
