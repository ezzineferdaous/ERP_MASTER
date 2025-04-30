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

  const ToolBar = ({ Employee, setEmployee, state, setState, handelError, setshowEmployee}) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Add = async (e) => {
    setEmployee({ id: null, Code: null, Prenom: null, Nom:null, Post:-1, Service:-1, Active:'Y', Agence:null, Image:null, Statut:-1 , TelP:null, TelPo:null, email:null , Adresse:null ,Sexe:-1, DateN:null, PayeN:-1, Nationalite:-1, SituationF:-1, Nenfants:null, GovID: null, SalaireBase:null, Remarque:null, MDP:null, Zone:null, Profil:null , ID_Rubrique: null, ID_Contrat: null  });
    setState({ ...state, Mode: "Créer", CodeReadOnly: false });
  };

  const Print = async (e) => {
    e.preventDefault();
    try {
      alert('Print');
    } catch (error) {
      setState({ ...state,vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: 'error', CodeReadOnly: false });
    }
  };

  const List = async (e) => {
    e.preventDefault();
    try {
      setshowEmployee(true);
    } catch (error) {
      console.log(error);
    }
  };

  const GetFirst = async() => {
      const response = await axiosInstance.get('Salaries/' + (await axiosInstance.get('Salaries/data/Min')).data.id + '' );
      setEmployee({ id: response.data.id, Code: response.data.Code, Prenom: response.data.Prenom, Nom:response.data.Nom, Post:response.data.Post, Service:response.data.Service, Active:response.data.Active, Agence:response.data.Agence, Image:response.data.Image, Statut:response.data.Statut , TelP:response.data.TelP, TelPo:response.data.TelPo, email:response.data.email , Adresse:response.data.Adresse ,Sexe:response.data.Sexe, DateN:formatDate(response.data.DateN), PayeN:response.data.PayeN, Nationalite:response.data.Nationalite, SituationF:response.data.SituationF, Nenfants:response.data.Nenfants, GovID: response.data.GovID, SalaireBase:response.data.SalaireBase, Remarque:response.data.Remarque, MDP:response.data.MDP, Zone:response.data.Zone, Profil:response.data.Profil , ID_Rubrique: response.data.ID_Rubrique, ID_Contrat: response.data.ID_Contrat })
      setState({ ...state, Mode: 'OK', CodeReadOnly: true });   
  };

  const GetPrevious = async() => {
    if(Employee.id === null) { GetFirst(); }
    else {
          const PreviousEmployee = await axiosInstance.get('Salaries/data/Previous/' + Employee.id);
          if (PreviousEmployee.data.id != null) {
            setEmployee({ id: PreviousEmployee.data.id.id, Code: PreviousEmployee.data.id.Code, Prenom: PreviousEmployee.data.id.Prenom, Nom:PreviousEmployee.data.id.Nom, Post:PreviousEmployee.data.id.Post, Service:PreviousEmployee.data.id.Service, Active:PreviousEmployee.data.id.Active, Agence:PreviousEmployee.data.id.Agence, Image:PreviousEmployee.data.id.Image, Statut:PreviousEmployee.data.id.Statut , TelP:PreviousEmployee.data.id.TelP, TelPo:PreviousEmployee.data.id.TelPo, email:PreviousEmployee.data.id.email , Adresse:PreviousEmployee.data.id.Adresse ,Sexe:PreviousEmployee.data.id.Sexe, DateN:formatDate(PreviousEmployee.data.id.DateN), PayeN:PreviousEmployee.data.id.PayeN, Nationalite:PreviousEmployee.data.id.Nationalite, SituationF:PreviousEmployee.data.id.SituationF, Nenfants:PreviousEmployee.data.id.Nenfants, GovID: PreviousEmployee.data.id.GovID, SalaireBase:PreviousEmployee.data.id.SalaireBase, Remarque:PreviousEmployee.data.id.Remarque, MDP:PreviousEmployee.data.id.MDP, Zone:PreviousEmployee.data.id.Zone, Profil:PreviousEmployee.data.id.Profil , ID_Rubrique: PreviousEmployee.data.id.ID_Rubrique, ID_Contrat: PreviousEmployee.data.id.ID_Contrat })
            setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
          } else { setState({ ...state, open: true, message: 'Premier enregistrement', severity: 'info' }); }
    }
  };

  const GetNext = async() => {
    if(Employee.id === null) { GetLast(); }
    else {
          const NextEmployee = await axiosInstance.get('Salaries/data/Next/' +Employee.id);
          if (NextEmployee.data.id != null) {
            setEmployee({ id: NextEmployee.data.id.id, Code: NextEmployee.data.id.Code, Prenom: NextEmployee.data.id.Prenom, Nom:NextEmployee.data.id.Nom, Post:NextEmployee.data.id.Post, Service:NextEmployee.data.id.Service, Active:NextEmployee.data.id.Active, Agence:NextEmployee.data.id.Agence, Image:NextEmployee.data.id.Image, Statut:NextEmployee.data.id.Statut , TelP:NextEmployee.data.id.TelP, TelPo:NextEmployee.data.id.TelPo, email:NextEmployee.data.id.email , Adresse:NextEmployee.data.id.Adresse ,Sexe:NextEmployee.data.id.Sexe, DateN:formatDate(NextEmployee.data.id.DateN), PayeN:NextEmployee.data.id.PayeN, Nationalite:NextEmployee.data.id.Nationalite, SituationF:NextEmployee.data.id.SituationF, Nenfants:NextEmployee.data.id.Nenfants, GovID: NextEmployee.data.id.GovID, SalaireBase:NextEmployee.data.id.SalaireBase, Remarque:NextEmployee.data.id.Remarque, MDP:NextEmployee.data.id.MDP, Zone:NextEmployee.data.id.Zone, Profil:NextEmployee.data.id.Profil , ID_Rubrique: NextEmployee.data.id.ID_Rubrique, ID_Contrat: NextEmployee.data.id.ID_Contrat })
            setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
          } else { setState({ ...state, open: true, message: 'Dernier enregistrement', severity: 'info' }); }
    }
  };

  const GetLast = async() => {
        const response = await axiosInstance.get('Salaries/' + (await axiosInstance.get('Salaries/data/Max')).data.id + '');
        setEmployee({ id: response.data.id, Code: response.data.Code, Prenom: response.data.Prenom, Nom:response.data.Nom, Post:response.data.Post, Service:response.data.Service, Active:response.data.Active, Agence:response.data.Agence, Image:response.data.Image, Statut:response.data.Statut , TelP:response.data.TelP, TelPo:response.data.TelPo, email:response.data.email , Adresse:response.data.Adresse ,Sexe:response.data.Sexe, DateN:formatDate(response.data.DateN), PayeN:response.data.PayeN, Nationalite:response.data.Nationalite, SituationF:response.data.SituationF, Nenfants:response.data.Nenfants, GovID: response.data.GovID, SalaireBase:response.data.SalaireBase, Remarque:response.data.Remarque, MDP:response.data.MDP, Zone:response.data.Zone, Profil:response.data.Profil , ID_Rubrique: response.data.ID_Rubrique, ID_Contrat: response.data.ID_Contrat })
        setState({ ...state, open: false, Mode: 'OK', CodeReadOnly: true });
  };

  const Navigate = async (direction) => { 
    try {
      if (direction === 'First') {  GetFirst(); }
      else if (direction === 'Previous') { GetPrevious(); }
      else if (direction === 'Next') { GetNext(); }
      else if (direction === 'Last') { GetLast(); }
    } catch (error) { handelError(""+error); }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
