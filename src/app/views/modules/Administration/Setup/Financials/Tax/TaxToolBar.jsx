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

const ToolBar = ({Tax, setTax, state, setState, handelError, setshowListTax }) => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

    const Add = async (e) => {
        setTax({id: "", Code: "", Name : "", Rate: "", Active: ""});
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
          setshowListTax(true);
         } catch (error) {
          console.log(error);        
        }
      };

    const Navigate = async (direction) => {

        try { 
         if(direction === "First") {

          const response = await axiosInstance.get("Tax/"+(await axiosInstance.get("Tax/data/Min")).data.id+"");
          setTax({ id:response.data.id, Code: response.data.Code, Name : response.data.Name, Rate: response.data.Rate, Active: response.data.Active });
          setState({ ...state, Mode: "OK", CodeReadOnly: true });

        } else if( direction === "Previous") {

          const PreviousTax = await axiosInstance.get("Tax/data/Previous/"+Tax.id+"");
          //console.log(PreviousTax.data.id);
          if(PreviousTax.data.id != null) {
            setTax({id:PreviousTax.data.id.id, Code: PreviousTax.data.id.Code, Name : PreviousTax.data.id.Name, Rate: PreviousTax.data.id.Rate, Active: PreviousTax.data.id.Active });
            setState({ ...state, open: false,  Mode: "OK", CodeReadOnly: true });
          } else {    
            setState({ ...state, open: true, message: "Premier enregistrement", severity: "info"});
          }

        } else if( direction === "Next") { 

          const NextTax = await axiosInstance.get("Tax/data/Next/"+Tax.id+"");
          if(NextTax.data.id != null) {
            setTax({id:NextTax.data.id.id, Code: NextTax.data.id.Code, Name : NextTax.data.id.Name, Rate: NextTax.data.id.Rate, Active: NextTax.data.id.Active });
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true });
          } else {        
            setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info"});
          }

        } else if( direction === "Last") {

            const response = await axiosInstance.get("Tax/"+(await axiosInstance.get("Tax/data/Max")).data.id+"");
            setTax({id:response.data.id, Code: response.data.Code, Name : response.data.Name, Rate: response.data.Rate, Active: response.data.Active });
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
