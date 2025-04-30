// Import necessary modules and components
import { Stack } from "@mui/material"; // Import Stack component from Material UI for layout
import { styled } from "@mui/system"; // Import styled utility for styling components
import { Breadcrumb, SimpleCard } from "app/components"; // Import custom components: Breadcrumb and SimpleCard
import SalesQuotationForm from "./SalesQuotationForm"; // Import SalesQuotationForm component
import { Menubar } from "primereact/menubar"; // Import Menubar from PrimeReact for menu bar functionality
import { useState, useEffect ,useRef } from "react"; // Import React hooks: useState and useEffect for state management and side effects
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import SalesQuotationList from "./SalesQuotationList"; // Import SalesQuotationList component
import SalesQuotationToolBar from "./SalesQuotationToolBar"; // Import SalesQuotationToolBar component

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
  // const [editIndex, setEditIndex] = useState(0); Index for editing a delivery (delete)
  const [ShowOQUTList, setShowOQUTList] = useState(false); // Toggle visibility of the SalesQuotationList
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

  // OQUT (Order) and QUT1 (Order details) state management
  const [OqutData, setOqutData] = useState({
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
  const [Qut1Data, setQut1Data] = useState([
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
      isEditing: true, //add colone
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
      const response = await axiosInstance.get("/OQUT/data/MaxDoc");
      const nextDocEntry = response.data.DocEntry;

      console.log(nextDocEntry);
      console.log(state.Mode);
      console.log(nextMode);

      // Set OQUT and QUT1 data to the next DocEntry
      if (
        state.Mode === "Créer" ||
        nextMode === "Créer"
      ) {
        setOqutData((prevData) => ({
          ...prevData,
          DocEntry: nextDocEntry,
          DocNum: nextDocEntry,
        }));
        setQut1Data((prevDln1) =>
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

  // Function to handle adding a new OQUT and QUT1
  const Add = async (e) => {
    fetchNextDocEntry("Créer");
    setOqutData({
      DocEntry: "",
      DocNum: "",
      DocDate: today,
      DueDate: today,
      CardCode: "",
      CardName: "",
      DocStatus: "",
      Comment: "",
      Total: "",
      DiscPrcnt: "",
      RemiseTotal: "",
      VatSum: "",
      DocTotal: "",
    });
    setQut1Data([
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

  // // Open modal with field options

  const [isManualEntry, setIsManualEntry] = useState(false);

  // Open modal with field options
  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = typeof value === 'string' ? value.replace(',', '.') : value;

    if (name === "RemiseTotal") {
      setIsManualEntry(true);
    } else if (name === "DiscPrcnt") {
      setIsManualEntry(false);
    }

    setOqutData((prevOqutData) => {
      const updatedOqutData = { ...prevOqutData, [name]: formattedValue };

      if (state.Mode === "OK") {
        const newMode = updatedOqutData.id === "" ? "Créer" : "Mettre à jour";
        setState((prevState) => ({ ...prevState, Mode: newMode }));
      }

      return updatedOqutData;
    });
  }; // UPDATE
  const handleCalculations2 = () => {
    const totalHT = Qut1Data.reduce(
      (acc, curr) => acc + parseFloat(curr.LineHT || 0),
      0
    );
    const remiseTotal = OqutData.DiscPrcnt || 0;

    const totalAvecRemise = isManualEntry
      ? OqutData.RemiseTotal || 0
      : (totalHT * remiseTotal) / 100;

    const totalARH = totalHT - totalAvecRemise;

    const SmTva = Qut1Data.reduce((acc, curr) => {
      const vat = parseFloat(curr.VAT || 0);
      const lineHT = parseFloat(curr.LineHT || 0);
      return acc + (vat * lineHT) / 100;
    }, 0);

    const vatSum = SmTva - (SmTva * remiseTotal) / 100;
    const docTotal = totalARH + vatSum;

    setOqutData((prevOqutData) => ({
      ...prevOqutData,
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
  const previousQut1DataRef = useRef();

  useEffect(() => {
   
    const currentQut1DataWithoutVAT = Qut1Data.map(({ VAT, ...rest }) => rest);
    const previousQut1DataWithoutVAT = previousQut1DataRef.current?.map(({ VAT, ...rest }) => rest);
 
    const hasNonVatFieldChanged = JSON.stringify(currentQut1DataWithoutVAT) !== JSON.stringify(previousQut1DataWithoutVAT);
 
   
    if (hasNonVatFieldChanged) {
      handleCalculations2();
    }
    previousQut1DataRef.current = Qut1Data;
 
  }, [Qut1Data]); 

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

  const handleSelectItem = (item) => {
    const isSelected = selectedItem.some(
      (selected) => selected.number === item.number
    );

    if (
      selectedField.name === "ItemCode" &&
      Qut1Data[selectedField.index].ItemCode
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
    const updatedqut1 = Qut1Data.map((iqr, i) =>
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
    const updatedoqut = {
      ...OqutData,
      [selectedField.name]:
        selectedField.name === "CardCode"
          ? item.description
          : OqutData[selectedField.name],
      ...(selectedField.name === "CardCode" && { CardName: item.number }),
    };

    setOqutData(updatedoqut);
    setQut1Data(updatedqut1);
    handleCloseModal();
  };
  // Save the selected item from modal(modifie 14102024)
  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedQut1Data = Qut1Data.filter((row) => row.ItemCode !== "");

      if (selectedItem.length > 0) {
        const currentRow = Qut1Data[selectedField.index];

        if (!currentRow.ItemCode) {
          selectedItem.forEach((item) => {
            updatedQut1Data.push({
              DocEntry: next,
              LineNum: updatedQut1Data.length + 1,
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

          updatedQut1Data[selectedField.index] = updatedRow;
        }

        setQut1Data(updatedQut1Data);
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
    return Qut1Data.map((QUT1) => {
      const umItem =
        modalContentItemCode.find((item) => item.NomUM === QUT1.UM)?.CodeUMA ||
        modalContentUM.find((item) => item.description === QUT1.UM)?.id;
      const whsCodeItem =
        modalContentItemCode.find((item) => item.NomWarehouse === QUT1.WhsCode)
          ?.Magasin ||
        modalContentWhsCode.find((item) => item.description === QUT1.WhsCode)
          ?.id;

      return {
        ...QUT1,
        UM: umItem,
        WhsCode: whsCodeItem || QUT1.WhsCode,
      };
    });
  };

  // Check if all fields in por are filled
  const allFieldsFilled = () => {
    return Qut1Data.every((por) => {
      return por.ItemCode;
    });
  };

  const allFieldsFilleddd = () => {
    if (!OqutData.CardCode) return `Saisir le code du Client`;
    if (!OqutData.CardName) return `Saisir le nom du Client`;

    for (const [index, por] of Qut1Data.entries()) {
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

    if (state.Mode === "Créer") {
      try {
        await Promise.all([
          axiosInstance.post("OQUT", OqutData),
          ...preparedIqr1.map((item) => axiosInstance.post("QUT1", item)),
        ]);
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Operation completed successfully",
          severity: "success",
        });
        setOqutData({
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
          Total: "",
          DiscPrcnt: "",
          RemiseTotal: "",
          VatSum: "",
          DocTotal: "",
        });
        setQut1Data([
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
        await Promise.all([axiosInstance.put(`OQUT/${OqutData.id}`, OqutData)]);

        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Opération correctement achevée",
          severity: "success",
        });

        setOqutData({
          DocDate: today,
          DueDate: today,
          UserSign: "",
          CardCode: "",
          CardName: "",
          Canceled: "",
          DocStatus: "",
          Comment: "",
          Total: "",
          DiscPrcnt: "",
          RemiseTotal: "",
          VatSum: "",
          DocTotal: "",
          DocEntry: "",
        });

        setQut1Data([
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
        { name: "Ventes", path: "/SalesQuotation" },
        { name: "Devis client" },
      ]}
    />
  );

  const end = (
    <SalesQuotationToolBar
      Add={Add}
      setShowOQUTList={setShowOQUTList}
      Qut1Data={Qut1Data}
      fetchNextDocEntry={fetchNextDocEntry}
      state={state}
      setState={setState}
      today={today}
      OqutData={OqutData}
      setQut1Data={setQut1Data}
      setOqutData={setOqutData}
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
        {ShowOQUTList ? (
          <SalesQuotationList
            state={state}
            setState={setState}
            setQut1Data={setQut1Data}
            OqutData={OqutData}
            setOqutData={setOqutData}
            setShowOQUTList={setShowOQUTList}
          />
        ) : (
          <SimpleCard>
            <SalesQuotationForm
              handleCloseModal={handleCloseModal}
              handleCalculations2={handleCalculations2}
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
              setShowOQUTList={setShowOQUTList}
              handleChange={handleChange}
              fetchNextDocEntry={fetchNextDocEntry}
              state={state}
              setState={setState}
              today={today}
              OqutData={OqutData}
              Qut1Data={Qut1Data}
              setQut1Data={setQut1Data}
              handelError={handelError}
              setOqutData={setOqutData}
            />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;
