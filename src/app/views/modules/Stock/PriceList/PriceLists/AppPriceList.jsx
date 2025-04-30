import { Stack, Snackbar, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Menubar } from 'primereact/menubar';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceListForm from "./PriceListForm";
import PriceListToolBar from './PriceListToolBar';
import AppPriceListList from './AppPriceListList';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': { marginBottom: '30px', [theme.breakpoints.down('sm')]: { marginBottom: '16px' }, },
  }));

const AppForm = () => {

  const [PriceList, setPriceList] = useState({ id: null, });
  const exportColumns = ['id', 'Code Magsin' ];
  const [data, setData] = useState([{}]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [showItem, setshowItem] = useState(false);  

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

  const handleClick = (event, row) => {
    setPriceList(row.original);
    setshowItem(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    console.log(PriceList);

    if (state.Mode === 'Créer') {
      try { 

          console.log(PriceList);
          axiosInstance.post('PriceList', PriceList)
          .then((response) => {
               console.log('Response:', response.data);
              setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: 'Opération correctement achevée', severity: 'success', CodeReadOnly: false });
              setPriceList({ id: null, ItemCode: null, ItemName: null, NomEtrange:null, CodeBarre:null, Vendu:'Y', Active:'Y', Achete:'Y', Magasin:null, Famille:null, Stock:null, Picture:null, ItemGroupe:null, Sfamille:null, CodeUMV:null, CodeUMA:null, CodeUMS:null , ArticleGerePar:null, Remarque:null, PJ:null, EnStock: null, CmptCharges:null, CmptProduit:null, CmptStock:null, CmptVariation:null, GroupeTax:null , CodeReadOnly: false });
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
        setPriceList({ id: null, ItemCode: null, ItemName: null, NomEtrange:null, CodeBarre:null, Vendu:'Y', Active:'Y', Achete:'Y', Magasin:null, Famille:null, Stock:null, Picture:null, ItemGroupe:null, Sfamille:null, CodeUMV:null, CodeUMA:null, CodeUMS:null , ArticleGerePar:null, Remarque:null, PJ:null, EnStock: null, CmptCharges:null, CmptProduit:null, CmptStock:null, CmptVariation:null, GroupeTax:null , CodeReadOnly: false });
      } catch (error) {
        handelError(""+error);
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const Getdata = async () => {
      try {
        const resPriceList = await axiosInstance.get("PriceList/");
        setData(resPriceList.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.error(error.response.data);
        } else {
          console.error(error);
        }
      }      
    }; 
    Getdata();
  },[]);

  const columns = useMemo(
    () => [
      { accessorKey: 'Name', header: 'Nom', size: 400 },
      { accessorKey: 'TTC', header: 'TTC', size: 100 },
      { accessorKey: 'Status', header: 'Actif', size: 100 },
      {
      id: 'Modifier',
      header: 'Modifier',
      size: 50,
      Cell: ({ row }) => (
        <IconBox>
          <Tooltip title="Modifier">
            <IconButton onClick={(event) => { handleClick(event, row); }} aria-label="Afficher" size="small" >
              <EditIcon sx={{ color: green[500] }} fontSize="small" />
            </IconButton>
          </Tooltip>
        </IconBox> 
      ),},],
    []
  );
 
  const start = (
    <Breadcrumb routeSegments={[ { name: 'Listes de prix' }, { name: 'Listes de prix' }, ]} />
  );
  const end = (
    <AppPriceListList PriceList={PriceList} setPriceList={setPriceList} state={state} setState={setState} handelError={handelError} />
  );

   const table = useMaterialReactTable({ columns, data, rowCount,
    initialState: { density: 'compact' },
    state: { isLoading, showProgressBars: isRefetching, },
  });

  return ( 
    <Container>
      <div className="card"> 
        <Menubar start={start} style={{ border: '1px solid #dee2e600' }} />
      </div>      
      <Stack spacing={3}>
        { showItem ? ( <PriceListForm setPriceList={setPriceList} setshowItem={setshowItem} /> ) : (
          <div style={{ height: '100%', width: '100%' }}>
            <MaterialReactTable table={table} />
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
