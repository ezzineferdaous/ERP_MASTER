import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable,  useMaterialReactTable,} from 'material-react-table';
 import { Box,  Icon, Button, IconButton, Snackbar, Alert} from '@mui/material';
import { styled } from "@mui/system";
import { Menubar } from 'primereact/menubar';
import  XLSXDownload  from '../../../Export/ExportExcel';
import  PDFDownload  from '../../../Export/ExportPDF';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import axios from 'axios';
import FormEditDeleteDialog from './FormEditDeleteDialog';
import PriceListCreateForm from './PriceListCreateForm';
import React from 'react';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
})); 

const AppForm  = ({}) => {
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
   const [state, setState] = useState({ message: "Error", open: false, vertical: 'top', horizontal: 'center', severity: "error" });
  const { vertical, horizontal, open, message, severity } = state;
  const exportColumns = ["Name", "Status", "TTC"];

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  const handleClose = () => { 
    setState({ ...state, open: false });  
  }; 
  
    useEffect(() => {
      const Getdata = async () => {
        try {

          const  resPList  = await axiosInstance.get("PriceList/");
          setData(resPList.data.map(function(x){ return x }));
           
        } catch (error) {

          if (error.response && error.response.data) {
            console.error(error.response.data);
          } else {
            console.error(error);
          }
        }};

      Getdata();

    },[]); 
 
  const columns = useMemo(
    () => [ 
      {accessorKey: 'Name' ,header: 'Nom Liste de Prix',size: 900,}, {accessorKey: 'Status',header: 'Statut',size: 150,} , {accessorKey: 'TTC',header: 'TTC',size: 150,},
      {
        accessorFn: (row) => `${row.Name}`, //accessorFn used to join multiple data into a single cell
        id: 'Afficher', //id is still required when using accessorFn instead of accessorKey
        header: 'Afficher',
        size: 250,Cell: ({ renderedCellValue, row }) => (          
          <div>
          <IconButton className="button" aria-label="Modifier" color="primary" onClick={() => table.setEditingRow(row)}><Icon style={{ fontSize: '1.2rem' }} >edit</Icon></IconButton>
          </div>),
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
        <Button variant="contained" onClick={() => { table.setCreatingRow(true); }} > Nouvelle Liste de Prix </Button>
        <Box sx={{ display: 'flex', gap: '10px', padding: '8px', flexWrap: 'wrap', }} >
          <XLSXDownload tableHeaders = {exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data = {table.getPrePaginationRowModel().rows} Text = {'Excel'} />
          <PDFDownload fileName = "Liste de Prix " tableHeaders = {exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data = {table.getPrePaginationRowModel().rows} Text = {'PDF'} />
        </Box>
        </>
      ),
      //optionally customize modal content
      renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
           <FormEditDeleteDialog   maxWidth="lg" setState={setState} table={table} data={row} setData={setData} />           
      ),
      renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
          <PriceListCreateForm  setState={setState} table={table} data={row} setData={setData} />
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
