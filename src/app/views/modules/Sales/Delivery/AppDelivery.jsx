// Import necessary modules and components
import { Stack } from "@mui/material"; // Import Stack component from Material UI for layout
import { styled } from "@mui/system"; // Import styled utility for styling components
import { Breadcrumb, SimpleCard } from "app/components"; // Import custom components: Breadcrumb and SimpleCard
import DeliveryForm from "./DeliveryForm"; // Import DeliveryForm component
import { Menubar } from "primereact/menubar"; // Import Menubar from PrimeReact for menu bar functionality
import { useState, useEffect , useRef } from "react"; // Import React hooks: useState and useEffect for state management and side effects
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import DeliveryList from "./DeliveryList"; // Import DeliveryList component
import DeliveryToolBar from "./DeliveryToolBar"; // Import DeliveryToolBar component

// Define a styled container component using Material UI's styled utility
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }, // Adjust margin for small screens
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }, // Adjust breadcrumb margin for small screens
  },
}));

// Main functional component for the application form
const AppForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  // State management using useState hook
  const [state, setState] = useState({
    Mode: "Créer", // Default mode is 'Create'
    message: "Error", // Default error message
    open: false, // Controls the visibility of a modal or notification
    vertical: "top", // Positioning for modal/notification
    horizontal: "center",
    severity: "error", // Severity of the message (error, success, etc.)
  });

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Various state variables for managing form data and UI states

  const [ShowODLNList, setShowODLNList] = useState(false); // Toggle visibility of the DeliveryList
  const [open, setOpen] = useState(false); // Controls the modal visibility
  const [selectedField, setSelectedField] = useState(""); // Tracks the selected field in the form
  const [selectedItem, setSelectedItem] = useState([]); // Holds the selected item ((modifie 14102024))
  const [searchInputVisible, setSearchInputVisible] = useState(false); // Toggles visibility of search input
  const [searchQuery, setSearchQuery] = useState(""); // Tracks the search query for items
  const [lastSavedRow, setLastSavedRow] = useState(null); // Tracks the last saved row in the table
  const [vatOptions, setVatOptions] = useState([]); // Options for VAT fetched from the API

  // Axios instance with baseURL and other settings
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000, // Set a timeout for requests
    baseURL: baseUrl, // Base URL for API requests
    withCredentials: true, // Include credentials in requests
  });
  const [page, setPage] = useState(0); // Tracks the current page for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page in the table
  const [modalContentUM, setModalContentUM] = useState([]); // Data for UM modal content
  const [modalContentWhsCode, setModalContentWhsCode] = useState([]); // Data for Warehouse code modal
  const [modalContentItemCode, setModalContentItemCode] = useState([]); // Data for Item code modal
  const [modalContentCardCode, setModalContentCardCode] = useState([]); // Data for Card code modal

  // ODLN (Order) and PDN1 (Order details) state management
  const [OdlnData, setOdlnData] = useState({
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
  const [Dln1Data, setDln1Data] = useState([
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

  // Fetch VAT options when the component mounts using useEffect
  useEffect(() => {
    const fetchVatOptions = async () => {
      try {
        const res = await axiosInstance.get("Tax/");
        setVatOptions(res.data); // Set VAT options from API response
      } catch (error) {
        console.error("Error fetching VAT options:", error); // Handle error
      }
    };

    fetchVatOptions(); // Call function to fetch VAT options
  }, []);

  // Function to fetch the next available document entry number
  const fetchNextDocEntry = async (nextMode) => {
    try {
      const response = await axiosInstance.get("/ODLN/data/MaxDoc");
      const nextDocEntry = response.data.DocEntry;

      console.log(nextDocEntry);
      console.log(state.Mode);
      console.log(nextMode);

      if (state.Mode === "Créer" || nextMode === "Créer") {
        setOdlnData((prevData) => ({
          ...prevData,
          DocEntry: nextDocEntry,
          DocNum: nextDocEntry,
        }));
        setDln1Data((prevDln1) =>
          prevDln1.map((item) => ({
            ...item,
            DocEntry: nextDocEntry,
          }))
        );
      }

      console.log("after fetchNextDocEntry: " + state.Mode);
    } catch (error) {
      handelError(error); // Handle error if request fails
    }
  };

  // Function to handle adding a new ODLN and PDN1
  const Add = async (e) => {
    fetchNextDocEntry("Créer");

    setOdlnData({
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
    setDln1Data([
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

    setOdlnData((prevOdlnData) => {
      const updatedOdlnData = { ...prevOdlnData, [name]: formattedValue };

      if (state.Mode === "OK") {
        const newMode = updatedOdlnData.id === "" ? "Créer" : "Mettre à jour";
        setState((prevState) => ({ ...prevState, Mode: newMode }));
      }

      return updatedOdlnData;
    });
  }; 
  const handleCalculations2 = () => {
    const totalHT = Dln1Data.reduce(
      (acc, curr) => acc + parseFloat(curr.LineHT || 0),
      0
    );
    const remiseTotal = OdlnData.DiscPrcnt || 0;

    const totalAvecRemise = isManualEntry
      ? OdlnData.RemiseTotal || 0
      : (totalHT * remiseTotal) / 100;

    const totalARH = totalHT - totalAvecRemise;

    const SmTva = Dln1Data.reduce((acc, curr) => {
      const vat = parseFloat(curr.VAT || 0);
      const lineHT = parseFloat(curr.LineHT || 0);
      return acc + (vat * lineHT) / 100;
    }, 0);

    const vatSum = SmTva - (SmTva * remiseTotal) / 100;
    const docTotal = totalARH + vatSum;

    setOdlnData((prevOdlnData) => ({
      ...prevOdlnData,
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

  const previousDln1DataRef = useRef(); 

  useEffect(() => {
   
    const currentDln1DataWithoutVAT = Dln1Data.map(({ VAT, ...rest }) => rest);
    const previousDln1DataWithoutVAT = previousDln1DataRef.current?.map(({ VAT, ...rest }) => rest);
 
    const hasNonVatFieldChanged = JSON.stringify(currentDln1DataWithoutVAT) !== JSON.stringify(previousDln1DataWithoutVAT);
 
   
    if (hasNonVatFieldChanged) {
      handleCalculations2();
    }
    previousDln1DataRef.current = Dln1Data;
 
  }, [Dln1Data]);

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

  // Select an item from the modal

  const handleSelectItem = (item) => {
    const isSelected = selectedItem.some(
      (selected) => selected.number === item.number
    );

    if (
      selectedField.name === "ItemCode" &&
      Dln1Data[selectedField.index].ItemCode
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
    const updatediqr1 = Dln1Data.map((iqr, i) =>
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
      ...OdlnData,
      [selectedField.name]:
        selectedField.name === "CardCode"
          ? item.description
          : OdlnData[selectedField.name],
      ...(selectedField.name === "CardCode" && { CardName: item.number }),
    };

    setOdlnData(updatedoiqr);
    setDln1Data(updatediqr1);
    handleCloseModal();
  };
  // Save the selected item from modal

  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedDln1Data = Dln1Data.filter((row) => row.ItemCode !== "");

      if (selectedItem.length > 0) {
        const currentRow = Dln1Data[selectedField.index];

        if (!currentRow.ItemCode) {
          selectedItem.forEach((item) => {
            updatedDln1Data.push({
              DocEntry: next,
              LineNum: updatedDln1Data.length + 1,
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

          updatedDln1Data[selectedField.index] = updatedRow;
        }

        setDln1Data(updatedDln1Data);
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
    return Dln1Data.map((PDN1) => {
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

  // Check if all fields in por are filled
  const allFieldsFilled = () => {
    return Dln1Data.every((por) => {
      return por.ItemCode;
    });
  };

  const allFieldsFilleddd = () => {
    if (!OdlnData.CardCode) return `Saisir le code du Client`;
    if (!OdlnData.CardName) return `Saisir le nom du Client`;

    for (const [index, por] of Dln1Data.entries()) {
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
 
      for (let Dln1DataItem of preparedIqr1) {
        const itemCode = Dln1DataItem.ItemCode;
        const QuantityDln1Data = parseInt(Dln1DataItem.Quantity, 10);
        if (quantitiesMap[itemCode]) {
          quantitiesMap[itemCode] += QuantityDln1Data;
        } else {
          quantitiesMap[itemCode] = QuantityDln1Data;
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
      TransType: "15",  
      CardCode: OdlnData.CardCode,  
      DocNum: OdlnData.DocNum,  
      ItemCode: item.ItemCode,  
      LineNum: item.LineNum,
      WhsCode: item.WhsCode,  
      Price: item.Price,  
      InQty: "0",  
      OutQty: item.Quantity,  
    }));

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


    if (state.Mode === "Créer") {
      try {
        await Promise.all([
          axiosInstance.post("ODLN", OdlnData),
          ...preparedIqr1.map((item) => axiosInstance.post("DLN1", item)),
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
        setOdlnData({
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
        setDln1Data([
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

        await fetchNextDocEntry("Créer");
      } catch (error) {
        handelError(error);
      }
    } else if (state.Mode === "Mettre à jour") {
      try {
        await Promise.all([axiosInstance.put(`ODLN/${OdlnData.id}`, OdlnData)]);

        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Opération correctement achevée",
          severity: "success",
        });

        setOdlnData({
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

        setDln1Data([
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
        { name: "Ventes", path: "/Delivery" },
        { name: "Livraison client" },
      ]}
    />
  );

  const end = (
    <DeliveryToolBar
      Add={Add}
      setShowODLNList={setShowODLNList}
      Dln1Data={Dln1Data}
      fetchNextDocEntry={fetchNextDocEntry}
      state={state}
      setState={setState}
      today={today}
      OdlnData={OdlnData}
      setDln1Data={setDln1Data}
      setOdlnData={setOdlnData}
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
        {ShowODLNList ? (
          <DeliveryList
            state={state}
            setState={setState}
            setDln1Data={setDln1Data}
            OdlnData={OdlnData}
            setOdlnData={setOdlnData}
            setShowODLNList={setShowODLNList}
          />
        ) : (
          <SimpleCard>
            <DeliveryForm
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
              setState={setState}
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
              setShowODLNList={setShowODLNList}
              handleChange={handleChange}
              handleCalculations2={handleCalculations2}
              fetchNextDocEntry={fetchNextDocEntry}
              state={state}
              today={today}
              OdlnData={OdlnData}
              Dln1Data={Dln1Data}
              setDln1Data={setDln1Data}
              handelError={handelError}
              setOdlnData={setOdlnData}
            />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
