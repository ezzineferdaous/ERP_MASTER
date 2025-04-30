// // Import necessary modules and components
// import { useMemo, useState, useEffect } from 'react';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Tooltip from '@mui/material/Tooltip';
// import { green } from '@mui/material/colors';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { IconButton, Box } from "@mui/material";
// import { styled } from "@mui/system";
// import { Menubar } from 'primereact/menubar';
// import XLSXDownload from '../../../Export/ExportExcel';
// import PDFDownload from '../../../Export/ExportPDF';
// import { MRT_Localization_FR } from 'material-react-table/locales/fr';
// import axios from 'axios';
// import dayjs from 'dayjs';

// // Styled components for Container and IconBox
// const Container = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
//   "& .breadcrumb": {
//     marginBottom: "30px",
//     [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
//   },
// }));

// const IconBox = styled('div')(({ theme }) => ({
//   display: 'inherit',
//   [theme.breakpoints.down('md')]: { display: 'none !important' },
// }));

// // Main component for GoodsIssueList
// const GoodsIssueList = ({ setIGN1, setEditIndex,state,setState, Oign, setOign, setshowListOign }) => {

//   // Base URL for API
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;

//   // Axios instance with base configuration
//   const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

//   // State variables
//   const [data, setData] = useState([{}]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefetching, setIsRefetching] = useState(false);
//   const [rowCount, setRowCount] = useState(0);
//   const exportColumns = [ "DocNum", "DocDate", "Comment"];

//   // Function to handle the Back button click
//   const Back = async (e) => {
//     e.preventDefault();
//     try {
//       setshowListOign(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Function to handle row click and fetch related data
//   const handleClick = async (event, row) => {
//     try {
//       setEditIndex();
//       setOign(row.original);
//       const IGN1Response = await axiosInstance.get(`IGN1/data/Min/${row.original.DocEntry}`);
//       setIGN1(IGN1Response.data);
//       setState({ ...state,  Mode :"Mettre à jour" });
//     } catch (error) {
//       console.error(error);
//     }
//     setshowListOign(false);
//   };

//   // useEffect to fetch data on component mount
//   useEffect(() => {
//     const GetGoodsIssue = async () => {
//       setIsLoading(true);
//       try {
//         if (!data.length) { setIsLoading(true); } else { setIsRefetching(true); }
//         const res = await axiosInstance.get("Oign/");
//         setData(res.data);
//         setRowCount(res.data.length);
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//         return;
//       }
//       setIsLoading(false);
//       setIsRefetching(false);
//     };
//     GetGoodsIssue();
//   }, []);

//   // Memoized columns definition
//   const columns = useMemo(
//     () => [
    
//       { accessorKey: 'DocNum', header: 'Doc Number', size: 150 },
//       {
//         accessorKey: 'DocDate',
//         header: 'Date Document',
//         Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
//       },
//       { accessorKey: 'Comment', header: 'Comment', size: 150 },
//       {
//         accessorFn: (row) => `${row.DocEntry}`,
//         id: 'Afficher',
//         header: 'Afficher',
//         size: 250,
//         Cell: ({ renderedCellValue, row }) => (
//           <IconBox>
//             <Tooltip title="Sélectionner">
//               <IconButton onClick={(event) => { handleClick(event, row); }} aria-label="Afficher" size="small">
//                 <ArrowForwardIcon sx={{ color: green[500] }} fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </IconBox>
//         ),
//       }
//     ], [],
//   );

//   // Start button for Menubar
//   const start = (
//     <IconBox>
//       <IconButton onClick={Back} aria-label="Fermer" size="small">
//         <ArrowBackIcon fontSize="small" />
//       </IconButton>
//     </IconBox>
//   );

//   // Table configuration using useMaterialReactTable
//   const table = useMaterialReactTable({
//     columns,
//     data,
//     rowCount,
//     localization: MRT_Localization_FR,
//     renderTopToolbarCustomActions: ({ table }) => (
//       <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
//         <XLSXDownload tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data={table.getPrePaginationRowModel().rows} Text={'Excel'} />
//         <PDFDownload fileName="List Goods Issues" tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 1} data={table.getPrePaginationRowModel().rows} Text={'PDF'} />
//       </Box>
//     ),
//     initialState: { density: 'compact' },
//     state: {
//       isLoading,
//       showProgressBars: isRefetching,
//     }
//   });

//   // Render the component
//   return (
//     <Container>
//       <div className="card">
//         <Menubar start={start} style={{ border: '1px solid #dee2e600' }} />
//       </div>
//       <div style={{ height: '100%', width: '100%' }}>
//         <MaterialReactTable table={table} />
//       </div>
//     </Container>
//   );
// };

// export default GoodsIssueList;


import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Menubar } from 'primereact/menubar';
import XLSXDownload from '../../../Export/ExportExcel';
import PDFDownload from '../../../Export/ExportPDF';
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

const GoodsIssueList = ({setIGN1, setState ,state,Oign, setOign, setshowListOige }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const exportColumns = [ "DocNum", "DocDate", "Comment"];

  const Back = async (e) => {
    e.preventDefault();
    try {
      setshowListOige(false);
    } catch (error) {
      console.log(error);        
    }
  };



  const handleClick = async (event, row) => {
    try {
      
      setState({ ...state, Mode: "Mettre à jour" });
  
      setOign(row.original);
  
      // Fetch IGN1 data based on the selected DocEntry
      const ige1Response = await axiosInstance.get(`IGN1/data/Min/${row.original.DocEntry}`);
      const ige1Data = ige1Response.data;
  
      // Fetch Warehouse and UM data
      const warehouseResponse = await axiosInstance.get("Warehouse/");
      const warehouses = warehouseResponse.data;
      const umResponse = await axiosInstance.get("UM/");
      const ums = umResponse.data;
  
      // Map IDs to names
      const warehouseMap = warehouses.reduce((map, warehouse) => {
        map[warehouse.id] = warehouse.NomWarehouse;
        return map;
      }, {});
  
      const umMap = ums.reduce((map, um) => {
        map[um.id] = um.NomUM;
        return map;
      }, {});
  
      // Update IGN1 data with names
      const updatedIge1Data = ige1Data.map(item => ({
        ...item,
        WhsCode: warehouseMap[item.WhsCode] || item.WhsCode,
        UM: umMap[item.UM] || item.UM,
      }));
  
      setIGN1(updatedIge1Data);
    } catch (error) {
      console.error(error);
    }
    setshowListOige(false);
  };
  

  useEffect(() => { 
    const GetGoodsIssue = async () => {
      setIsLoading(true);
      try {
        if (!data.length) { setIsLoading(true); } else { setIsRefetching(true); }
        const res = await axiosInstance.get("OIGN/");
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
    GetGoodsIssue();    
  }, []);

  const columns = useMemo(
    () => [ 
      { accessorKey: 'DocEntry', header: 'Numéro Order', size: 150 },
      {
        accessorKey: 'DocDate',
        header: 'Date Document',
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'DueDate',
        header: "Date d'échéance",
        Cell: ({ cell }) => dayjs(cell.getValue()).format('DD/MM/YYYY'),
      },
      { accessorKey: 'Comment', header: 'Remarque', size: 150 },
      {
        accessorFn: (row) => `${row.DocEntry}`, 
        id: 'Afficher', 
        header: 'Afficher',
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
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
    localization: MRT_Localization_FR,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }}>
        <XLSXDownload fileName="List Sortie De Marchandises" tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data={table.getPrePaginationRowModel().rows} Text={'Excel'} />
        <PDFDownload fileName="List Sortie De Marchandises" tableHeaders={exportColumns} disabled={table.getPrePaginationRowModel().rows.length === 0} data={table.getPrePaginationRowModel().rows} Text={'PDF'} />
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

export default GoodsIssueList;

