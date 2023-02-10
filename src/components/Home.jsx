import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import CardItemContainer from "./CardItemContainer";

const Home = () => {
  const [property, setProperty] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/property/approvedproperties") //api for the get request
      .then((response) => response.json())
      .then((data) => setProperty(data.properties));
  }, []);
  return (
    <Box
      mt={9}
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CardItemContainer arr={property} />
    </Box>
  );
};

export default Home;
