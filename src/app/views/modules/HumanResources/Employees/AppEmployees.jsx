import { Stack, Snackbar, Alert, IconButton } from "@mui/material";
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from "app/components";
import EmployeesForm from "./EmployeesForm";
import EmployeesToolBar from './EmployeesToolBar';
import AppEmployeesList from './AppEmployeesList';

import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
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
  const [Employee, setEmployee] = useState({ id: null, Code: null, Prenom: null, Nom:null, Post:null, Service:null, Active:'Y', Agence:null, Image:null, Statut:null , TelP:null, TelPo:null, email:null , Adresse:null ,Sexe:null, DateN:null, PayeN:null, Nationalite:null, SituationF:null, Nenfants:null, GovID: null, SalaireBase:null, Remarque:null, MDP:null, Zone:null, Profil:null , ID_Rubrique: null, ID_Contrat: null });
  const [showEmployee, setshowEmployee] = useState(false);  
  const [state, setState] = useState({ Mode: 'Créer', message: 'Error', open: false, vertical: 'top', horizontal: 'center', severity: 'error', CodeReadOnly: false });
  const { vertical, horizontal, open, message, severity } = state;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
  const navigate = useNavigate();

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleChange = (event) => {
    const value = event.target.value;  

    console.log("Employee.id");
    console.log(Employee.id);

    if (Employee.id === null) {
      setEmployee({ ...Employee, [event.target.name]: value }); 
      setState({ ...state, Mode: 'Créer', CodeReadOnly: false });
    } else {
      setEmployee({ ...Employee, [event.target.name]: value }); 
      setState({ ...state, Mode: 'Mettre à jour', CodeReadOnly: true });
    }
  };
  const handelError = (error) => {
     if (error.response) { setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: 'error', CodeReadOnly: false });
    } else if (error.request) { setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Erreur de récupération des données', severity: 'error', CodeReadOnly: false });
    } else { setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error, severity: 'error', CodeReadOnly: false }); }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.Mode === 'Créer') {
      try { 

          console.log(Employee);
          axiosInstance.post('Salaries', Employee)
          .then((response) => {
               console.log('Response:', response.data);
              setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
              setEmployee({ id: null, Code: null, Prenom: null, Nom:null, Post:null, Service:null, Active:'Y', Agence:null, Image:null, Statut:null , TelP:null, TelPo:null, email:null , Adresse:null ,Sexe:null, DateN:null, PayeN:null, Nationalite:null, SituationF:null, Nenfants:null, GovID: null, SalaireBase:null, Remarque:null, MDP:null, Zone:null, Profil:null , ID_Rubrique: null, ID_Contrat: null});
           })
          .catch(error => {
            if (error.response) {
              console.error('Error message:', error.response.data.message);
              setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: 'error', CodeReadOnly: false });
            } else if (error.request) {
              console.error('Error request:', error.request);
              setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Aucune réponse", severity: 'error', CodeReadOnly: false });
            } else {
              console.error('Error message:', error.message);
              setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.message, severity: 'error', CodeReadOnly: false });              
            }
          });
               
         
      } catch (error) {
        handelError(""+error);
      }
    } else if (state.Mode === 'Mettre à jour') {
      console.log(Employee);
      try {
        await axiosInstance.put('Salaries/' + Employee.id + '', Employee);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setEmployee({ id: null, Code: null, Prenom: null, Nom:null, Post:null, Service:null, Active:'Y', Agence:null, Image:null, Statut:null , TelP:null, TelPo:null, email:null , Adresse:null ,Sexe:null, DateN:null, PayeN:null, Nationalite:null, SituationF:null, Nenfants:null, GovID: null, SalaireBase:null, Remarque:null, MDP:null, Zone:null, Profil:null , ID_Rubrique: null, ID_Contrat: null });
      } catch (error) {
        handelError(""+error);
      }
    } else {
      navigate('/');
    }
  };

  console.log("App Salaries");
  console.log(Employee);

  const start = (<Breadcrumb routeSegments={[ { name: 'Ressources humaines' }, { name: 'Salariés' }, ]} />);
  const end = (<EmployeesToolBar Employee={Employee} setEmployee={setEmployee} state={state} setState={setState} handelError={handelError} setshowEmployee={setshowEmployee}/>);
  return (
    <Container>
      <div className="card">
        <Menubar lg={6} md={6} sm={12} xs={12} start={start} end={end} style={{ border: '1px solid #dee2e600' }} />
      </div>      
      <Box sx={{ width: 500 }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
            {message}
          </Alert>
        </Snackbar>
      </Box>
      <Stack spacing={3}>
        { showEmployee ? ( <AppEmployeesList setEmployee={setEmployee} setshowEmployee={setshowEmployee} /> ) : (
          <SimpleCard>
            <EmployeesForm Mode={state.Mode} CodeReadOnly={state.CodeReadOnly} Employee={Employee} setEmployee={setEmployee} setState={setState} state={state} handleChange={handleChange} handleSubmit={handleSubmit} handelError={handelError}   />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
