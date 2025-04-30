import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Menubar } from 'primereact/menubar';
import XLSXDownload from '../../../../Export/ExportExcel';
import PDFDownload from '../../../../Export/ExportPDF';
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

const AppForm = ({ setItemGroupe, setshowItemGroupe }) => {
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const exportColumns = ['id', 'CodeGroupe', 'NomGroupe', 'CmptCharges', 'CmptProduit'];

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Back = async (e) => {
    e.preventDefault();
    try {
      setshowItemGroupe(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event, row) => {
    setItemGroupe(row.original);
    setshowItemGroupe(false);
  };

  useEffect(() => {
    const GetItemGroups = async () => {
      setIsLoading(true);
      try {
        if (!data.length) {
          setIsLoading(true);
        } else {
          setIsRefetching(true);
        }
        const res = await axiosInstance.get('ItemGroup/');
        setData(res.data);
        setRowCount(res.data.length);
      } catch (error) {
        setIsLoading(false);
        setIsRefetching(false);
        return;
      }
      setIsLoading(false);
      setIsRefetching(false);
    };
    GetItemGroups();
  }, []);
  //should be memoized or stable
  const columns = useMemo(
    () => [
      { accessorKey: 'CodeGroupe', header: 'Code de Groupe Article', size: 150 },
      { accessorKey: 'NomGroupe', header: 'Nom de Groupe Article', size: 150 },
      { accessorKey: 'CmptCharges', header: 'Compte de charges', size: 150 },
      { accessorKey: 'CmptProduit', header: 'Compte de produit', size: 150 },
      {
        id: 'Afficher', //id is still required when using accessorFn instead of accessorKey
        header: 'Afficher',
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <IconBox>
            <Tooltip title="Sélectionner">
              <IconButton
                onClick={(event) => {
                  handleClick(event, row);
                }} aria-label="Afficher" size="small" >
                <ArrowForwardIcon sx={{ color: green[500] }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </IconBox>
        ),
      },
    ],
    []
  );
  const start = (
    <IconBox>
      <IconButton onClick={Back} aria-label="Fermer" size="small">
        <ArrowBackIcon fontSize="small" />
      </IconButton>
    </IconBox>
  );

  const table = useMaterialReactTable({
    columns,
    data,
    rowCount,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <XLSXDownload tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data={table.getPrePaginationRowModel().rows} Text={'Excel'} />
        <PDFDownload fileName="List Partenaires" tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data={table.getPrePaginationRowModel().rows} Text={'PDF'} />
      </Box>
    ),
    initialState: { density: 'compact' },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
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
