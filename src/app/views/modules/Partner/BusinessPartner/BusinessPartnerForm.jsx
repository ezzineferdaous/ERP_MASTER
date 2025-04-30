import * as React from 'react';
import {  Button, Grid, styled, Box, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Span } from "app/components/Typography";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import 'react-phone-number-input/style.css'
import PhoneNumberValidation from 'app/components/Phone/PhoneNumberValidation'
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import AppAddressList from "../Address/AppAddressList";
//import FileUpload from "react-material-file-upload";
import FileUpload from "app/views/material-kit/FileUpload/FileUpload";
/* ICONS */
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

const TextField = styled(TextValidator)(() => ({ width: "100%",  marginBottom: "16px",}));
const prixLists = [{ Code: '1' , Name: 'Liste de prix 01' }, { Code: '2' , Name: 'Liste de prix 02' }, { Code: '3' , Name: 'Liste de prix 03' }, { Code: '4' , Name: 'Liste de prix 04' }]
const CardTypes = [{ Code: 'C' , Name: 'Client' }, { Code: 'S' , Name: 'Fournisseur' }]

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Form = ({ Mode, CodeReadOnly, Partner, setPartner, setState, state, CardGroups, handleChange, handleSubmit , files, setFiles, Territories, Currencies}) => {
 
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event,newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField size="small" type="text" name="CardCode" label="Code" id="standard-basic" value={Partner.CardCode} onChange={handleChange} InputLabelProps={{ shrink: true, }} required disabled={CodeReadOnly}/>
            <TextField size="small" type="text" name="CardName" label="Nom" value={Partner.CardName} onChange={handleChange} InputLabelProps={{ shrink: true, }} required/>            
            
            <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
              <FormControl size="small" fullWidth>
                <InputLabel id="lblCardType" InputLabelProps={{ shrink: true, }}>Type</InputLabel>
                <Select label="Type" labelId="lblCardType"  name="CardType" value={Partner.CardType} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }} required>
                      {CardTypes.map((e, key) => {
                              return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                      })}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
              <FormControl size="small" fullWidth>
                <InputLabel id="lblGroupCode" InputLabelProps={{ shrink: true, }}>Groupe</InputLabel>
                <Select label="Type" labelId="lblGroupCode"  name="GroupCode" value={Partner.GroupCode} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }} required>
                      {CardGroups.map((e, key) => {
                              return <MenuItem key={key} value={e.GroupCode}>{e.GroupName}</MenuItem>;
                      })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
              <FormControl size="small" fullWidth>
                <InputLabel id="lblCurrency" InputLabelProps={{ shrink: true, }}>Devise</InputLabel>
                <Select label="Type" labelId="lblCurrency"  name="Currency" value={Partner.Currency} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }} required>
                      {Currencies.map((e, key) => {
                              return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                      })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleTabChange}  aria-label="icon position tabs example">
            <Tab icon={<PermPhoneMsgOutlinedIcon />} iconPosition="start" label="Généralités" />
            <Tab icon={<BusinessOutlinedIcon />} iconPosition="start" label="Adresses" />
            <Tab icon={<PaymentOutlinedIcon />} iconPosition="start" label="Conditions de paiement" />
            <Tab icon={<PictureAsPdfOutlinedIcon />} iconPosition="start" label="Pièces jointes" />
          </Tabs>
          <TabPanel value={value} index={0} > 
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <PhoneNumberValidation  name="Phone"  placeholder="Tél"  Partner = {Partner} setPartner ={setPartner} setState={setState} state={state} onChange={handleChange}/>
                <TextField size="small" type="email" name="MailAddres" label="Email" value={Partner.MailAddres} onChange={handleChange} InputLabelProps={{ shrink: true, }}/>
                <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
                  <FormControl size="small" fullWidth>
                    <InputLabel id="lblTerritory" InputLabelProps={{ shrink: true, }}>Territoire</InputLabel>
                    <Select label="Type" labelId="lblTerritory"  name="Territory" value={Partner.Territory} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }} required>
                          {Territories.map((e, key) => {
                                  return <MenuItem key={key} value={e.id}>{e.descript}</MenuItem>;
                          })}
                    </Select>
                  </FormControl>
                </Box>
                <RadioGroup row name="Active" sx={{ mb: 2 }} value={Partner.Active} onChange={handleChange}>
                  <FormControlLabel value="Y" label="Active" labelPlacement="end" control={<Radio color="secondary" />} />
                  <FormControlLabel value="N" label="Inactive" labelPlacement="end" control={<Radio color="secondary" />} />
                </RadioGroup>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} > 
            <Grid container spacing={6}>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                  <AppAddressList Partner={Partner}/>
                </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2} > 
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                 <Box sx={{ minWidth: 120 }} className="breadcrumb">
                    <FormControl size="small" fullWidth>
                      <InputLabel id="lblPriceList" InputLabelProps={{ shrink: true, }}> Liste de prix </InputLabel>
                      <Select label="Liste de prix" labelId="lblPriceList"  name="ListNum" value={Partner.ListNum} onChange={handleChange} InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                            {prixLists.map((e, key) => {
                                    return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                            })}
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField size="small" type="number" name="CreditLine" label="Plafond de crédit" id="standard-basic" value={Partner.CreditLine} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
                  <TextField size="small" type="number" name="DebtLine" label="Limite d'engagement" id="standard-basic" value={Partner.DebtLine} onChange={handleChange} InputLabelProps={{ shrink: true, }} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3} > 
            <Grid container spacing={6}>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                <FileUpload setState={setState} state={state} files={files} setFiles={setFiles} Partner={Partner}/>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1 }}>{Mode}</Span>
        </Button>        
      </ValidatorForm>
    </div>
  );
};

export default Form;
