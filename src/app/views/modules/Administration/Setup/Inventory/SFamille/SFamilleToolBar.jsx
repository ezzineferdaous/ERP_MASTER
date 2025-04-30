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

const ToolBar = ({ SousFamille, setSousFamille, state, setState, handelError, setshowSousFamille,}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
  console.log('baseUrl: ' + baseUrl);


  const Add = async (e) => {
    setSousFamille({id: "", CodeSFamille: "", NomSFamille : "", CodeFamille : "" });
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
      setshowSousFamille(true);
    } catch (error) {
      console.log(error);
    }
  };

  const Navigate = async (direction) => {
    try { 
      if (direction === 'First') { 
        const response = await axiosInstance.get('SousFamille/' + (await axiosInstance.get('SousFamille/data/Min')).data.id + '' );

        console.log('response.data.id: ' + response.data.id);
        console.log('response.data.CodeSousFamille: ' + response.data.CodeSFamille);
        console.log('response.data.NomSousFamille: ' + response.data.NomSFamille);

        setSousFamille({
          id: response.data.id,
          CodeSFamille: response.data.CodeSFamille,
          NomSFamille: response.data.NomSFamille,
          CodeFamille: response.data.CodeFamille,
        });
        setState({ ...state, Mode: 'OK', CodeReadOnly: true });
      } else if (direction === 'Previous') {
        const PreviousSFamille = await axiosInstance.get(
          'SousFamille/data/Previous/' + SousFamille.id + ''
        );
        console.log(PreviousSFamille.data.id);
        if (PreviousSFamille.data.id != null) {
          setSousFamille({
            id: PreviousSFamille.data.id.id,
            CodeSFamille: PreviousSFamille.data.id.CodeSFamille,
            NomSFamille: PreviousSFamille.data.id.NomSFamille,
            CodeFamille: PreviousSFamille.data.id.CodeFamille,
          });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
        } else {
          setState({ ...state, open: true, message: 'Premier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Next') {
        const NextSFamille = await axiosInstance.get('SousFamille/data/Next/' + SousFamille.id + '');
        if (NextSFamille.data.id != null) {
          setSousFamille({
            id: NextSFamille.data.id.id,
            CodeSFamille: NextSFamille.data.id.CodeSFamille,
            NomSFamille: NextSFamille.data.id.NomSFamille,
            CodeFamille: NextSFamille.data.id.CodeFamille,
          });
          setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
        } else {
          setState({ ...state, open: true, message: 'Dernier enregistrement', severity: 'info' });
        }
      } else if (direction === 'Last') {
        const response = await axiosInstance.get('SousFamille/' + (await axiosInstance.get('SousFamille/data/Max')).data.id + '');
        setSousFamille({
          id: response.data.id,
          CodeSFamille: response.data.CodeSFamille,
          NomSFamille: response.data.NomSFamille,
          CodeFamille: response.data.CodeFamille,
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
