import {  Button, Grid, styled, Select, MenuItem, Box } from "@mui/material";
 import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));



const Form = ({ countryData, Mode, CodeReadOnly , City, handleChange, handleSubmit }) => {
  console.log(countryData);
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextField type="text" name="Code" label="Code Ville" id="standard-basic" value={City.Code} onChange={handleChange} errorMessages={[]} required disabled={CodeReadOnly}/>
          <TextField type="text" name="Name" label="Nom Ville" value={City.Name} onChange={handleChange} errorMessages={["this field is required"]} required/>    
          <Box className="breadcrumb">   
            <FormControl fullWidth>
                <InputLabel id="lblCountry">Pays</InputLabel>  
                <Select label="Pays" labelId="lblCountry"   name="CntCode" value={City.CntCode || ''} onChange={handleChange} style = {{ width: '100%' }} required>
                      {countryData.map((e, key) => {
                          return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                      })}
                </Select>
            </FormControl>
          </Box>         
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1 }}>{Mode}</Span>
        </Button>

      </ValidatorForm>
    </div>
  );
};

export default Form;
