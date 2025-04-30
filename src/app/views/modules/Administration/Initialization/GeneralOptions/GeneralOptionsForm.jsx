import * as React from 'react';
import { Select,  MenuItem, Tabs, Tab, Box, Grid, styled, Button, Icon, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {  TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Checkbox from '@mui/material/Checkbox';
import { Span } from "app/components/Typography";
import { InputNumber } from 'primereact/inputnumber';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Title = styled('span')(() => ({
  fontSize: '0.8rem',
  fontWeight: '450',
  textTransform: 'capitalize',
}));

const DiscountGroupsForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
   const [state, setState] = useState({ checkedPC: false, checkedLE: false, checkedAE: true, checkedADC: true, date: new Date() });

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

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

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  }; 
 
  
    const {  Word, Excel, Images, PJ } = state;


  return ( 
  <div>
    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs   value={tabIndex} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary" aria-label="secondary tabs example" >
              <Tab label="Partenaires" /> 
              <Tab label="Services" />
              <Tab label="Afficher" />
              <Tab label="Chemin" />
              <Tab label="Gestion des stocks" />
              <Tab label="Ressources" />
              <Tab label="Détermination du prix" />
              <Tab label="Fonctionnalités cachées" />
            </Tabs>
          </Box>
          <Box sx={{ padding: 2 }}>
            {tabIndex === 0 && (
              <FormGroup>                 
                    <Typography sx={{textDecoration: 'underline'}} display="inline"> Restrictions activités client </Typography>
                    <FormControlLabel control={ <Checkbox checked={state.checkedPC}  onChange={handleChange('checkedPC')} value="checkedPC" /> } label="Plafond de crédit" />
                    <FormControlLabel control={ <Checkbox checked={state.checkedLE}  onChange={handleChange('checkedLE')} value="checkedLE" /> } label="Limite d'engagement" />
                    <FormControlLabel control={ <Checkbox checked={state.checkedAE}  onChange={handleChange('checkedAE')} value="checkedAE" /> } label="Afficher partenaires inactifs dans les états" />
                    <FormControlLabel control={ <Checkbox checked={state.checkedADC} onChange={handleChange('checkedADC')} value="checkedADC" /> } label="Afficher partenaires inactifs dans documents commerciaux" />
              </FormGroup>
            )}
            {tabIndex === 1 && (
              <FormGroup>  
                    <Grid item lg={12} md={12} sm={6} xs={6} sx={{ mt: 2 }}>
                      <label htmlFor="MessagesUpdate">Fréquence de contrôle des messages (minutes)</label>
                        <span className="p-float-label">
                            <InputNumber  id="MessagesUpdate" />
                        </span>                     
                    </Grid>
                    <Grid item lg={12} md={12} sm={6} xs={6} sx={{ mt: 2 }}>
                        <label htmlFor="DelaiBlocage">Délai avant blocage écran (minutes)</label>
                        <span className="p-float-label">
                            <InputNumber  id="DelaiBlocage" />
                        </span>
                    </Grid>
              </FormGroup>
            )}
            {tabIndex === 2 && (
                <FormGroup>
                    <Typography sx={{textDecoration: 'underline'}} display="inline"> Langue </Typography>
                    <FormControlLabel control={ <Select size="small" defaultValue="C" style = {{ width: '20%' }}><MenuItem value="C">French</MenuItem><MenuItem value="L">Arabic</MenuItem><MenuItem value="U">English</MenuItem></Select>}  />
               </FormGroup>
            )}
            {tabIndex === 3 && (
                <Box sx={{'& .MuiTextField-root': { m: 1, width: '95ch' }, }}>
                    <Box className="breadcrumb"> Exporter fichiers Word et Excel sous </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item lg={10} md={10} sm={10} xs={10} sx={{ mt: 0 }}>
                          <TextField type="text" name="MWord" label="Dossier modèles Microsoft Word" onChange={handleChange} value={Word || ""} errorMessages={["Numéro de Telephone invalide"]}  validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}/>          
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={2} sx={{ mt: 0 }}>
                        <Button color="primary" variant="contained" > <Icon fontSize="large">more_horiz</Icon> </Button>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item lg={10} md={10} sm={10} xs={10} sx={{ mt: 0 }}>
                        <TextField type="text" name="Excel" label="Dossier Microsoft Excel" onChange={handleChange} value={Excel || ""} errorMessages={["Numéro de Telephone invalide"]}  validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}/>          
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={2} sx={{ mt: 0 }}>
                        <Button color="primary" variant="contained" > <Icon fontSize="large">more_horiz</Icon> </Button>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item lg={10} md={10} sm={10} xs={10} sx={{ mt: 0 }}>
                        <TextField type="text" name="Excel" label="Dossier d'images" onChange={handleChange} value={Images || ""} errorMessages={["Numéro de Telephone invalide"]}  validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}/>          
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={2} sx={{ mt: 0 }}>
                        <Button color="primary" variant="contained" > <Icon fontSize="large">more_horiz</Icon> </Button>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item lg={8} md={8} sm={8} xs={8} sx={{ mt: 0 }}>
                        <TextField type="text" name="Excel" label="Dossier pour pièces jointes" onChange={handleChange} value={PJ || ""} errorMessages={["Numéro de Telephone invalide"]}  validators={['minNumber:0', 'maxNumber:255', 'matchRegexp:^[0-9]$']}/>          
                      </Grid>
                      <Grid item lg={1} md={1} sm={1} xs={1} sx={{ mt: 0 }}>
                        <Button color="primary" variant="contained" > <Icon fontSize="large">more_horiz</Icon> </Button>
                      </Grid>
                      <Grid item lg={3} md={3} sm={3} xs={3} sx={{ mt: 0 }}>
                        <Button color="primary" variant="contained" > Actualiser chemins dans documents </Button>
                      </Grid>
                    </Grid>

                </Box>
            )}
            {tabIndex === 4 && (
            <FormGroup> 
              <Grid container spacing={3}>

                  <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
                          <Box className="breadcrumb">                      
                              <Title>Magasin standard : </Title>
                              <Select size="small" defaultValue="MG" > 
                                  <MenuItem value="MG">Magasin général</MenuItem> 
                                  <MenuItem value="M1">Magasin 01</MenuItem> 
                                  <MenuItem value="M2">Magasin 02</MenuItem> 
                                  <MenuItem value="M3">Magasin 03</MenuItem> 
                              </Select>                  
                            </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
                            <Box className="breadcrumb">
                              <Typography sx={{textDecoration: 'underline'}} > Afficher postes inactifs dans </Typography>
                              <FormControlLabel control={ <Checkbox checked={state.checkedPC}  onChange={handleChange('checkedPC')} value="checkedPC" /> } label="Etats" />
                              <FormControlLabel control={ <Checkbox checked={state.checkedLE}  onChange={handleChange('checkedLE')} value="checkedLE" /> } label="Documents commerciaux" />
                            </Box>
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
                            <Box className="breadcrumb">
                              <Title>Statut par défaut des lots créés : </Title>
                              <Select size="small" defaultValue="M" > 
                                  <MenuItem value="M">Magasin</MenuItem> 
                                  <MenuItem value="GA">Groupe d'articles</MenuItem> 
                                  <MenuItem value="NA">Niveau article</MenuItem> 
                              </Select>  
                            </Box>
                    </Grid>
              </Grid> 
            </FormGroup>
            )}
            {tabIndex === 5 && (
               <FormGroup> 
               <Grid container spacing={3}>

                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
                         <Box className="breadcrumb">                      
                           <Title>Magasin standard : </Title>
                           <Select size="small" defaultValue="MG" > 
                               <MenuItem value="MG">Magasin général</MenuItem> 
                               <MenuItem value="M1">Magasin 01</MenuItem> 
                               <MenuItem value="M2">Magasin 02</MenuItem> 
                               <MenuItem value="M3">Magasin 03</MenuItem> 
                           </Select>                  
                           </Box>
                     </Grid>
                     <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 0 }}>
                           <Box className="breadcrumb">
                                    <FormControlLabel control={ <Checkbox checked={state.checkedPC}  onChange={handleChange('checkedPC')} value="checkedPC" /> } label="Ajout auto. tous magasins aux nouvelles ressources" />
                            </Box>
                     </Grid>
             </Grid> 
             </FormGroup>
            )}
            {tabIndex === 6 && (
              <FormGroup>
                    <Typography sx={{textDecoration: 'underline'}} > Afficher prix nul dans documents si la source du prix est basée sur des listes de prix inactives </Typography>
                    <FormControlLabel control={ <Checkbox checked={state.checkedRB}  onChange={handleChange('checkedRB')} value="checkedRB" /> } label="Remises basées sur quantité et période" />
                    <FormControlLabel control={ <Checkbox checked={state.checkedPS}  onChange={handleChange('checkedPS')} value="checkedPS" /> } label="Prix spéciaux articles pour partenaires" />                              
                    <FormControlLabel control={ <Checkbox checked={state.checkedLP}  onChange={handleChange('checkedLP')} value="checkedLP" /> } label="Listes de prix" />                              
                  
                    <Typography sx={{textDecoration: 'underline'}} > Afficher listes des prix inactifs dans </Typography>
                    <FormControlLabel control={ <Checkbox checked={state.checkedE}  onChange={handleChange('checkedE')} value="checkedE" /> } label="Etats" />
                    <FormControlLabel control={ <Checkbox checked={state.checkedDV}  onChange={handleChange('checkedDV')} value="checkedDV" /> } label="Documents de vente, d'achat et d'inventaire" />                              
                    <FormControlLabel control={ <Checkbox checked={state.checkedOP}  onChange={handleChange('checkedOP')} value="checkedOP" /> } label="Options" />
            </FormGroup>
            )}
            {tabIndex === 7 && (
              <FormGroup>  
                      <Typography sx={{textDecoration: 'underline'}} > Si votre entreprise n'utilise pas certaines des fonctions ci-dessous, vous pouvez les cacher en sélectionnant les options correspondantes : </Typography>
                      <FormControlLabel control={ <Checkbox checked={state.checkedBU}  onChange={handleChange('checkedBU')} value="checkedBU" /> } label="Budget" />
                      <FormControlLabel control={ <Checkbox checked={state.checkedAP}  onChange={handleChange('checkedAP')} value="checkedAP" /> } label="Assistant de paiement" />                              
                      <FormControlLabel control={ <Checkbox checked={state.checkedAR}  onChange={handleChange('checkedAR')} value="checkedAR" /> } label="Assistant de relance client" />                              
                      <FormControlLabel control={ <Checkbox checked={state.checkedAN}  onChange={handleChange('checkedAN')} value="checkedAN" /> } label="Analytique" />                              
                      <FormControlLabel control={ <Checkbox checked={state.checkedNSL}  onChange={handleChange('checkedNSL')} value="checkedNSL" /> } label="Numéros de série et lots" />                              
                      <FormControlLabel control={ <Checkbox checked={state.checkedP}  onChange={handleChange('checkedP')} value="checkedP" /> } label="Production" />                              
                      <FormControlLabel control={ <Checkbox checked={state.checkedUQ}  onChange={handleChange('checkedUQ')} value="checkedUQ" /> } label="Unités de quantité" />
            </FormGroup>
            )}
          </Box>
      </Grid>

      <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1 }}>Mettre à jour</Span>
      </Button>

    </ValidatorForm>
  </div>
   );
};

export default DiscountGroupsForm;
