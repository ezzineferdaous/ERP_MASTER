import {  Button,  Select,  MenuItem,  Box, Grid,  styled, FormControlLabel, Radio,  RadioGroup, Table} from "@mui/material";
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
 
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const EmployeesForm = ({Mode, CodeReadOnly, Employee, setEmployee, setState, state, handleChange, handleSubmit, handelError}) => {

  /*useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);*/
   
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="Nom"  label="Nom"  id="standard-basic" value={Employee.Nom || ""} onChange={handleChange} />
            <TextField type="text" name="Prenom" label="Prénom" onChange={handleChange} value={Employee.Prenom || ""}/>            
            <TextField type="text" name="TelP" label="Téléphone professionnel" onChange={handleChange} value={Employee.TelP || ""}  />            
            <TextField type="text" name="email" label="Email" onChange={handleChange} value={Employee.email || ""} />            
            
            <Grid container spacing={3}>
               <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 0 }}>
                  <Box className="breadcrumb">                      
                        <Select size="small" defaultValue="-1" style = {{ width: '100%' }} name="Sexe" value={Employee.Sexe || "-1"} onChange={handleChange}> 
                            <MenuItem value="-1">Sexe</MenuItem> 
                            <MenuItem value="F">Féminin</MenuItem> 
                            <MenuItem value="M">Masculin</MenuItem> 
                            <MenuItem value="NS">Non spécifié</MenuItem> 
                        </Select>                     
                    </Box>
               </Grid>
               <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 0 }}>
                    <Box className="breadcrumb">
                        <Select size="small" defaultValue="-1" style = {{ width: '100%' }} name="PayeN" value={Employee.PayeN || "-1"} onChange={handleChange}> 
                            <MenuItem value="-1">Pays de naissance</MenuItem> 
                            <MenuItem value="MA">Maroc</MenuItem>
                        </Select>
                    </Box>
               </Grid>
               <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 0 }}>
                  <Box className="breadcrumb">
                            <Select size="small" defaultValue="-1" style = {{ width: '100%' }} name="Nationalite" value={Employee.Nationalite || "-1"} onChange={handleChange}> 
                                <MenuItem value="-1">Nationalité </MenuItem> 
                                <MenuItem value="MAROC">Marocain(e)</MenuItem> 
                            </Select>
                    </Box>
               </Grid>
               <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 0 }}>
                  <TextField type="date" name="DateN"  onChange={handleChange} value={Employee.DateN || ""} />
               </Grid>
            </Grid>

            <TextField type="text" name="Nenfants" label="Nombre d'enfants" onChange={handleChange} value={Employee.Nenfants || ""} />            
            <TextField type="text" name="SalaireBase" label="Salaire de base" onChange={handleChange} value={Employee.SalaireBase || ""} />
            <TextField name="Remarque" label="Remarque" onChange={handleChange} value={Employee.Remarque || ""} multiline rows={4} />
  
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField type="text" name="Code" label="Code Salariée"  id="standard-basic" value={Employee.Code || ""} onChange={handleChange} />
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 0 }}>                
                <Box className="breadcrumb">
                  <Select size="small" name="Post" defaultValue="-1" style = {{ width: '100%' }} value={Employee.Post || "-1"} onChange={handleChange}> 
                    <MenuItem value="-1">Poste</MenuItem>
                    <MenuItem value="1">Commercial</MenuItem>
                    <MenuItem value="2">Livreur</MenuItem>
                    <MenuItem value="3">Utilisateur</MenuItem>
                  </Select>  
                </Box>            
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 0 }}>
                <Box className="breadcrumb">
                  <Select size="small" name="Service" defaultValue="-1" style = {{ width: '100%' }} value={Employee.Service || "-1"} onChange={handleChange}> 
                    <MenuItem value="-1">Service</MenuItem>
                    <MenuItem value="1">Service général</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>
            <TextField type="text" name="TelPo" label="Téléphone portable" onChange={handleChange} value={Employee.TelPo || ""}/>            
            <TextField type="text" name="Adresse" label="Adresse" onChange={handleChange} value={Employee.Adresse || ""} />            
            <Box className="breadcrumb">
                    <Select size="small" defaultValue="-1" name="Statut" style = {{ width: '100%' }} value={Employee.Statut || "-1"} onChange={handleChange}> 
                        <MenuItem value="-1">Situation de famille</MenuItem>
                        <MenuItem value="P">Pers. seule</MenuItem>
                        <MenuItem value="M">Marié</MenuItem>
                        <MenuItem value="D">Divorcé</MenuItem>
                        <MenuItem value="V">Veuf</MenuItem>
                        <MenuItem value="N">Non spécifié</MenuItem>
                    </Select>
             </Box>
             <TextField type="text" name="ID_Rubrique" label="Nº Rubrique" onChange={handleChange} value={Employee.ID_Rubrique || ""} />
             <TextField type="text" name="ID_Contrat" label="Nº Contact" onChange={handleChange} value={Employee.ID_Contrat || ""} />
             <TextField type="password" name="MDP" label="Mot de Passe"  value={Employee.MDP || ""} onChange={handleChange}/>

          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
            <RadioGroup row name="Active" sx={{ mb: 1 }} value={Employee.Active || null} onChange={handleChange} >
              <FormControlLabel value="Y" label="Active" labelPlacement="end" control={<Radio color="secondary" />} />
              <FormControlLabel value="N" label="Inactive" labelPlacement="end" control={<Radio color="secondary" />} />
            </RadioGroup>
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1 }} >{Mode}</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default EmployeesForm;
