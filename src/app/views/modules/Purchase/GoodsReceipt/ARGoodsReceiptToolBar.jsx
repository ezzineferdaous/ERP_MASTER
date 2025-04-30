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
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const ARPurchaseOrderToolBar = ({
  state,
  setState,
  handelError,
  setOpdnData,
  setPdn1Data,
  OpdnData,
  setShowOPDNList,
  Add,
}) => {
  // Set up the base URL and axios instance for API requests
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });

  // Function to handle printing the OPDN
  const Print = async (e) => {
    e.preventDefault();
    try {
      alert("Print");
    } catch (error) {
      handelError(error);
    }
  };

  // Function to handle showing the list of OPDN
  const List = async (e) => {
    e.preventDefault();
    try {
      setShowOPDNList(true);
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle navigating through OPDN
  const Navigate = async (direction) => {
    try {
      if (direction === "First") {
        const response = await axiosInstance.get(
          "OPDN/" + (await axiosInstance.get("OPDN/data/Min")).data.id + ""
        );
        setOpdnData(response.data);

        const responsePDN1 = await axiosInstance.get(
          "PDN1/data/Min/" + response.data.DocEntry + ""
        );
        if (responsePDN1.data.length > 0) {
          const formattedData = await Promise.all(
            responsePDN1.data.map(async (item) => {
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
          setPdn1Data(formattedData);
        }
        setState({ ...state, Mode: "OK" });
      } else if (direction === "Previous") {
        const previousOPDN = await axiosInstance.get(
          "OPDN/data/Previous/" + OpdnData.id + ""
        );
        if (previousOPDN.data.id != null) {
          setOpdnData({
            id: previousOPDN.data.id.id,
            DocEntry: previousOPDN.data.id.DocEntry,
            DocNum: previousOPDN.data.id.DocNum,
            DocDate: previousOPDN.data.id.DocDate,
            DueDate: previousOPDN.data.id.DueDate,
            CardCode: previousOPDN.data.id.CardCode,
            CardName: previousOPDN.data.id.CardName,
            DocStatus: previousOPDN.data.id.DocStatus,
            TotalHT: previousOPDN.data.id.TotalHT,
            DiscPrcnt: previousOPDN.data.id.DiscPrcnt,
            RemiseTotal: previousOPDN.data.id.RemiseTotal,
            VatSum: previousOPDN.data.id.VatSum,
            DocTotal: previousOPDN.data.id.DocTotal,
            UserSign: previousOPDN.data.id.UserSign,
            Comment: previousOPDN.data.id.Comment,
          });
          const previousPDN1 = await axiosInstance.get(
            "PDN1/data/Previous/" + previousOPDN.data.id.DocEntry
          );
          if (previousPDN1.data.length > 0) {
            const formattedData = await Promise.all(
              previousPDN1.data.map(async (item) => {
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
            setPdn1Data(formattedData);
          }
          setState({ ...state, open: false, Mode: "OK" });
        } else {
          setState({
            ...state,
            open: true,
            message: "Premier enregistrement",
            severity: "info",
          });
        }
      } else if (direction === "Next") {
        const nextOPDN = await axiosInstance.get(
          "OPDN/data/Next/" + OpdnData.id + ""
        );
        if (nextOPDN.data.id != null) {
          setOpdnData({
            id: nextOPDN.data.id.id,
            DocEntry: nextOPDN.data.id.DocEntry,
            DocNum: nextOPDN.data.id.DocNum,
            DocDate: nextOPDN.data.id.DocDate,
            DueDate: nextOPDN.data.id.DueDate,
            CardCode: nextOPDN.data.id.CardCode,
            CardName: nextOPDN.data.id.CardName,
            DocStatus: nextOPDN.data.id.DocStatus,
            TotalHT: nextOPDN.data.id.TotalHT,
            DiscPrcnt: nextOPDN.data.id.DiscPrcnt,
            RemiseTotal: nextOPDN.data.id.RemiseTotal,
            VatSum: nextOPDN.data.id.VatSum,
            DocTotal: nextOPDN.data.id.DocTotal,
            UserSign: nextOPDN.data.id.UserSign,
            Comment: nextOPDN.data.id.Comment,
          });
          const nextPDN1 = await axiosInstance.get(
            "PDN1/data/Next/" + nextOPDN.data.id.DocEntry
          );
          if (nextPDN1.data.length > 0) {
            const formattedData = await Promise.all(
              nextPDN1.data.map(async (item) => {
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
            setPdn1Data(formattedData);
          }
          setState({ ...state, open: false, Mode: "OK" });
        } else {
          setState({
            ...state,
            open: true,
            message: "Dernier enregistrement",
            severity: "info",
          });
        }
      } else if (direction === "Last") {
        const response = await axiosInstance.get(
          "OPDN/" + (await axiosInstance.get("OPDN/data/Max")).data.id + ""
        );
        setOpdnData(response.data);
        const responsePDN1 = await axiosInstance.get(
          "PDN1/data/Max/" + response.data.DocEntry + ""
        );
        if (responsePDN1.data.length > 0) {
          const formattedData = await Promise.all(
            responsePDN1.data.map(async (item) => {
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
          setPdn1Data(formattedData);
        }
        setState({ ...state, open: false, Mode: "OK" });
      }
    } catch (error) {
      handelError(error);
    }
  };

  return (
    <IconBox>
      <IconButton onClick={Add} aria-label="Nouveau" size="small">
        {" "}
        <AddIcon fontSize="small" />{" "}
      </IconButton>
      <IconButton onClick={Print} aria-label="imprimer" size="small">
        {" "}
        <PrintIcon fontSize="small" />{" "}
      </IconButton>
      <IconButton
        onClick={() => Navigate("First")}
        aria-label="Premier"
        size="small"
      >
        {" "}
        <KeyboardDoubleArrowLeftIcon fontSize="small" />{" "}
      </IconButton>
      <IconButton
        onClick={() => Navigate("Previous")}
        aria-label="Précédent"
        size="small"
      >
        {" "}
        <KeyboardArrowLeftIcon fontSize="small" />{" "}
      </IconButton>
      <IconButton
        onClick={() => Navigate("Next")}
        aria-label="Suivant"
        size="small"
      >
        {" "}
        <KeyboardArrowRightIcon fontSize="small" />{" "}
      </IconButton>
      <IconButton
        onClick={() => Navigate("Last")}
        aria-label="Dernier"
        size="small"
      >
        {" "}
        <KeyboardDoubleArrowRightIcon fontSize="small" />{" "}
      </IconButton>
      <IconButton onClick={List} aria-label="Filtrer" size="small">
        {" "}
        <FormatListBulletedIcon fontSize="small" />{" "}
      </IconButton>
    </IconBox>
  );
};

export default ARPurchaseOrderToolBar;
