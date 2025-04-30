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

const ToolBar = ({Partner, setPartner, GetPartnerAttachments, state, setState, handelError, setshowListPartners }) => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

    const Add = async (e) => {
      setPartner({ id:"", CardCode: "", CardName : "", CardType : "C", GroupCode : "", Phone : "212", Fax : "", MailAddres : "", ICE : "", FreeText : "", Territory : "", ListNum : "", CreditLine : 0, DebtLine : 0, Currency : "", Balance : 0, Active : "Y", IF : "", RC : "", ModePaiement : "", VatStatus : "", ECVatCode : "" , AttachmentId: -1});
      setState({ ...state, Mode: "Créer", CodeReadOnly: false });
      GetPartnerAttachments();
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
          setshowListPartners(true);
         } catch (error) {
          console.log(error);        
        }
      };

    const Navigate = async (direction) => {

        try {
         if(direction === "First") {

          const response = await axiosInstance.get("Partner/"+(await axiosInstance.get("Partner/data/Min")).data.id+"");   
          setPartner({id:response.data.id, CardCode: response.data.CardCode, CardName : response.data.CardName, CardType : response.data.CardType, GroupCode : response.data.GroupCode, Phone : response.data.Phone, Fax : response.data.Fax, MailAddres : response.data.MailAddres, ICE : response.data.ICE, FreeText : response.data.FreeText, Territory : response.data.Territory, ListNum : response.data.ListNum, CreditLine : response.data.CreditLine, DebtLine : response.data.DebtLine, Currency : response.data.Currency, Balance : response.data.Balance, Active : response.data.Active, IF : response.data.IF, RC : response.data.RC, ModePaiement : response.data.ModePaiement, VatStatus : response.data.VatStatus, ECVatCode : response.data.ECVatCode, AttachmentId: response.data.AttachmentId });   
          setState({ ...state, Mode: "OK" , CodeReadOnly: true});
          GetPartnerAttachments(response.data.AttachmentId);
        } else if( direction === "Previous") {

          const PreviousPartner = await axiosInstance.get("Partner/data/Previous/"+Partner.id+"");
          console.log(PreviousPartner.data.id);
          if(PreviousPartner.data.id != null) {
             setPartner({id:PreviousPartner.data.id.id, CardCode: PreviousPartner.data.id.CardCode, CardName : PreviousPartner.data.id.CardName, CardType : PreviousPartner.data.id.CardType, GroupCode : PreviousPartner.data.id.GroupCode, Phone : PreviousPartner.data.id.Phone, Fax : PreviousPartner.data.id.Fax, MailAddres : PreviousPartner.data.id.MailAddres, ICE : PreviousPartner.data.id.ICE, FreeText : PreviousPartner.data.id.FreeText, Territory : PreviousPartner.data.id.Territory, ListNum : PreviousPartner.data.id.ListNum, CreditLine : PreviousPartner.data.id.CreditLine, DebtLine : PreviousPartner.data.id.DebtLine, Currency : PreviousPartner.data.id.Currency, Balance : PreviousPartner.data.id.Balance, Active : PreviousPartner.data.id.Active, IF : PreviousPartner.data.id.IF, RC : PreviousPartner.data.id.RC, ModePaiement : PreviousPartner.data.id.ModePaiement, VatStatus : PreviousPartner.data.id.VatStatus, ECVatCode : PreviousPartner.data.id.ECVatCode, AttachmentId: PreviousPartner.data.id.AttachmentId });   
             setState({ ...state, open: false,  Mode: "OK", CodeReadOnly: true });
             GetPartnerAttachments(PreviousPartner.data.id.AttachmentId);
          } else {    
            setState({ ...state, open: true, message: "Premier enregistrement", severity: "info"});
          }          
        } else if( direction === "Next") { 

          const NextPartner = await axiosInstance.get("Partner/data/Next/"+Partner.id+"");
          if(NextPartner.data.id != null) {
            setPartner({id:NextPartner.data.id.id, CardCode: NextPartner.data.id.CardCode, CardName : NextPartner.data.id.CardName, CardType : NextPartner.data.id.CardType, GroupCode : NextPartner.data.id.GroupCode, Phone : NextPartner.data.id.Phone, Fax : NextPartner.data.id.Fax, MailAddres : NextPartner.data.id.MailAddres, ICE : NextPartner.data.id.ICE, FreeText : NextPartner.data.id.FreeText, Territory : NextPartner.data.id.Territory, ListNum : NextPartner.data.id.ListNum, CreditLine : NextPartner.data.id.CreditLine, DebtLine : NextPartner.data.id.DebtLine, Currency : NextPartner.data.id.Currency, Balance : NextPartner.data.id.Balance, Active : NextPartner.data.id.Active, IF : NextPartner.data.id.IF, RC : NextPartner.data.id.RC, ModePaiement : NextPartner.data.id.ModePaiement, VatStatus : NextPartner.data.id.VatStatus, ECVatCode : NextPartner.data.id.ECVatCode, AttachmentId: NextPartner.data.id.AttachmentId });   
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true });
            GetPartnerAttachments(NextPartner.data.id.AttachmentId);
          } else {
            setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info"});
          }
        } else if( direction === "Last") {
            const response = await axiosInstance.get("Partner/"+(await axiosInstance.get("Partner/data/Max")).data.id+"");
            setPartner({id:response.data.id, CardCode: response.data.CardCode, CardName : response.data.CardName, CardType : response.data.CardType, GroupCode : response.data.GroupCode, Phone : response.data.Phone, Fax : response.data.Fax, MailAddres : response.data.MailAddres, ICE : response.data.ICE, FreeText : response.data.FreeText, Territory : response.data.Territory, ListNum : response.data.ListNum, CreditLine : response.data.CreditLine, DebtLine : response.data.DebtLine, Currency : response.data.Currency, Balance : response.data.Balance, Active : response.data.Active, IF : response.data.IF, RC : response.data.RC, ModePaiement : response.data.ModePaiement, VatStatus : response.data.VatStatus, ECVatCode : response.data.ECVatCode, AttachmentId: response.data.AttachmentId });   
            setState({ ...state, open: false, Mode: "OK", CodeReadOnly: true });
            GetPartnerAttachments(response.data.AttachmentId);
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
