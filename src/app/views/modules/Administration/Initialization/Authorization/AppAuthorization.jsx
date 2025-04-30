import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system"; 
import { Breadcrumb, SimpleCard } from "app/components";
import AuthorizationForm from "./AuthorizationForm";

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
        <Breadcrumb routeSegments={[{ name: "Administration", path: "/material" }, { name: "Autorisations" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard>
          <AuthorizationForm />
        </SimpleCard>
      </Stack>

    </Container>
  );
};

export default AppForm;
