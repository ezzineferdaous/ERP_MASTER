import { Button, Grid, styled } from '@mui/material';
import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
  
const TextField = styled(TextValidator)(() => ({ width: '100%', marginBottom: '16px' }));
const UMForm = ({ Mode, CodeReadOnly, UM, handleChange, handleSubmit }) => {
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} >
        <Grid container spacing={6} >

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="CodeUM"  label="Code unité de mesure"  id = "standard-basic" value = {UM.CodeUM || ''} onChange={handleChange} errorMessages={[]} validators={["maxStringLength: 20"]} disabled={CodeReadOnly} />
            <TextField type="text" name="NomUM" label="Nom unité de mesure" onChange = {handleChange} value = {UM.NomUM || ''} errorMessages={["this field is required"]}  validators={["maxStringLength: 100"]}/>            
          </Grid>

        </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Span sx={{ pl: 1 }} >{Mode}</Span>
          </Button>
      </ValidatorForm>
    </div>
  );
};

export default UMForm;
