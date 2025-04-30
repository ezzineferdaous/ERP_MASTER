import { IconButton} from "@mui/material";
import {  styled } from "@mui/system";
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

const ToolBar = ({Country, setCountry, state, setState, handelError, setshowListCountries }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL; 
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true})

    const Add = async (e) => {
        setCountry({id: "", Code: "", Name : ""});
        setState({ ...state, Mode: "Créer", CodeReadOnly: false });
      };  
      const Print = async (e) => {
        e.preventDefault();
        try {
          alert('Print');
        } catch (error) { handelError(""+error); }
      };
      const List = async (e) => {
        e.preventDefault();
        try {
          setshowListCountries(true);
         } catch (error) {
          console.log(error);        
        }
      };

    const Navigate = async (direction) => {

        try {
         if(direction === "First") {

          const response = await axiosInstance.get("Country/"+(await axiosInstance.get("Country/data/Min")).data.id+"");   
          setCountry({id:response.data.id, Code: response.data.Code, Name : response.data.Name});   
          setState({ ...state, Mode: "OK", CodeReadOnly: true });
        } else if( direction === "Previous") {

          const PreviousCountry = await axiosInstance.get("Country/data/Previous/"+Country.id+"");
          //console.log(PreviousCountry.data.id);
          if(PreviousCountry.data.id != null) {
            setCountry({id:PreviousCountry.data.id.id, Code: PreviousCountry.data.id.Code, Name : PreviousCountry.data.id.Name});
            setState({ ...state, open: false,  Mode: "OK", CodeReadOnly: true });
          } else {    
            setState({ ...state, open: true, message: "Premier enregistrement", severity: "info"});
          }

        } else if( direction === "Next") { 

          const NextCountry = await axiosInstance.get("Country/data/Next/"+Country.id+"");
          if(NextCountry.data.id != null) {
            setCountry({id:NextCountry.data.id.id, Code: NextCountry.data.id.Code, Name : NextCountry.data.id.Name});
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true });
          } else {        
            setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info"});
          }

        } else if( direction === "Last") {
            const response = await axiosInstance.get("Country/"+(await axiosInstance.get("Country/data/Max")).data.id+"");
            setCountry({id:response.data.id, Code: response.data.Code, Name : response.data.Name});
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true });
        } 
    
      } catch (error) { handelError(""+error);  }
    
      }

      return ( <IconBox> 
                <IconButton onClick={Add} aria-label="Nouveau" size="small"> <AddIcon fontSize="small" /> </IconButton>
                <IconButton onClick={Print} aria-label="imprimer" size="small"> <PrintIcon fontSize="small" /> </IconButton>
                <IconButton onClick={() => Navigate("First")} aria-label="Premier" size="small"> <KeyboardDoubleArrowLeftIcon  fontSize="small" /> </IconButton>
                <IconButton onClick={() => Navigate("Previous")} aria-label="Précédent" size="small"> <KeyboardArrowLeftIcon fontSize="small" /> </IconButton>
                <IconButton onClick={() => Navigate("Next")} aria-label="Suivant" size="small"> <KeyboardArrowRightIcon fontSize="small" /> </IconButton>
                <IconButton onClick={() => Navigate("Last")} aria-label="Dernier" size="small"> <KeyboardDoubleArrowRightIcon fontSize="small" /> </IconButton>
                <IconButton onClick={List} aria-label="Filtrer" size="small"> <FormatListBulletedIcon fontSize="small" /> </IconButton>
            </IconBox>
        );

}

export default ToolBar;
