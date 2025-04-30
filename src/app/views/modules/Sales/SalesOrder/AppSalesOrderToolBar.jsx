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

const AppSalesOrderToolBar = ({
  state,
  setState,
  handelError,
  setoRDR,
  setRDR1,
  oRDR,
  setEditIndex,
  setShowORDRList,
  Add,
}) => {
  // Set up the base URL and axios instance for API requests
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });

  // Function to handle printing the ORDR
  const Print = async (e) => {
    e.preventDefault();
    try {
      alert("Print");
    } catch (error) {
      handelError(error);
    }
  };

  // Function to handle showing the list of ORDR
  const List = async (e) => {
    e.preventDefault();
    try {
      setShowORDRList(true);
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle navigating through ORDR
  const Navigate = async (direction) => {
    try {
      if (direction === "First") {
        setEditIndex();
        const response = await axiosInstance.get(
          "ORDR/" + (await axiosInstance.get("ORDR/data/Min")).data.id + ""
        );
        console.log(response);
        setoRDR(response.data);

        const responsePOR1 = await axiosInstance.get(
          "RDR1/data/Min/" + response.data.DocEntry + ""
        );
        if (responsePOR1.data.length > 0) {
          const formattedData = await Promise.all(
            responsePOR1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(
                `Warehouse/${item.WhsCode}`
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
                LineTotal: item.LineTotal,
                LineHT: item.LineHT,
                UM: umResponse.data.NomUM,
            

              };
            })
          );
          setEditIndex();
          setRDR1(formattedData);
        }
        setState({ ...state, Mode: "OK" });
      } else if (direction === "Previous") {
        const previousOPOR = await axiosInstance.get(
          "ORDR/data/Previous/" + oRDR.id + ""
        );
        if (previousOPOR.data.id != null) {
          setoRDR({
            id: previousOPOR.data.id.id,
            DocEntry: previousOPOR.data.id.DocEntry,
            DocNum: previousOPOR.data.id.DocNum,
            DocDate: previousOPOR.data.id.DocDate,
            DueDate: previousOPOR.data.id.DueDate,
            CardCode: previousOPOR.data.id.CardCode,
            CardName: previousOPOR.data.id.CardName,
            DocStatus: previousOPOR.data.id.DocStatus,
            TotalHT : previousOPOR.data.id.TotalHT ,
            DiscPrcnt: previousOPOR.data.id.DiscPrcnt,
            RemiseTotal: previousOPOR.data.id.RemiseTotal,
            VatSum: previousOPOR.data.id.VatSum,
            DocTotal: previousOPOR.data.id.DocTotal,
            UserSign: previousOPOR.data.id.UserSign,
            Comment: previousOPOR.data.id.Comment,
          });
          const previousPOR1 = await axiosInstance.get(
            "RDR1/data/Previous/" + previousOPOR.data.id.DocEntry
          );
          if (previousPOR1.data.length > 0) {
            const formattedData = await Promise.all(
              previousPOR1.data.map(async (item) => {
                const warehouseResponse = await axiosInstance.get(
                  `Warehouse/${item.WhsCode}`
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
                  LineTotal: item.LineTotal,
                  LineHT: item.LineHT,
                  UM: umResponse.data.NomUM,
                 

                };
              })
            );
            setRDR1(formattedData);
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
        // Navigate to the previous ORDR
        const nextORDR = await axiosInstance.get(
          "ORDR/data/Next/" + oRDR.id + ""
        );
        if (nextORDR.data.id != null) {
          setoRDR({
            id: nextORDR.data.id.id,
            DocEntry: nextORDR.data.id.DocEntry,
            DocNum: nextORDR.data.id.DocNum,
            DocDate: nextORDR.data.id.DocDate,
            DueDate: nextORDR.data.id.DueDate,
            CardCode: nextORDR.data.id.CardCode,
            CardName: nextORDR.data.id.CardName,
            DocStatus: nextORDR.data.id.DocStatus,
            TotalHT : nextORDR.data.id.TotalHT ,
            DiscPrcnt: nextORDR.data.id.DiscPrcnt,
            RemiseTotal: nextORDR.data.id.RemiseTotal,
            VatSum: nextORDR.data.id.VatSum,
            DocTotal: nextORDR.data.id.DocTotal,
            UserSign: nextORDR.data.id.UserSign,
            Comment: nextORDR.data.id.Comment,
          });
          const nextRDR1 = await axiosInstance.get(
            "RDR1/data/Next/" + nextORDR.data.id.DocEntry
          );
          if (nextRDR1.data.length > 0) {
            const formattedData = await Promise.all(
              nextRDR1.data.map(async (item) => {
                const warehouseResponse = await axiosInstance.get(
                  `Warehouse/${item.WhsCode}`
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
                  LineTotal: item.LineTotal,
                  LineHT: item.LineHT,
                  UM: umResponse.data.NomUM,
                 

                };
              })
            );
            setRDR1(formattedData);
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
        // Navigate to the last ORDR
        const response = await axiosInstance.get(
          "ORDR/" + (await axiosInstance.get("ORDR/data/Max")).data.id + ""
        );
        setoRDR(response.data);
        const responsePOR1 = await axiosInstance.get(
          "RDR1/data/Max/" + response.data.DocEntry + ""
        );
        if (responsePOR1.data.length > 0) {
          const formattedData = await Promise.all(
            responsePOR1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(
                `Warehouse/${item.WhsCode}`
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
                LineTotal: item.LineTotal,
                LineHT: item.LineHT,
                UM: umResponse.data.NomUM,
                // isEditing: true, // chenge

              };
            })
          );
          setEditIndex();
          setRDR1(formattedData);
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

export default AppSalesOrderToolBar;