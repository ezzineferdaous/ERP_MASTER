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

  const ToolBar = ({ UM, setUM, state, setState, handelError, setshowUM,}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
  console.log('baseUrl: ' + baseUrl);

  const Add = async (e) => {
    setUM({id: "", CodeUM: "", NomUM : "" });
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
      setshowUM(true);
    } catch (error) {
      console.log(error);
    }
  };

  const Navigate = async (direction) => {
    try { 
      if (direction === 'First') { 
        const response = await axiosInstance.get('UM/' + (await axiosInstance.get('UM/data/Min')).data.id + '' );

        setUM({ id: response.data.id, CodeUM: response.data.CodeUM, NomUM: response.data.NomUM, });
        setState({ ...state, Mode: 'OK', CodeReadOnly: true });
      } else if (direction === 'Previous') {
        const PreviousUM = await axiosInstance.get('UM/data/Previous/' + UM.id);
        console.log(PreviousUM.data.id);
        if (PreviousUM.data.id != null) {
          setUM({
            id: PreviousUM.data.id.id,
            CodeUM: PreviousUM.data.id.CodeUM,
            NomUM: PreviousUM.data.id.NomUM,
          });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
        } else {
          setState({ ...state, open: true, message: 'Premier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Next') {
        const NextUM = await axiosInstance.get('UM/data/Next/' +UM.id);
        if (NextUM.data.id != null) {
          setUM({
            id: NextUM.data.id.id,
            CodeUM: NextUM.data.id.CodeUM,
            NomUM: NextUM.data.id.NomUM,
          });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
        } else {
          setState({ ...state, open: true, message: 'Dernier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Last') {
        const response = await axiosInstance.get('UM/' + (await axiosInstance.get('UM/data/Max')).data.id + '');
        setUM({
          id: response.data.id,
          CodeUM: response.data.CodeUM,
          NomUM: response.data.NomUM,
        });   

        setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
      }
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
