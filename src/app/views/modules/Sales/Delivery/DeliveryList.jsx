import React, { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table"; // Importing MaterialReactTable and hooks for table functionalities
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import icon for forward arrow
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip for hover effects
import { green } from "@mui/material/colors"; // Import color from Material UI
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import icon for back arrow
import { IconButton, Box } from "@mui/material"; // Importing UI components from Material UI
import { styled } from "@mui/system"; // Import styled utility for custom styling
import { Menubar } from "primereact/menubar"; // Import Menubar component from PrimeReact
import XLSXDownload from "../../Export/ExportExcel2"; // Custom component for exporting Excel files
import PDFDownload from "../../Export/ExportPDF2"; // Custom component for exporting PDF files
import { MRT_Localization_FR } from "material-react-table/locales/fr"; // Import French localization for the table
import axios from "axios"; // Axios for making HTTP requests
import dayjs from 'dayjs';

// Container styling using Material UI's styled utility
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

// IconBox styling for displaying icons conditionally based on screen size
const IconBox = styled("div")(({ theme }) => ({
  display: "inherit", // Default display
  [theme.breakpoints.down("md")]: { display: "none !important" }, // Hide on medium screens or smaller
}));

// Main component for the DeliveryList
const DeliveryList = (props) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL; // Get base URL from environment variables
  const axiosInstance = axios.create({
    timeout: 5000, // Set timeout for API requests
    baseURL: baseUrl, // Base URL for API calls
    withCredentials: true, // Include credentials (cookies, etc.)
  });

  // State variables to handle data, loading, and row count
  const [data, setData] = useState([]); // State to store ODLN data
  const [dataPdf, setDataPdf] = useState([]); // State to store data for exporting to PDF
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [isRefetching, setIsRefetching] = useState(false); // State for refetching status
  const [rowCount, setRowCount] = useState(0); // State to store the total number of rows
  const exportColumns = [
    // Define the columns to export
    
    "Date",
    "Code",
    "Nom",
    "Total Av.Remise",
    "Total Remiseé",
    "Montant TVA",
    "Total HT",
    "Remarques",
  ];

  // Handle the back button click event to navigate to the previous page
  const Back = async (e) => {
    e.preventDefault(); // Prevent default button action
    try {
      props.setShowODLNList(false); // Hide the delivery list and go back
    } catch (error) {
      console.log(error); // Log error if it occurs
    }
  };

  // Handle click event on a table row to select a specific document
  const handleClick = async (event, row) => {
    try {
      props.setState({ ...props.state, Mode: "Mettre à jour" }); // Set the state to update mode
      props.setOdlnData(row.original); // Set the selected document data

      // Fetch DLN1 data (related to delivery lines) for the selected document
      const DLN1Response = await axiosInstance.get(
        `DLN1/data/List/${row.original.DocEntry}` // Fetch lines based on DocEntry
      );
      const Dln1Data = DLN1Response.data;

      // Fetch additional data for Warehouse and UM (unit of measure)
      const warehouseResponse = await axiosInstance.get("Warehouse/");
      const warehouses = warehouseResponse.data;
      const umResponse = await axiosInstance.get("UM/");
      const ums = umResponse.data;

      // Map warehouse IDs to their names
      const warehouseMap = warehouses.reduce((map, warehouse) => {
        map[warehouse.id] = warehouse.NomWarehouse;
        return map;
      }, {});
      // Map UM IDs to their names
      const umMap = ums.reduce((map, um) => {
        map[um.id] = um.NomUM;
        return map;
      }, {});

      // Update DLN1 data with names from Warehouse and UM
      const updatedPdn1Data = Dln1Data.map((item) => ({
        ...item,
        WhsCode: warehouseMap[item.WhsCode] || item.WhsCode, // Replace WhsCode with the name
        UM: umMap[item.UM] || item.UM, // Replace UM with the name
      }));

      props.setDln1Data(updatedPdn1Data); // Update state with the fetched DLN1 dat
    } catch (error) {
      console.error(error); // Log any error that occurs
    }
    props.setShowODLNList(false); // Hide the delivery list
  };

  // Fetch ODLN (order) data when the component is mounted
  useEffect(() => {
    const getODLN = async () => {
      setIsLoading(true); // Set loading to true when data is being fetched
      try {
        const res = await axiosInstance.get("ODLN"); // Fetch ODLN data from the API
        setData(res.data); // Set the fetched data
        setRowCount(res.data.length); // Set the row count based on the data length
           // Map DocStatus to readable format
        const modifiedData = res.data.map((item) => ({
          ...item,
          DocStatus: item.DocStatus === 'O' ? 'Ouvert' : item.DocStatus === 'C' ? 'Clôturée' : item.DocStatus,
        }));

        setData(modifiedData);
        setRowCount(modifiedData.length);
        // Fetch data for exporting to PDF
        const respdf = await axiosInstance.get("ODLN/PDF");
        setDataPdf(respdf.data); // Set the data for PDF export
      } catch (error) {
        console.error(error); // Handle any error that occurs
        setIsLoading(false); // Set loading to false if an error occurs
        return;
      }
      setIsLoading(false); // Set loading to false after fetching
      setIsRefetching(false); // Set refetching to false after fetching
    };
    getODLN(); // Call the function to fetch ODLN data
  }, []);

  // Define the columns for the Material React Table
  const columns = useMemo(
    () => [
   
      { accessorKey: "DocNum", header: "N°", size: 60 }, // Column for DocNum
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
      { accessorKey: "CardCode", header: "Code", size: 130 }, // Column for CardCode
      { accessorKey: "CardName", header: "Nom", size: 130 }, // Column for CardName
      { accessorKey: "TotalHT", header: "Total HT", size: 130 }, // Column for Total
      { accessorKey: "DiscPrcnt", header: "Remise %", size: 130 }, // Column for DiscPrcnt
      { accessorKey: "RemiseTotal", header: " Total Remise", size: 130 }, // Column for TotalAvecRemise
      { accessorKey: "VatSum", header: "Montant TVA", size: 130 }, // Column for VatSum
      { accessorKey: "DocTotal", header: "Total TTC", size: 130 }, // Column for DocTotal
      { accessorKey: "DocStatus", header: "Statut", size: 130 }, // Column for DocStatus
      { accessorKey: "Comment", header: "Remarques", size: 130 }, // Column for Comment

      {
        accessorFn: (row) => `${row.DocEntry} ${row.DocNum}`, // Custom column with combined data
        id: "Afficher", // Unique ID for the column
        header: "Afficher", // Header for the column
        size: 200,
        Cell: ({ row }) => (
          <IconBox>
            <Tooltip title="Sélectionner">
              {" "}
              {/* Tooltip for selecting the row */}
              <IconButton
                onClick={(event) => handleClick(event, row)} // Handle click on the icon
                aria-label="Afficher" // Accessibility label
                size="small"
              >
                <ArrowForwardIcon sx={{ color: green[500] }} fontSize="small" />{" "}
                {/* Forward arrow icon */}
              </IconButton>
            </Tooltip>
          </IconBox>
        ),
      },
    ],
    [] // Empty dependency array to memoize the columns
  );

  // Define the start menu bar with a back button
  const start = (
    <IconBox>
      <IconButton onClick={Back} aria-label="Fermer" size="small">
        <ArrowBackIcon fontSize="small" />
      </IconButton>
    </IconBox>
  );

  // Initialize the Material React Table
  const table = useMaterialReactTable({
    columns,
    data,
    rowCount,
    localization: MRT_Localization_FR,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{ display: "flex", gap: "16px", padding: "8px", flexWrap: "wrap" }}
      >
        {/* Export buttons for Excel and PDF */}
        <XLSXDownload
          fileName="List Livraison client" // Filename for Excel download
          tableHeaders={exportColumns} // Columns to export
          disabled={dataPdf.length === 0} // Disable if no data
          data={dataPdf} // Data for export
          Text={"Excel"} // Button text
        />
        <PDFDownload
          fileName="List Livraison client" // Filename for PDF download
          tableHeaders={exportColumns} // Columns to export
          disabled={dataPdf.length === 0} // Disable if no data
          data={dataPdf} // Data for export
          Text={"PDF"} // Button text
        />
      </Box>
    ),
    initialState: { density: "compact" }, // Set initial table state
    state: {
      isLoading, // Pass loading state to the table
      showProgressBars: isRefetching, // Show progress bars while refetching
    },
  });

  return (
    <Container>
      <div className="card">
        <Menubar start={start} style={{ border: "1px solid #dee2e600" }} />
        {/* Menubar with start content */}
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <MaterialReactTable table={table} />
        {/* Render the Material React Table */}
      </div>
    </Container>
  );
};

export default DeliveryList;
