import { Button, Grid, Box, Select, MenuItem, styled } from '@mui/material';
import { Span } from 'app/components/Typography';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const TextField = styled(TextValidator)(() => ({ width: '100%', marginBottom: '16px' }));
const SousFamilleForm = ({ FamilleData, Mode, CodeReadOnly, SousFamille, handleChange, handleSubmit }) => {
  return (
    <div> 
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}> 
            <TextField type="text" name="CodeSFamille"  label="Code Sous Famille"  id="standard-basic" value={SousFamille.CodeSFamille || ''} onChange={handleChange} errorMessages={[]} validators={["maxStringLength: 100"]} disabled={CodeReadOnly} />
            <TextField type="text" name="NomSFamille" label="Nom Sous Famille" onChange={handleChange} value={SousFamille.NomSFamille || ''} errorMessages={["this field is required"]}  validators={["maxStringLength: 100"]}/>            
              <Box className="breadcrumb">
              <FormControl fullWidth>
                  <InputLabel id="lblFamille">Famille</InputLabel>
                  <Select label="CodeFamille" labelId="lblCodeFamille" name="CodeFamille" value={SousFamille.CodeFamille || ''} onChange={handleChange} style = {{ width: '100%' }} required>
                        {FamilleData.map((e, key) => {
                            return <MenuItem key={key} value={e.id}>{e.NomFamille}</MenuItem>;
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

export default SousFamilleForm;
