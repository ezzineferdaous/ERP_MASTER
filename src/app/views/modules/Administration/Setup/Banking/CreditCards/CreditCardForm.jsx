import {
  Button, Grid,  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const CreditCardForm = () => {

  const [state, setState] = useState({ date: new Date() });

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


  const {
    CCName,
    Account,
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField type="text" name="CCName"  label="Nom carte crédit"  id="standard-basic" value={CCName || ""} onChange={handleChange} errorMessages={[]} validators={["minStringLength: 0", "maxStringLength: 6"]} />
            <TextField type="text" name="Account" label="Compte général" onChange={handleChange} value={Account || ""} errorMessages={["this field is required"]}  validators={["minStringLength: 0", "maxStringLength: 20"]}/>            
            
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Créer</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default CreditCardForm;
