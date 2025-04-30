import { Stack, Snackbar, Alert} from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import BusinessPartnerForm from "./BusinessPartnerForm";
import AppBusinessPartnerList from "./AppBusinessPartnerList";
import BusinessPartnerToolBar from "./BusinessPartnerToolBar";
import { Menubar } from 'primereact/menubar';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {

  const [Partner, setPartner] = useState({ id:"", CardCode: "", CardName : "", CardType : "C", GroupCode : "", Phone : "212", Fax : "", MailAddres : "", ICE : "", FreeText : "", Territory : "", ListNum : "", CreditLine : 0, DebtLine : 0, Currency : "", Balance : 0, Active : "Y", IF : "", RC : "", ModePaiement : "", VatStatus : "", ECVatCode : "", AttachmentId: -1 });
  const [CardGroups, setCardGroups] = useState([{}]);
  const [Territories, setTerritories] = useState([{}]);
  const [Currencies, setCurrencies] = useState([{}]);
  const [showListPartners , setshowListPartners] = useState(false);
  const [state, setState] = useState({ Mode:"Créer", message: "Error", open: false, vertical: 'top', horizontal: 'center', severity: "error", CodeReadOnly: false });
  const [files, setFiles] = useState([]);
  const { vertical, horizontal, open, message, severity } = state;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  const navigate = useNavigate(); 

  const handleClose = () => { 
    setState({ ...state, open: false });  
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setPartner({ ...Partner, [event.target.name]: value });
    console.log(Partner);
    if(Partner.id === "") {
      setState({ ...state, Mode: "Créer", CodeReadOnly: false  });
    } else  { setState({ ...state, Mode: "Mettre à jour", CodeReadOnly: true  }); }
  }; 

  const handelError = (error) => {
    
    if (error.response) {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error", CodeReadOnly: false});
    } else if (error.request) {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Erreur de récupération des données", severity: "error", CodeReadOnly: false});
    } else {
      setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error, severity: "error", CodeReadOnly: false});
    }

  };

  const handleSubmit = async (event) => {
      event.preventDefault(); 
      if(state.Mode === "Créer") {
          try 
          {
            if(files.length > 0) { 
              axiosInstance.post("Attachment", { "AttachmentLines" : files }).then(function (response) {
                  console.log(response.data.id);
                  setPartner({ ...Partner, AttachmentId: 100 });
                  //THE AttachmentId not set 
                  console.log(Partner);
                  //axiosInstance.post("Partner", Partner);
                }); 
            } else {
              axiosInstance.post("Partner", Partner);
            }
                      
            setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success", CodeReadOnly: false });
            setPartner({ id:"", CardCode: "", CardName : "", CardType : "C", GroupCode :"", Phone : "212", Fax : "", MailAddres : "", ICE : "", FreeText : "", Territory : "", ListNum : "", CreditLine : 0, DebtLine : 0, Currency : "", Balance : 0, Active : "Y", IF : "", RC : "", ModePaiement : "", VatStatus : "", ECVatCode : "", AttachmentId: -1 });
            setFiles([]);
          } catch (error) { handelError(""+error); }

      } else if(state.Mode === "Mettre à jour")  {

        console.log(Partner);
        try {
          await axiosInstance.put("Partner/"+Partner.id+"", Partner);
          setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success", CodeReadOnly: false });
          setPartner({ id:"", CardCode: "", CardName : "", CardType : "C", GroupCode : "", Phone : "212", Fax : "", MailAddres : "", ICE : "", FreeText : "", Territory : "", ListNum : "", CreditLine : 0, DebtLine : 0, Currency : "", Balance : 0, Active : "Y", IF : "", RC : "", ModePaiement : "", VatStatus : "", ECVatCode : "", AttachmentId: -1 });
          setFiles([]);
        } catch (error) { handelError(""+error); }

      } else {
        navigate("/");
      }
  };

  useEffect(() => {
    const Getdata = async () => {
      try {
        //Groupes Partenaire
        const  resCardGroups  = await axiosInstance.get("CardGroups/");
        setCardGroups(resCardGroups.data);
        const  resTerritories  = await axiosInstance.get("Territory/");
        setTerritories(resTerritories.data);
        const  resCurrencies  = await axiosInstance.get("Currency/");
        setCurrencies(resCurrencies.data);
      } catch (error) {
        handelError(""+error);
      }
    }; 
    Getdata();
  },[]); 

  const GetPartnerAttachments = async (AttachmentId) => {
    try {

      console.log(AttachmentId);
      const  Attachments  = await axiosInstance.get("AttachmentLine/Lines?AttachmentId="+AttachmentId);
      console.log(Attachments.data);
      setFiles(Attachments.data);

    } catch (error) {
      console.error(error.response.data);
      return;
    }
  }; 

  const start = <Breadcrumb routeSegments={[{ name: "Administration"}, { name: "Partenaire" }]} />;
  const end =   <BusinessPartnerToolBar Partner = {Partner} setPartner ={setPartner} GetPartnerAttachments={GetPartnerAttachments} state ={state} setState ={setState} handelError={handelError} setshowListPartners = {setshowListPartners} /> 

  return (
    <Container>
      <div className="card"> <Menubar lg={6} md={6} sm={12} xs={12}  start={start}  end={end}  style={{ border: '1px solid #dee2e600' }}/> </div>
      <Box sx={{ width: 500 }}>         
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin = { { vertical, horizontal } } key={vertical + horizontal} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
              {message}
            </Alert>
          </Snackbar>
        </Box>
      <Stack spacing={3}>
        { showListPartners ? (
          <AppBusinessPartnerList setPartner ={setPartner} setshowListPartners = {setshowListPartners} />
         ) : (
            <SimpleCard>
              <BusinessPartnerForm Mode= {state.Mode} CodeReadOnly={state.CodeReadOnly} Partner={Partner} setPartner={setPartner} files={files} setFiles={setFiles} setState ={setState} state={state} CardGroups={CardGroups} handleChange={handleChange} handleSubmit={handleSubmit} Territories={Territories} Currencies={Currencies}/>
            </SimpleCard>
         )}
      </Stack>
    </Container>
  );
};

export default AppForm;
