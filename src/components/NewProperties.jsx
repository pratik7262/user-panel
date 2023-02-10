import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../theme";
import InvestModal from "./InvestModal";

const NewProperties = () => {
  const [property, setProperty] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [propertyInfo, setPropertyInfo] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    fetch("http://localhost:5000/api/property/approvedproperties") //api for the get request
      .then((response) => response.json())
      .then((data) => setProperty(data.properties));
  }, []);
  console.log(property);
  return (
    <>
      <Grid
        p={4}
        rowSpacing={3}
        direction="row"
        columnSpacing={2}
        container
        mt={2}
        width="100%"
      >
        {property.map((item) => {
          return (
            <Grid key={item._id} xs={12} sm={3} item>
              <Card
                sx={{
                  bgcolor: colors.primary[400],
                  width: "100%",
                  maxHeight: 350,
                }}
              >
                <CardMedia
                  sx={{ height: 170 }}
                  image="data:image/jpeg;base64,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"
                  title="green iguana"
                />
                <CardContent>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="center"
                    variant="h5"
                    fontWeight={700}
                  >
                    Property:{item.title}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="center"
                    variant="h5"
                    fontWeight={700}
                  >
                    Units:{item.units}
                  </Typography>
                  <Typography
                    color={colors.grey[100]}
                    textAlign="center"
                    variant="h5"
                    fontWeight={700}
                  >
                    Price Per Unit: {100}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button color="blue" onClick={()=>{setPropertyInfo({id:item._id,name:item.title,sellerId:''});handleOpen(); }} variant="contained">
                    Invest
                  </Button>
                  <Button color="blue" variant="contained">
                    details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <InvestModal propertyInfo={propertyInfo} url="http://localhost:5000/api/invested/invest" open={open} handleClose={handleClose}/>
    </>
  );
};

export default NewProperties;
