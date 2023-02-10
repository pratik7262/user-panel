import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        "& .css-4zl7km-MuiFormLabel-root-MuiInputLabel-root": {
          color: colors.grey[100],
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: colors.grey[100],
          },
        },
      }}
      name={name}
      onChange={onChange}
    />
  );
};

const AddProperty = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    title: "",
    description: "",
    address: "",
    state: "",
    city: "",
    price: 0,
    area: 0,
    img: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/property/addproperty",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: details.title,
            description: details.description,
            address: details.address,
            state: details.state,
            city: details.city,
            price: details.price,
            area: details.area,
            img: details.img,
          }),
        }
        
      );
      const json = await response.json();
        console.log(json)
        console.log(details.img)
      if (json.success) {
        alert(json.responseMsg);
        // navigate("/properties/portfolio");
      } else {
        alert("Please Add Diffrent Description");
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
          <form onSubmit={onSubmit} encType='multipart/form-data'>
            <Box my={4} borderRadius={1} p={2} bgcolor={colors.primary[400]}>
              <Typography variant="h3" mb={2} color={colors.grey[100]}>
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
                <Typography variant="h4" mr={2} color={colors.grey[100]}>
                  Add Picture :
                </Typography>
                <TextField
                  value={details.img}
                  sx={{
                    my: 1,
                    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        color: colors.grey[100],
                      },
                    "& .css-4zl7km-MuiFormLabel-root-MuiInputLabel-root": {
                      color: colors.grey[100],
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: colors.grey[100],
                      },
                    },
                  }}
                  type="file"
                  name="img"
                  onChange={onChange}
                />
              </Box>
              <Button
                type="submit"
                sx={{ mt: 2 }}
                variant="contained"
                size="large"
              >
                Send To Approval
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddProperty;
