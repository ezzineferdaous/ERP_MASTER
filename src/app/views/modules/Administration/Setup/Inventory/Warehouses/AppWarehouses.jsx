import { Stack, Snackbar, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Menubar } from 'primereact/menubar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WarehousesForm from "./WarehousesForm";
import WarehousesToolBar from './WarehousesToolBar';
import AppWarehousesList from './AppWarehousesList';
import axios from 'axios';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': { marginBottom: '30px', [theme.breakpoints.down('sm')]: { marginBottom: '16px' }, },
}));
 
const AppForm = () => {

  const [Warehouse, setWarehouse] = useState({ id: '', Rue: '', NumRue: '', CodeWarehouse: '', NomWarehouse: '',CountryCode: '', City: '', ActiveInactive: 'Y' , CmptCharges: '' , CmptProduit: '', CodeReadOnly: false });
  const [showWarehouse, setshowWarehouse] = useState(false);
  
  const [Countries, setCountries] = useState([{}]);
  const [Cities, setCities] = useState([{}]);

  const [state, setState] = useState({ Mode: 'Créer', message: 'Error', open: false, vertical: 'top', horizontal: 'center', severity: 'error', CodeReadOnly: false });
  const [files, setFiles] = useState([]);
  const { vertical, horizontal, open, message, severity } = state;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
  const navigate = useNavigate();

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setWarehouse({ ...Warehouse, [event.target.name]: value });

    console.log(Warehouse.id);

    if (Warehouse.id === '') {
      setState({ ...state, Mode: 'Créer', CodeReadOnly: false });
    } else {
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
        if (files.length > 0) {
          axiosInstance.post('Attachment', { AttachmentLines: files }).then(function (response) {
            console.log(response.data.id);
            setWarehouse({ ...Warehouse, AttachmentId: 100 });
             console.log(Warehouse);
           });
        } else { 
          axiosInstance.post('Warehouse', Warehouse);
        }
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setWarehouse({ id: '', Rue: '', NumRue: '', CodeWarehouse: '', NomWarehouse: '',CountryCode: '', City: '', ActiveInactive: 'Y' , CmptCharges: '' , CmptProduit: '' });
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else if (state.Mode === 'Mettre à jour') {
      console.log(Warehouse);
      try {
        await axiosInstance.put('Warehouse/' + Warehouse.id + '', Warehouse);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setWarehouse({ id: '', Rue: '', NumRue: '', CodeWarehouse: '', NomWarehouse: '',CountryCode: '', City: '', ActiveInactive: 'Y' , CmptCharges: '' , CmptProduit: '' });
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => { 
    const GetCountries = async () => {
        try {
          const  res  = await axiosInstance.get("Country/");
          setCountries(res.data);
          console.log(Countries);
        } catch (error) {
          console.error(error);
          return;
        }
    };
    GetCountries();
  },[]);

  useEffect(() => { 
  const GetCities = async () => {
    try {
      const  res  = await axiosInstance.get("City/?CntCode="+Warehouse.CountryCode);
      setCities(res.data);
      console.log(Cities);
    } catch (error) {
      console.error(error);
      return;
    }
  };
    GetCities();      
  },[Warehouse.CountryCode]);
 
  const start = (
    <Breadcrumb routeSegments={[ { name: 'Gestion des stocks' }, { name: 'Magasin' }, ]} />
  );

  const end = (
    <WarehousesToolBar Warehouse={Warehouse} setWarehouse={setWarehouse} state={state} setState={setState} handelError={handelError} setshowWarehouse={setshowWarehouse} />
  );

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
        { showWarehouse ? ( <AppWarehousesList setWarehouse={setWarehouse} setshowWarehouse={setshowWarehouse} /> ) : (
          <SimpleCard>
            <WarehousesForm Mode={state.Mode} CodeReadOnly={state.CodeReadOnly} Cities = {Cities} Countries={Countries} Warehouse={Warehouse} setWarehouse={setWarehouse} setState={setState} state={state} handleChange={handleChange} handleSubmit={handleSubmit} />
          </SimpleCard>
        ) }
      </Stack>
    </Container>
  );
};

export default AppForm;
