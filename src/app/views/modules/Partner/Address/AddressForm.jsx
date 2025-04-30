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
 const AddressType = [{ Code: 'S' , Name: 'Livraison' }, { Code: 'B' , Name: 'Facuration' }]

function TabPanel(props) { 
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && ( <Box sx={{ p: 3 }}> <Typography>{children}</Typography> </Box> )}
    </div>
  );
}

TabPanel.propTypes = {  children: PropTypes.node,  index: PropTypes.number.isRequired,  value: PropTypes.number.isRequired,};

const Form = ({ Address, handleChange, handleSubmit }) => {

  const [Countries, setCountries] = useState([{}]);
  const [Cities, setCities] = useState([{}]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  useEffect(() => { 
      const GetCountries = async () => {
          try {
            const  res  = await axiosInstance.get("Country/");
            setCountries(res.data);
            console.log(Countries);
          } catch (error) {
            console.error(error);
            return;
          }
      };
      GetCountries();
  });

  useEffect(() => { 
    const GetCities = async () => {
      try {
        const  res  = await axiosInstance.get("City/?CntCode="+Address.CountryCode);
        setCities(res.data);
        console.log(Cities);
      } catch (error) {
        console.error(error);
        return;
      }
    };         
      GetCities();      
    },[Address.CountryCode]);

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField size="small" type="text" name="Code" label="Code" id="standard-basic" value={Address.Code} onChange={handleChange} InputLabelProps={{ shrink: true, }} required/>
            <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
              <FormControl size="small" fullWidth>
                <InputLabel id="lblAddressType" InputLabelProps={{ shrink: true, }}>Type</InputLabel>
                <Select label="Type" labelId="lblAddressType"  name="AddressType" value={Address.AddressType} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }} required>
                      {AddressType.map((e, key) => {
                              return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                      })}
                </Select>
              </FormControl>
            </Box>
            <TextField size="small" type="text" name="Street" label="Rue" value={Address.Street} onChange={handleChange} InputLabelProps={{ shrink: true, }}/>   
            <TextField size="small" type="text" name="Block" label="Block" value={Address.Block} onChange={handleChange} InputLabelProps={{ shrink: true, }}/>            
            <Box className="breadcrumb">   
              <FormControl size="small"  fullWidth>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblCountryCode">Pays</InputLabel>  
                  <Select label="Pays" labelId="lblCountryCode" name="CountryCode" value={Address.CountryCode } onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                        {Countries.map((e, key) => {
                            return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                        })}
                  </Select>
              </FormControl>
            </Box>         
            <Box className="breadcrumb">   
              <FormControl size="small"  fullWidth>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblCity">Ville</InputLabel>  
                  <Select label="Ville" labelId="lblCity" name="City" value={Address.City} onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                        {Cities.map((e, key) => {
                            return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                        })}
                  </Select>
              </FormControl>
            </Box>         
            <TextField size="small" type="text" name="ZIPCode" label="Zip Code" value={Address.ZIPCode} onChange={handleChange} InputLabelProps={{ shrink: true, }}/>            
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default Form;
