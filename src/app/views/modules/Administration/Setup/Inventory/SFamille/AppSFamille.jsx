import { Stack, Snackbar, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import SFamilleForm from './SFamilleForm';
import { Menubar } from 'primereact/menubar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SousFamilleToolBar from './SFamilleToolBar';
import AppSFamilleList from './AppSFamilleList';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': { marginBottom: '30px', [theme.breakpoints.down('sm')]: { marginBottom: '16px' }, },
}));

const AppForm = () => {
  const [SousFamille, setSousFamille] = useState({ id: '', CodeSFamille: '', NomSFamille: '', CodeFamille: '' });
  const [showSousFamille, setshowSousFamille] = useState(false);
  const [FamilleData, setFamilleData] = useState([{}]);

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
    console.log("value: "+value);

    setSousFamille({ ...SousFamille, [event.target.name]: value });
    console.log(SousFamille);
    if (SousFamille.id === '') {
      setState({ ...state, Mode: 'Créer', CodeReadOnly: false  });
    } else {
      setState({ ...state, Mode: 'Mettre à jour', CodeReadOnly: true });
    }
  };

  const handelError = (error) => {

     if (error.response) { setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: 'error', CodeReadOnly: false  });
    } else if (error.request) { setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Erreur de récupération des données', severity: 'error', CodeReadOnly: false});
    } else { setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error, severity: 'error', CodeReadOnly: false }); }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.Mode === 'Créer') {
      try {
        if (files.length > 0) {
          axiosInstance.post('Attachment', { AttachmentLines: files }).then(function (response) {
            console.log(response.data.id);
            setSousFamille({ ...SousFamille, AttachmentId: 100 });
             console.log(SousFamille);
           });
        } else { 
          axiosInstance.post('SousFamille', SousFamille);
        }

        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setSousFamille({ id: '', CodeSFamille: '', NomSFamille: '', CodeFamille: '' });
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else if (state.Mode === 'Mettre à jour') {
      console.log(SousFamille);
      try {
        await axiosInstance.put('SousFamille/' + SousFamille.id + '', SousFamille);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setSousFamille({ id: '', CodeSFamille: '', NomSFamille: '', CodeFamille: '' });
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => { 
    const GetFamille = async () => {
        try {
          const  res  = await axiosInstance.get("Famille/");
          setFamilleData(res.data);
        } catch (error) {
          console.error(error);
          return;
        }
    };
    GetFamille();    
    },[]);

  const start = (
    <Breadcrumb
      routeSegments={[
        { name: 'Gestion des stocks' },
        { name: 'Sous Famille' },
      ]}
    />
  );

  const end = (
    <SousFamilleToolBar SousFamille={SousFamille} setSousFamille={setSousFamille} state={state} setState={setState} handelError={handelError} setshowSousFamille={setshowSousFamille} />
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
        {showSousFamille ? (
          <AppSFamilleList setSousFamille={setSousFamille} setshowSousFamille={setshowSousFamille} />
        ) : (
          <SimpleCard>
            <SFamilleForm FamilleData = {FamilleData} Mode={state.Mode} CodeReadOnly={state.CodeReadOnly} SousFamille={SousFamille} setSousFamille={setSousFamille} setState={setState} state={state} handleChange={handleChange} handleSubmit={handleSubmit} />
          </SimpleCard>
        ) }
      </Stack>
    </Container>
  );
};

export default AppForm;
