import { Box } from "@mui/material";
import CardItem from "./CardItem";
import React from "react";

const CardItemContainer = ({ arr }) => {
  return (
    <Box px={2} mt={2} display="flex" width="100%" height="100%">
      {arr.map((item) => {
        return <CardItem img={item.img} country={item.country} price={item.price} city={item.city}/>;
      })}
    </Box>
  );
};

export default CardItemContainer;
