// Impdnt necessary modules and components
import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import ARGoodsReceiptForm from "./ARGoodsReceiptForm";
import { Menubar } from "primereact/menubar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ARGoodsReceiptList from "./ARGoodsReceiptList";
import ARGoodsReceiptToolBar from "./ARGoodsReceiptToolBar";

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
  const [state, setState] = useState({
    Mode: "Créer",
    message: "Error",
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "error",
  });
  const today = new Date().toISOString().split("T")[0];
  const [ShowOPDNList, setShowOPDNList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
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

  // OPDN and PDN1 data state management
  const [OpdnData, setOpdnData] = useState({
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
  const [Pdn1Data, setPdn1Data] = useState([
    {
      id: "",
      DocEntry: "",
      LineNum: "1",
      ItemCode: "",
      ItemName: "",
      Quantity: 1,
      WhsCode: "",
      PriceHT: "",
      VAT: "0",
      Price: "",
      Discount: 0,
      RemiseTotal: "",
      LineTotal: "",
      LineHT: "",
      UM: "",
      isEditing: true,
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
      const response = await axiosInstance.get("/OPDN/data/MaxDoc");
      const nextDocEntry = response.data.DocEntry;

      console.log(nextDocEntry);
      console.log(state.Mode);
      console.log(nextMode);

      if (
        state.Mode === "Créer" ||
        nextMode === "Créer"
      ) {
        setOpdnData((prevData) => ({
          ...prevData,
          DocEntry: nextDocEntry,
          DocNum: nextDocEntry,
        }));
        setPdn1Data((prevIge1) =>
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

  // Function to handle adding a new OPDN and PDN1
  const Add = async (e) => {
    fetchNextDocEntry("Créer");
    setOpdnData({
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
    setPdn1Data([
      {
        DocEntry: "",
        LineNum: "1",
        ItemCode: "",
        ItemName: "",
        Quantity: 1,
        WhsCode: "",
        PriceHT: "",
        VAT: "",
        Price: "",
        Discount: 0,
        RemiseTotal: "",
        LineTotal: "",
        LineHT: "",
        UM: "",
        isEditing: true,
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

  // Open modal with field options

  const [isManualEntry, setIsManualEntry] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const formattedValue = typeof value === 'string' ? value.replace(',', '.') : value;

    if (name === "RemiseTotal") {
      setIsManualEntry(true);
    } else if (name === "DiscPrcnt") {
      setIsManualEntry(false);
    }

    setOpdnData((prevOpdnData) => {
      const updatedOpdnData = { ...prevOpdnData, [name]: formattedValue };

      if (state.Mode === "OK") {
        const newMode = updatedOpdnData.id === "" ? "Créer" : "Mettre à jour";
        setState((prevState) => ({ ...prevState, Mode: newMode }));
      }

      return updatedOpdnData;
    });
  };
  const handleCalculations2 = () => {
    const totalHT = Pdn1Data.reduce(
      (acc, curr) => acc + parseFloat(curr.LineHT || 0),
      0
    );
    const remiseTotal = OpdnData.DiscPrcnt || 0;

    const totalAvecRemise = isManualEntry
      ? OpdnData.RemiseTotal || 0
      : (totalHT * remiseTotal) / 100;

    const totalARH = totalHT - totalAvecRemise;

    const SmTva = Pdn1Data.reduce((acc, curr) => {
      const vat = parseFloat(curr.VAT || 0);
      const lineHT = parseFloat(curr.LineHT || 0);
      return acc + (vat * lineHT) / 100;
    }, 0);

    const vatSum = SmTva - (SmTva * remiseTotal) / 100;
    const docTotal = totalARH + vatSum;

    setOpdnData((prevOpdnData) => ({
      ...prevOpdnData,
      TotalHT: !isManualEntry ? totalHT.toFixed(2) : totalHT,
      RemiseTotal: !isManualEntry
        ? totalAvecRemise.toFixed(2)
        : totalAvecRemise,
      DiscPrcnt: isManualEntry
        ? (totalHT !== 0 ? (totalAvecRemise / totalHT) * 100 : 0).toFixed(2)
        : remiseTotal,
      VatSum: !isManualEntry ? vatSum.toFixed(2) : vatSum,
      DocTotal: !isManualEntry ? docTotal.toFixed(2) : docTotal,
      SmTva: !isManualEntry ? SmTva.toFixed(2) : SmTva,
    }));
  };
  const previousPdn1DataRef = useRef();

  useEffect(() => {
   
    const currentPdn1DataWithoutVAT = Pdn1Data.map(({ VAT, ...rest }) => rest);
    const previousPdn1DataWithoutVAT = previousPdn1DataRef.current?.map(({ VAT, ...rest }) => rest);
 
    const hasNonVatFieldChanged = JSON.stringify(currentPdn1DataWithoutVAT) !== JSON.stringify(previousPdn1DataWithoutVAT);
 
   
    if (hasNonVatFieldChanged) {
      handleCalculations2();
    }
    previousPdn1DataRef.current = Pdn1Data;
 
  }, [Pdn1Data]);
  
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
          if (item.CodeUMA) {
            try {
              const umResponse = await axiosInstance.get(`UM/${item.CodeUMA}`);
              nomUM = umResponse.data.NomUM;
            } catch (umError) {
              console.error("Failed to fetch NomUM data:", umError);
            }
          } else {
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
          } else {
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
          } else {
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
    const isSelected = selectedItem.some(
      (selected) => selected.number === item.number
    );

    if (
      selectedField.name === "ItemCode" &&
      Pdn1Data[selectedField.index].ItemCode
    ) {
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
    setSearchQuery("");
    setSearchInputVisible(false);
    setSelectedItem([]);
  };
  
  // Handle item selection from modal
  const handleSelect = (item) => {
    const updatediqr1 = Pdn1Data.map((iqr, i) =>
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
      ...OpdnData,
      [selectedField.name]:
        selectedField.name === "CardCode"
          ? item.description
          : OpdnData[selectedField.name],
      ...(selectedField.name === "CardCode" && { CardName: item.number }),
    };

    setOpdnData(updatedoiqr);
    setPdn1Data(updatediqr1);
    handleCloseModal();
  };
  // Save the selected item from modal
  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedPdn1Data = Pdn1Data.filter((row) => row.ItemCode !== "");

      if (selectedItem.length > 0) {
        const currentRow = Pdn1Data[selectedField.index];

        if (!currentRow.ItemCode) {
          selectedItem.forEach((item) => {
            updatedPdn1Data.push({
              DocEntry: next,
              LineNum: updatedPdn1Data.length + 1,
              ItemCode: item.number,
              ItemName: item.description,
              Quantity: 1,
              WhsCode: item.NomWarehouse || "",
              PrixHT: "",
              Price: "",
              Discount: "",
              RemiseTotal: "",
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

          updatedPdn1Data[selectedField.index] = updatedRow;
        }

        setPdn1Data(updatedPdn1Data);
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
    return Pdn1Data.map((PDN1) => {
      const umItem =
        modalContentItemCode.find((item) => item.NomUM === PDN1.UM)?.CodeUMA ||
        modalContentUM.find((item) => item.description === PDN1.UM)?.id;
      const whsCodeItem =
        modalContentItemCode.find((item) => item.NomWarehouse === PDN1.WhsCode)
          ?.Magasin ||
        modalContentWhsCode.find((item) => item.description === PDN1.WhsCode)
          ?.number;

      return {
        ...PDN1,
        UM: umItem,
        WhsCode: whsCodeItem || PDN1.WhsCode,
      };
    });
  };

  // Check if all fields in pdn are filled
  const allFieldsFilled = () => {
    return Pdn1Data.every((pdn) => {
      return pdn.ItemCode;
    });
  };

  const allFieldsFilleddd = () => {
    if (!OpdnData.CardCode) return `Saisir le code du fournisseur`;
    if (!OpdnData.CardName) return `Saisir le nom du fournisseur`;

    for (const [index, pdn] of Pdn1Data.entries()) {
      if (!pdn.ItemCode)
        return `Saisir le code article dans la ligne ${index + 1}`;
      if (!pdn.ItemName)
        return `Saisir le nom de l'article dans la ligne  ${index + 1}`;
      if (!pdn.Quantity) return `Saisir la quantité dans la ligne ${index + 1}`;
      if (!pdn.WhsCode) return `Saisir le magasin dans la ligne ${index + 1}`;
      if (!pdn.Price) return `Saisir le prix TTC dans la ligne ${index + 1}`;
      if (!pdn.UM) return `Saisir l'unité de mesure dans la ligne ${index + 1}`;
    }

    return true;
  };
  const updateStock = async (preparedIqr1) => {
    try {
      const itemResponse = await axiosInstance.get("Item/");  
      const items = itemResponse.data;
      const updatedItems = [];
      const quantitiesMap = {};
  
      for (let Pdn1DataItem of preparedIqr1) {
        const itemCode = Pdn1DataItem.ItemCode;
        const QuantityRdn1 = parseInt(Pdn1DataItem.Quantity, 10);
        if (quantitiesMap[itemCode]) {
          quantitiesMap[itemCode] += QuantityRdn1;
        } else {
          quantitiesMap[itemCode] = QuantityRdn1;
        }
      }
  
      for (let item of items) {
        const itemCode = item.ItemCode;
        const currentStock = item.EnStock ? parseInt(item.EnStock, 10) : 0;
        if (quantitiesMap[itemCode]) {
          const newQuantité = currentStock + quantitiesMap[itemCode];
  
          updatedItems.push({
            ItemCode: itemCode,
            newQuantité: newQuantité
          });
        }
      }
  
      for (let update of updatedItems) {
        await axiosInstance.post('Item/stock', {
          ItemCode: update.ItemCode ,
          newQuantité: update.newQuantité ,
        });
      }
  
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
      TransType: "20",  
      CardCode: OpdnData.CardCode,  
      DocNum: OpdnData.DocNum,  
      ItemCode: item.ItemCode,  
      LineNum: item.LineNum,
      WhsCode: item.WhsCode,  
      Price: item.Price,  
      InQty: item.Quantity, 
      OutQty: "0", 
    }));

    if (state.Mode === "Créer") {
      try {
        await Promise.all([
          axiosInstance.post("OPDN", OpdnData),
          ...preparedIqr1.map((item) => axiosInstance.post("PDN1", item)),
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
        setOpdnData({
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
        setPdn1Data([
          {
            DocEntry: "",
            LineNum: "1",
            ItemCode: "",
            ItemName: "",
            Quantity: 1,
            WhsCode: "",
            PriceHT: "",
            VAT: "",
            Price: "",
            Discount: 0,
            RemiseTotal: "",
            LineTotal: "",
            LineHT: "",
            UM: "",
            isEditing: true, //add colone
          },
        ]);
        await fetchNextDocEntry("Créer");
        await updateStock(preparedIqr1);
      } catch (error) {
        handelError(error);
      }
    } else if (state.Mode === "Mettre à jour") {
      try {
        await Promise.all([axiosInstance.put(`OPDN/${OpdnData.id}`, OpdnData)]);
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Opération correctement achevée",
          severity: "success",
        });

        setOpdnData({
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

        setPdn1Data([
          {
            LineNum: "",
            ItemCode: "",
            ItemName: "",
            Quantity: "1",
            WhsCode: "",
            PriceHT: "",
            VAT: 0,
            Price: "",
            Discount: 0,
            RemiseTotal: "",
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

  const start = (
    <Breadcrumb
      routeSegments={[
        { name: "Achat", path: "/GoodsReceipt" },
        { name: "Réception de marchandises" },
      ]}
    />
  );

  const end = (
    <ARGoodsReceiptToolBar
      Add={Add}
      setShowOPDNList={setShowOPDNList}
      Pdn1Data={Pdn1Data}
      fetchNextDocEntry={fetchNextDocEntry}
      state={state}
      setState={setState}
      today={today}
      OpdnData={OpdnData}
      setPdn1Data={setPdn1Data}
      setOpdnData={setOpdnData}
      handelError={handelError}
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
        {ShowOPDNList ? (
          <ARGoodsReceiptList
            state={state}
            setState={setState}
            setPdn1Data={setPdn1Data}
            OpdnData={OpdnData}
            setOpdnData={setOpdnData}
            setShowOPDNList={setShowOPDNList}
          />
        ) : (
          <SimpleCard>
            <ARGoodsReceiptForm
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
              setShowOPDNList={setShowOPDNList}
              handleChange={handleChange}
              fetchNextDocEntry={fetchNextDocEntry}
              state={state}
              setState={setState}
              today={today}
              OpdnData={OpdnData}
              Pdn1Data={Pdn1Data}
              setPdn1Data={setPdn1Data}
              handelError={handelError}
              setOpdnData={setOpdnData}
              handleCalculations2={handleCalculations2}
            />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
