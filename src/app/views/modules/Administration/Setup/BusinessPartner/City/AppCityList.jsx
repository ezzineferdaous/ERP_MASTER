import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable,  useMaterialReactTable,} from 'material-react-table';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Menubar } from 'primereact/menubar';
import  XLSXDownload  from '../../../../Export/ExportExcel';
import  PDFDownload  from '../../../../Export/ExportPDF';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';

import axios from 'axios';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const AppForm  = ({setCity, setshowListCities}) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const exportColumns = ["id", "Code", "Name", "Pays"];

  const Back = async (e) => {
    e.preventDefault();
    try {
      setshowListCities(false);
    } catch (error) {
      console.log(error);        
    }
  };

  const handleClick = (event, row) => {
    setCity(row.original);
    setshowListCities(false);
 };

  useEffect(() => { 

    const GetCity = async () => {
      setIsLoading(true);
        try {
          if (!data.length) { setIsLoading(true); } else { setIsRefetching(true); }
          const  res  = await axiosInstance.get("City/");
          setData(res.data);
          setRowCount(res.data.length);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setIsRefetching(false);
    };
    GetCity();    
    },[]);
  //should be memoized or stable 
  const columns = useMemo(
    () => [ {accessorKey: 'Code',header: 'Code Ville',size: 150,}, {accessorKey: 'Name',header: 'Nom Ville',size: 150,} , {accessorKey: 'CntCode',header: 'Code Pays',size: 150,},
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
      id: 'Afficher', //id is still required when using accessorFn instead of accessorKey
      header: 'Afficher',
      size: 250,Cell: ({ renderedCellValue, row }) => (
        <IconBox>
            <Tooltip title="Sélectionner"><IconButton onClick={(event) => { handleClick(event, row); }}  aria-label="Afficher" size="small"><ArrowForwardIcon sx={{ color: green[500] }} fontSize="small" /></IconButton></Tooltip>  
        </IconBox>
    ),
  }],[],
  );
  const start = <IconBox> 
    <IconButton onClick={Back} aria-label="Fermer" size="small"> <ArrowBackIcon fontSize="small" /> </IconButton>
  </IconBox>;

  const table = useMaterialReactTable({
    columns,
    data,
    rowCount,
    localization:{MRT_Localization_FR},
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap', }} >
        <XLSXDownload tableHeaders = {exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data = {table.getPrePaginationRowModel().rows} Text = {'Excel'} />
        <PDFDownload fileName = "List Villes" tableHeaders = {exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data = {table.getPrePaginationRowModel().rows} Text = {'PDF'} />
      </Box>
    ),
    initialState: { density: 'compact' },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    }
  });

  return (
    <Container>  
        <div className="card"> <Menubar start={start}  style={{ border: '1px solid #dee2e600' }}/> </div>
        <div style={{ height: '100%', width: '100%' }}>
            <MaterialReactTable table={table} />
        </div>
      </Container>  
  );
};

export default AppForm ;
