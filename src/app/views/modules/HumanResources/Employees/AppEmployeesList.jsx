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

const AppForm = ({ setEmployee, setshowEmployee }) => {
  
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
      setshowEmployee(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event, row) => {
    setEmployee(row.original);
    setshowEmployee(false);
  };

  useEffect(() => {
    const GetEmployee = async () => {
      setIsLoading(true);
      try {
        if (!data.length) { setIsLoading(true); } else { setIsRefetching(true); }
        const res = await axiosInstance.get('Salaries/');
        setData(res.data);
        setRowCount(res.data.length);
      } catch (error) { setIsLoading(false); setIsRefetching(false); return; }
      setIsLoading(false);
      setIsRefetching(false);
    };
    GetEmployee();
  }, []);
  
  const columns = useMemo(
    () => [
      { accessorKey: 'Code', header: 'Code', size: 100 },
      { accessorKey: 'Prenom', header: 'Prénom', size: 100 },
      { accessorKey: 'Nom', header: 'Nom', size: 100 },
      { accessorKey: 'TelP', header: 'Tél', size: 100 },
      { accessorKey: 'email', header: 'Email', size: 100 },
      { accessorKey: 'Adresse', header: 'Adresse', size: 100 },
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
