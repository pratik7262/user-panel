import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // console.log(response)

      const json = await response.json();
      console.log(json)
      if (json.success) {
        alert(json.responseMsg)
        navigate("/login");
      } else {
        alert(json.err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <Grid mt={4}>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlined />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            name="name"
            required
            value={credentials.name}
            onChange={onChange}
            label="Name"
            placeholder="Enter your name"
            sx={{ my: 1 }}
          />
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            placeholder="Enter your email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            required
            value={credentials.password}
            onChange={onChange}
            sx={{ my: 1 }}
            placeholder="Enter your password"
          />
          <TextField
            fullWidth
            sx={{ my: 1 }}
            name="cpassword"
            type="password"
            required
            value={credentials.cpassword}
            onChange={onChange}
            label="Confirm Password"
            placeholder="Confirm your password"
          />

          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
