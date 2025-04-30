import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system"; 
import { Breadcrumb, SimpleCard } from "app/components";
import DocumentNumberingForm from "./DocumentNumberingForm";
 
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
 
const AppForm = () => {
  return (
    <Container>
      
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Administration" }, { name: "Numérotation des documents" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <DocumentNumberingForm />
        </SimpleCard>
      </Stack>

    </Container>
  );
};

export default AppForm;
