import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { resizeFile } from "../resizer";
import { colors } from "../theme";

const CustomTextField = ({
  label,
  name,
  fullWidth,
  onChange,
  value,
  select,
}) => {
  return (
    <TextField
      select={select}
      label={label}
      fullWidth={fullWidth}
      value={value}
      color="neutral"
      variant="filled"
      sx={{
        maxWidth: "250px",
        fontSize: "3rem",
        my: 1,
        "& .css-1iur4r6-MuiFormLabel-root-MuiInputLabel-root ": {
          color: "black",
          fontSize: "1rem",
        },
        "& .css-1b4tj95-MuiFormLabel-root-MuiInputLabel-root": {
          color: "black",
          fontSize: "1rem",
        },
        "& .css-10botns-MuiInputBase-input-MuiFilledInput-input": {
          fontSize: "1.5rem",
          color: "black",
          bgcolor: "#e8f0fe",
        },
      }}
      name={name}
      onChange={onChange}
    />
  );
};

const CustomSelect = ({ value, onChange, label, name, arr }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      name={name}
      sx={{
        width: "250px",
        "& .css-d9oaum-MuiSelect-select-MuiInputBase-input-MuiFilledInput-input.MuiSelect-select":
          {
            bgcolor: "#e8f0fe",
            fontSize: "1.5rem",
          },
        "& .css-1gvrjsy-MuiFormLabel-root-MuiInputLabel-root": {
          color: "black",
          fontSize: "1.1rem",
        },
        "& .css-16qgwi8-MuiFormLabel-root-MuiInputLabel-root": {
          color: "black",
          fontSize: "1.1rem",
        },
      }}
      variant="filled"
      select
    >
      {arr.map((item) => {
        return (
          <MenuItem key={item.name} value={item.name}>
            {item.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

const AddProperty = () => {
  const [disabled, setDisabled] = useState(false);
  const [img, setImg] = useState("");
  const [subtypeArr, setSubtyArr] = useState(["Select Type First"]);
  const [countries, setCountries] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    address: "",
    country: "",
    zipCode: "",
    state: "",
    city: "",
    price: "",
    area: "",
    type: "",
    subtype: "",
  });

  const type = [
    { name: "Residential" },
    { name: "Commercial" },
    { name: "Land" },
  ];

  const formData = new FormData();
  formData.append("type", details.type);
  formData.append("subtype", details.subtype);
  formData.append("title", details.title);
  formData.append("description", details.description);
  formData.append("address", details.address);
  formData.append("city", details.city);
  formData.append("price", details.price);
  formData.append("area", details.area);
  formData.append("country", details.country);
  formData.append("zipCode", details.zipCode);

  formData.append("img", img);
  const onSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/property/addproperty",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        alert(res.data.responseMsg);
        window.location.reload();
        setDisabled(false);
      }
    } catch (error) {
      alert("Plaese Fill All The Fields Properly");
      setDisabled(false);
    }
  }; // on submit the data to our api

  const getCountries = async () => {
    const response = await fetch(
      "https://parseapi.back4app.com/classes/Country?limit=250&keys=name",
      {
        headers: {
          "X-Parse-Application-Id": "mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja", // This is the fake app's application id
          "X-Parse-Master-Key": "TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH", // This is the fake app's readonly master key
        },
      }
    );
    const data = await response.json(); // Here you have the data that you need

    setCountries(data.results);
  }; //gets the all countries

  const onChange = (e) => {
    if (e.target.name === "type") {
      if (e.target.value === "Residential") {
        setSubtyArr([
          { name: "Individual Home" },
          { name: "Apartment" },
          { name: "Townhouse" },
          { name: "Villa" },
        ]);
      } else if (e.target.value === "Commercial") {
        setSubtyArr([
          { name: "Single Shop" },
          { name: "Complex" },
          { name: "Warehouse" },
          { name: "Storage House" },
        ]);
      } else if (e.target.value === "Land") {
        setSubtyArr([
          { name: "Agricultural" },
          { name: "Commericial" },
          { name: "Residential" },
          { name: "Industrial" },
        ]);
      }
      setDetails({ ...details, [e.target.name]: e.target.value });
    } else {
      setDetails({ ...details, [e.target.name]: e.target.value });
    }
  };

  const imageOnchange = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setImg(image);
      console.log(file, 206);
      console.log(image, 207);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <Box m="10px 10px 0">
        <Container>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <Box
              my={4}
              borderRadius={1}
              p={2}
              sx={{ bgcolor: colors.primary[400] }}
            >
              <Typography variant="h3" mb={2} color={colors.grey[100]}>
                Property Details
              </Typography>
              <Stack spacing={3} alignItems="center" direction="row">
                <CustomSelect
                  value={details.type}
                  onChange={onChange}
                  label="Type"
                  name="type"
                  arr={type}
                />
                <CustomSelect
                  value={details.subtype}
                  onChange={onChange}
                  label="Subtype"
                  name="subtype"
                  arr={subtypeArr}
                />
              </Stack>
              <Stack spacing={3} mt={1} alignItems="center" direction="row">
                <CustomTextField
                  value={details.title}
                  onChange={onChange}
                  label="Title"
                  name="title"
                />
                <CustomTextField
                  value={details.description}
                  onChange={onChange}
                  label="Description"
                  name="description"
                />
                <CustomTextField
                  value={details.address}
                  onChange={onChange}
                  label="Address"
                  name="address"
                />
              </Stack>

              <Stack spacing={3} alignItems="center" direction="row">
                <CustomTextField
                  value={details.price}
                  onChange={onChange}
                  label="Price"
                  name="price"
                />
                <CustomTextField
                  value={details.area}
                  onChange={onChange}
                  label="Area"
                  name="area"
                />
              </Stack>

              <Stack mt={1} spacing={3} alignItems="center" direction="row">
                <CustomSelect
                  value={details.country}
                  onChange={onChange}
                  label="Country"
                  name="country"
                  arr={countries}
                />
                <CustomTextField onChange={onChange} label="City" name="city" />
                <CustomTextField
                  onChange={onChange}
                  label="Zip Code"
                  name="zipCode"
                />
              </Stack>
              <Box mt={3} display="flex" alignItems="center">
                <Typography variant="h4" mr={2} color={colors.grey[100]}>
                  Add Picture :
                </Typography>
                <TextField
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
                  onChange={imageOnchange}
                  // onChange={
                  //   (e) => {
                  //     setImg(e.target.files[0]);
                  //   }}
                />
              </Box>
              <Button
                disabled={disabled}
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
