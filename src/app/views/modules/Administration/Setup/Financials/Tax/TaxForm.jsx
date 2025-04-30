import {  Button, Grid, styled } from "@mui/material";
 import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {   FormControlLabel,   Radio,  RadioGroup,  Select, MenuItem } from "@mui/material";
import './../../../../Style.css';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
 }));
 
const Form = ({ Mode, Tax, CodeReadOnly, handleChange, handleSubmit }) => {
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField type="text" name="Code" label="Code TVA" id="standard-basic" value={Tax.Code} onChange={handleChange} errorMessages={[]} required disabled={CodeReadOnly} />
              <TextField type="text" name="Name" label="Nom TVA" value={Tax.Name} onChange={handleChange} errorMessages={["this field is required"]} required/>
              <TextField type="number" name="Rate" label="Taux" value={Tax.Rate} onChange={handleChange} errorMessages={["this field is required"]} required/>
              <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
                <RadioGroup row name="Active" sx={{ mb: 2 }} value={Tax.Active || ""} onChange={handleChange} >
                  <FormControlLabel value="Y" label="Active" labelPlacement="end" control={<Radio color="secondary" />} selected/>
                  <FormControlLabel value="N" label="Inactive" labelPlacement="end" control={<Radio color="secondary" />} />
                </RadioGroup>
              </Grid>
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
