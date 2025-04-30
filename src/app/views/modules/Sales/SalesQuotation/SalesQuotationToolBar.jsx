// Import necessary components and libraries from Material-UI and other sources
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import PrintIcon from "@mui/icons-material/Print";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

// Define a styled component 'IconBox' that changes display property based on screen size
const IconBox = styled("div")(({ theme }) => ({
  display: "inherit", // Default display property
  [theme.breakpoints.down("md")]: { display: "none !important" }, // Hide on smaller screens (below 'md' size)
}));

// SalesQuotationToolBar component responsible for providing the toolbar functionality
const SalesQuotationToolBar = ({
  state,
  setState,
  handelError,
  setOqutData,
  setQut1Data,
  OqutData,
  setEditIndex,
  setShowOQUTList,
  Add,
}) => {
  // Set up the base URL and axios instance for API requests
  const baseUrl = process.env.REACT_APP_API_BASE_URL; // Get the base URL from environment variables
  const axiosInstance = axios.create({
    timeout: 5000, // Set timeout for API requests
    baseURL: baseUrl, // Base URL for all requests
    withCredentials: true, // Include credentials for requests
  });

  // Function to handle printing the OQUT
  const Print = async (e) => {
    e.preventDefault(); // Prevent the default action (form submission)
    try {
      alert("Print"); // Placeholder for print functionality
    } catch (error) {
      handelError(error); // Handle any errors
    }
  };

  // Function to handle showing the list of OQUT
  const List = async (e) => {
    e.preventDefault(); // Prevent default action
    try {
      setShowOQUTList(true); // Show the list of OQUTs
    } catch (error) {
      console.log(error); // Log any errors to the console
    }
  };
  // Function to handle navigating through OQUT records (First, Previous, Next, Last)
  const Navigate = async (direction) => {
    try {
      // Handling navigation based on the direction ("First", "Previous", "Next", "Last")
      if (direction === "First") {
         // Clear edit index
        const response = await axiosInstance.get(
          "OQUT/" + (await axiosInstance.get("OQUT/data/Min")).data.id + "" // Get the first record
        );
        setOqutData(response.data); // Set OQUT data to the first record

        // Fetch QUT1 (related line items) for the first OQUT record
        const responseQUT1 = await axiosInstance.get(
          "QUT1/data/Min/" + response.data.DocEntry + "" // Get QUT1 data based on OQUT DocEntry
        );
        if (responseQUT1.data.length > 0) {
          // Format and set QUT1 data
          const formattedData = await Promise.all(
            responseQUT1.data.map(async (item) => {
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
           // Clear edit index
          setQut1Data(formattedData); // Set the formatted QUT1 data
        }
        setState({ ...state, Mode: "OK" }); // Update the state to 'OK' mode
      } else if (direction === "Previous") {
        // Similar to the "First" but fetches the previous record
        const previousOQUT = await axiosInstance.get(
          "OQUT/data/Previous/" + OqutData.id + "" // Fetch the previous OQUT record
        );
        if (previousOQUT.data.id != null) {
          // If there is a previous record, set the OQUT data
          setOqutData({
            id: previousOQUT.data.id.id,
            DocEntry: previousOQUT.data.id.DocEntry,
            DocNum: previousOQUT.data.id.DocNum,
            DocDate: previousOQUT.data.id.DocDate,
            DueDate: previousOQUT.data.id.DueDate,
            CardCode: previousOQUT.data.id.CardCode,
            CardName: previousOQUT.data.id.CardName,
            DocStatus: previousOQUT.data.id.DocStatus,
            TotalHT: previousOQUT.data.id.TotalHT,
            DiscPrcnt: previousOQUT.data.id.DiscPrcnt,
            RemiseTotal: previousOQUT.data.id.RemiseTotal,
            VatSum: previousOQUT.data.id.VatSum,
            DocTotal: previousOQUT.data.id.DocTotal,
            UserSign: previousOQUT.data.id.UserSign,
            Comment: previousOQUT.data.id.Comment,
          });

          // Fetch the previous QUT1 data for the previous OQUT
          const previousQUT1 = await axiosInstance.get(
            "QUT1/data/Previous/" + previousOQUT.data.id.DocEntry
          );
          if (previousQUT1.data.length > 0) {
            const formattedData = await Promise.all(
              previousQUT1.data.map(async (item) => {
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
            setQut1Data(formattedData); // Set the formatted QUT1 data
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
        // Fetch the next OQUT record
        const nextOQUT = await axiosInstance.get(
          "OQUT/data/Next/" + OqutData.id + "" // Fetch the next OQUT record
        );
        if (nextOQUT.data.id != null) {
          // If there is a next record, set the OQUT data
          setOqutData({
            id: nextOQUT.data.id.id,
            DocEntry: nextOQUT.data.id.DocEntry,
            DocNum: nextOQUT.data.id.DocNum,
            DocDate: nextOQUT.data.id.DocDate,
            DueDate: nextOQUT.data.id.DueDate,
            CardCode: nextOQUT.data.id.CardCode,
            CardName: nextOQUT.data.id.CardName,
            DocStatus: nextOQUT.data.id.DocStatus,
            TotalHT: nextOQUT.data.id.TotalHT,
            DiscPrcnt: nextOQUT.data.id.DiscPrcnt,
            RemiseTotal: nextOQUT.data.id.RemiseTotal,
            VatSum: nextOQUT.data.id.VatSum,
            DocTotal: nextOQUT.data.id.DocTotal,
            UserSign: nextOQUT.data.id.UserSign,
            Comment: nextOQUT.data.id.Comment,
          });
          // Fetch QUT1 data for the next OQUT
          const nextQUT1 = await axiosInstance.get(
            "QUT1/data/Next/" + nextOQUT.data.id.DocEntry
          );
          if (nextQUT1.data.length > 0) {
            const formattedData = await Promise.all(
              nextQUT1.data.map(async (item) => {
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
            setQut1Data(formattedData); // Set the formatted QUT1 data
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
        // Fetch the last OQUT record
        const response = await axiosInstance.get(
          "OQUT/" + (await axiosInstance.get("OQUT/data/Max")).data.id + "" // Fetch the last OQUT record
        );
        setOqutData(response.data); // Set the OQUT data to the last record
        const responseQUT1 = await axiosInstance.get(
          "QUT1/data/Max/" + response.data.DocEntry + "" // Fetch QUT1 data for the last OQUT
        );
        if (responseQUT1.data.length > 0) {
          const formattedData = await Promise.all(
            responseQUT1.data.map(async (item) => {
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
           // Clear edit index
          setQut1Data(formattedData); // Set the formatted QUT1 data
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
      {/* Button to show the OQUT list */}
      <IconButton onClick={List} aria-label="Filtrer" size="small">
        {" "}
        <FormatListBulletedIcon fontSize="small" />{" "}
      </IconButton>
    </IconBox>
  );
};

export default SalesQuotationToolBar;
