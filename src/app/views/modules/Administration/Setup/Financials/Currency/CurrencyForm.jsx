import {  Button, Grid, styled, Select, MenuItem, Box } from "@mui/material";
 import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Form = ({ Mode, Currency, CodeReadOnly, handleChange, handleSubmit }) => {
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>

        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <TextField type="text" name="Code" label="Code Devise" id="standard-basic" value={Currency.Code} onChange={handleChange} errorMessages={[]} required disabled={CodeReadOnly} />
          <TextField type="text" name="Name" label="Nom Devise" value={Currency.Name} onChange={handleChange} errorMessages={["this field is required"]} required/>
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
