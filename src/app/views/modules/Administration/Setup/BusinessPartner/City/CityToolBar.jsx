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

const ToolBar = ({City, setCity, state, setState, handelError, setshowListCities }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

    const Add = async (e) => {
        setCity({id: "", Code: "", Name : ""});
        setState({ ...state, Mode: "Créer" , CodeReadOnly: false});
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
          setshowListCities(true);
         } catch (error) {
          console.log(error);        
        }
      };

    const Navigate = async (direction) => {

        try { 
         if(direction === "First") {

          const response = await axiosInstance.get("City/"+(await axiosInstance.get("City/data/Min")).data.id+"");
          setCity({id:response.data.id, Code: response.data.Code, Name : response.data.Name, CntCode: response.data.CntCode});
          setState({ ...state, Mode: "OK", CodeReadOnly: true });
        } else if( direction === "Previous") {

          const PreviousCity = await axiosInstance.get("City/data/Previous/"+City.id+"");
          //console.log(PreviousCity.data.id);
          if(PreviousCity.data.id != null) {
            setCity({id:PreviousCity.data.id.id, Code: PreviousCity.data.id.Code, Name : PreviousCity.data.id.Name, CntCode: PreviousCity.data.id.CntCode});
            setState({ ...state, open: false,  Mode: "OK", CodeReadOnly: true });
          } else {    
            setState({ ...state, open: true, message: "Premier enregistrement", severity: "info"});
          }

        } else if( direction === "Next") { 

          const NextCity = await axiosInstance.get("City/data/Next/"+City.id+"");
          if(NextCity.data.id != null) {
            setCity({id:NextCity.data.id.id, Code: NextCity.data.id.Code, Name : NextCity.data.id.Name, CntCode: NextCity.data.id.CntCode});
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true });
          } else {        
            setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info"});
          }

        } else if( direction === "Last") {
            const response = await axiosInstance.get("City/"+(await axiosInstance.get("City/data/Max")).data.id+"");
            setCity({id:response.data.id, Code: response.data.Code, Name : response.data.Name, CntCode: response.data.CntCode});
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
