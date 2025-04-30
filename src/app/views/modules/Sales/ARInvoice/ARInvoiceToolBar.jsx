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

const ARInvoiceToolBar = ({
  state,
  setState,
  handelError,
  setOinv,
  setInv1,
  Oinv,
  setShowOINVList,
  Add,
}) => {
  // Set up the base URL and axios instance for API requests
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });

  // Function to handle printing the OINV
  const Print = async (e) => {
    e.preventDefault();
    try {
      alert("Print");
    } catch (error) {
      handelError(error);
    }
  };

  // Function to handle showing the list of OINV
  const List = async (e) => {
    e.preventDefault();
    try {
      setShowOINVList(true);
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle navigating through OINV
  const Navigate = async (direction) => {
    try {
      if (direction === "First") {
        
        const response = await axiosInstance.get(
          "OINV/" + (await axiosInstance.get("OINV/data/Min")).data.id + ""
        );
        setOinv(response.data);

        const responseINV1 = await axiosInstance.get(
          "INV1/data/Min/" + response.data.DocEntry + ""
        );
        if (responseINV1.data.length > 0) {
          const formattedData = await Promise.all(
            responseINV1.data.map(async (item) => {
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
                PrixHT: item.PrixHT,
                Price: item.Price,
                Discount: item.Discount,
                RemiseTotal: item.RemiseTotal,
                VAT: item.VAT,
                LineTotal: item.LineTotal,
                LineHT: item.LineHT,
                UM: umResponse.data.NomUM,
              };
            })
          );
          
          setInv1(formattedData);
        }
        setState({ ...state, Mode: "OK" });
      } else if (direction === "Previous") {
        const previousOINV = await axiosInstance.get(
          "OINV/data/Previous/" + Oinv.id + ""
        );
        if (previousOINV.data.id != null) {
          setOinv({
            id: previousOINV.data.id.id,
            DocEntry: previousOINV.data.id.DocEntry,
            DocNum: previousOINV.data.id.DocNum,
            DocDate: previousOINV.data.id.DocDate,
            DueDate: previousOINV.data.id.DueDate,
            CardCode: previousOINV.data.id.CardCode,
            CardName: previousOINV.data.id.CardName,
            DocStatus: previousOINV.data.id.DocStatus,
            TotalHT: previousOINV.data.id.TotalHT,
            DiscPrcnt: previousOINV.data.id.DiscPrcnt,
            RemiseTotal: previousOINV.data.id.RemiseTotal,
            VatSum: previousOINV.data.id.VatSum,
            DocTotal: previousOINV.data.id.DocTotal,
            UserSign: previousOINV.data.id.UserSign,
            Comment: previousOINV.data.id.Comment,
          });
          const previousINV1 = await axiosInstance.get(
            "INV1/data/Previous/" + previousOINV.data.id.DocEntry
          );
          if (previousINV1.data.length > 0) {
            const formattedData = await Promise.all(
              previousINV1.data.map(async (item) => {
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
                  PrixHT: item.PrixHT,
                  Price: item.Price,
                  Discount: item.Discount,
                  RemiseTotal: item.RemiseTotal,
                  VAT: item.VAT,
                  LineTotal: item.LineTotal,
                  LineHT: item.LineHT,
                  UM: umResponse.data.NomUM,
                };
              })
            );
            setInv1(formattedData);
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
        const nextOINV = await axiosInstance.get(
          "OINV/data/Next/" + Oinv.id + ""
        );
        if (nextOINV.data.id != null) {
          setOinv({
            id: nextOINV.data.id.id,
            DocEntry: nextOINV.data.id.DocEntry,
            DocNum: nextOINV.data.id.DocNum,
            DocDate: nextOINV.data.id.DocDate,
            DueDate: nextOINV.data.id.DueDate,
            CardCode: nextOINV.data.id.CardCode,
            CardName: nextOINV.data.id.CardName,
            DocStatus: nextOINV.data.id.DocStatus,
            TotalHT: nextOINV.data.id.TotalHT,
            DiscPrcnt: nextOINV.data.id.DiscPrcnt,
            RemiseTotal: nextOINV.data.id.RemiseTotal,
            VatSum: nextOINV.data.id.VatSum,
            DocTotal: nextOINV.data.id.DocTotal,
            UserSign: nextOINV.data.id.UserSign,
            Comment: nextOINV.data.id.Comment,
          });
          const nextINV1 = await axiosInstance.get(
            "INV1/data/Next/" + nextOINV.data.id.DocEntry
          );
          if (nextINV1.data.length > 0) {
            const formattedData = await Promise.all(
              nextINV1.data.map(async (item) => {
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
                  PrixHT: item.PrixHT,
                  Price: item.Price,
                  Discount: item.Discount,
                  RemiseTotal: item.RemiseTotal,
                  VAT: item.VAT,
                  LineTotal: item.LineTotal,
                  LineHT: item.LineHT,
                  UM: umResponse.data.NomUM,
                };
              })
            );
            setInv1(formattedData);
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
          "OINV/" + (await axiosInstance.get("OINV/data/Max")).data.id + ""
        );
        setOinv(response.data);
        const responseINV1 = await axiosInstance.get(
          "INV1/data/Max/" + response.data.DocEntry + ""
        );
        if (responseINV1.data.length > 0) {
          const formattedData = await Promise.all(
            responseINV1.data.map(async (item) => {
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
                PrixHT: item.PrixHT,
                Price: item.Price,
                Discount: item.Discount,
                RemiseTotal: item.RemiseTotal,
                VAT: item.VAT,
                LineTotal: item.LineTotal,
                LineHT: item.LineHT,
                UM: umResponse.data.NomUM,
              };
            })
          );
          
          setInv1(formattedData);
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

export default ARInvoiceToolBar;
