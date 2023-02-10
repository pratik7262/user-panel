import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../theme";
import InvestModal from "./InvestModal";

const CardItem = ({ img, country, city, price }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <InvestModal open={open} setOpen={setOpen} />
      <Card
        sx={{ mx: 2, bgcolor: colors.primary[400], width: 350, maxHeight: 350 }}
      >
        <CardMedia sx={{ height: 170 }} image={img} title="green iguana" />
        <CardContent>
          <Typography
            color={colors.grey[100]}
            textAlign="center"
            variant="h5"
            fontWeight={700}
          >
            Country: {country}
          </Typography>
          <Typography
            color={colors.grey[100]}
            textAlign="center"
            variant="h5"
            fontWeight={700}
          >
            City: {city}
          </Typography>
          <Typography
            color={colors.grey[100]}
            textAlign="center"
            variant="h5"
            fontWeight={700}
          >
            Market Price: {price}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="blue"
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Invest
          </Button>
          <Button color="blue" variant="contained">
            details
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CardItem;
