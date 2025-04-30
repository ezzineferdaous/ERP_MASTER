import { Stack, Snackbar, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import FamilleForm from './FamilleForm';
import { Menubar } from 'primereact/menubar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FamilleToolBar from './FamilleToolBar';
import AppFamilleList from './AppFamilleList';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const AppForm = () => {
  const [Famille, setFamille] = useState({
    id: '',
    CodeGroupe: '',
    NomGroupe: '',
    CmptCharges: '',
    CmptProduit: '',
  });
  const [showFamille, setshowFamille] = useState(false);
  const [ItemGroupData, setItemGroupData] = useState([{}]);

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
    setFamille({ ...Famille, [event.target.name]: value });
    console.log(Famille);
    if (Famille.id === '') {
      setState({ ...state, Mode: 'Créer', CodeReadOnly: false });
    } else {
      setState({ ...state, Mode: 'Mettre à jour', CodeReadOnly: true });
    }
  };

  const handelError = (error) => {
    if (error.response) {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: 'error', CodeReadOnly: false });
    } else if (error.request) {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Erreur de récupération des données', severity: 'error', CodeReadOnly: false });
    } else {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error, severity: 'error', CodeReadOnly: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.Mode === 'Créer') {
      try {
        if (files.length > 0) {
          axiosInstance.post('Attachment', { AttachmentLines: files }).then(function (response) {
            console.log(response.data.id);
            setFamille({ ...Famille, AttachmentId: 100 });
          });
        } else {
          axiosInstance.post('Famille', Famille);
        }
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setFamille({ id: '', CodeGroupe: '', NomGroupe: '', CmptCharges: '', GroupCode: '' });
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else if (state.Mode === 'Mettre à jour') {
      console.log(Famille);
      try {
        await axiosInstance.put('Famille/' + Famille.id + '', Famille);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setFamille({ id: '', CodeGroupe: '', NomGroupe: '', CmptCharges: '', GroupCode: '' });
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => { 
    const GetItemGroups = async () => {
        try {
          const  res  = await axiosInstance.get("ItemGroup/");
          setItemGroupData(res.data);
        } catch (error) {
          console.error(error);
          return;
        }
    };
    GetItemGroups();    
    },[]);

  const start = (
    <Breadcrumb
      routeSegments={[
        { name: 'Gestion des stocks' },
        { name: 'Famille' },
      ]}
    />
  );

  const end = (
    <FamilleToolBar Famille={Famille} setFamille={setFamille} state={state} setState={setState} handelError={handelError} setshowFamille={setshowFamille}/>
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
        {showFamille ? (
          <AppFamilleList setFamille={setFamille} setshowFamille={setshowFamille} />
        ) : (
          <SimpleCard>
            <FamilleForm ItemGroupData = {ItemGroupData}  Mode={state.Mode} CodeReadOnly={state.CodeReadOnly} Famille={Famille} setFamille={setFamille} setState={setState} state={state} handleChange={handleChange} handleSubmit={handleSubmit} />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
