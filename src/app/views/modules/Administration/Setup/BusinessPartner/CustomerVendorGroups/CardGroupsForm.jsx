import {  Button, Grid, styled, Box } from "@mui/material";
 import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
  
const TextField = styled(TextValidator)(() => ({ width: "100%",  marginBottom: "16px",}));
 const prixLists = [{ Code: '1' , Name: 'Liste de prix 01' }, { Code: '2' , Name: 'Liste de prix 02' }, { Code: '3' , Name: 'Liste de prix 03' }, { Code: '4' , Name: 'Liste de prix 04' }]
const Form = ({ Mode, CardGroup, CodeReadOnly, handleChange, handleSubmit }) => {
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="GroupCode" label="Code de groupe" id="standard-basic" value={CardGroup.GroupCode} onChange={handleChange} InputLabelProps={{ shrink: true, }} required disabled={CodeReadOnly}/>
            <TextField type="text" name="GroupName" label="Nom de groupe" value={CardGroup.GroupName} onChange={handleChange} InputLabelProps={{ shrink: true, }} required/>            
            <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
              <FormControl fullWidth>
                <InputLabel id="lblType" InputLabelProps={{ shrink: true, }}>Type</InputLabel>
                <Select label="Type" labelId="lblType"  name="GroupType" value={CardGroup.GroupType} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }} required>
                  <MenuItem  key='C' value="C">Client</MenuItem>
                  <MenuItem  key='S' value="S">Fournisseur</MenuItem>
                  <MenuItem  key='L' value="L">Prospect</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }} className="breadcrumb"> 
              <FormControl fullWidth>
                <InputLabel id="lblPriceList" shrink> Liste de prix</InputLabel>
                <Select label="Liste de prix" labelId="lblPriceList"  name="PriceList" value={CardGroup.PriceList} onChange={handleChange} style = {{ width: '100%' }}>
                  {prixLists.map((e, key) => {
                          return <MenuItem key={key} value={e.Code}>{e.Name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box> 
            <TextField type="text" name="Discount" label="Remise" value={CardGroup.Discount} InputLabelProps={{ shrink: true, }} onChange={handleChange}/>
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
