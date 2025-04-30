import {  Button,  FormControl, FormControlLabel,  Grid,   Radio,  RadioGroup,  styled, Select, MenuItem } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Box } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const WarehousesForm = ({ Mode, CodeReadOnly, Countries, Cities, Warehouse, handleChange, handleSubmit }) => {
 
  return(
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            <TextField type="text" name="CodeWarehouse" label="Code du magasin"  id="standard-basic" value={Warehouse.CodeWarehouse || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 6"]} disabled={CodeReadOnly} />
            <TextField type="text" name="NumRue" label="N° de rue" onChange={handleChange} value={Warehouse.NumRue || ""} errorMessages={[]}  validators={["minStringLength: 0", "maxStringLength: 100"]}/>   
            <TextField type="text" name="CmptCharges" label="Compte de charges" onChange={handleChange} value={Warehouse.CmptCharges || ""} errorMessages={[]}  validators={["minStringLength: 0", "maxStringLength: 10"]}/>            

            <Box className="breadcrumb">
              <FormControl size="small"  fullWidth>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblCountryCode">Pays</InputLabel>  
                  <Select label="Pays" labelId="lblCountryCode" name="CountryCode" value={Warehouse.CountryCode} onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                        {Countries.map((e, key) => {
                            return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                        })}
                  </Select>
              </FormControl>
            </Box>         
            <Box className="breadcrumb">   
              <FormControl size="small"  fullWidth>
                  <InputLabel InputLabelProps={{ shrink: true, }} id="lblCity">Ville</InputLabel>  
                  <Select label="Ville" labelId="lblCity" name="City" value={Warehouse.City} onChange={handleChange} style = {{ width: '100%' }} InputLabelProps={{ shrink: true, }} >
                        {Cities.map((e, key) => {
                            return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                        })}
                  </Select>
              </FormControl>
            </Box>    

            <RadioGroup row name="ActiveInactive" sx={{ mb: 2 }} value={Warehouse.ActiveInactive || ""} onChange={handleChange} >
              <FormControlLabel value="Y" label="Active" labelPlacement="end" control={<Radio color="secondary" />} selected/>
              <FormControlLabel value="N" label="Inactive" labelPlacement="end" control={<Radio color="secondary" />} />
            </RadioGroup>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="NomWarehouse"  label="Nom du magasin"  id="standard-basic" value={Warehouse.NomWarehouse || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 100"]} />
            <TextField type="text" name="Rue" label="Rue/Boîte postale" onChange={handleChange} value={Warehouse.Rue || ""} errorMessages={[]}  validators={["minStringLength: 0", "maxStringLength: 100"]}/>            
            <TextField type="text" name="CmptProduit" label="Compte de produit" onChange={handleChange} value={Warehouse.CmptProduit || ""} errorMessages={[]}  validators={["minStringLength: 0", "maxStringLength: 10"]}/>            
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
            <Span sx={{ pl: 1 }} >{Mode}</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default WarehousesForm;
