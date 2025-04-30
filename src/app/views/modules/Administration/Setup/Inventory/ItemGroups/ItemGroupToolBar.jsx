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

const ToolBar = ({ ItemGroupe, setItemGroupe, state, setState, handelError, setshowItemGroupe, }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Add = async (e) => {
    setItemGroupe({id: "", CodeGroupe: "", CodeGroupe : "", CmptCharges : "", CmptProduit : ""});
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
      setshowItemGroupe(true);
    } catch (error) {
      console.log(error);
    }
  };

  const Navigate = async (direction) => {
    try {
      if (direction === 'First') {
        const response = await axiosInstance.get( 'ItemGroup/' + (await axiosInstance.get('ItemGroup/data/Min')).data.id + '');

        setItemGroupe({ id: response.data.id, CodeGroupe: response.data.CodeGroupe, NomGroupe: response.data.NomGroupe, CmptCharges: response.data.CmptCharges, CmptProduit: response.data.CmptProduit, });
        setState({ ...state, Mode: 'OK', CodeReadOnly: true  });
      } else if (direction === 'Previous') {
        const PreviousItemGroupe = await axiosInstance.get(
          'ItemGroup/data/Previous/' + ItemGroupe.id + ''
        );
        console.log(PreviousItemGroupe.data.id);
        if (PreviousItemGroupe.data.id != null) {
          setItemGroupe({ id: PreviousItemGroupe.data.id.id, CodeGroupe: PreviousItemGroupe.data.id.CodeGroupe, NomGroupe: PreviousItemGroupe.data.id.NomGroupe, CmptCharges: PreviousItemGroupe.data.id.CmptCharges, CmptProduit: PreviousItemGroupe.data.id.CmptProduit, });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true  });
        } else {
          setState({ ...state, open: true, message: 'Premier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Next') {
        const NextItemGroupe = await axiosInstance.get('ItemGroup/data/Next/' + ItemGroupe.id + '');
        if (NextItemGroupe.data.id != null) {
          setItemGroupe({ id: NextItemGroupe.data.id.id, CodeGroupe: NextItemGroupe.data.id.CodeGroupe, NomGroupe: NextItemGroupe.data.id.NomGroupe, CmptCharges: NextItemGroupe.data.id.CmptCharges, CmptProduit: NextItemGroupe.data.id.CmptProduit, });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true  });
        } else {
          setState({ ...state, open: true, message: 'Dernier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Last') {
        const response = await axiosInstance.get(
          'ItemGroup/' + (await axiosInstance.get('ItemGroup/data/Max')).data.id + ''
        );
        setItemGroupe({ id: response.data.id, CodeGroupe: response.data.CodeGroupe, NomGroupe: response.data.NomGroupe, CmptCharges: response.data.CmptCharges, CmptProduit: response.data.CmptProduit,});
        setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true  });
      }
    } catch (error) {
      handelError(""+error);
    }
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
