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
  const [PriceList, setPriceList] = useState(props.data.original);
  function handleAddClose() { props.table.setCreatingRow(null); }

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

  const handleAddPriceList = async (event) => {  
      console.log(PriceList.Name);
      try {
        await axiosInstance.post("PriceList/", PriceList);
        const  resPriceList  = await axiosInstance.get("PriceList/");
        props.setData(resPriceList.data);
        props.setState({ vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success"});
        props.table.setCreatingRow(null); //exit editing mode
      } catch (error) { handelError(""+error);  }
  } 

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log("Value: "+ value+" Name: "+name);
    setPriceList({ ...PriceList, [event.target.name]: value });
  };  
 

  return (
    <Box>
        <DialogTitle id="form-dialog-title"> Nouvelle Liste de Prix </DialogTitle>
        <DialogContent>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}> 
              <TextField autoFocus margin="dense" name="Name" label="Nom" type="text" value={PriceList.Name}  onChange={handleChange} fullWidth InputLabelProps={{ shrink: true, }}/>
              <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblStatus">Statut</InputLabel>  
                  <Select label="Statut" labelId="lblStatus" name="Status" value={PriceList.Status}  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                      <MenuItem value="Actif">Actif</MenuItem>
                      <MenuItem value="Inactif">Inactif</MenuItem>
                  </Select>
              </FormControl>
              <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblTTC">TTC</InputLabel>  
                  <Select label="TTC" labelId="lblTTC" name="TTC" value={ PriceList.TTC }  onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                      <MenuItem value="Y">TTC</MenuItem>
                      <MenuItem value="N">HT</MenuItem>
                  </Select>
              </FormControl>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPriceList} variant="contained" color="primary"> Ajouter </Button>
          <Button  variant="outlined" color="secondary" onClick={handleAddClose}> Interrompre </Button>
        </DialogActions>
     </Box>
  );
}
