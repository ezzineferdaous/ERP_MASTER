import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system"; 
import { Breadcrumb, SimpleCard } from "app/components";
import PriceListDetailForm from "./PriceListDetailForm";
 
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },  "& .buttoncard": {
    gap: "1rem",
    display: "flex",
    padding:"1rem",
},
}));

const AppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Gestion des stocks"}, { name: "Listes de prix" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <PriceListDetailForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
