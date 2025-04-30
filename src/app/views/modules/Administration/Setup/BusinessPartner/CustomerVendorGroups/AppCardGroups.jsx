import { Stack, Snackbar, Alert} from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import CardGroupsForm from "./CardGroupsForm";
import AppCardGroupsList from "./AppCardGroupsList";
import CardGroupsToolBar from "./CardGroupsToolBar";
import { Menubar } from 'primereact/menubar';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
})); 
 
const AppForm = () => {

  const [CardGroup, setCardGroup] = useState({ id: '', GroupCode: null, GroupName: null , GroupType: -1, PriceList: -1, Discount: null });
  const [showListCardGroupes , setshowListCardGroupes] = useState(false);
  const [state, setState] = useState({ Mode:"Créer", message: "Error", open: false, vertical: 'top', horizontal: 'center', severity: "error", CodeReadOnly: false });
  const { vertical, horizontal, open, message, severity } = state;

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true})

  const navigate = useNavigate(); 

  const handleClose = () => { 
    setState({ ...state, open: false });  
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setCardGroup({ ...CardGroup, [event.target.name]: value });
    if(CardGroup.id === "") {
      setState({ ...state, Mode: "Créer", CodeReadOnly: false });
    } else  {setState({ ...state, Mode: "Mettre à jour", CodeReadOnly: true }); }
  }; 

  const handelError = (error) => {

    if (error.response) {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error", CodeReadOnly: false});
    } else if (error.request) {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "network error", severity: "error", CodeReadOnly: false});
    } else {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error, severity: "error", CodeReadOnly: false});
    }

  };

  const handleSubmit = async (event) => {
      event.preventDefault(); 
      if(state.Mode === "Créer") {
          try {
            await axiosInstance.post("CardGroups", CardGroup);
            setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success", CodeReadOnly: false });
            setCardGroup({id: "", GroupCode: null, GroupName : null, GroupType: -1, PriceList: -1, Discount: null });
          } catch (error) { handelError(""+error); }

      } else if(state.Mode === "Mettre à jour")  {

        console.log(CardGroup);
        try {
          await axiosInstance.put("CardGroups/"+CardGroup.id+"", CardGroup);
          setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success", CodeReadOnly: false });
          setCardGroup({id: "", GroupCode: null, GroupName : null, GroupType: -1, PriceList: -1, Discount: null });
        } catch (error) { handelError(""+error); }

      } else {
        navigate("/");
      }
  }; 

  const start = <Breadcrumb routeSegments={[{ name: "Administration" }, { name: "Groupe Client" }]} />;
  const end = <CardGroupsToolBar CardGroup = {CardGroup} setCardGroup ={setCardGroup} state ={state} setState ={setState} handelError={handelError} setshowListCardGroupes = {setshowListCardGroupes} /> 

  return (
    <Container>
      <div className="card"> <Menubar item lg={6} md={6} sm={12} xs={12}  start={start}  end={end}  style={{ border: '1px solid #dee2e600' }}/> </div>
      <Box sx={{ width: 500 }}>         
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin = { { vertical, horizontal } } key={vertical + horizontal} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
              {message}
            </Alert>
          </Snackbar>
        </Box>
      <Stack spacing={3}>
        { showListCardGroupes ? (
          <AppCardGroupsList setCardGroup ={setCardGroup} setshowListCardGroupes = {setshowListCardGroupes} />
         ) : (
            <SimpleCard>
              <CardGroupsForm Mode= {state.Mode} CardGroup={CardGroup} CodeReadOnly={state.CodeReadOnly} handleChange={handleChange} handleSubmit={handleSubmit} />
            </SimpleCard>
         )}
      </Stack>
    </Container>
  );
};

export default AppForm;
