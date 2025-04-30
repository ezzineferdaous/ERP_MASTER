//InventoryCountingList.jsx
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Menubar } from 'primereact/menubar';
import XLSXDownload from '../../../Export/ExportExcel2';
import PDFDownload from '../../../Export/ExportPDF2';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import axios from 'axios';
import dayjs from 'dayjs';

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

const InventoryCountingList = (props) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
  const [data, setData] = useState([]); 
  const [dataPdf, setDataPdf] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const exportColumns = [ "DocNum", "DocDate", "Hour","Comment", "UserSign",  "WhsCode", "PriceList"];

  const Back = async (e) => {
    e.preventDefault();
    try {
      props.setshowListOiqr(false);
    } catch (error) {
      console.log(error);        
    }
  };

  const handleClick = async (event, row) => {
    try {
      props.setEditIndex(null);
      props.setState({ ...props.state, Mode: "Mettre à jour" });
      props.setOiqr(row.original);
      const IQR1Response = await axiosInstance.get(`IQR1/data/Min/${row.original.DocEntry}`);
      const iqr1Data = IQR1Response.data;
      const warehouseResponse = await axiosInstance.get("Warehouse/");
      const warehouses = warehouseResponse.data;
      const umResponse = await axiosInstance.get("UM/");
      const ums = umResponse.data;

      const warehouseMap = warehouses.reduce((map, warehouse) => {
        map[warehouse.id] = warehouse.NomWarehouse;
        return map;
      }, {});

      const umMap = ums.reduce((map, um) => {
        map[um.id] = um.NomUM;
        return map;
      }, {});
  
      const updatedOiqr = {
        ...row.original,
        WhsCode: warehouseMap[row.original.WhsCode] || row.original.WhsCode,
      };
      const updatedIqr1Data = iqr1Data.map(item => ({
        ...item,
        UM: umMap[item.UM] || item.UM,
        
      }));

      props.setIqr1(updatedIqr1Data);
  

  
      props.setOiqr(updatedOiqr);
  
    } catch (error) {
      console.error(error);
    }
    props.setshowListOiqr(false);
  };
  
  useEffect(() => {
    const GetGoodsIssue = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("OIQR");
        const dataWithWarehouseNames = await Promise.all(res.data.map(async (item) => {
          const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
          return {...item, WhsCode: warehouseResponse.data.NomWarehouse,};
        }));
        setData(dataWithWarehouseNames);
        setRowCount(dataWithWarehouseNames.length);
        const respdf = await axiosInstance.get("OIQR/PDF");
        const dataPdfWithWarehouseNames = await Promise.all(respdf.data.map(async (item) => {
          const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
          return {  ...item,  WhsCode: warehouseResponse.data.NomWarehouse,};
        }));
        setDataPdf(dataPdfWithWarehouseNames);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsRefetching(false);
    };
    GetGoodsIssue();
  }, []);
  
  const columns = useMemo(
    () => [ 
      { accessorKey: 'DocNum', header: 'N° de sortie', size: 150  },
      {
        accessorKey: 'DocDate',
        header: 'Date Document',
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
      },
      { accessorKey: 'Hour', header: 'Heure', size: 150 },
      { accessorKey: 'Comment', header: 'Remarque', size: 150 },
      { accessorKey: 'UserSign', header: 'Utilisateur', size: 150 },
      { accessorKey: 'WhsCode', header: 'Magasin', size: 150 },
      { accessorKey: 'PriceList', header: 'List Price', size: 150 },
      {
        accessorFn: (row) => `${row.DocEntry} ${row.DocNum}`, 
        id: 'Afficher', 
        header: 'Afficher',
        size: 250,
        Cell: ({  row }) => (
          <IconBox>
            <Tooltip title="Sélectionner">
              <IconButton onClick={(event) => { handleClick(event, row); }} aria-label="Afficher" size="small">
                <ArrowForwardIcon sx={{ color: green[500] }} fontSize="small" />
              </IconButton>
            </Tooltip>  
          </IconBox>
        ),
      }
    ], [],
  );

  const start = (
    <IconBox> <IconButton onClick={Back} aria-label="Fermer" size="small">  <ArrowBackIcon fontSize="small" /> </IconButton> </IconBox>
  );

  const table = useMaterialReactTable({columns, data, rowCount, localization: MRT_Localization_FR,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <XLSXDownload fileName="List Invenraire" tableHeaders={exportColumns} disabled={dataPdf.length === 0} data={dataPdf} Text={'Excel'} />
        <PDFDownload fileName="List Invenraire" tableHeaders={exportColumns} disabled={dataPdf.length === 0} data={dataPdf} Text={'PDF'} />
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
      <div className="card">
        <Menubar start={start} style={{ border: '1px solid #dee2e600' }} />
      </div>
      <div style={{ height: '100%', width: '100%' }}> 
        <MaterialReactTable table={table} />
      </div>
    </Container>  
  );
};

export default InventoryCountingList;
