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

const ToolBar = ({Territory, setTerritory, state, setState, handelError, setshowListTerritories }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true})

    const Add = async (e) => {
      setTerritory({id: "", descript: ""});
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
          setshowListTerritories(true);
         } catch (error) {
          console.log(error);        
        }
      };

    const Navigate = async (direction) => {

        try { 
         if(direction === "First") {

          const response = await axiosInstance.get("Territory/"+(await axiosInstance.get("Territory/data/Min")).data.id+"");
          setTerritory({id:response.data.id, descript: response.data.descript});
          setState({ ...state, Mode: "OK", CodeReadOnly: true });
        } else if( direction === "Previous") {

          const PreviousTerritory = await axiosInstance.get("Territory/data/Previous/"+Territory.id+"");
          if(PreviousTerritory.data.id != null) {
            setTerritory({id:PreviousTerritory.data.id.id, descript: PreviousTerritory.data.id.descript});
            setState({ ...state, open: false,  Mode: "OK", CodeReadOnly: true });
          } else {    
            setState({ ...state, open: true, message: "Premier enregistrement", severity: "info"});
          }

        } else if( direction === "Next") { 

          const NextTerritory = await axiosInstance.get("Territory/data/Next/"+Territory.id+"");
          if(NextTerritory.data.id != null) {
            setTerritory({id:NextTerritory.data.id.id, descript: NextTerritory.data.id.descript});
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true });
          } else {        
            setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info"});
          }

        } else if( direction === "Last") {
            const response = await axiosInstance.get("Territory/"+(await axiosInstance.get("Territory/data/Max")).data.id+"");
            setTerritory({id:response.data.id, descript: response.data.descript});
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
