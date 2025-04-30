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
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
 
export default function FormDialog(props) {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  const [PriceList, setPriceList] = useState(props.data.original);  
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    await axiosInstance.get("PriceListLine/Lines?PriceListId="+PriceList.id).then((res) => setRows(res.data));
  }; 

  useEffect(() => {
    fetchRows();
  }, []);

  const columns = [
    { field: 'ItemCode', headerName: 'Article', width: 180, editable: false },
    { field: 'ItemName', headerName: 'Nom', width: 180, editable: false },
    { field: 'Price', headerName: 'Prix', type: 'number', editable: true, align: 'left', headerAlign: 'left', },
  ];
   

  function handleEditClose() { props.table.setEditingRow(null); }

  const handelError = (error) => {
    if (error.response) { props.setState({ vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error"}); } 
    else if (error.request) { props.setState({  vertical: 'top', horizontal: 'center', open: true, message: "network error", severity: "error"}); } 
    else { props.setState({  vertical: 'top', horizontal: 'center', open: true, message: error, severity: "error"}); }
  };

  const handleEditUpdate = async (event) => {  
    console.log("handleEditUpdate"); 
    console.log(PriceList.Name); 
    //props.table.setEditingRow(null); //exit editing mode

      try {
        //commeneted
        //Update Price List
        //// axiosInstance.put("PriceList/"+PriceList.id+"", PriceList);
        //Update Price List Lines

         var len = rows.length;
         for(var i = 0; i < len; i++) {
          console.log(rows[i]);
          console.log(rows[i].id);
          console.log(rows[i].Price);
          ////await axiosInstance.put("PriceListLine/"+PriceList.id+"", rows[i]);
         }

        //Get Price List data
        /*const  resPriceList  = await axiosInstance.get("PriceList/");
        props.setData(resPriceList.data);
        props.setState({ vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success"});
        props.table.setEditingRow(null); //exit editing mode*/

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
        <DialogTitle id="form-dialog-title"> Modifier Liste de Prix</DialogTitle>
        <DialogContent sx={{ width: '100%', maxWidth: 'none' }}> 

                  <TextField autoFocus margin="dense" name="Name" label="Name" type="text" value={PriceList.Name}  onChange={handleChange} fullWidth inputlabelprops={{ shrink: true, }}/>
                  <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                    <InputLabel inputlabelprops={{ shrink: true, }} id="lblStatus">Statut</InputLabel>  
                    <Select label="Statut" labelId="lblStatus" name="Status" value={PriceList.Status}  onChange={handleChange} style = {{ width: '100%' }} inputlabelprops={{ shrink: true, }} >
                        <MenuItem value="Actif">Actif</MenuItem>
                        <MenuItem value="Inactif">Inactif</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl  fullWidth sx={{ mt: 2 , mb: 2}}>
                      <InputLabel inputlabelprops={{ shrink: true, }} id="lblTTC">TTC</InputLabel>  
                      <Select label="TTC" labelId="lblTTC" name="TTC" value={PriceList.TTC}  onChange={handleChange} style = {{ width: '100%' }} inputlabelprops={{ shrink: true, }} >
                          <MenuItem value="Y">TTC</MenuItem>
                          <MenuItem value="N">HT</MenuItem>
                      </Select>
                  </FormControl>
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid columns={columns} rows={rows} />
                  </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditUpdate} variant="contained" color="primary"> Mettre à jour </Button>
          <Button variant="outlined" color="secondary" onClick={handleEditClose}> Interrompre </Button>
        </DialogActions>
     </Box>
  );
}
