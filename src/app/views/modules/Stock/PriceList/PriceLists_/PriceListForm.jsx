import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { Grid, styled, Box } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import 'react-phone-number-input/style.css';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import axios from 'axios';

const TextField = styled(TextValidator)(() => ({ width: "100%",  marginBottom: "16px",}));
function TabPanel(props) { 
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && ( <Box sx={{ p: 3 }}> <Typography>{children}</Typography> </Box> )}
    </div>
  );
}

TabPanel.propTypes = {  children: PropTypes.node,  index: PropTypes.number.isRequired,  value: PropTypes.number.isRequired,};

const Form = ({ PriceList, handleChange, handleSubmit }) => {


  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
 
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField size="small" type="text" name="Name" label="Nom" id="standard-basic" value={PriceList.Name} onChange={handleChange} InputLabelProps={{ shrink: true, }} required/>
            
            <Box sx={{ minWidth: 120 }} className="breadcrumb">
              <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblStatus">Statut</InputLabel>  
                  <Select label="Statut" labelId="lblStatus" name="Status" value={PriceList.Status}  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                      <MenuItem value="Actif">Actif</MenuItem>
                      <MenuItem value="Inactif">Inactif</MenuItem>
                  </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
              <FormControl size="small" fullWidth>
                <InputLabel id="lblTTC" InputLabelProps={{ shrink: true, }}>TTC</InputLabel>
                <Select label="TTC" labelId="lblTTC" name="TTC" value={PriceList.TTC}  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                      <MenuItem value="O">TTC</MenuItem>
                      <MenuItem value="N">HT</MenuItem>
                  </Select>
              </FormControl>
            </Box>
            
s          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default Form;
