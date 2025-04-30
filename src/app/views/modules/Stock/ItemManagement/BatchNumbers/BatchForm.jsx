import {  Button,  Select,  MenuItem,  Box, Grid,  styled } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Toast } from 'primereact/toast';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

  const BatchForm = () => {

  const [state, setState] = useState({ date: new Date() });
  const toast = useRef(null);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const Save = () => {
    console.log("Save ");
    toast.current.show({severity:'success', summary: 'Success', detail:'Opération correctement achevée', life: 3000});
  }; 

  const { ItemCode, Description, BatchNum, FabricationDate, ExpirationDate, Details  } = state;
 
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={3}>      
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              <TextField type="text" name="ItemCode" label="Numéro d'article"  id="standard-basic" value={ItemCode || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 6"]} /> 
              <TextField type="text" name="Description"  label="Description article"  id="standard-basic" value={Description || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 20"]} />

              <Grid container spacing={3}>
                  <Grid item lg={9} md={9} sm={12} xs={12} sx={{ mt: 0 }}>
                      <TextField type="text" name="BatchNum" label="Lot"  id="standard-basic" value={BatchNum || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 6"]} /> 
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 0 }}>
                        <Box className="breadcrumb">
                          <Select size="small" defaultValue="V" style = {{ width: '100%' }}> 
                              <MenuItem value="V">Validé</MenuItem>
                              <MenuItem value="AI">Accès impossible</MenuItem>
                              <MenuItem value="C">Clôturé</MenuItem>
                          </Select>
                        </Box>
                  </Grid>
              </Grid>

              <TextField type="text" name="FabricationDate"  label="Date de fabrication"  id="standard-basic" value={FabricationDate || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 20"]} />
              <TextField type="text" name="ExpirationDate"  label="Date d'expiration"  id="standard-basic" value={ExpirationDate || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 20"]} />
              <TextField name="Details" label="Détails" onChange={handleChange} value={Details || ""} errorMessages={[]}  validators={["minStringLength: 0", "maxStringLength: 6"]} rows={4} multiline maxRows={4} />
          
          </Grid>

        </Grid>
        
      </ValidatorForm>

        <Toast ref={toast} position="top-left"  />
        <div className="card buttoncard flex flex-wrap justify-content-center gap-6">
            <Button onClick={Save} label="Créer" icon="pi pi-check" />
        </div>
    </div>
  );
};

export default BatchForm;
