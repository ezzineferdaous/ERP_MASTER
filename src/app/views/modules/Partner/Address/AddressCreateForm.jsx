import { Box } from '@mui/material';
 import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
 import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
 
 
export default function FormDialog(props) {
  const [Address, setAddress] = useState(props.data.original);
  function handleAddClose() { props.table.setCreatingRow(null);   }

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  const handelError = (error) => {
    if (error.response) {
      props.setState({ vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error"});
    } else if (error.request) {
      props.setState({  vertical: 'top', horizontal: 'center', open: true, message: "network error", severity: "error"});
    } else {
      props.setState({  vertical: 'top', horizontal: 'center', open: true, message: error, severity: "error"});
    }
  };

  const handleAddAddress = async (event) => {  
      console.log(Address.Code);
      try {
        await axiosInstance.post("Address/", Address);
        const  resAddress  = await axiosInstance.get("Address/");
        props.setData(resAddress.data);
        props.setState({ vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success"});
        props.table.setCreatingRow(null); //exit editing mode
      } catch (error) { handelError(""+error);  }
  } 

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log("Value: "+ value+" Name: "+name);
    setAddress({ ...Address, [event.target.name]: value });
  };  
 

  return (
    <Box>
        <DialogTitle id="form-dialog-title"> Nouvelle Address </DialogTitle>
        <DialogContent>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}> 
              <TextField autoFocus margin="dense" name="Code" label="Code" type="text" value={Address.Code}  onChange={handleChange} fullWidth InputLabelProps={{ shrink: true, }}/>
              <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblCardCode">Partenaire</InputLabel>  
                  <Select label="Partenaire" labelId="lblCardCode" name="CardCode" value={Address.CardCode}  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                        {props.Partners.map((e, key) => {
                            return <MenuItem key={key} value={e.CardCode}>{e.CardName}</MenuItem>;
                        })}
                  </Select>
              </FormControl>
              <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblAddressType">Type Address</InputLabel>  
                  <Select label="Type Address" labelId="lblAddressType" name="AddressType" value={Address.AddressType}  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                      <MenuItem value="S">Livraison</MenuItem>
                      <MenuItem value="B">Facturation</MenuItem>
                  </Select>
              </FormControl>
              <TextField  autoFocus margin="dense" name="Street" label="Rue" type="text" value={Address.Street}  onChange={handleChange} fullWidth InputLabelProps={{ shrink: true, }}/>
              <TextField  autoFocus margin="dense" name="Block" label="Bâtiments" type="text" value={Address.Block}  onChange={handleChange} fullWidth InputLabelProps={{ shrink: true, }}/>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblCity">Pays</InputLabel>  
                  <Select label="Pays" labelId="lblCountry" name="CountryCode" value={Address.CountryCode}  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                        {props.Countries.map((e, key) => {
                            return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                        })}
                  </Select>
              </FormControl> 

              <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblCity">Ville</InputLabel>  
                  <Select label="Ville" labelId="lblCity" name="CityCode" value={Address.CityCode}  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                        {props.Cities.filter((r) => { return r.CntCode === Address.CountryCode; }).map((e, key) => {
                            return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                        })}
                  </Select>
              </FormControl>

            <TextField  autoFocus margin="dense" name="ZIPCode" label="Code postal" type="text" value={Address.ZIPCode}  onChange={handleChange} fullWidth InputLabelProps={{ shrink: true, }}/>
        </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAddress} variant="contained" color="primary"> Ajouter </Button>
          <Button  variant="outlined" color="secondary" onClick={handleAddClose}> Interrompre </Button>
        </DialogActions>
     </Box>
  );
}
