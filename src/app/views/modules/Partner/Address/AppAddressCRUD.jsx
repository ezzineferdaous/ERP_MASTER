import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable,  useMaterialReactTable,} from 'material-react-table';
 import { Box,  Icon, Button, IconButton, Snackbar, Alert} from '@mui/material';
import { styled } from "@mui/system";
import { Menubar } from 'primereact/menubar';
import  XLSXDownload  from '../../Export/ExportExcel';
import  PDFDownload  from '../../Export/ExportPDF';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import axios from 'axios';
import FormEditDeleteDialog from './FormEditDeleteDialog';
import AddressCreateForm from './AddressCreateForm';
import React from 'react';
 
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
})); 

const AppForm  = ({setCity, setshowListCities}) => {
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [Countries, setCountries] = useState([{}]);
  const [Cities, setCities] = useState([{}]);  
  const [Partners, setPartners] = useState([{}]);
   const [state, setState] = useState({ message: "Error", open: false, vertical: 'top', horizontal: 'center', severity: "error" });
  const { vertical, horizontal, open, message, severity } = state;
  const exportColumns = ["Code", "CardCode", "AddressType", "Street", "Block", "CountryCode", "CityCode", "ZIPCode"];

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  const handleClose = () => { 
    setState({ ...state, open: false });  
  }; 
  
 useEffect(() => {
      const Getdata = async () => {
        try {
          const  resAddress  = await axiosInstance.get("Address/");
          setData(resAddress.data);
          
            const resPartner = await axiosInstance.get("Partner/");
            setPartners(resPartner.data); 
            const resCountry = await axiosInstance.get("Country/");
            setCountries(resCountry.data); 
            const resCity = await axiosInstance.get("City/");
            setCities(resCity.data); 

        } catch (error) {
          if (error.response && error.response.data) {
            console.error(error.response.data);
          } else {
            console.error(error); // Log the entire error object for debugging
          }
        }
        
      }; 
      Getdata();
    },[]); 
  //should be memoized or stable
  //"Code", "CardCode", "AddressType", "Street", "Block", "CountryCode", "CityCode", "ZIPCode"]
  const columns = useMemo(
    () => [ 
      {accessorKey: 'Code' ,header: 'Code Address',size: 150,}, {accessorKey: 'CardCode',header: 'Code Partenaire',size: 150,} , {accessorKey: 'Street',header: 'Rue',size: 150,},
      {accessorKey: 'Block',header: 'Bâtiments',size: 150,}, {accessorKey: 'CountryCode',header: 'Pays/région',size: 150,} , {accessorKey: 'CityCode',header: 'Ville',size: 150,},{accessorKey: 'ZIPCode',header: 'Code postal',size: 150,},
      {
        accessorFn: (row) => `${row.Code}`, //accessorFn used to join multiple data into a single cell
        id: 'Afficher', //id is still required when using accessorFn instead of accessorKey
        header: 'Afficher',
        size: 250,Cell: ({ renderedCellValue, row }) => (          
          <IconButton className="button" aria-label="Modifier" color="primary" onClick={() => table.setEditingRow(row)}><Icon style={{ fontSize: '1.2rem' }} >edit</Icon></IconButton>
       ),
      }],[],
  ); 

    const start = "";
    const table = useMaterialReactTable({
      columns,
      data,
      rowCount,
      localization:{MRT_Localization_FR},
      renderTopToolbarCustomActions: ({ table }) => (
        <>
        <Button variant="contained" onClick={() => { table.setCreatingRow(true); }} > Nouvelle Adresse </Button>
        <Box sx={{ display: 'flex', gap: '10px', padding: '8px', flexWrap: 'wrap', }} >
          <XLSXDownload tableHeaders = {exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data = {table.getPrePaginationRowModel().rows} Text = {'Excel'} />
          <PDFDownload fileName = "List Adresses " tableHeaders = {exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data = {table.getPrePaginationRowModel().rows} Text = {'PDF'} />
        </Box>
        </>
      ),
      //optionally customize modal content
      renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
           <FormEditDeleteDialog Cities={Cities} Partners={Partners} Countries={Countries} setState={setState} table={table} data={row} setData={setData} />           
      ),
      renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
          <AddressCreateForm Cities={Cities} Partners={Partners} Countries={Countries} setState={setState} table={table} data={row} setData={setData} />
      ),
      initialState: { density: 'compact' },
      state: { isLoading, showProgressBars: isRefetching, }
    });

  return (
    <Container>  
      <Box sx={{ width: 500 }}>         
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin = { { vertical, horizontal } } key={vertical + horizontal} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
              {message}
            </Alert>
          </Snackbar>
        </Box>
        <div className="card"> <Menubar start={start}  style={{ border: '1px solid #dee2e600' }}/> </div>
        <div style={{ height: '100%', width: '100%' }}>
            <MaterialReactTable table={table} />
        </div>
      </Container>  
  );
};

export default AppForm ;
