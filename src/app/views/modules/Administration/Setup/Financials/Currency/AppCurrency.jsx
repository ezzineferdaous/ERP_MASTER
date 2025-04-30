import { Stack, Snackbar, Alert} from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import CurrencyForm from "./CurrencyForm";
import AppCurrencyList from "./AppCurrencyList";
import CurrencyToolBar from "./CurrencyToolBar";
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

  const [Currency, setCurrency] = useState({ id: '', Code: '', Name: '' });
  const [showListCurrencies , setshowListCurrencies] = useState(false);
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
    setCurrency({ ...Currency, [event.target.name]: value });
    if(Currency.id === "") {
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
            await axiosInstance.post("Currency", Currency);
            setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success", CodeReadOnly: false });
            setCurrency({id: "", Code: "", Name : ""});
          } catch (error) { handelError(""+error); }

      } else if(state.Mode === "Mettre à jour")  {

        try {
          await axiosInstance.put("Currency/"+Currency.id+"", Currency);
          setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success", CodeReadOnly: false });
          setCurrency({id: "", Code: "", Name : ""});
        } catch (error) { handelError(""+error); }

      } else {
        navigate("/");
      }
  };
 
 

  const start = <Breadcrumb routeSegments={[{ name: "Administration", path: "/Currency" }, { name: "Devise" }]} />;
  const end = <CurrencyToolBar Currency = {Currency} setCurrency ={setCurrency} state ={state} setState ={setState} handelError={handelError} setshowListCurrencies = {setshowListCurrencies} /> 

  return (
    <Container>      
      <div className="card"> <Menubar start={start}  end={end}  style={{ border: '1px solid #dee2e600' }}/> </div>
      <Box sx={{ width: 500 }}>         
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin = { { vertical, horizontal } } key={vertical + horizontal} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
              {message}
            </Alert>
          </Snackbar>
        </Box>
      <Stack spacing={3}>
        { showListCurrencies ? (
          <AppCurrencyList setCurrency ={setCurrency} setshowListCurrencies = {setshowListCurrencies} />
         ) : (
            <SimpleCard>
              <CurrencyForm  Mode= {state.Mode} Currency={Currency} CodeReadOnly={state.CodeReadOnly} handleChange={handleChange} handleSubmit={handleSubmit} />
            </SimpleCard>
         )}
      </Stack>
    </Container>
  );
};

export default AppForm;
