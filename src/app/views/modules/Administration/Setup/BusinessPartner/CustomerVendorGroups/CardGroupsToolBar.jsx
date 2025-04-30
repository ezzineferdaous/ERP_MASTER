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

const ToolBar = ({CardGroup, setCardGroup, state, setState, handelError, setshowListCardGroupes }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true})

    const Add = async (e) => {
        setCardGroup({id: "", GroupCode: "", GroupName : ""});
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
          setshowListCardGroupes(true);
         } catch (error) {
          console.log(error);        
        }
      };

    const Navigate = async (direction) => {

        try {
         if(direction === "First") {

          const response = await axiosInstance.get("CardGroups/"+(await axiosInstance.get("CardGroups/data/Min")).data.id+"");   
          setCardGroup({id:response.data.id, GroupCode: response.data.GroupCode, GroupName : response.data.GroupName, GroupType : response.data.GroupType, PriceList : response.data.PriceList, Discount : response.data.Discount });   
          setState({ ...state, Mode: "OK", CodeReadOnly: true  });
        } else if( direction === "Previous") {

          const PreviousCardGroup = await axiosInstance.get("CardGroups/data/Previous/"+CardGroup.id+"");
          //console.log(PreviousCardGroup.data.id);
          if(PreviousCardGroup.data.id != null) {
            setCardGroup({id:PreviousCardGroup.data.id.id, GroupCode: PreviousCardGroup.data.id.GroupCode, GroupName : PreviousCardGroup.data.id.GroupName, GroupType : PreviousCardGroup.data.id.GroupType, PriceList : PreviousCardGroup.data.id.PriceList, Discount : PreviousCardGroup.data.id.Discount});
            setState({ ...state, open: false,  Mode: "OK", CodeReadOnly: true  });
          } else {    
            setState({ ...state, open: true, message: "Premier enregistrement", severity: "info"});
          }

        } else if( direction === "Next") { 

          const NextCardGroup = await axiosInstance.get("CardGroups/data/Next/"+CardGroup.id+"");
          if(NextCardGroup.data.id != null) {
            setCardGroup({id:NextCardGroup.data.id.id, GroupCode: NextCardGroup.data.id.GroupCode, GroupName : NextCardGroup.data.id.GroupName, GroupType : NextCardGroup.data.id.GroupType, PriceList : NextCardGroup.data.id.PriceList, Discount : NextCardGroup.data.id.Discount});
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true  });
          } else {
            setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info"});
          }

        } else if( direction === "Last") {
            const response = await axiosInstance.get("CardGroups/"+(await axiosInstance.get("CardGroups/data/Max")).data.id+"");
            setCardGroup({id:response.data.id, GroupCode: response.data.GroupCode, GroupName : response.data.GroupName, GroupType : response.data.GroupType, PriceList : response.data.PriceList, Discount : response.data.Discount});
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true  });
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
