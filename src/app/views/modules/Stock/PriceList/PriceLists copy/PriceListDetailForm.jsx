import {  InputLabel, Button,  Box, Grid, Select, MenuItem} from "@mui/material";
import { Span } from "app/components/Typography";
import { DataGrid} from "@mui/x-data-grid";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function SortedDescendingIcon() {
      return <ExpandMoreIcon className="icon" />;
    }

    export function SortedAscendingIcon() {
      return <ExpandLessIcon className="icon" />;
    }
 
const PriceListDetailForm = () => {

  const columns = [

      { field: 'id', headerName: '#', width: 150 },
      { field: 'ItemCode', headerName: "Numéro d'article", width: 150 },
      { field: 'ItemName', headerName: 'Description article', width: 800 },
      { field: 'Price', headerName: 'Prix', width: 150, editable: true },
      { field: 'UM', headerName: 'UM stock', width: 150 }

    ];

    const ItemsLists = [
      {id: 1, ItemCode: "PV0008", ItemName: "TOMATE DOUBLE CONCENTRE 60G.", Price: "10", UM: "UNITE"},
      {id: 2,ItemCode: "SF0001", ItemName: "Vermicelles Fin Vrac", Price: "16,60", UM: "KG"},
      {id: 3,ItemCode: "SF0018", ItemName: "Spaghetti Vrac", Price: "10", UM: "UNITE"},
      {id: 4,ItemCode: "EM0117", ItemName: "EM Vermicelles Moyen AL JAWHARA C 500G", Price: "35", UM: "UNITE"},
      {id: 5,ItemCode: "PF0116", ItemName: "The vert en Filament 4011, boite 200 g", Price: "80", UM: "KG"},
      {id: 6,ItemCode: "PF0075", ItemName: "Penne  Regaté  AL JAWHARA C 1/2 KG", Price: "18", UM: "KG"},
      {id: 7,ItemCode: "PF0076", ItemName: "FARINE FINO 5KG", Price: "16,30", UM: "KG"},
      {id: 8,ItemCode: "PF0118", ItemName: "The Gunpowder extra, boite 200 g", Price: "80", UM: "UNITE"},
      {id: 9,ItemCode: "PV0007", ItemName: "PATE A TARTINER DUO 700G", Price: "16,50", UM: "UNITE"},
      {id: 10,ItemCode: "PV0009", ItemName: "Couscous Fin AL JAWHARA L 25 KG", Price: "24", UM: "KG"},
      {id: 11,ItemCode: "PV0010", ItemName: "TOMATE DOUBLE CONCENTRE 800G", Price: "19,17", UM: "KG"},
      {id: 12,ItemCode: "PV0011", ItemName: "Coquillette Moyen Vrac", Price: "20", UM: "UNITE"},
      {id: 13,ItemCode: "PV0012", ItemName: "Couscous Fin Vrac", Price: "24,20", UM: "KG"},
      {id: 14,ItemCode: "PV0013", ItemName: "SEMOULE GROS 10KG", Price: "25", UM: "UNITE"},
      {id: 15,ItemCode: "PF0132", ItemName: "FARINE DE MAIS EL HILAL 10 KG", Price: "4,2", UM: "UNITE"},
      {id: 16,ItemCode: "PF0133", ItemName: "Petit Plomb Moyen AL JAWHARA CD 1/2KG", Price: "10", UM: "KG"},
      {id: 17,ItemCode: "PF0134", ItemName: "FARINE LUXE AL JAWHARA 10 KG", Price: "25", UM: "KG"},];
  
  return (
      <Grid container spacing={3}>      
          <Grid item lg={3} md={3} sm={6} xs={6} sx={{ mt: 0 }}>
            <Box className="breadcrumb">                      
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">    Type de prix  </InputLabel>
                  <Select size="small" defaultValue="TTC" style = {{ width: '100%' }}> 
                      <MenuItem value="TTC">Prix TTC</MenuItem> 
                      <MenuItem value="HT">Prix HT</MenuItem>
                  </Select>                     
              </Box>
          </Grid> 

          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
            <DataGrid rows={ItemsLists} columns={columns} initialState={{ pagination: { paginationModel: { pageSize: 10, }, }, }} pageSizeOptions={[5]} disableRowSelectionOnClick />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0 }}>
            <Button sx={{ m: 2 }} color="primary" variant="contained" type="submit"> <Span sx={{ pl: 1 }}>Mettre à jour</Span> </Button>
            <Button sx={{ m: 2 }} color="primary" variant="contained"> <Span sx={{ pl: 1 }}>Interrompree</Span> </Button>
          </Grid>          
      </Grid>

   );
};

export default PriceListDetailForm;
