import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { colors } from "../theme";
import { Header } from "./Header";

const CustomTextField = ({ label, name, fullWidth, onChange, value }) => {
  return (
    <TextField
      label={label}
      fullWidth={fullWidth}
      value={value}
      color="neutral"
      sx={{
        my: 1,
      }}
      name={name}
      onChange={onChange}
    />
  );
};

const AddProperty = () => {
  const [img, setImg] = useState("");

  const [details, setDetails] = useState({
    title: "",
    description: "",
    address: "",
    state: "",
    city: "",
    price: 0,
    area: 0,
  });
  
  const formData = new FormData();
  formData.append("title", details.title);
  formData.append("description", details.description);
  formData.append("address", details.address);
  formData.append("state", details.state);
  formData.append("city", details.city);
  formData.append("price", details.price);
  formData.append("area", details.area);
  formData.append("img", img);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
     const res=await axios.post("http://localhost:5000/api/property/addproperty",formData,{
      headers:{
        'auth-token':localStorage.getItem('token')
      }
     }) 
     if(res.data.success){
      alert(res.data.responseMsg)
     }  
    } catch (error) {
      alert(error);
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box m="10px 10px 0">
        <Header title="Add Properties" subtitle="Add Properties For Sell" />
        <Container>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <Box my={4} borderRadius={1} p={2} sx={{bgcolor:'white'}}>
              <Typography variant="h3" mb={2} color={colors.grey[900]}>
                Property Details
              </Typography>
              <CustomTextField
                value={details.title}
                fullWidth={true}
                onChange={onChange}
                label="Title"
                name="title"
              />
              <CustomTextField
                value={details.description}
                fullWidth={true}
                onChange={onChange}
                label="Description"
                name="description"
              />
              <CustomTextField
                value={details.address}
                fullWidth={true}
                onChange={onChange}
                label="Address"
                name="address"
              />
              <Stack spacing={3} alignItems="center" direction="row">
                <CustomTextField
                  onChange={onChange}
                  label="State"
                  name="state"
                />
                <CustomTextField onChange={onChange} label="City" name="city" />
                <CustomTextField onChange={onChange} label="Type" name="type" />
                <CustomTextField
                  onChange={onChange}
                  label="Price"
                  name="price"
                />
                <CustomTextField onChange={onChange} label="Area" name="area" />
              </Stack>
              <Box mt={3} display="flex" alignItems="center">
                <Typography variant="h4" mr={2} color={colors.grey[900]}>
                  Add Picture :
                </Typography>
                <TextField
                  sx={{
                   
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: colors.grey[900],
                      },
                    },
                  }}
                  type="file"
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                  }}
                />
              </Box>
              <Button
                type="submit"
                sx={{ mt: 2 }}
                variant="contained"
                size="large"
              >
                Send For Approval
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddProperty;
