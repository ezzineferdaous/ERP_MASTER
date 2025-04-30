
import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Tooltip from "@mui/material/Tooltip";
import { green } from "@mui/material/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Menubar } from "primereact/menubar";
import XLSXDownload from "../../Export/ExportExcel2";
import PDFDownload from "../../Export/ExportPDF2";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import axios from "axios";
import dayjs from 'dayjs';

// Container styling
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));



// IconBox styling
const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const ARInvoiceList = (props) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });

  // State variables
  const [data, setData] = useState([]);
  const [dataPdf, setDataPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const exportColumns = [
    "DocNum",
    "DocDate",
    "DueDate",
    "Code",
    "CardName",
    "TotalHT",
    "DiscPrcnt",
    " Total Remise",
    "Montant TVA",
    "Total TTC",
    "Remarques",
  ];

  // Handle the back button click
  const Back = async (e) => {
    e.preventDefault();
    try {
      props.setShowOINVList(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle the click event for a table row
  const handleClick = async (event, row) => {
    try {
      props.setState({ ...props.state, Mode: "Mettre à jour" });
      props.setOinv(row.original);
    

      // Fetch Inv1 data based on the selected DocEntry
      const Inv1Response = await axiosInstance.get(`INV1/data/Min/${row.original.DocEntry}`);
      const Inv1Data = Inv1Response.data;

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

      // Update Inv1 data with names
      const updatedInv1 = Inv1Data.map((item) => ({
        ...item,
        WhsCode: warehouseMap[item.WhsCode] || item.WhsCode,
        UM: umMap[item.UM] || item.UM,
      }));

      props.setInv1(updatedInv1);
    } catch (error) {
      console.error(error);
    }
    props.setShowOINVList(false);
  };

  // Fetch OINV data
  useEffect(() => {
    const getOINV = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("OINV");
        setData(res.data);
        setRowCount(res.data.length);

         // Map DocStatus to readable format
        const modifiedData = res.data.map((item) => ({
          ...item,
          DocStatus: item.DocStatus === 'O' ? 'Ouvert' : item.DocStatus === 'C' ? 'Clôturée' : item.DocStatus,
        }));

        setData(modifiedData);
        setRowCount(modifiedData.length);


        const respdf = await axiosInstance.get("OINV/PDF");
                                 
        setDataPdf(respdf.data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setIsRefetching(false);
    };
    getOINV();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
     
      { accessorKey: "DocNum", header: "N° ", size: 160 },
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
      { accessorKey: "CardCode", header: "Code", size: 160 },
      { accessorKey: "CardName", header: "Nom ", size: 160 },
      { accessorKey: "TotalHT", header: "Total HT", size: 130 },
      { accessorKey: "DiscPrcnt", header: "Remise %", size: 130 },
      { accessorKey: "VatSum", header: "Montant TVA", size: 130 },
      { accessorKey: "DocTotal", header: "Total TTC", size: 130 },
      { accessorKey: "Comment", header: "Remarques", size: 130 },
      {
        accessorFn: (row) => `${row.DocEntry} ${row.DocNum}`, // Accessor function for custom column
        id: "Afficher", // Column ID
        header: "Afficher", // Column header
        size: 200,
        Cell: ({ row }) => (
          <IconBox>
            <Tooltip title="Sélectionner">
              <IconButton
                onClick={(event) => handleClick(event, row)}
                aria-label="Afficher"
                size="small"
              >
                <ArrowForwardIcon sx={{ color: green[500] }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </IconBox>
        ),
      },
    ],
    []
  );

  // Define the start menu bar with a back button
  const start = (
    <IconBox>
      <IconButton onClick={Back} aria-label="Fermer" size="small">
        <ArrowBackIcon fontSize="small" />
      </IconButton>
    </IconBox>
  );

  // Initialize the table with Material React Table
  const table = useMaterialReactTable({
    columns,
    data,
    rowCount,
    localization: MRT_Localization_FR,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{ display: "flex", gap: "16px", padding: "8px", flexWrap: "wrap" }}
      >
        <XLSXDownload
          fileName="List Facture client "
          tableHeaders={exportColumns}
          disabled={dataPdf.length === 0}
          data={dataPdf}
          Text={"Excel"}
        />
        <PDFDownload
          fileName="List Facture client "
          tableHeaders={exportColumns}
          disabled={dataPdf.length === 0}
          data={dataPdf}
          Text={"PDF"}
        />
      </Box>
    ),
    initialState: { density: "compact" },
    state: {
      isLoading,
      showProgressBars: isRefetching,
    },
  });

  return (
    <Container>
      <div className="card">
        <Menubar start={start} style={{ border: "1px solid #dee2e600" }} />
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <MaterialReactTable table={table} />
      </div>
    </Container>
  );
};

export default ARInvoiceList;