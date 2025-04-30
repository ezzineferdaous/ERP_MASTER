import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Menubar } from 'primereact/menubar';
import XLSXDownload from '../../Export/ExportExcel';
import PDFDownload from '../../Export/ExportPDF';
import axios from 'axios';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }, 
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const AppForm = ({ setItem, setshowItem }) => {
  
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const exportColumns = ['id', 'Code Magsin' ];

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Back = async (e) => {
    e.preventDefault();
    try {
      setshowItem(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event, row) => {
    setItem(row.original);
    setshowItem(false);
  };

  useEffect(() => {
    const GetItem = async () => {
      setIsLoading(true);
      try {
        if (!data.length) { setIsLoading(true); } else { setIsRefetching(true); }
        const res = await axiosInstance.get('Item/');
        setData(res.data);
        setRowCount(res.data.length);
      } catch (error) { setIsLoading(false); setIsRefetching(false); return; }
      setIsLoading(false);
      setIsRefetching(false);
    };
    GetItem();
  }, []);
  
  const columns = useMemo(
    () => [
      { accessorKey: 'ItemCode', header: 'Code Article', size: 100 },
      { accessorKey: 'ItemName', header: 'Nom Article', size: 400 },
      { accessorKey: 'ItemGroupe', header: 'Groupe Article', size: 100 },
      { accessorKey: 'Famille', header: 'Famille', size: 100 },
      { accessorKey: 'SFamille', header: 'Sous Famille', size: 100 },
      { accessorKey: 'Stock', header: 'Qte Stock', size: 100 },
       {
        id: 'Afficher',
        header: 'Afficher',
        size: 250,
        Cell: ({ row }) => (
          <IconBox>
            <Tooltip title="Sélectionner">
              <IconButton onClick={(event) => { handleClick(event, row); }} aria-label="Afficher" size="small" >
                <ArrowForwardIcon sx={{ color: green[500] }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </IconBox> 
        ),},],
    []
  );

  const start = (
    <IconBox>
      <IconButton onClick={Back} aria-label="Fermer" size="small"> <ArrowBackIcon fontSize="small" /> </IconButton>
    </IconBox>
  );

  const table = useMaterialReactTable({ columns, data, rowCount,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <XLSXDownload tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data={table.getPrePaginationRowModel().rows} Text={'Excel'}/>
        <PDFDownload fileName="List unités de mesure" tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data={table.getPrePaginationRowModel().rows} Text={'PDF'} />
      </Box>
    ),
    initialState: { density: 'compact' },
    state: { isLoading, showProgressBars: isRefetching, },
  });

  return (
    <Container>
      <div className="card"> 
        <Menubar start={start} style={{ border: '1px solid #dee2e600' }} />
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        <MaterialReactTable table={table} />
      </div>
    </Container>
  );
};

export default AppForm;
