// Import necessary components and libraries from Material-UI and other sources
import { IconButton } from "@mui/material"; // Button for interactive icons
import { styled } from "@mui/system"; // Utility for custom styling components
import PrintIcon from "@mui/icons-material/Print"; // Icon for printing
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"; // Icon for navigating to the first item
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"; // Icon for navigating to the last item
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"; // Icon for navigating to the previous item
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"; // Icon for navigating to the next item
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"; // Icon for showing a list view
import AddIcon from "@mui/icons-material/Add"; // Icon for adding a new item
import axios from "axios"; // Axios for making API requests

// Define a styled component 'IconBox' that changes display property based on screen size
const IconBox = styled("div")(({ theme }) => ({
  display: "inherit", // Default display property
  [theme.breakpoints.down("md")]: { display: "none !important" }, // Hide on smaller screens (below 'md' size)
}));

// DeliveryToolBar component responsible for providing the toolbar functionality
const DeliveryToolBar = ({
  state,
  setState,
  handelError,
  setOdlnData,
  setDln1Data,
  OdlnData,
  setShowODLNList,
  Add,
}) => {
  // Set up the base URL and axios instance for API requests
  const baseUrl = process.env.REACT_APP_API_BASE_URL; // Get the base URL from environment variables
  const axiosInstance = axios.create({
    timeout: 5000, // Set timeout for API requests
    baseURL: baseUrl, // Base URL for all requests
    withCredentials: true, // Include credentials for requests
  });

  // Function to handle printing the ODLN
  const Print = async (e) => {
    e.preventDefault(); // Prevent the default action (form submission)
    try {
      alert("Print"); // Placeholder for print functionality
    } catch (error) {
      handelError(error); // Handle any errors
    }
  };

  // Function to handle showing the list of ODLN
  const List = async (e) => {
    e.preventDefault(); // Prevent default action
    try {
      setShowODLNList(true); // Show the list of ODLN
    } catch (error) {
      console.log(error); // Log any errors to the console
    }
  };
  // Function to handle navigating through ODLN records (First, Previous, Next, Last)
  const Navigate = async (direction) => {
    try {
      // Handling navigation based on the direction ("First", "Previous", "Next", "Last")
      if (direction === "First") {
        const response = await axiosInstance.get(
          "ODLN/" + (await axiosInstance.get("ODLN/data/Min")).data.id + "" // Get the first record
        );
        setOdlnData(response.data); // Set ODLN data to the first record

        // Fetch DLN1 (related line items) for the first ODLN record
        const responseDLN1 = await axiosInstance.get(
          "DLN1/data/Min/" + response.data.DocEntry + "" // Get DLN1 data based on ODLN DocEntry
        );
        if (responseDLN1.data.length > 0) {
          // Format and set DLN1 data
          const formattedData = await Promise.all(
            responseDLN1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(
                `Warehouse/code/${item.WhsCode}`
              );
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);

              return {
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode: item.ItemCode,
                ItemName: item.ItemName,
                Quantity: item.Quantity,
                WhsCode: warehouseResponse.data.NomWarehouse,
                PriceHT: item.PriceHT,
                VAT: item.VAT,
                Price: item.Price,
                Discount: item.Discount,
                RemiseTotal: item.RemiseTotal,
                LineHT: item.LineHT,
                LineTotal: item.LineTotal,
                UM: umResponse.data.NomUM,
              };
            })
          );

          setDln1Data(formattedData); // Set the formatted DLN1 data
        }
        setState({ ...state, Mode: "OK" }); // Update the state to 'OK' mode
      } else if (direction === "Previous") {
        // Similar to the "First" but fetches the previous record
        const previousODLN = await axiosInstance.get(
          "ODLN/data/Previous/" + OdlnData.id + "" // Fetch the previous ODLN record
        );
        if (previousODLN.data.id != null) {
          // If there is a previous record, set the ODLN data
          setOdlnData({
            id: previousODLN.data.id.id,
            DocEntry: previousODLN.data.id.DocEntry,
            DocNum: previousODLN.data.id.DocNum,
            DocDate: previousODLN.data.id.DocDate,
            DueDate: previousODLN.data.id.DueDate,
            CardCode: previousODLN.data.id.CardCode,
            CardName: previousODLN.data.id.CardName,
            DocStatus: previousODLN.data.id.DocStatus,
            TotalHT: previousODLN.data.id.TotalHT,
            DiscPrcnt: previousODLN.data.id.DiscPrcnt,
            RemiseTotal: previousODLN.data.id.RemiseTotal,
            VatSum: previousODLN.data.id.VatSum,
            DocTotal: previousODLN.data.id.DocTotal,
            UserSign: previousODLN.data.id.UserSign,
            Comment: previousODLN.data.id.Comment,
          });

          // Fetch the previous DLN1 data for the previous ODLN
          const previousDLN1 = await axiosInstance.get(
            "DLN1/data/Previous/" + previousODLN.data.id.DocEntry
          );
          if (previousDLN1.data.length > 0) {
            const formattedData = await Promise.all(
              previousDLN1.data.map(async (item) => {
                const warehouseResponse = await axiosInstance.get(
                  `Warehouse/code/${item.WhsCode}`
                );
                const umResponse = await axiosInstance.get(`UM/${item.UM}`);

                return {
                  DocEntry: item.DocEntry,
                  LineNum: item.LineNum,
                  ItemCode: item.ItemCode,
                  ItemName: item.ItemName,
                  Quantity: item.Quantity,
                  WhsCode: warehouseResponse.data.NomWarehouse,
                  PriceHT: item.PriceHT,
                  VAT: item.VAT,
                  Price: item.Price,
                  Discount: item.Discount,
                  RemiseTotal: item.RemiseTotal,
                  LineHT: item.LineHT,
                  LineTotal: item.LineTotal,
                  UM: umResponse.data.NomUM,
                };
              })
            );
            setDln1Data(formattedData); // Set the formatted DLN1 data
          }
          setState({ ...state, open: false, Mode: "OK" }); // Update the state to 'OK'
        } else {
          // If there are no previous records, show a message
          setState({
            ...state,
            open: true,
            message: "Premier enregistrement",
            severity: "info",
          });
        }
      } else if (direction === "Next") {
        // Fetch the next ODLN record
        const nextODLN = await axiosInstance.get(
          "ODLN/data/Next/" + OdlnData.id + "" // Fetch the next ODLN record
        );
        if (nextODLN.data.id != null) {
          // If there is a next record, set the ODLN data
          setOdlnData({
            id: nextODLN.data.id.id,
            DocEntry: nextODLN.data.id.DocEntry,
            DocNum: nextODLN.data.id.DocNum,
            DocDate: nextODLN.data.id.DocDate,
            DueDate: nextODLN.data.id.DueDate,
            CardCode: nextODLN.data.id.CardCode,
            CardName: nextODLN.data.id.CardName,
            DocStatus: nextODLN.data.id.DocStatus,
            TotalHT: nextODLN.data.id.TotalHT,
            DiscPrcnt: nextODLN.data.id.DiscPrcnt,
            RemiseTotal: nextODLN.data.id.RemiseTotal,
            VatSum: nextODLN.data.id.VatSum,
            DocTotal: nextODLN.data.id.DocTotal,
            UserSign: nextODLN.data.id.UserSign,
            Comment: nextODLN.data.id.Comment,
          });
          // Fetch DLN1 data for the next ODLN
          const nextDLN1 = await axiosInstance.get(
            "DLN1/data/Next/" + nextODLN.data.id.DocEntry
          );
          if (nextDLN1.data.length > 0) {
            const formattedData = await Promise.all(
              nextDLN1.data.map(async (item) => {
                const warehouseResponse = await axiosInstance.get(
                  `Warehouse/code/${item.WhsCode}`
                );
                const umResponse = await axiosInstance.get(`UM/${item.UM}`);

                return {
                  DocEntry: item.DocEntry,
                  LineNum: item.LineNum,
                  ItemCode: item.ItemCode,
                  ItemName: item.ItemName,
                  Quantity: item.Quantity,
                  WhsCode: warehouseResponse.data.NomWarehouse,
                  PriceHT: item.PriceHT,
                  VAT: item.VAT,
                  Price: item.Price,
                  Discount: item.Discount,
                  RemiseTotal: item.RemiseTotal,
                  LineHT: item.LineHT,
                  LineTotal: item.LineTotal,
                  UM: umResponse.data.NomUM,
                };
              })
            );
            setDln1Data(formattedData); // Set the formatted DLN1 data
          }
          setState({ ...state, open: false, Mode: "OK" }); // Update the state to 'OK'
        } else {
          // If there are no next records, show a message
          setState({
            ...state,
            open: true,
            message: "Dernier enregistrement",
            severity: "info",
          });
        }
      } else if (direction === "Last") {
        // Fetch the last ODLN record
        const response = await axiosInstance.get(
          "ODLN/" + (await axiosInstance.get("ODLN/data/Max")).data.id + "" // Fetch the last ODLN record
        );
        setOdlnData(response.data); // Set the ODLN data to the last record
        const responseDLN1 = await axiosInstance.get(
          "DLN1/data/Max/" + response.data.DocEntry + "" // Fetch DLN1 data for the last ODLN
        );
        if (responseDLN1.data.length > 0) {
          const formattedData = await Promise.all(
            responseDLN1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(
                `Warehouse/code/${item.WhsCode}`
              );
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);

              return {
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode: item.ItemCode,
                ItemName: item.ItemName,
                Quantity: item.Quantity,
                WhsCode: warehouseResponse.data.NomWarehouse,
                PriceHT: item.PriceHT,
                VAT: item.VAT,
                Price: item.Price,
                Discount: item.Discount,
                RemiseTotal: item.RemiseTotal,
                LineHT: item.LineHT,
                LineTotal: item.LineTotal,
                UM: umResponse.data.NomUM,
              };
            })
          );

          setDln1Data(formattedData); // Set the formatted DLN1 data
        }
        setState({ ...state, open: false, Mode: "OK" }); // Update the state to 'OK'
      }
    } catch (error) {
      handelError(error); // Handle any errors
    }
  };
  // Render the toolbar with action buttons
  return (
    <IconBox>
      {/* Button to add a new record */}
      <IconButton onClick={Add} aria-label="Nouveau" size="small">
        {" "}
        <AddIcon fontSize="small" />{" "}
      </IconButton>
      {/* Button to print the current record */}
      <IconButton onClick={Print} aria-label="imprimer" size="small">
        {" "}
        <PrintIcon fontSize="small" />{" "}
      </IconButton>
      {/* Button to navigate to the first record */}
      <IconButton
        onClick={() => Navigate("First")}
        aria-label="Premier"
        size="small"
      >
        {" "}
        <KeyboardDoubleArrowLeftIcon fontSize="small" />{" "}
      </IconButton>
      {/* Button to navigate to the previous record */}
      <IconButton
        onClick={() => Navigate("Previous")}
        aria-label="Précédent"
        size="small"
      >
        {" "}
        <KeyboardArrowLeftIcon fontSize="small" />{" "}
      </IconButton>
      {/* Button to navigate to the next record */}
      <IconButton
        onClick={() => Navigate("Next")}
        aria-label="Suivant"
        size="small"
      >
        {" "}
        <KeyboardArrowRightIcon fontSize="small" />{" "}
      </IconButton>
      {/* Button to navigate to the last record */}
      <IconButton
        onClick={() => Navigate("Last")}
        aria-label="Dernier"
        size="small"
      >
        {" "}
        <KeyboardDoubleArrowRightIcon fontSize="small" />{" "}
      </IconButton>
      {/* Button to show the ODLN list */}
      <IconButton onClick={List} aria-label="Filtrer" size="small">
        {" "}
        <FormatListBulletedIcon fontSize="small" />{" "}
      </IconButton>
    </IconBox>
  );
};
//chenge
export default DeliveryToolBar;
