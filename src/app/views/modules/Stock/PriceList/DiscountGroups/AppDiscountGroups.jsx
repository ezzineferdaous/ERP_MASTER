import { Stack, IconButton } from "@mui/material";
import { styled } from "@mui/system"; 
import { Breadcrumb, SimpleCard } from "app/components";
import DiscountGroupsForm from "./DiscountGroupsForm";
import { Menubar } from 'primereact/menubar';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "0px" },
  "& .breadcrumb": {
    marginBottom: "0px",
    [theme.breakpoints.down("sm")]: { marginBottom: "0px" },
  },  "& .buttoncard": {
      gap: "1rem",
      display: "flex",
      padding:"1rem",
  },
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const AppForm = () => {

  const start = <Breadcrumb routeSegments={[{ name: "Gestion des stocks"}, { name: "Groupes de remises" }]} />;
  const end = <IconBox> <StyledIconButton> <i className="pi pi-print" style={{ fontSize: '1rem' }}> </i> </StyledIconButton> <StyledIconButton> <i className="pi pi-angle-double-left" style={{ fontSize: '1rem' }}></i></StyledIconButton>  <StyledIconButton> <i className="pi pi-angle-left" style={{ fontSize: '1rem' }}></i> </StyledIconButton>  <StyledIconButton> <i className="pi pi-angle-right" style={{ fontSize: '1rem' }}></i> </StyledIconButton>  <StyledIconButton> <i className="pi pi-angle-double-right" style={{ fontSize: '1rem' }}></i> </StyledIconButton>  <StyledIconButton> <i className="pi pi-search" style={{ fontSize: '1rem' }}></i> </StyledIconButton></IconBox>;
 
  return (
    <Container>
      <div className="card">
            <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600' }}/>
      </div>

      <Stack spacing={3}>
        <SimpleCard>
          <DiscountGroupsForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
