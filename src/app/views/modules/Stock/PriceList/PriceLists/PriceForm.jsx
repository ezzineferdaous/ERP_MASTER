import {  Button,  FormControl, FormControlLabel,  Grid,   Radio,  RadioGroup,  styled, Select, MenuItem } from "@mui/material";
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Box } from "@mui/system";
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FileUpload from './FileUpload.jsx'
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import  TextareaAutosize from '@mui/base/TextareaAutosize';

const blue = {  100: '#DAECFF',  200: '#b6daff',  400: '#3399FF',  500: '#007FFF',  600: '#0072E5',  900: '#003A75'};
const grey = {  50: '#F3F6F9',  100: '#E5EAF2',  200: '#DAE2ED',  300: '#C7D0DD',  400: '#B0B8C4',  500: '#9DA8B7',  600: '#6B7A90',  700: '#434D5B',  800: '#303740',  900: '#1C2025'};

const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;  width: 320px;  font-family: 'IBM Plex Sans', sans-serif;  font-size: 0.875rem;  font-weight: 400;  line-height: 1.5;  padding: 8px 12px;  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  &:hover { border-color: ${blue[400]}; }
  &:focus { border-color: ${blue[400]}; box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};  }
  // firefox
  &:focus-visible { outline: 0;  }`,);

const TextField = styled(TextValidator)(() => ({  width: "100%",  marginBottom: "16px",}));
const Title = styled('span')(() => ({  fontSize: '0.8rem',  fontWeight: '450',  textTransform: 'capitalize',}));
const IemsForm = ({ Mode, CheckedVendu, CheckedAchete, CheckedStock, CodeReadOnly, Taxes, ItemGroupes, Familles, SFamilles, UMs, Item, setItem, setState, state, handleChange, handleSubmit, handelError, ImageURL, setImageURL  }) => {
const [tabIndex, setTabIndex] = useState(0);
const handleTabChange = (event, newTabIndex) => {setTabIndex(newTabIndex);};

  return(
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

        <Grid container spacing={12}>
          <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField type="text" name="ItemCode" label="N° article"  size="small" id="standard-basic" value={Item.ItemCode || ""} onChange={handleChange} validators={["minStringLength: 0", "maxStringLength: 100"]} disabled={CodeReadOnly} />
            <Box sx={{ minWidth: 100 }} className="breadcrumb">
              <FormControl size="small" fullWidth>
                <InputLabel id="lblItemGroupes" InputLabelProps={{ shrink: true }}>Groupe Article</InputLabel>
                <Select labelId="lblItemGroupes" label="Groupe Article" size="small" name="ItemGroupe" value={Item.ItemGroupe} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                      {ItemGroupes.map((e, key) => { return <MenuItem key={key} value={e.id}>{e.NomGroupe}</MenuItem>; })}
                </Select>
              </FormControl>
            </Box> 
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField type="text" size="small" name="ItemName"  label="Description"  id="standard-basic" value={Item.ItemName || ""} onChange={handleChange}  validators={["minStringLength: 0", "maxStringLength: 220"]} />
            <Box sx={{ minWidth: 100 }} className="breadcrumb"> 
              <FormControl size="small" fullWidth>
                <InputLabel id="lblFamille" InputLabelProps={{ shrink: true, }}>Famille</InputLabel>
                <Select label="Famille" labelId="lblFamille"  size="small" name="Famille" value={Item.Famille || ""} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                      {Familles.map((e, key) => { return <MenuItem key={key} value={e.id}>{e.CodeFamille}</MenuItem>; })}
                </Select>
              </FormControl>
            </Box>          
           </Grid>
           <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
           <TextField type="text" size="small" name="NomEtrange"  label="Nom étranger"  id="standard-basic" value={Item.NomEtrange || ""} onChange={handleChange} validators={["minStringLength: 0", "maxStringLength: 220"]} />
            <Box sx={{ minWidth: 100 }} className="breadcrumb"> 
              <FormControl size="small" fullWidth>
                <InputLabel id="lblSFamille" InputLabelProps={{ shrink: true, }}>Sous Famille</InputLabel>
                <Select label="Sous Famille" labelId="lblSFamille"  size="small" name="Sfamille" value={Item.Sfamille} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                      {SFamilles.map((e, key) => { return <MenuItem key={key} value={e.id}>{e.CodeSFamille} </MenuItem>; })}
                </Select>
              </FormControl>
            </Box>                       
           </Grid>
           <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
              <FormGroup row  sx={{ mb: 1 }} >
                <FormControlLabel control={<Checkbox name="Vendu"   checked = {CheckedVendu}   onChange = {handleChange} /> } label="Article vendu" />
                <FormControlLabel control={<Checkbox name="Achete"  checked = {CheckedAchete}  onChange = {handleChange} />} label="Article acheté" />
                <FormControlLabel control={<Checkbox name="Stock"   checked = {CheckedStock}   onChange = {handleChange} />} label="Article géré en stock" />
              </FormGroup>
            </Grid>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs   value={tabIndex} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example" >
              <Tab label="Généralités" /> 
              <Tab label="Achats" />
              <Tab label="Données ventes" />
              <Tab label="Stock" />
            </Tabs>
          </Box>
          <Box sx={{ padding: 2 }}>
            {tabIndex === 0 && (
              <Grid container spacing={12}>
               <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} >
                  <Box sx={{ minWidth: 100 }} className="breadcrumb">
                    <FormControl size="small" fullWidth>
                      <InputLabel id="lblArticleGerePar" InputLabelProps={{ shrink: true, }}>Article géré par</InputLabel>
                      <Select label="Article géré par" labelId="lblArticleGerePar"  size="small" name="ArticleGerePar" value={Item.ArticleGerePar} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                        <MenuItem key='0' value='0'>Aucun(e)</MenuItem>
                        <MenuItem key='1' value='1'>Numéros de série</MenuItem>
                        <MenuItem key='2' value='2'>Lot</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Textarea type="text" name="Remarque" label="Remarques" placeholder="Remarques" size="small" id="standard-basic" value={Item.Remarque || ""} onChange={handleChange}  validators={["minStringLength: 0", "maxStringLength: 100"]} />
               </Grid>
               <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} >
                <FileUpload  Item={Item} setItem={setItem} state={state} handelError={handelError} ImageURL={ImageURL} setImageURL={setImageURL} setState={setState} />  
               </Grid>
              </Grid>
            )}
            {tabIndex === 1 && (
              <Grid container spacing={12}>
                  <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} >           
                    <Box sx={{ minWidth: 100 }} className="breadcrumb"> 
                      <FormControl size="small" fullWidth>
                        <InputLabel id="lblCodeUMA" InputLabelProps={{ shrink: true, }}>Nom unité de mesure achat</InputLabel>
                        <Select label="Nom unité de mesure achat" labelId="lblCodeUMA"  size="small" name="CodeUMA" value={Item.CodeUMA || ""} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                              {UMs.map((e, key) => { return <MenuItem key={key} value={e.id}>{e.NomUM}</MenuItem>; })}
                        </Select>
                      </FormControl>
                    </Box> 
                    <Box sx={{ minWidth: 100 }} className="breadcrumb"> 
                    <FormControl size="small" fullWidth>
                      <InputLabel id="lblGroupeTax" InputLabelProps={{ shrink: true, }}>Groupe de taxe</InputLabel>
                      <Select label="Groupe de taxe" labelId="lblGroupeTax"  size="small" name="GroupeTax" value={Item.GroupeTax || ""} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                        {Taxes.map((e, key) => { return <MenuItem key={key} value={e.id}>{e.Code} - {e.Name}</MenuItem>; })}
                      </Select>
                    </FormControl>
                  </Box>
                  </Grid>
                  <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} ></Grid>
             </Grid>
            )}
            {tabIndex === 2 && (
            <Grid container spacing={12}>
                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} >           
                  <Box sx={{ minWidth: 100 }} className="breadcrumb"> 
                    <FormControl size="small" fullWidth>
                      <InputLabel id="lblCodeUMV" InputLabelProps={{ shrink: true, }}>Nom unité de mesure vente</InputLabel>
                      <Select label="Nom unité de mesure de vente" labelId="lblCodeUMV"  size="small" name="CodeUMV" value={Item.CodeUMV ||  ""} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                            {UMs.map((e, key) => { return <MenuItem key={key} value={e.id}>{e.NomUM}</MenuItem>; })}
                      </Select>
                    </FormControl>
                  </Box> 
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} ></Grid>
           </Grid>
            )}
            {tabIndex === 3 && (
               <Grid container spacing={12}>
               <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} >           
                 <Box sx={{ minWidth: 100 }} className="breadcrumb"> 
                   <FormControl size="small" fullWidth>
                     <InputLabel id="lblCodeUMS" InputLabelProps={{ shrink: true, }}>Nom unité de mesure stock</InputLabel>
                     <Select label="Nom unité de mesure de stock" labelId="lblCodeUMS"  size="small" name="CodeUMS" value={Item.CodeUMS || ""} onChange={handleChange}  InputLabelProps={{ shrink: true, }} style = {{ width: '100%' }}>
                           {UMs.map((e, key) => { return <MenuItem key={key} value={e.id}>{e.NomUM}</MenuItem>; })}
                     </Select>
                   </FormControl>
                 </Box> 
               </Grid>
               <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }} ></Grid>
          </Grid>
            )}
          </Box>
      </Grid>
      <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
        <RadioGroup row name="Active" sx={{ mb: 1 }} value={Item.Active || null} onChange={handleChange} >
          <FormControlLabel value="Y" label="Active" labelPlacement="end" control={<Radio color="secondary" />} />
          <FormControlLabel value="N" label="Inactive" labelPlacement="end" control={<Radio color="secondary" />} />
        </RadioGroup>
      </Grid>

        <Button color="primary" variant="contained" type="submit">
            <Span sx={{ pl: 1 }} >{Mode}</Span>
        </Button>

      </ValidatorForm>
    </div>
  );
};

export default IemsForm;
