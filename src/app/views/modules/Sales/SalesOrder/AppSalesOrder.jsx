import { Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SalesOrderForm from "./SalesOrderForm";
import { Menubar } from "primereact/menubar";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppSalesOrderList from "./AppSalesOrderList";
import AppSalesOrderToolBar from "./AppSalesOrderToolBar";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppSalesOrder = () => {
  const navigate = useNavigate();
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
  const [ShowORDRList, setShowORDRList] = useState(false);
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
  const [oRDR, setoRDR] = useState({
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
    TotalHT : "",
    DiscPrcnt: "",
    RemiseTotal: "",
    VatSum: "",
    DocTotal: "",
  });
  const [RDR1, setRDR1] = useState([
    {
      id: "",
      DocEntry: "",
      LineNum: "",
      ItemCode: "",
      ItemName: "",
      Quantity: 1,
      WhsCode: "",
      Price: "",
      Discount: 0,
      VAT: "0",
      LineTotal: "",
      UM: "",
      isEditing: true, // chenge
    },
  ]);

  // USEEFFECT TVA DATA
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

  
  const handleSelectItem = (item) => {
    // Ensure selectedItem is always an array
    if (!Array.isArray(selectedItem)) {
      setSelectedItem([item]);
      return;
    }
  
    const isSelected = selectedItem.some(
      (selected) => selected.number === item.number
    );
  
    if (selectedField.name === "ItemCode" && RDR1[selectedField.index].ItemCode) {
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

  
  const fetchNextDocEntry = async (nextMode) => {
    try {
      const response = await axiosInstance.get("/ORDR/data/MaxDoc");
      const nextDocEntry = response.data.DocEntry;

      console.log(nextDocEntry);
      console.log(state.Mode);
      console.log(nextMode);

      if (
        state.Mode === "Créer" ||
        state.Mode === "OK" ||
        nextMode === "Créer"
      ) {
        setoRDR((prevData) => ({
          ...prevData,
          DocEntry: nextDocEntry,
          DocNum: nextDocEntry,
        }));
        setRDR1((prevIge1) =>
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

  // Function to handle adding a new ORDR
  const Add = async (e) => {
    fetchNextDocEntry("Créer");
    setEditIndex(0);
    setoRDR({
      DocEntry: "",
      DocNum: "",
      DocDate: today,
      DueDate: today,
      CardCode: "",
      CardName: "",
      DocStatus: "",
      Comment: "",
      TotalHT : "",
      DiscPrcnt: "",
      RemiseTotal: "",
      VatSum: "",
      DocTotal: "",
    });
    setRDR1([
      {
        DocEntry: "",
        LineNum: "1",
        ItemCode: "",
        ItemName: "",
        Quantity: 1,
        WhsCode: "",
        Price: "",
        Discount: 0,
        VAT: "",
        LineTotal: "",
        UM: "",
        isEditing: true, // chenge

      },
    ]);
    setState({ ...state, Mode: "Créer" });
  };
  
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
 

  setoRDR((prevOrpd) => {
    const updatedOrpd = { ...prevOrpd, [name]: formattedValue };

    if (state.Mode === "OK") {
      const newMode = updatedOrpd.id === "" ? "Créer" : "Mettre à jour";
      setState((prevState) => ({ ...prevState, Mode: newMode }));
    }

    return updatedOrpd;
  });
};

  
  const handleCalculate = () => {
    const totalHT = RDR1.reduce(
      (acc, curr) => acc + parseFloat(curr.LineHT || 0), 0
    );
    const remiseTotal = (oRDR.DiscPrcnt) || 0;
    const totalAvecRemise = isManualEntry
      ? (oRDR.RemiseTotal) || 0
      : (totalHT * remiseTotal) / 100;
    const totalARH = totalHT - totalAvecRemise;
  
    const SmTva = RDR1.reduce((acc, curr) => {
      const vat = parseFloat(curr.VAT || 0);
      const lineHT = parseFloat(curr.LineHT || 0);
      return acc + ((vat * lineHT) / 100);
    }, 0);
  
    const vatSum = SmTva - ((SmTva * remiseTotal) / 100);
    const docTotal = totalARH + vatSum;
  
    setoRDR((prevOrpd) => ({
      ...prevOrpd,
      TotalHT : !isManualEntry ? totalHT.toFixed(2) : totalHT,
      RemiseTotal: !isManualEntry 
      ? totalAvecRemise.toFixed(2) 
      : totalAvecRemise,  
      DiscPrcnt: isManualEntry
        ? (totalHT !== 0 ? (totalAvecRemise / totalHT * 100) : 0).toFixed(2)
        : remiseTotal,  
      VatSum: !isManualEntry ? vatSum.toFixed(2) : vatSum,  
      DocTotal: !isManualEntry ? docTotal.toFixed(2) : docTotal,  
      SmTva: !isManualEntry ? SmTva.toFixed(2) : SmTva  
    }));
  };


/*add*/ 

const previousQut1DataRef = useRef();

  useEffect(() => {
   
    const currentQut1DataWithoutVAT = RDR1.map(({ VAT, ...rest }) => rest);
    const previousQut1DataWithoutVAT = previousQut1DataRef.current?.map(({ VAT, ...rest }) => rest);
 
    const hasNonVatFieldChanged = JSON.stringify(currentQut1DataWithoutVAT) !== JSON.stringify(previousQut1DataWithoutVAT);
 
   
    if (hasNonVatFieldChanged) {
      handleCalculate();
    }
    previousQut1DataRef.current = RDR1;
 
  }, [RDR1]); 

  /*fin*/
  
  
  
  const handleOpenModal = async (field, index) => {
    setSelectedField({ name: field, index });
    setOpen(true);

   if (field === 'UM') {
      try {
        const res = await axiosInstance.get("UM/");
        const formattedData1 = res.data.map(item => ({
          type: "UM",
          number: item.CodeUM,
          description: item.NomUM,
          id: item.id
        }));
        setModalContentUM(formattedData1);
      } catch (error) {
        console.error("Failed to fetch UM data:", error);
      }
    } else if (field === 'WhsCode') {
      try {
        const res = await axiosInstance.get("Warehouse/");
        const formattedData2 = res.data.map(item => ({
          type: "WhsCode",
          number: item.CodeWarehouse,
          description: item.NomWarehouse,
          id: item.id
        }));
        setModalContentWhsCode(formattedData2);
      } catch (error) {
        console.error("Failed to fetch Warehouse data:", error);
      }
    }  else if (field === 'ItemCode') {
      try {
          const res = await axiosInstance.get("Item/");
          const formattedDataItemCode = res.data.map(async item => {
              let nomUM = item.CodeUMA;
              let nomWarehouse = item.Magasin;
              let taxName = item.GroupeTax; // Fetch Tax Group

              try {
                  const umResponse = await axiosInstance.get(`UM/${item.CodeUMA}`);
                  nomUM = umResponse.data.NomUM;
              } catch (umError) {
                  console.error("Failed to fetch NomUM data:", umError);
              }

              try {
                  const whResponse = await axiosInstance.get(`Warehouse/${item.Magasin}`);
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
            taxName = "0";
          }

          return {
            number: item.ItemCode,
            description: item.ItemName,
            id: item.id,
            CodeUMA: item.CodeUMA,
            NomUM: nomUM, // Include NomUM in the data
            Magasin: item.Magasin, // Include Magasin
            NomWarehouse: nomWarehouse || "", // Include NomWarehouse
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


  // Close the modal
  const handleCloseModal = () => {
    setOpen(false);
    setPage(0);
  };
  // Handle item selection from modal
  const handleSelect = (item) => {
    const updatediqr1 = RDR1.map((iqr, i) =>
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
      ...oRDR,
      [selectedField.name]:
        selectedField.name === "CardCode"
          ? item.description
          : oRDR[selectedField.name],
      ...(selectedField.name === "CardCode" && { CardName: item.number }),
    };

    setoRDR(updatedoiqr);
    setRDR1(updatediqr1);
    handleCloseModal();
  };

  // Save the selected item from modal
  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedRdp1 = RDR1.filter(row => row.ItemCode !== "");
 
      if (selectedItem.length > 0) {
        const currentRow = RDR1[selectedField.index];
 
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
 
        setRDR1(updatedRdp1);
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

  const prepareDataForSubmission = () => {
    return RDR1.map((RDR1) => {
      const umItem =
        modalContentItemCode.find((item) => item.NomUM === RDR1.UM)?.CodeUMA ||
        modalContentUM.find((item) => item.description === RDR1.UM)?.id;
      const whsCodeItem =
        modalContentItemCode.find((item) => item.NomWarehouse === RDR1.WhsCode)
          ?.Magasin ||
        modalContentWhsCode.find((item) => item.description === RDR1.WhsCode)
          ?.id;

      return {
        ...RDR1,
        UM: umItem,
        WhsCode: whsCodeItem || RDR1.WhsCode,
      };
});
  };

  // Check if all fields in por are filled
  const allFieldsFilled = () => {
    return RDR1.every((por) => {
      return por.ItemCode;
    });
  };
  const allFieldsFilleddd = () => {
    if (!oRDR.CardCode) return ` Saisir le code du Client`;
    if (!oRDR.CardName) return `Saisir le nom du Client `;

    for (const [index, por] of RDR1.entries()) {
      if (!por.ItemCode)
        return `Saisir le code article dans la ligne ${index + 1}`;
      if (!por.ItemName)
        return `Saisir le nom de l'article dans la ligne ${index + 1}`;
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
          axiosInstance.post("ORDR", oRDR),
          ...preparedIqr1.map((item) => axiosInstance.post("RDR1", item)),
        ]);
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Operation completed successfully",
          severity: "success",
        });
        setoRDR({
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
          TotalHT : "",
          DiscPrcnt: "",
          RemiseTotal: "",
          VatSum: "",
          DocTotal: "",
        });
        setRDR1([
          {
            DocEntry: "",
            LineNum: "1",
            ItemCode: "",
            ItemName: "",
            Quantity: 1,
            WhsCode: "",
            Price: "",
            Discount: 0,
            VAT: "",
            LineTotal: "",
            UM: "",
            isEditing: true, // chenge
          },
        ]);
        setEditIndex(0);
        await fetchNextDocEntry("Créer");
      } catch (error) {
        handelError(error);
      }
    } else if (state.Mode === "Mettre à jour") {
      try {
        await Promise.all([axiosInstance.put(`ORDR/${oRDR.id}`, oRDR)]);
        setEditIndex(0);
        setState({
          Mode: "Créer",
          vertical: "top",
          horizontal: "center",
          open: true,
          message: "Opération correctement achevée",
          severity: "success",
        });

        setoRDR({
          DocDate: today,
          DueDate: today,
          UserSign: "",
          CardCode: "",
          CardName: "",
          Canceled: "",
          DocStatus: "",
          Comment: "",
          TotalHT : "",
          DiscPrcnt: "",
          RemiseTotal: "",
          VatSum: "",
          DocTotal: "",
          DocEntry: "",
        });

        setRDR1([
          {
            LineNum: "",
            ItemCode: "",
            ItemName: "",
            Quantity: "1",
            WhsCode: "",
            Price: "",
            Discount: 0,
            VAT: "0",
            LineTotal: "",
            UM: "",
            isEditing: true, // chenge

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
        { name: "Ventes", path: "/SalesOrder" },
        { name: "Commande Client" },
      ]}
    />
  );
  const end = (
    <AppSalesOrderToolBar
      Add={Add}
      setShowORDRList={setShowORDRList}
      RDR1={RDR1}
      fetchNextDocEntry={fetchNextDocEntry}
      state={state}
      setState={setState}
      today={today}
      oRDR={oRDR}
      setRDR1={setRDR1}
      setoRDR={setoRDR}
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
        {ShowORDRList ? (
          <AppSalesOrderList
            state={state}
            setState={setState}
            setRDR1={setRDR1}
            setEditIndex={setEditIndex}
            oRDR={oRDR}
            setoRDR={setoRDR}
            setShowORDRList={setShowORDRList}
          />
        ) : (
          <SimpleCard>
            <SalesOrderForm
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
              setShowORDRList={setShowORDRList}
              handleChange={handleChange}
              fetchNextDocEntry={fetchNextDocEntry}
              state={state}
              setState={setState}
              today={today}
              oRDR={oRDR}
              RDR1={RDR1}
              setRDR1={setRDR1}
              handelError={handelError}
              setoRDR={setoRDR}
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

export default AppSalesOrder;