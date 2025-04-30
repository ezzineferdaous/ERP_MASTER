import { Stack, Snackbar, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Menubar } from 'primereact/menubar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemsForm from "./ItemsForm";
import ItemsToolBar from './ItemsToolBar';
import AppItemsList from './AppItemsList';
import axios from 'axios';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': { marginBottom: '30px', [theme.breakpoints.down('sm')]: { marginBottom: '16px' }, },
  }));

const AppForm = () => {

  const [Item, setItem] = useState({ id: null, ItemCode: null, ItemName: null, NomEtrange:null, CodeBarre:null, Vendu:null, Active:'Y', Achete:'Y', Magasin:null, Famille:null , Stock:'Y', Picture:null, ItemGroupe:null , Sfamille:null ,CodeUMV:null, CodeUMA:null, CodeUMS:null, ArticleGerePar:null, Remarque:null, PJ:null, EnStock: null, CmptCharges:null, CmptProduit:null, CmptStock:null, CmptVariation:null, GroupeTax:null , CodeReadOnly: false });
  const [ImageURL, setImageURL] = useState({ preview: '../../../../assets/images/placeholder.png',   raw: ''});  

  const [showItem, setshowItem] = useState(false);  
  const [ItemGroupes, setItemGroupes] = useState([{}]);
  const [Taxes, setTaxes] = useState([{}]);
  const [Familles, setFamilles] = useState([{}]);
  const [SFamilles, setSFamilles] = useState([{}]);
  const [UMs, setUMs] = useState([{}]);

  const [CheckedVendu, setCheckedVendu] = useState([{}]);
  const [CheckedAchete, setCheckedAchete] = useState([{}]);
  const [CheckedStock, setCheckedStock] = useState([{}]);

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
    if(event.target.name == 'Vendu' ) {
      setCheckedVendu(event.target.checked);
    } else if(event.target.name == 'Achete' ) {
      setCheckedAchete(event.target.checked);
    } else if(event.target.name  == 'Stock') {
      setCheckedStock(event.target.checked);
    } else {
      setItem({ ...Item, [event.target.name]: value });    
    } 

    if (Item.id === null) {
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

          console.log(Item);
          axiosInstance.post('Item', Item)
          .then((response) => {
               console.log('Response:', response.data);
              setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
              setItem({ id: null, ItemCode: null, ItemName: null, NomEtrange:null, CodeBarre:null, Vendu:'Y', Active:'Y', Achete:'Y', Magasin:null, Famille:null, Stock:null, Picture:null, ItemGroupe:null, Sfamille:null, CodeUMV:null, CodeUMA:null, CodeUMS:null , ArticleGerePar:null, Remarque:null, PJ:null, EnStock: null, CmptCharges:null, CmptProduit:null, CmptStock:null, CmptVariation:null, GroupeTax:null , CodeReadOnly: false });
              setImageURL({ preview: '../../../../assets/images/placeholder.png',   raw: ''});
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
      console.log(Item);
      try {
        await axiosInstance.put('Item/' + Item.id + '', Item);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
        setItem({ id: null, ItemCode: null, ItemName: null, NomEtrange:null, CodeBarre:null, Vendu:'Y', Active:'Y', Achete:'Y', Magasin:null, Famille:null, Stock:null, Picture:null, ItemGroupe:null, Sfamille:null, CodeUMV:null, CodeUMA:null, CodeUMS:null , ArticleGerePar:null, Remarque:null, PJ:null, EnStock: null, CmptCharges:null, CmptProduit:null, CmptStock:null, CmptVariation:null, GroupeTax:null , CodeReadOnly: false });
        setFiles([]);
      } catch (error) {
        handelError(""+error);
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => { 
    const GetItemGroupes = async () => {
        try {
          const  res  = await axiosInstance.get("ItemGroup/");
          setItemGroupes(res.data);
        } catch (error) {
          console.error(error);
          return;
        }
    };
    GetItemGroupes();
  },[]);

  useEffect(() => { 
  const GetFamilles = async () => {
    try {
      const  res  = await axiosInstance.get("Famille/?CodeGroupe="+Item.ItemGroupe);
      setFamilles(res.data);
     } catch (error) {
      console.error(error);
      return;
    }
  };
    GetFamilles();      
  },[Item.ItemGroupe]);

  useEffect(() => { 
    const GetSFamilles = async () => {
      try {
        var CodeFamille = Item.Famille;
        if(CodeFamille == '') {CodeFamille = '%';}
        const  res  = await axiosInstance.get("SousFamille/?CodeFamille="+CodeFamille);
        setSFamilles(res.data);
      } catch (error) {
        console.error(error);
        return;
      }
    };
      GetSFamilles();      
  },[Item.Famille]);

  useEffect(() => { 
      const GetUMs = async () => {
        try {
          const  res  = await axiosInstance.get("UM");
          setUMs(res.data);
        } catch (error) {
          console.error(error);
          return;
        }
      }; 
      GetUMs();      
  },[]);

  useEffect(() => { 
        const GetTaxes = async () => {
          try {
            const  res  = await axiosInstance.get("Tax");
            setTaxes(res.data);
          } catch (error) {
            console.error(error);
            return;
          }
        };
        GetTaxes();      
  },[]);
 
  const start = (
    <Breadcrumb routeSegments={[ { name: 'Gestion des stocks' }, { name: 'Données de base article' }, ]} />
  );

  const end = (
    <ItemsToolBar Item={Item} setItem={setItem} state={state} setState={setState} handelError={handelError} setshowItem={setshowItem} setImageURL={setImageURL} />
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
        { showItem ? ( <AppItemsList setItem={setItem} setshowItem={setshowItem} /> ) : (
          <SimpleCard>
            <ItemsForm Mode={state.Mode} CheckedVendu={CheckedVendu} CheckedAchete={CheckedAchete} CheckedStock={CheckedStock} CodeReadOnly={state.CodeReadOnly} Taxes = {Taxes} ItemGroupes = {ItemGroupes} Familles={Familles} SFamilles={SFamilles} UMs={UMs} Item={Item} setItem={setItem} setState={setState} state={state} handleChange={handleChange} handleSubmit={handleSubmit} handelError={handelError} ImageURL={ImageURL} setImageURL={setImageURL}  />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
