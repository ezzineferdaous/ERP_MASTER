// Import necessary modules and components
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import APCreditMemoForm from "./APCreditMemoForm";
import { Menubar } from "primereact/menubar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APCreditMemoList from "./APCreditMemoList";
import APCToolBar from "./APCToolBar";

// Define a styled container component
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppAPCreditMemo = () => {
  const navigate = useNavigate();
  // State management
  const [state, setState] = useState({
    Mode: "Créer",
    message: "Error",
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "error",
  });
  const today = new Date().toISOString().split("T")[0];
  const [editIndex, setEditIndex] = useState(0);
  const [ShowORPDList, setShowORPCList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    number: "",
    description: "",
  });
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSavedRow, setLastSavedRow] = useState(null);
  const [vatOptions, setVatOptions] = useState([]);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalContentUM, setModalContentUM] = useState([]);
  const [modalContentWhsCode, setModalContentWhsCode] = useState([]);
  const [modalContentItemCode, setModalContentItemCode] = useState([]);
  const [modalContentCardCode, setModalContentCardCode] = useState([]);

  // ORPC and RPC1 data state management
  const [oRPC, setoRPC] = useState({
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
  const [RPC1, setRPC1] = useState([
    {
      id: "",
      DocEntry: "",
      LineNum: 1,
      ItemCode: "",
      ItemName: "",
      Quantity: 1,
      WhsCode: "",
      PrixHT: "",
      Price: "",
      Discount: 0,
      VAT: "0",
      LineTotal: "",
      LineHT: "",
      UM: "",
      isEditing: true, // chenge
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

  // Fetch next DocEntry for new document creation
  const fetchNextDocEntry = async (nextMode) => {
    try {
      const response = await axiosInstance.get("/ORPC/data/MaxDoc");
      const nextDocEntry = response.data.DocEntry;

      console.log(nextDocEntry);
      console.log(state.Mode);
      console.log(nextMode);

      if (
        state.Mode === "Créer" ||
        state.Mode === "OK" ||
        nextMode === "Créer"
      ) {
        setoRPC((prevData) => ({
          ...prevData,
          DocEntry: nextDocEntry,
          DocNum: nextDocEntry,
        }));
        setRPC1((prevIge1) =>
          prevIge1.map((item) => ({
            ...item,
            DocEntry: nextDocEntry,
          }))
        );
      }

      console.log("after fetchNextDocEntry: " + state.Mode);
    } catch (error) {
      handelError(error);
    }
  };

  // Function to handle adding a new ORPC and RPC1
  const Add = async (e) => {
    fetchNextDocEntry("Créer");
    setEditIndex(0);
    setoRPC({
      DocEntry: "",
      DocNum: "",
      DocDate: today,
      DueDate: today,
      CardCode: "",
      CardName: "",
      DocStatus: "",
      Comment: "",
      TotalHT: "",
      DiscPrcnt: "",
      RemiseTotal: "",
      VatSum: "",
      DocTotal: "",
    });
    setRPC1([
      {
        DocEntry: "",
        LineNum: 1,
        ItemCode: "",
        ItemName: "",
        Quantity: 1,
        WhsCode: "",
        Price: "",
        Discount: 0,
        VAT: "",
        LineTotal: "",
        LineHT: "",
        UM: "",
        isEditing: true, // chenge
      },
    ]);
    setState({ ...state, Mode: "Créer" });
  };

  // Function to handle errors
  const handelError = (error) => {
    if (error.response) {
      setState({
        Mode: "Créer",
        vertical: "top",
        horizontal: "center",
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    } else if (error.request) {
      setState({
        Mode: "Créer",
        vertical: "top",
        horizontal: "center",
        open: true,
        message: "Network error",
        severity: "error",
      });
    } else {
      setState({
        Mode: "Créer",
        vertical: "top",
        horizontal: "center",
        open: true,
        message: error.message || "An error occurred",
        severity: "error",
      });
    }
  };
  



  const [isManualEntry, setIsManualEntry] = useState(false);
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "RemiseTotal") {
    setIsManualEntry(true);
  } else if (name === "DiscPrcnt") {
    setIsManualEntry(false);
  }

  const formattedValue = typeof value === 'string' ? value.replace(',', '.') : value;
 

  setoRPC((prevOrpd) => {
    const updatedOrpd = { ...prevOrpd, [name]: formattedValue };

    if (state.Mode === "OK") {
      const newMode = updatedOrpd.id === "" ? "Créer" : "Mettre à jour";
      setState((prevState) => ({ ...prevState, Mode: newMode }));
    }

    return updatedOrpd;
  });
};



const handleCalculate = () => {
  const totalHT = RPC1.reduce((acc, curr) => acc + parseFloat(curr.LineHT || 0), 0);
  const DiscPrcnt = (oRPC.DiscPrcnt) || 0;
  const RemiseTotal = isManualEntry
    ? (oRPC.RemiseTotal) || 0
    : (totalHT * DiscPrcnt) / 100;
  const totalARH = totalHT - RemiseTotal;

  const SmTva = RPC1.reduce((acc, curr) => {
    const vat = parseFloat(curr.VAT || 0);
    const lineHT = parseFloat(curr.LineHT || 0);
    return acc + ((vat * lineHT) / 100);
  }, 0);

  const vatSum = SmTva - ((SmTva * DiscPrcnt) / 100);
  const docTotal = totalARH + vatSum;

  setoRPC((prevOrpd) => ({
    ...prevOrpd,
    TotalHT: !isManualEntry ? totalHT.toFixed(2) : totalHT,
    RemiseTotal: !isManualEntry ? RemiseTotal.toFixed(2) : RemiseTotal,  
    DiscPrcnt: isManualEntry
      ? (totalHT !== 0 ? (RemiseTotal / totalHT * 100) : 0).toFixed(2)
      : DiscPrcnt,  
    VatSum: !isManualEntry ? vatSum.toFixed(2) : vatSum,  
    DocTotal: !isManualEntry ? docTotal.toFixed(2) : docTotal,  
    SmTva: !isManualEntry ? SmTva.toFixed(2) : SmTva  
  }));
};




  // Open modal with field options
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
          try {
            const umResponse = await axiosInstance.get(`UM/${item.CodeUMA}`);
            nomUM = umResponse.data.NomUM;
          } catch (umError) {
            console.error("Failed to fetch NomUM data:", umError);
          }

          try {
            const whResponse = await axiosInstance.get(
              `Warehouse/code/${item.Magasin}`
            );
            nomWarehouse = whResponse.data.NomWarehouse;
          } catch (whError) {
            console.error("Failed to fetch NomWarehouse data:", whError);
            nomWarehouse = "";
          }
          try {
            const taxResponse = await axiosInstance.get(
              `Tax/${item.GroupeTax}`
            );
            taxName = taxResponse.data.Rate;
          } catch (taxError) {
            console.error("Failed to fetch Tax data:", taxError);
            taxName = "";
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
        const filteredData = res.data.filter((item) => item.CardType === "S");
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


  
 
    

  // Select an item from the modal
  const handleSelectItem = (item) => {
    // Ensure selectedItem is always an array
    if (!Array.isArray(selectedItem)) {
      setSelectedItem([item]);
      return;
    }
  
    const isSelected = selectedItem.some(
      (selected) => selected.number === item.number
    );
  
    if (selectedField.name === "ItemCode" && RPC1[selectedField.index].ItemCode) {
      setSelectedItem([item]);
    } else {
      if (isSelected) {
        setSelectedItem((prevSelected) =>
          prevSelected.filter((selected) => selected.number !== item.number)
        );
      } else {
        setSelectedItem((prevSelected) => [...prevSelected, item]);
      }
    }
  };
  
  // Close the modal

  const handleCloseModal = () => {
    setOpen(false);
    setPage(0);
  };
  // Handle item selection from modal
  const handleSelect = (item) => {
    const updatediqr1 = RPC1.map((iqr, i) =>
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
      ...oRPC,
      [selectedField.name]:
        selectedField.name === "CardCode"
          ? item.description
          : oRPC[selectedField.name],
      ...(selectedField.name === "CardCode" && { CardName: item.number }),
    };

    setoRPC(updatedoiqr);
    setRPC1(updatediqr1);
    handleCloseModal();
  };
    // Save the selected item from modal
    const handleSaveSelectedItem = () => {
      if (selectedField.name === "ItemCode") {
        const next = fetchNextDocEntry();
        const updatedRdp1 = RPC1.filter(row => row.ItemCode !== "");
   
        if (selectedItem.length > 0) {
          const currentRow = RPC1[selectedField.index];
   
          if (!currentRow.ItemCode) {
            selectedItem.forEach(item => {
              updatedRdp1.push({
                DocEntry: next,
                LineNum: updatedRdp1.length + 1,
                ItemCode: item.number,
                ItemName: item.description,
                Quantity: 1,
                WhsCode: item.NomWarehouse || "",
                PrixHT: "",
                Price: "",
                Discount: "",
                VAT: item.NomTax || "0",
                LineTotal: "",
                LineHT: "",
                UM: item.NomUM || "",
                // edit  this  
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
            updatedRdp1[selectedField.index] = updatedRow;
          }
   
          setRPC1(updatedRdp1);
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
    return RPC1.map((RPC1) => {
      const umItem =
        modalContentItemCode.find((item) => item.NomUM === RPC1.UM)?.CodeUMA ||
        modalContentUM.find((item) => item.description === RPC1.UM)?.id;

      const whsCodeItem =
        modalContentItemCode.find((item) => item.NomWarehouse === RPC1.WhsCode)
          ?.Magasin ||
        modalContentWhsCode.find((item) => item.description === RPC1.WhsCode)
          ?.id;

      return {
        ...RPC1,
        UM: umItem,
        WhsCode: whsCodeItem || RPC1.WhsCode,
      };
    });
  };

  // Check if all fields in por are filled
  const allFieldsFilled = () => {
    return RPC1.every((por) => {
      return por.ItemCode;
    });
  };

  // const allFieldsFilleddd = () => {
  //   if (!oRPC.CardCode) return `Saisir le code du fournisseur`;
  //   if (!oRPC.CardName) return `Saisir le nom du fournisseur`;

  //   for (const [index, por] of RPC1.entries()) {
  //     if (!por.ItemCode)
  //       return `Saisir le code article dans la ligne ${index + 1}`;
  //     if (!por.ItemName)
  //       return `Saisir le nom de l'article dans la ligne  ${index + 1}`;
  //     if (!por.Quantity) return `Saisir la quantité dans la ligne ${index + 1}`;
  //     if (!por.WhsCode) return `Saisir le magasin dans la ligne ${index + 1}`;
  //     if (!por.Price) return `Saisir le prix TTC dans la ligne ${index + 1}`;
  //     if (!por.UM) return `Saisir l'unité de mesure dans la ligne ${index + 1}`;
  //   }

  //   return true;
  // };


  const updateStock = async (preparedIqr1) => {
    try {
      const itemResponse = await axiosInstance.get("Item/");  
      const items = itemResponse.data;
      console.log("002 Qty :" ,items);
      const updatedItems = [];
      const quantitiesMap = {};
      let stockError = false;
 
      for (let Rdp1Item of preparedIqr1) {
        const itemCode = Rdp1Item.ItemCode;
        const QuantityRdp1 = parseInt(Rdp1Item.Quantity, 10);
        if (quantitiesMap[itemCode]) {
          quantitiesMap[itemCode] += QuantityRdp1;
        } else {
          quantitiesMap[itemCode] = QuantityRdp1;
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
            stockError = true;  // إذا كانت الكمية أكبر من المخزون، تعيين error
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
    const fieldCheckResult = allFieldsFilled();

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

    if (state.Mode === "Créer") {
      try {
        // Perform API calls for ORPC, RPC1, and Stock
        await Promise.all([
          axiosInstance.post("ORPC", oRPC),
          ...preparedIqr1.map((item) => axiosInstance.post("RPC1", item)),
          ...preparedIqr1.map((item) =>
            axiosInstance.post("Stock", {
              TransType: 19,
              DocNum: oRPC.DocNum,
              CardCode: oRPC.CardCode,
              ItemCode: item.ItemCode,
              LineNum: item.LineNum,
              InQty: 0,
              OutQty: item.Quantity,
              WhsCode: item.WhsCode,
              Price: item.Price,
            })
          ),
        ]);
        //add this {
        const stockUpdateSuccess = await updateStock(preparedIqr1);
    
        if (!stockUpdateSuccess) {
          setState({
            ...state,
            open: true,
            message: "Erreur: La quantité demandée dépasse le stock disponible.",
            severity: "error",
          });
          return;  // إذا كان هناك خطأ في المخزون، توقف العملية
        }
     //}
    
        // Reset state and forms after successful operation
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Operation completed successfully",
          severity: "success",
        });
    
        setoRPC({
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
    
        setRPC1([
          {
            DocEntry: "",
            LineNum: 1,
            ItemCode: "",
            ItemName: "",
            Quantity: 1,
            WhsCode: "",
            PrixHT: "",
            Price: "",
            Discount: 0,
            VAT: "",
            LineTotal: "",
            LineHT: "",
            UM: "",
            isEditing: true, // change
          },
        ]);
    
        setEditIndex(0);
       
       await fetchNextDocEntry("Créer");
       
      } catch (error) {
        handelError(error);
      }
    } else if (state.Mode === "Mettre à jour") {
      try {
        // Perform API calls to update ORPC, RPC1, and Stock
        await Promise.all([
          axiosInstance.put(`ORPC/${oRPC.id}`, oRPC),
          ...preparedIqr1.map((item) =>
            axiosInstance.put(`Stock/${item.id}`, {
              TransType: 19,
              DocNum: oRPC.DocNum,
              CardCode: oRPC.CardCode,
              ItemCode: item.ItemCode,
              LineNum: item.LineNum,
              InQty: 0,
              OutQty: item.Quantity,
              WhsCode: item.WhsCode,
              Price: item.Price,
            })
          ),
        ]);
    
        // Reset state and forms after successful update
        setEditIndex(0);
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Opération correctement achevée",
          severity: "success",
        });
    
        setoRPC({
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
    
        setRPC1([
          {
            LineNum: "",
            ItemCode: "",
            ItemName: "",
            Quantity: 1,
            WhsCode: "",
            PrixHT: "",
            Price: "",
            Discount: 0,
            VAT: 0,
            LineTotal: "",
            LineHT: "",
            UM: "",
            isEditing: true, // change
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
 console.log(oRPC);
  const start = (
    <Breadcrumb
      routeSegments={[
        { name: "Achat", path: "/APCreditMemo" },
        { name: "Avoir fournisseur" },
      ]}
    />
  );

  const end = (
    <APCToolBar
      Add={Add}
      setShowORPCList={setShowORPCList}
      RPC1={RPC1}
      fetchNextDocEntry={fetchNextDocEntry}
      state={state}
      setState={setState}
      today={today}
      oRPC={oRPC}
      setRPC1={setRPC1}
      setoRPC={setoRPC}
      handelError={handelError}
      editIndex={editIndex}
      setEditIndex={setEditIndex}
    />
  );

  return (
    <Container>
      <div className="card">
        <Menubar
          start={start}
          end={end}
          style={{ border: "1px solid #dee2e600" }}
        />
      </div>

      <Stack spacing={3}>
        {ShowORPDList ? (
          <APCreditMemoList
            state={state}
            setState={setState}
            setRPC1={setRPC1}
            setEditIndex={setEditIndex}
            oRPC={oRPC}
            setoRPC={setoRPC}
            setShowORPCList={setShowORPCList}
          />
        ) : (
          <SimpleCard>
            <APCreditMemoForm
              handleCloseModal={handleCloseModal}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              allFieldsFilled={allFieldsFilled}
              handleSaveSelectedItem={handleSaveSelectedItem}
              handleSelectItem={handleSelectItem}
              handleOpenModal={handleOpenModal}
              setLastSavedRow={setLastSavedRow}
              lastSavedRow={lastSavedRow}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              setSearchInputVisible={setSearchInputVisible}
              searchInputVisible={searchInputVisible}
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
              setSelectedField={setSelectedField}
              selectedField={selectedField}
           
              modalContent={{
                UM: modalContentUM,
                WhsCode: modalContentWhsCode,
                ItemCode: modalContentItemCode,
                CardCode: modalContentCardCode,
              }}
              open={open}
              setOpen={setOpen}
              vatOptions={vatOptions}
              Mode={state.Mode}
              handleSubmit={handleSubmit}

              setShowORPCList={setShowORPCList}
              handleChange={handleChange}
              fetchNextDocEntry={fetchNextDocEntry}
              state={state}
              setState={setState}
              today={today}
              oRPC={oRPC}
              RPC1={RPC1}
              setRPC1={setRPC1}
              handelError={handelError}
              setoRPC={setoRPC}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              handleCalculate={handleCalculate}
            />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppAPCreditMemo;