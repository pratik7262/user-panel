import {
  Button,
  Card,
  CardActions,
  CardContent,
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
  }, [property]);

  
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
                  maxHeight: 450,
                }}
              >
                <img src={`http://localhost:5000/${item.img}`} alt={item.img} style={{width:'100%',height:200}}/>
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
                  <Typography
                    color={colors.grey[100]}
                    textAlign="center"
                    variant="h5"
                    fontWeight={700}
                  >
                    Owner: {item.userName}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >                  
                  <Button
                    color="blue"
                    onClick={() => {
                      setPropertyInfo({
                        
                        name: item.title,
                        sellerId: "",
                        propertyId: item._id,
                      });
                      handleOpen();
                    }}
                    variant="contained"
                  >
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
      <InvestModal
        propertyInfo={propertyInfo}
        url="http://localhost:5000/api/invested/invest"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default NewProperties;
