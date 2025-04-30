import { Button, Grid, styled } from '@mui/material';
import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const TextField = styled(TextValidator)(() => ({ width: '100%', marginBottom: '16px' }));
const ItemGroupForm = ({ Mode, ItemGroupe, CodeReadOnly, handleChange, handleSubmit }) => {
  return (
    <div> 
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="CodeGroupe" label="Code Groupe" onChange={handleChange} value={ItemGroupe.CodeGroupe} validators={['required']} errorMessages={['this field is required']} disabled={CodeReadOnly}/>
            <TextField type="text" name="CmptCharges" id="standard-basic" value={ItemGroupe.CmptCharges || ''} onChange={handleChange} errorMessages={[]} label="Compte de charges" validators={[]}/>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="NomGroupe" id="standard-basic" value={ItemGroupe.NomGroupe || ''} onChange={handleChange} errorMessages={['this field is required']} label="Nom Groupe" validators={['required', 'minStringLength: 0', 'maxStringLength: 100']} />
            <TextField type="text" name="CmptProduit" id="standard-basic" value={ItemGroupe.CmptProduit || ''} onChange={handleChange} errorMessages={[]} label="Compte de produit" validators={[]}/>
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1 }}>{Mode}</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ItemGroupForm;
