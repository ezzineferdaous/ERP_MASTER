import { Stack, Snackbar, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Menubar } from 'primereact/menubar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceForm from "./PriceForm";
import PriceListToolBar from './PriceToolBar';
import AppPriceList from './AppItemsList';
import axios from 'axios';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': { marginBottom: '30px', [theme.breakpoints.down('sm')]: { marginBottom: '16px' }, },
  }));

const AppForm = () => {

  const [PriceList, setPriceList] = useState({ id: null, ItemCode: null, ItemName: null, NomEtrange:null, CodeBarre:null, Vendu:null, Active:'Y', Achete:'Y', Magasin:null, Famille:null , Stock:'Y', Picture:null, ItemGroupe:null , Sfamille:null ,CodeUMV:null, CodeUMA:null, CodeUMS:null, ArticleGerePar:null, Remarque:null, PJ:null, EnStock: null, CmptCharges:null, CmptProduit:null, CmptStock:null, CmptVariation:null, GroupeTax:null , CodeReadOnly: false });
  const [showPriceList, setshowPriceList] = useState(false);
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
      setPriceList({ ...PriceList, [event.target.name]: value }); 
    if (PriceList.id === null) {
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

          console.log(PriceList);
          axiosInstance.post('PriceList', PriceList)
          .then((response) => {
               console.log('Response:', response.data);
              setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
              setPriceList({  });
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
      console.log(PriceList);
      try {
        await axiosInstance.put('PriceList/' + PriceList.id + '', PriceList);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setPriceList({ /* PriceList data */});
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else {
      navigate('/');
    }
  }; 
  
  const start = (
    <Breadcrumb routeSegments={[ { name: 'Gestion des stocks' }, { name: 'Liste de prix' }, ]} />
  );

  const end = (
    <PriceListToolBar  PriceList={PriceList} setPriceList={setPriceList} state={state} setState={setState} handelError={handelError} setshowPriceList={setshowPriceList} setImageURL={setImageURL} />
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
        { showPriceList ? ( <AppPriceList setPriceList={setPriceList} setshowPriceList={setshowPriceList} /> ) : (
          <SimpleCard>
            <PriceForm Mode={state.Mode} CheckedVendu={CheckedVendu} CheckedAchete={CheckedAchete} CheckedStock={CheckedStock} CodeReadOnly={state.CodeReadOnly} PriceList={PriceList} setPriceList={setPriceList} setState={setState} state={state} handleChange={handleChange} handleSubmit={handleSubmit} handelError={handelError} ImageURL={ImageURL} setImageURL={setImageURL}  />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
