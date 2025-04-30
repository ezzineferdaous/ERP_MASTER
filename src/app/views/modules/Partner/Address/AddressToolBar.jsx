import { IconButton} from "@mui/material";
import { styled } from "@mui/system";
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

const ToolBar = ({Address, setAddress, state, setState, handelError, setshowListAddress }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

    const Add = async (e) => {
        setAddress({id: "", Code: null, CardCode: null , AddressType: -1, Street: null, Block: null, CountryCode: null, CityCode: null, ZIPCode: null });
        setState({ ...state, Mode: "Créer" });
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
          setshowListAddress(true);
         } catch (error) {
          console.log(error);        
        }
      };

    const Navigate = async (direction) => {

        try {
         if(direction === "First") {

          const response = await axiosInstance.get("Address/"+(await axiosInstance.get("Address/data/Min")).data.id+"");   
          setAddress({id:response.data.id, Code: response.data.Code, CardCode: response.data.CardCode , AddressType: response.data.AddressType, Street: response.data.Street, Block: response.data.Block, CountryCode: response.data.CountryCode, CityCode: response.data.CityCode, ZIPCode: response.data.ZIPCode});   
          setState({ ...state, Mode: "OK" });
        } else if( direction === "Previous") {

          const PreviousAddress = await axiosInstance.get("Address/data/Previous/"+Address.id+"");
          if(PreviousAddress.data.id != null) {
            setAddress({id:PreviousAddress.data.id.id, Code: PreviousAddress.data.id.Code, CardCode: PreviousAddress.data.id.CardCode , AddressType: PreviousAddress.data.id.AddressType, Street: PreviousAddress.data.id.Street, Block: PreviousAddress.data.id.Block, CountryCode: PreviousAddress.data.id.CountryCode, CityCode: PreviousAddress.data.id.CityCode, ZIPCode: PreviousAddress.data.id.ZIPCode});   

            setState({ ...state, open: false,  Mode: "OK" });
          } else {    
            setState({ ...state, open: true, message: "Premier enregistrement", severity: "info"});
          }

        } else if( direction === "Next") { 

          const NextAddress = await axiosInstance.get("Address/data/Next/"+Address.id+"");
          if(NextAddress.data.id != null) {
             setAddress({id:NextAddress.data.id.id, Code: NextAddress.data.id.Code, CardCode: NextAddress.data.id.CardCode , AddressType: NextAddress.data.id.AddressType, Street: NextAddress.data.id.Street, Block: NextAddress.data.id.Block, CountryCode: NextAddress.data.id.CountryCode, CityCode: NextAddress.data.id.CityCode, ZIPCode: NextAddress.data.id.ZIPCode});   
             setState({ ...state, open: false, Mode: "OK" });
          } else {
            setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info"});
          }

        } else if( direction === "Last") {
            const response = await axiosInstance.get("Address/"+(await axiosInstance.get("Address/data/Max")).data.id+"");
            setAddress({id:response.data.id, Code: response.data.Code, CardCode: response.data.CardCode , AddressType: response.data.AddressType, Street: response.data.Street, Block: response.data.Block, CountryCode: response.data.CountryCode, CityCode: response.data.CityCode, ZIPCode: response.data.ZIPCode});   
            setState({ ...state, open: false, Mode: "OK" });
        }
    
      } catch (error) { handelError(""+error); }
    
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
