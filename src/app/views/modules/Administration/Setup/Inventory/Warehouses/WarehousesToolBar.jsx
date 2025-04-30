import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import PrintIcon from '@mui/icons-material/Print';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

  const ToolBar = ({ Warehouse, setWarehouse, state, setState, handelError, setshowWarehouse,}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
  console.log('baseUrl: ' + baseUrl);

  const Add = async (e) => {
    setWarehouse({ id: '', Rue: '', NumRue: '', CodeWarehouse: '', NomWarehouse: '',CountryCode: '', City: '', ActiveInactive: 'Y' , CmptCharges: '' , CmptProduit: '' });
    setState({ ...state, Mode: "Créer", CodeReadOnly: false });
  }; 
  const Print = async (e) => {
    e.preventDefault();
    try {
      alert('Print');
    } catch (error) {
      handelError(""+error);
    }
  };  
  const List = async (e) => {
    e.preventDefault();
    try {
      setshowWarehouse(true);
    } catch (error) {
      console.log(error);
    }
  };

  const GetFirst = async() => {
    const response = await axiosInstance.get('Warehouse/' + (await axiosInstance.get('Warehouse/data/Min')).data.id + '' );
    console.log(response.data.City);
    setWarehouse({ id: response.data.id, CodeWarehouse: response.data.CodeWarehouse, NomWarehouse: response.data.NomWarehouse, Rue: response.data.Rue, NumRue: response.data.NumRue, CountryCode: response.data.CountryCode, City: response.data.City, ActiveInactive: response.data.ActiveInactive, CmptCharges: response.data.CmptCharges, CmptProduit: response.data.CmptProduit, });
    setState({ ...state, Mode: 'OK', CodeReadOnly: true });
  }

  const GetPrevious = async() => {
    if(Warehouse.id === '') { GetFirst(); } 
    else {
          const PreviousWarehouse = await axiosInstance.get('Warehouse/data/Previous/' + Warehouse.id);
          if (PreviousWarehouse.data.id != null) {
            setWarehouse({ id: PreviousWarehouse.data.id.id, CodeWarehouse: PreviousWarehouse.data.id.CodeWarehouse, NomWarehouse: PreviousWarehouse.data.id.NomWarehouse, Rue: PreviousWarehouse.data.id.Rue, NumRue: PreviousWarehouse.data.id.NumRue, CountryCode: PreviousWarehouse.data.id.CountryCode, City: PreviousWarehouse.data.id.City, ActiveInactive: PreviousWarehouse.data.id.ActiveInactive, CmptCharges: PreviousWarehouse.data.id.CmptCharges, CmptProduit: PreviousWarehouse.data.id.CmptProduit, });
            setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
          } else { setState({ ...state, open: true, message: 'Premier enregistrement', severity: 'info' }); }
    }
  }

  const GetNext = async() => {
    if(Warehouse.id === '') { GetLast(); }
    else {
          const NextWarehouse = await axiosInstance.get('Warehouse/data/Next/' +Warehouse.id);
          if (NextWarehouse.data.id != null) {
            setWarehouse({id: NextWarehouse.data.id.id, CodeWarehouse: NextWarehouse.data.id.CodeWarehouse, NomWarehouse: NextWarehouse.data.id.NomWarehouse, Rue: NextWarehouse.data.id.Rue, NumRue: NextWarehouse.data.id.NumRue, CountryCode: NextWarehouse.data.id.CountryCode, City: NextWarehouse.data.id.City, ActiveInactive: NextWarehouse.data.id.ActiveInactive, CmptCharges: NextWarehouse.data.id.CmptCharges, CmptProduit: NextWarehouse.data.id.CmptProduit, });
            setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
          } else { setState({ ...state, open: true, message: 'Dernier enregistrement', severity: 'info' }); }
    }
  }
  const GetLast = async() => {
    const response = await axiosInstance.get('Warehouse/' + (await axiosInstance.get('Warehouse/data/Max')).data.id + '');
        setWarehouse({ id: response.data.id, CodeWarehouse: response.data.CodeWarehouse, NomWarehouse: response.data.NomWarehouse, Rue: response.data.Rue, NumRue: response.data.NumRue, CountryCode: response.data.CountryCode, City: response.data.City, ActiveInactive: response.data.ActiveInactive, CmptCharges: response.data.CmptCharges, CmptProduit: response.data.CmptProduit, });   
        setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
  }
  const Navigate = async (direction) => {
    try {
      if (direction === 'First') {  GetFirst(); }
      else if (direction === 'Previous') { GetPrevious(); } 
      else if (direction === 'Next') { GetNext(); } 
      else if (direction === 'Last') { GetLast(); }
    } catch (error) { handelError(""+error); }
  };

  return (
    <IconBox>
    <IconButton onClick={Add} aria-label="Nouveau" size="small"><AddIcon fontSize="small" /></IconButton>
    <IconButton onClick={Print} aria-label="imprimer" size="small"><PrintIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('First')} aria-label="Premier" size="small"><KeyboardDoubleArrowLeftIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('Previous')} aria-label="Précédent" size="small"><KeyboardArrowLeftIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('Next')} aria-label="Suivant" size="small"><KeyboardArrowRightIcon fontSize="small" /></IconButton>
    <IconButton onClick={() => Navigate('Last')} aria-label="Dernier" size="small"><KeyboardDoubleArrowRightIcon fontSize="small" /></IconButton>
    <IconButton onClick={List} aria-label="Filtrer" size="small"><FormatListBulletedIcon fontSize="small" /></IconButton>
  </IconBox>
  );
};

export default ToolBar;
