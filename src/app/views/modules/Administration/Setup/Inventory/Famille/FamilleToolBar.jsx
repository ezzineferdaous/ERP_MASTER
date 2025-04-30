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

const ToolBar = ({ Famille, setFamille, state, setState, handelError, setshowFamille,}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Add = async (e) => {
    setFamille({id: "", CodeFamille: "", NomFamille : "", CodeGroupe : "" });
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
      setshowFamille(true);
    } catch (error) {
      console.log(error);
    }
  };

  const Navigate = async (direction) => {
    try {
      if (direction === 'First') {
        const response = await axiosInstance.get('Famille/' + (await axiosInstance.get('Famille/data/Min')).data.id + ''
        );

        setFamille({ id: response.data.id, CodeFamille: response.data.CodeFamille, NomFamille: response.data.NomFamille, CodeGroupe: response.data.CodeGroupe,});
        setState({ ...state, Mode: 'OK', CodeReadOnly: true });
      } else if (direction === 'Previous') {
        console.log("Famille.id: "+Famille.id);
        const PreviousFamille = await axiosInstance.get(
          'Famille/data/Previous/' + Famille.id + ''
        );
        console.log(PreviousFamille.data.id);
        if (PreviousFamille.data.id != null) {
          setFamille({ id: PreviousFamille.data.id.id, CodeFamille: PreviousFamille.data.id.CodeFamille, NomFamille: PreviousFamille.data.id.NomFamille, CodeGroupe: PreviousFamille.data.id.CodeGroupe, });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
        } else {
          setState({ ...state, open: true, message: 'Premier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Next') {
        const NextFamille = await axiosInstance.get('Famille/data/Next/' + Famille.id + '');
        if (NextFamille.data.id != null) {
          setFamille({ id: NextFamille.data.id.id, CodeFamille: NextFamille.data.id.CodeFamille, NomFamille: NextFamille.data.id.NomFamille, CodeGroupe: NextFamille.data.id.CodeGroupe, });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
        } else {
          setState({ ...state, open: true, message: 'Dernier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Last') {
        const response = await axiosInstance.get(
          'Famille/' + (await axiosInstance.get('Famille/data/Max')).data.id + ''
        );
        setFamille({ id: response.data.id, CodeFamille: response.data.CodeFamille, NomFamille: response.data.NomFamille, CodeGroupe: response.data.CodeGroupe, });
        setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
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
