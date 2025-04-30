// Import necessary modules and components
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import { Menubar } from "primereact/menubar";
import { useState, useEffect ,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ARInvoiceList from "./ARInvoiceList";
import ARInvoiceToolBar from "./ARInvoiceToolBar";
import ARInvoiceForm from "./ARInvoiceForm";
// Define a styled container component
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {
  const navigate = useNavigate();
  // State management
  const [state, setState] = useState({  Mode: "Créer",  message: "Error",  open: false,  vertical: "top",  horizontal: "center",  severity: "error",});
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedItem, setSelectedItem] = useState([]); 
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSavedRow, setLastSavedRow] = useState(null);
  const [vatOptions, setVatOptions] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout: 5000, baseURL: baseUrl, withCredentials: true,});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalContentUM, setModalContentUM] = useState([]);
  const [modalContentWhsCode, setModalContentWhsCode] = useState([]);
  const [modalContentItemCode, setModalContentItemCode] = useState([]);
  const [modalContentCardCode, setModalContentCardCode] = useState([]);
  const [ShowOINVList, setShowOINVList] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);  
  const previousInv1Ref = useRef();
  const [Oinv, setOinv] = useState({
    id: "",
    DocNum: "",
    DocDate: today,
    DueDate: today,
    UserSign: "",
    CardCode: "",
    CardName: "",
    DocEntry: "",
    Canceled: "No",
    DocStatus: "",
    Comment: "",
    TotalHT: "",
    DiscPrcnt: "",
    RemiseTotal: "",
    VatSum: "",
    DocTotal: "",
  });
  const [Inv1, setInv1] = useState([
    {
      id: "",
      DocEntry: "",
      LineNum: "1",
      ItemCode: "",
      ItemName: "",
      Quantity: 1,
      WhsCode: "",
      PrixHT:"",
      Price: "",
      Discount: 0,
      RemiseTotal:"",
      VAT: "0",
      LineTotal: "",
      LineHT: "",
      UM: "",
      isEditing: true, // add
    },
  ]);

  // Fetch VAT options on component mount
  useEffect(() => {
    const fetchVatOptions = async () => {
      try {
        const res = await axiosInstance.get("Tax/");
        setVatOptions(res.data);
      } catch (error) {
        console.error("Error fetching VAT options:", error);
      }
    };

    fetchVatOptions();
  }, []);

  useEffect(() => {
    const currentInv1WithoutVAT = Inv1.map(({ VAT, ...rest }) => rest);
    const previousInv1WithoutVAT = previousInv1Ref.current?.map(({ VAT, ...rest }) => rest);
    const hasNonVatFieldChanged = JSON.stringify(currentInv1WithoutVAT) !== JSON.stringify(previousInv1WithoutVAT);
  
    if (hasNonVatFieldChanged) {
      handleCalculations2();
    }
    previousInv1Ref.current = Inv1;
  
  }, [Inv1]);

  // Fetch next DocEntry for new document creation
  const fetchNextDocEntry = async (nextMode) => {
    try {
      const response = await axiosInstance.get("/OINV/data/MaxDoc");
      const nextDocEntry = response.data.DocEntry;
      if (state.Mode === "Créer" || nextMode === "Créer") {
        setOinv((prevData) => ({...prevData, DocEntry: nextDocEntry, DocNum: nextDocEntry,}));
        setInv1((prevInv1) => prevInv1.map((item) => ({ ...item, DocEntry: nextDocEntry,})));
      }
    } catch (error) {
      handelError(error);
    }
  };

  const Add = async (e) => {
    fetchNextDocEntry("Créer");
    setOinv({ DocEntry: "", DocNum: "",  DocDate: today, DueDate: today, CardCode: "",  CardName: "", DocStatus: "",  Comment: "", TotalHT: "",  DiscPrcnt: "", RemiseTotal: "",  VatSum: "", DocTotal: "",});
    setInv1([{ DocEntry: "", LineNum: "1", ItemCode: "", ItemName: "", Quantity: 1,  WhsCode: "", PrixHT:"", Price: "", Discount: 0, RemiseTotal:"", VAT: "", LineTotal: "", LineHT: "",  UM: "", isEditing: true, },]);
    setState({ ...state, Mode: "Créer" });
  };

  const handelError = (error) => {
    if (error.response) {
      setState({ Mode: "Créer", vertical: "top", horizontal: "center", open: true, message: error.response.data.message, severity: "error",});
    } else if (error.request) {
      setState({ Mode: "Créer", vertical: "top", horizontal: "center",  open: true, message: "Network error",  severity: "error",});
    } else {
      setState({ Mode: "Créer", vertical: "top", horizontal: "center", open: true, message: error.message || "An error occurred", severity: "error",});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = typeof value === 'string' ? value.replace(',', '.') : value;
  
    if (name === "RemiseTotal") {
      setIsManualEntry(true);
    } else if (name === "DiscPrcnt") {
      setIsManualEntry(false);
    }
  
    setOinv((prevOinv) => {
      const updatedOinv = { ...prevOinv, [name]: formattedValue };
      if (state.Mode === "OK") {
        const newMode = updatedOinv.id === "" ? "Créer" : "Mettre à jour";
        setState((prevState) => ({ ...prevState, Mode: newMode }));
      }
      return updatedOinv;
    });
  };

  const handleCalculations2 = () => {
    const totalTHH = Inv1.reduce((acc, curr) => acc + parseFloat(curr.LineHT || 0), 0);
    const discPrcnt = Oinv.DiscPrcnt || 0;

    const remiseTotal = isManualEntry ? Oinv.RemiseTotal || 0: (totalTHH * discPrcnt) / 100;
    const totalARH = totalTHH - remiseTotal;

    const SmTva = Inv1.reduce((acc, curr) => {
      const vat = parseFloat(curr.VAT || 0);
      const lineHT = parseFloat(curr.LineHT || 0);
      return acc + ((vat * lineHT) / 100);
    }, 0);
    
    const vatSum = SmTva - ((SmTva * discPrcnt) / 100);
    const docTotal = totalARH + vatSum;

  
    setOinv((prevOinv) => ({
      ...prevOinv,
      TotalHT: !isManualEntry ? totalTHH.toFixed(2) : totalTHH,
      RemiseTotal: !isManualEntry ? remiseTotal.toFixed(2) : remiseTotal,
      DiscPrcnt: isManualEntry ? (totalTHH !== 0 ? (remiseTotal / totalTHH * 100) : 0).toFixed(2) : discPrcnt,
      VatSum: !isManualEntry ? vatSum.toFixed(2) : vatSum,
      DocTotal: !isManualEntry ? docTotal.toFixed(2) : docTotal,
      SmTva: !isManualEntry ? SmTva.toFixed(2) : SmTva
    }));
  };

  const handleOpenModal = async (field, index) => {
    setSelectedField({ name: field, index });
    setOpen(true);

    if (field === "UM") {
      try {
        const res = await axiosInstance.get("UM/");
        const formattedData1 = res.data.map((item) => ({
          number: item.CodeUM,
          description: item.NomUM,
          id: item.id,
        }));
        setModalContentUM(formattedData1);
      } catch (error) {
        console.error("Failed to fetch UM data:", error);
      }
    } else if (field === "WhsCode") {
      try {
        const res = await axiosInstance.get("Warehouse/");
        const formattedData2 = res.data.map((item) => ({
          number: item.CodeWarehouse,
          description: item.NomWarehouse,
          id: item.id,
        }));
        setModalContentWhsCode(formattedData2);
      } catch (error) {
        console.error("Failed to fetch Warehouse data:", error);
      }
    } else if (field === "ItemCode") {
      try {
        const res = await axiosInstance.get("Item/");
        const formattedDataItemCode = res.data.map(async (item) => {
          let nomUM = item.CodeUMA;
          let nomWarehouse = item.Magasin;
          let taxName = item.GroupeTax;

        if (item.CodeUMA) {
          try {
            const umResponse = await axiosInstance.get(`UM/${item.CodeUMA}`);
            nomUM = umResponse.data.NomUM;
          } catch (umError) {
            console.error("Failed to fetch NomUM data:", umError);
          }
        }else {
          nomUM = "";
        }
        if (item.Magasin) {
          try {
            const whResponse = await axiosInstance.get(
              `Warehouse/code/${item.Magasin}`
            );
            nomWarehouse = whResponse.data.NomWarehouse;
          } catch (whError) {
            console.error("Failed to fetch NomWarehouse data:", whError);
            nomWarehouse = "";
          }
        }else {
          nomWarehouse = "";
        }
        if (item.GroupeTax) {
          try {
            const taxResponse = await axiosInstance.get(
              `Tax/${item.GroupeTax}`
            );
            taxName = taxResponse.data.Rate;
          } catch (taxError) {
            console.error("Failed to fetch Tax data:", taxError);
            taxName = "";
          }
        }else {
          taxName = 0;
        }

          return {
            number: item.ItemCode,
            description: item.ItemName,
            id: item.id,
            CodeUMA: item.CodeUMA,
            NomUM: nomUM, // Include NomUM in the data
            Magasin: item.Magasin, // Include Magasin
            NomWarehouse: nomWarehouse || "", // Include NomWarehouse
            GroupeTax: item.GroupeTax,
            NomTax: taxName || 0, // Include NomTax in the data
          };
        });
        const finalFormattedDataItemCode = await Promise.all(
          formattedDataItemCode
        );
        setModalContentItemCode(finalFormattedDataItemCode);
      } catch (error) {
        console.error("Failed to fetch Item data:", error);
      }
    } else if (field === "CardCode") {
      try {
        const res = await axiosInstance.get("Partner/");
        const filteredData = res.data.filter((item) => item.CardType === "C");
        const formattedDataCardCode = filteredData.map((item) => ({
          number: item.CardName,
          description: item.CardCode,
          id: item.id,
        }));
        setModalContentCardCode(formattedDataCardCode);
      } catch (error) {
        console.error("Failed to fetch Item data:", error);
      }
    }
  };

  const handleSelectItem = (item) => {
    const isSelected = selectedItem.some(selected => selected.number === item.number);
  
    if (selectedField.name === "ItemCode" && Inv1[selectedField.index].ItemCode) {
      
      setSelectedItem([item]); 
    } else {
      
      if (isSelected) {
        setSelectedItem(prevSelected => 
          prevSelected.filter(selected => selected.number !== item.number)
        );
      } else {
        setSelectedItem(prevSelected => [...prevSelected, item]);
      }
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpen(false);
    setPage(0);
    setSearchQuery("");
    setSearchInputVisible(false);
    setSelectedItem([]);
  };
  // Handle item selection from modal
  const handleSelect = (item) => {
    const updatediqr1 = Inv1.map((iqr, i) =>
      i === selectedField.index
        ? {
            ...iqr,
            [selectedField.name]:
              selectedField.name === "ItemCode"
                ? item.number
                : item.description,
            ...(selectedField.name === "ItemCode" && {
              ItemName: item.description,
            }),
            ...(selectedField.name === "ItemCode" && { UM: item.NomUM }),
            ...(selectedField.name === "ItemCode" && {
              WhsCode: item.NomWarehouse,
            }),
            ...(selectedField.name === "ItemCode" && { VAT: item.NomTax }), // Set the Tax field

            ...(selectedField.name === "UM" && { UM: item.description }),
            ...(selectedField.name === "WhsCode" && {
              WhsCode: item.description,
            }),
          }
        : iqr
    );
    const updatedoiqr = {
      ...Oinv,
      [selectedField.name]:
        selectedField.name === "CardCode"
          ? item.description
          : Oinv[selectedField.name],
      ...(selectedField.name === "CardCode" && { CardName: item.number }),
    };

    setOinv(updatedoiqr);
    setInv1(updatediqr1);
    handleCloseModal();
  };

  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedInv1 = Inv1.filter(row => row.ItemCode !== "");
  
      if (selectedItem.length > 0) {
        
        const currentRow = Inv1[selectedField.index];
  
        if (!currentRow.ItemCode) {
          
          selectedItem.forEach(item => {
            updatedInv1.push({
              DocEntry: next,
              LineNum: updatedInv1.length + 1,
              ItemCode: item.number,
              ItemName: item.description,
              Quantity: 1,
              WhsCode: item.NomWarehouse || "",
              PrixHT: "",
              Price: "",
              Discount: "",
              RemiseTotal:"",
              VAT: item.NomTax ,
              LineTotal: "",
              LineHT: "",
              UM: item.NomUM || "",
              isEditing: false,
            });
          });
        } else {
          
          const updatedRow = {
            ...currentRow,
            ItemCode: selectedItem[0].number,
            ItemName: selectedItem[0].description,
            WhsCode: selectedItem[0].NomWarehouse || "",
            VAT: selectedItem[0].NomTax || "0",
            UM: selectedItem[0].NomUM || "",
          };
  
          updatedInv1[selectedField.index] = updatedRow;
        }
  
        setInv1(updatedInv1);
        handleCloseModal();
      } else {
        handleCloseModal();
        console.error("No item selected!");
      }
    } else {
      if (selectedItem.length > 0) {
        handleSelect(selectedItem[0]);
      } else {
        handleCloseModal();
        console.error("No item selected!");
      }
    }
  
    setSelectedItem([]);
    setPage(0);
    setSearchQuery("");
    setSearchInputVisible(false);
  };
  
  // Prepare data for submission
  const prepareDataForSubmission = () => {
    return Inv1.map((PDN1) => {
      const umItem =
        modalContentItemCode.find((item) => item.NomUM === PDN1.UM)?.CodeUMA ||
        modalContentUM.find((item) => item.description === PDN1.UM)?.id;
    const whsCodeItem = modalContentItemCode.find((item) => item.NomWarehouse === PDN1.WhsCode) ?.Magasin || modalContentWhsCode.find((item) => item.description === PDN1.WhsCode) ?.number;

      return {
        ...PDN1,
        UM: umItem,
        WhsCode: whsCodeItem || PDN1.WhsCode,
      };
    });
  };

  // Check if all fields in por are filled
  const allFieldsFilled = () => {
    return Inv1.every((por) => {
      return por.ItemCode;
    });
  };

  const allFieldsFilleddd = () => {
    if (!Oinv.CardCode) return `Saisir le code du Client`;
    if (!Oinv.CardName) return `Saisir le nom du Client`;

    for (const [index, por] of Inv1.entries()) {
      if (!por.ItemCode)
        return `Saisir le code article dans la ligne ${index + 1}`;
      if (!por.ItemName)
        return `Saisir le nom de l'article dans la ligne  ${index + 1}`;
      if (!por.Quantity) return `Saisir la quantité dans la ligne ${index + 1}`;
      if (!por.WhsCode) return `Saisir le magasin dans la ligne ${index + 1}`;
      if (!por.Price) return `Saisir le prix TTC dans la ligne ${index + 1}`;
      if (!por.UM) return `Saisir l'unité de mesure dans la ligne ${index + 1}`;
    }

    return true;
  };

  const updateStock = async (preparedIqr1) => {
    try {
      const itemResponse = await axiosInstance.get("Item/");  
      const items = itemResponse.data;
      console.log("002 Qty :" ,items);
      const updatedItems = [];
      const quantitiesMap = {};
      let stockError = false;
  
      for (let Inv1Item of preparedIqr1) {
        const itemCode = Inv1Item.ItemCode;
        const QuantityInv1 = parseInt(Inv1Item.Quantity, 10); 
        if (quantitiesMap[itemCode]) {
          quantitiesMap[itemCode] += QuantityInv1;
        } else {
          quantitiesMap[itemCode] = QuantityInv1;
        }
      }
  
      for (let item of items) {
        const itemCode = item.ItemCode;
        
        const currentStock =  parseInt(item.EnStock, 10);
        console.log("002: ",currentStock)
        if (quantitiesMap[itemCode]) {
          const QuantityToDeduct = quantitiesMap[itemCode];
          if (QuantityToDeduct > currentStock) {
            console.error(`Erreur: La quantité demandée pour l'article ${itemCode} est supérieure au stock disponible. Stock actuel: ${currentStock}`);
            stockError = true; 
            break; 
          }
  
          const newQuantité = currentStock - QuantityToDeduct;
          console.log("002 newQuantité :" ,newQuantité);
  
          updatedItems.push({
            ItemCode: itemCode,
            newQuantité: newQuantité
          });
        }
      }

      if (stockError) {
        return false;  
      }
  
  
      for (let update of updatedItems) {
        await axiosInstance.post('Item/stock', {
          ItemCode: update.ItemCode ,
          newQuantité: update.newQuantité ,
        });
      }

      return true
  
    } catch (error) {
      console.error("Une erreur s'est produite lors du changement d'inventaire :", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fieldCheckResult = allFieldsFilleddd();

    if (fieldCheckResult !== true) {
      setState({
        ...state,
        open: true,
        message: ` ${fieldCheckResult}`,
        severity: "error",
      });
      return;
    }
    const preparedIqr1 = prepareDataForSubmission();
    const stockData = preparedIqr1.map((item) => ({
      TransType: "13",  
      CardCode: Oinv.CardCode,  
      DocNum: Oinv.DocNum,  
      ItemCode: item.ItemCode,  
      LineNum: item.LineNum, 
      WhsCode: item.WhsCode,  
      Price: item.Price,  
      InQty: "0",  
      OutQty: item.Quantity,  
    }));

    //add this {
    const stockUpdateSuccess = await updateStock(preparedIqr1);
  
    if (!stockUpdateSuccess) {
      setState({
        ...state,
        open: true,
        message: "Erreur: La quantité demandée dépasse le stock disponible.",
        severity: "error",
      });
      return;  
    }
    //}
    if (state.Mode === "Créer") {
      try {
        await Promise.all([
          axiosInstance.post("OINV", Oinv),
          ...preparedIqr1.map((item) => axiosInstance.post("INV1", item)),
          ...stockData.map((item) => axiosInstance.post("Stock", item)),

        ]);
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Operation completed successfully",
          severity: "success",
        });
        setOinv({
          DocNum: "",
          DocDate: today,
          DueDate: today,
          UserSign: "",
          CardCode: "",
          CardName: "",
          DocEntry: "",
          Canceled: "No",
          DocStatus: "",
          Comment: "",
          TotalHT: "",
          DiscPrcnt: "",
          RemiseTotal: "",
          VatSum: "",
          DocTotal: "",
        });
        setInv1([
          {
            DocEntry: "",
            LineNum: "1",
            ItemCode: "",
            ItemName: "",
            Quantity: 1,
            WhsCode: "",
            PrixHT:"",
            Price: "",
            Discount: 0,
            RemiseTotal:"",
            VAT: "",
            LineTotal: "",
            LineHT: "",
            UM: "",
            isEditing: true, 
          },
        ]);
        
        await fetchNextDocEntry("Créer");
        // await updateStock(preparedIqr1);
      } catch (error) {
        handelError(error);
      }
    } else if (state.Mode === "Mettre à jour") {
      try {
        await Promise.all([axiosInstance.put(`OINV/${Oinv.id}`, Oinv)]);
        
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Opération correctement achevée",
          severity: "success",
        });

        setOinv({
          DocDate: today,
          DueDate: today,
          UserSign: "",
          CardCode: "",
          CardName: "",
          Canceled: "",
          DocStatus: "",
          Comment: "",
          TotalHT: "",
          DiscPrcnt: "",
          RemiseTotal: "",
          VatSum: "",
          DocTotal: "",
          DocEntry: "",
        });

        setInv1([
          {
            LineNum: "",
            ItemCode: "",
            ItemName: "",
            Quantity: "1",
            WhsCode: "",
            PrixHT:"",
            Price: "",
            Discount: 0,
            RemiseTotal:"",
            VAT: 0,
            LineTotal: "",
            LineHT: "",
            UM: "",
            isEditing: true, 
          },
        ]);

        await fetchNextDocEntry("Créer");
      } catch (error) {
        handelError(error);
      }
    } else {
      navigate("/");
    }
  };

  const start = <Breadcrumb routeSegments={[{ name: "Ventes", path: "/SalesOrder" }, { name: "Facture client" }]} />;
  const end = (
    <ARInvoiceToolBar Add={Add} setShowOINVList={setShowOINVList} Inv1={Inv1} fetchNextDocEntry={fetchNextDocEntry}
      state={state} setState={setState} today={today} Oinv={Oinv} setInv1={setInv1} setOinv={setOinv} handelError={handelError}
    />
  );

  return (
    <Container>
      <div className="card">
        <Menubar  start={start}  end={end} style={{ border: "1px solid #dee2e600" }} />
      </div>
      <Stack spacing={3}>
        {ShowOINVList ? (
          <ARInvoiceList state={state} setState={setState} setInv1={setInv1} Oinv={Oinv} setOinv={setOinv} setShowOINVList={setShowOINVList} />
        ) : (
          <SimpleCard>
            <ARInvoiceForm
              handleCloseModal={handleCloseModal} page={page} handleCalculations2={handleCalculations2}
              setPage={setPage} rowsPerPage={rowsPerPage} setSearchInputVisible={setSearchInputVisible}
              setRowsPerPage={setRowsPerPage} allFieldsFilled={allFieldsFilled} searchQuery={searchQuery}
              handleSaveSelectedItem={handleSaveSelectedItem} searchInputVisible={searchInputVisible}
              handleSelectItem={handleSelectItem}handleOpenModal={handleOpenModal} vatOptions={vatOptions}
              setLastSavedRow={setLastSavedRow} lastSavedRow={lastSavedRow} setSearchQuery={setSearchQuery}
              setSelectedItem={setSelectedItem} selectedItem={selectedItem} selectedField={selectedField}
              setSelectedField={setSelectedField} setState={setState} Mode={state.Mode} setInv1={setInv1}
              modalContent={{ UM: modalContentUM,WhsCode: modalContentWhsCode, ItemCode: modalContentItemCode,
              CardCode: modalContentCardCode,}} state={state} today={today} Oinv={Oinv} Inv1={Inv1} open={open} 
              fetchNextDocEntry={fetchNextDocEntry} setShowOINVList={setShowOINVList} setOpen={setOpen}
              handleSubmit={handleSubmit} handleChange={handleChange} handelError={handelError} setOinv={setOinv}
            />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;