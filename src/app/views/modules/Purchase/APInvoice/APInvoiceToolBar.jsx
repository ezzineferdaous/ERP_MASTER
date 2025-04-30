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
// Define the main component APInvoiceToolBar
const APInvoiceToolBar = ({
  state,
  setState,
  handelError,
  setFormData,
  setAPIn,
  formData,
  setShowInvoiceList,
  Add,
}) => {
  // Set up the base URL and axios instance for API requests
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });

  // Function to handle printing the invoice
  const Print = async (e) => {
    e.preventDefault();
    try {
      alert("Print");
    } catch (error) {
      handelError(error);
    }
  };

  // Function to handle showing the list of invoices
  const List = async (e) => {
    e.preventDefault();
    try {
      setShowInvoiceList(true);
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle navigating through invoices
  const Navigate = async (direction) => {
    try {
      if (direction === "First") {
        const response = await axiosInstance.get(
          "OPCH/" + (await axiosInstance.get("OPCH/data/Min")).data.id + ""
        );
        console.log(response);
        setFormData(response.data);

        const responsePCH1 = await axiosInstance.get(
          "PCH1/data/Min/" + response.data.DocEntry + ""
        );
        if (responsePCH1.data.length > 0) {
          const formattedData = await Promise.all(
            responsePCH1.data.map(async (item) => {
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
          setAPIn(formattedData);
        }
        setState({ ...state, Mode: "OK" });
      } else if (direction === "Previous") {
        const previousOpch = await axiosInstance.get(
          "OPCH/data/Previous/" + formData.id + ""
        );
        if (previousOpch.data.id != null) {
          setFormData({
            id: previousOpch.data.id.id,
            DocEntry: previousOpch.data.id.DocEntry,
            DocNum: previousOpch.data.id.DocNum,
            DocDate: previousOpch.data.id.DocDate,
            DueDate: previousOpch.data.id.DueDate,
            CardCode: previousOpch.data.id.CardCode,
            CardName: previousOpch.data.id.CardName,
            DocStatus: previousOpch.data.id.DocStatus,
            TotalHT: previousOpch.data.id.TotalHT,
            DiscPrcnt: previousOpch.data.id.DiscPrcnt,
            RemiseTotal: previousOpch.data.id.RemiseTotal,
            VatSum: previousOpch.data.id.VatSum,
            DocTotal: previousOpch.data.id.DocTotal,
            UserSign: previousOpch.data.id.UserSign,
            Comment: previousOpch.data.id.Comment,
          });
          const previousPCH1 = await axiosInstance.get(
            "PCH1/data/Previous/" + previousOpch.data.id.DocEntry
          );
          if (previousPCH1.data.length > 0) {
            const formattedData = await Promise.all(
              previousPCH1.data.map(async (item) => {
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

            setAPIn(formattedData);
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
        // Navigate to the previous invoice
        const nextOpch = await axiosInstance.get(
          "OPCH/data/Next/" + formData.id + ""
        );
        if (nextOpch.data.id != null) {
          setFormData({
            id: nextOpch.data.id.id,
            DocEntry: nextOpch.data.id.DocEntry,
            DocNum: nextOpch.data.id.DocNum,
            DocDate: nextOpch.data.id.DocDate,
            DueDate: nextOpch.data.id.DueDate,
            CardCode: nextOpch.data.id.CardCode,
            CardName: nextOpch.data.id.CardName,
            DocStatus: nextOpch.data.id.DocStatus,
            TotalHT: nextOpch.data.id.TotalHT,
            DiscPrcnt: nextOpch.data.id.DiscPrcnt,
            RemiseTotal: nextOpch.data.id.RemiseTotal,
            VatSum: nextOpch.data.id.VatSum,
            DocTotal: nextOpch.data.id.DocTotal,
            UserSign: nextOpch.data.id.UserSign,
            Comment: nextOpch.data.id.Comment,
          });
          const nextPCH1 = await axiosInstance.get(
            "PCH1/data/Next/" + nextOpch.data.id.DocEntry
          );
          if (nextPCH1.data.length > 0) {
            const formattedData = await Promise.all(
              nextPCH1.data.map(async (item) => {
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
            setAPIn(formattedData);
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
        // Navigate to the last invoice
        const response = await axiosInstance.get(
          "OPCH/" + (await axiosInstance.get("OPCH/data/Max")).data.id + ""
        );
        setFormData(response.data);
        const responsePCH1 = await axiosInstance.get(
          "PCH1/data/Max/" + response.data.DocEntry + ""
        );
        if (responsePCH1.data.length > 0) {
          const formattedData = await Promise.all(
            responsePCH1.data.map(async (item) => {
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
          setAPIn(formattedData);
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

export default APInvoiceToolBar;
