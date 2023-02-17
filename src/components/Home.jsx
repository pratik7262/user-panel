import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../theme";

const Typo = ({ text }) => {
  return (
    <Typography sx={{ my: "15px", color: colors.grey[100] }} variant="h1">
      {text}
    </Typography>
  );
};

const Home = () => {
  return (
    <Box
      mt={9}
      flexDirection="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper
        sx={{
          // backgroundImage: "url('https://th.bing.com/th/id/OIP.fIMrRGpQAs9WN3PA9Q_SPAHaEK?pid=ImgDet&rs=1')",
          width: "80vw",
          height: "75vh",
          p: 4,
          bgcolor: colors.primary[400],
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typo text="Redefining and Democratising" />
        <Typo text="Buying and Selling" />
        <Typo text="Real Estate" />
        <Link to={'/properties'} style={{textDecoration:'none',marginTop:'15px',color:'white'}}>
          <Button color="blue" variant="contained">
            Show New Properties
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default Home;
