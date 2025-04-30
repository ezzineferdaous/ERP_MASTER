//AppInventoryCounting.jsx
import { Stack, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import InventoryCountingForm from "./InventoryCountingForm";
import InventoryCountingList from "./InventoryCountingList";
import InventoryCountingToolBar from "./InventoryCountingToolBar";
import { Menubar } from 'primereact/menubar';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


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
  const [showListOiqr , setshowListOiqr] = useState(false);
  const [PriceList, setPriceList] = useState([{}]);
  const [editIndex, setEditIndex] = useState(0);
  const [selectedField, setSelectedField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);
  const [lastSavedRow, setLastSavedRow] = useState(null);
  const [openm, setOpenm] = useState(false);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [Icoode, seIcoode] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [state, setState] = useState({ Mode:"Créer", message: "Error", open: false, vertical: 'top', horizontal: 'center', severity: "error" });
  const [modalContentUM, setModalContentUM] = useState([]);
  const [modalContentWhsCode, setModalContentWhsCode] = useState([]);
  const [modalContentItemCode, setModalContentItemCode] = useState([]);
  const [prixListModified, setPriceListModified] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toLocaleTimeString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit'});
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ baseURL: baseUrl, timeout: 5000, withCredentials: true});
  
  const [iqr1, setIqr1] = useState([
    {
      id:'',
      DocEntry: '',
      LineNum: '1',
      ItemCode: '',
      ItemName: '',
      OnHandBef: '',
      CountQuantité: '0',
      Quantity: '',
      UM: '',
      Price: '',
      LineTotal: '',
      TotalCompte:'',
      isManual: false,
      isEditing: true,
    }
  ]);
  const [oiqr, setOiqr] = useState(
    {
        id:'',
        DocEntry: '',
        DocNum: '',
        DocDate: today,
        Hour:currentTime,
        Comment: '',
        UserSign: 1 ,
        DocStatus: '',
        WhsCode: '',
        PriceList: '',
    }
  );  

  const calculateUpdatedValues = (iqr) => {
    const onHandBef = parseFloat(iqr.OnHandBef) || 0;
    const countQuantité = parseFloat(iqr.CountQuantité) || 0;
    const prix = parseFloat(iqr.Price) || 0;
    const Quantity = countQuantité - onHandBef;
    const lineTotal = (prix * Quantity).toFixed(2);
    const totalCompte = (prix * countQuantité).toFixed(2);
  
    return {
      ...iqr,
      Quantity: Quantity,
      LineTotal: lineTotal,
      TotalCompte: totalCompte
    };
  };
  
  const handleManualPriceChange = (index, value) => {
    const updatedIqr1 = [...iqr1];
    updatedIqr1[index].Price = value;
    updatedIqr1[index].isManual = true;
    // updatedIqr1[index] = calculateUpdatedValues(updatedIqr1[index]);
    setIqr1(updatedIqr1);
  };
  
  useEffect(() => {
    const fetchPriceFromPriceListLines = async () => {
      if (oiqr.PriceList && iqr1.length > 0) {
        try {
          const res = await axiosInstance.get("PriceListLine/");
          const prixListLines = res.data;
          const updatedIqr1 = iqr1.map((item, index) => {
            if (Icoode && index === editIndex) {
              const matchingPriceLine = prixListLines.find(
                (line) =>
                  line.PriceListId === oiqr.PriceList && line.ItemCode === item.ItemCode
              );
              let updatedItem = { ...item, DocEntry: oiqr.DocEntry };
              if (matchingPriceLine) {
                updatedItem = { ...updatedItem, Price: matchingPriceLine.Price };
              } else {
                updatedItem = { ...updatedItem, Price: '0.00' };
              }              
              return calculateUpdatedValues(updatedItem);
            } else if (!Icoode && oiqr.PriceList && !item.isManual) {
              const matchingPriceLine = prixListLines.find(
                (line) =>
                  line.PriceListId === oiqr.PriceList && line.ItemCode === item.ItemCode
              );
              let updatedItem = { ...item, DocEntry: oiqr.DocEntry };
              if (matchingPriceLine) {
                updatedItem = { ...updatedItem, Price: matchingPriceLine.Price };
              } else {
                updatedItem = { ...updatedItem, Price: '0.00' };
              }
              return calculateUpdatedValues(updatedItem);
            }
            return item;
          });
          setIqr1(updatedIqr1);
        } catch (error) {
          console.error("Error fetching prix list lines:", error);
        }
      }
    };
    const GetPriceList = async () => {
      try {
        const  res  = await axiosInstance.get("PriceList/");
        setPriceList(res.data);
      } catch (error) {
        return;
      }
    };
    GetPriceList(); 
    if (state.Mode === "Créer" || (state.Mode === "Mettre à jour" && prixListModified === true) || Icoode === true) {
      if (prixListModified === true || Icoode === true) {
        fetchPriceFromPriceListLines();
      }
    }
    seIcoode(false);
  }, [oiqr.PriceList, Icoode, state.Mode, prixListModified,]);
  
  const handelError  = (error) => {
    if (error.response) {
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error"});
    } else if (error.request) {
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Network error", severity: "error"});
    } else {
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.message || "An error occurred", severity: "error"});
    }
  };

  useEffect(() => {
    
    if (!oiqr.DocStatus.trim()) {
      setOiqr(prevFormData => ({
        ...prevFormData,
        DocStatus: 'O',
      }));
    }
  }, [oiqr.DocStatus, setOiqr]);

  const fetchNextDocEntry = async (nextMode) => {
    try {
      const response = await axiosInstance.get('/OIQR/data/MaxDoc');
      const nextDocEntry = response.data.DocEntry;
      if(state.Mode === "Créer"|| nextMode === "Créer" ){
        setOiqr((prevData) => ({
          ...prevData,
          DocEntry: nextDocEntry,
          DocNum: nextDocEntry,
        }));
        setIqr1((previqr1) => previqr1.map((item) => ({
          ...item,
          DocEntry: nextDocEntry,
        })));
      }
    } catch (error) {
      handelError(error);
    }
  };

  const allFieldsFilled = () => {
    return iqr1.every(iqr => ( iqr.ItemCode  ));
  };

  const validation = () => {
    if (!oiqr.WhsCode) return ` saiser Magasin `;
    if (!oiqr.PriceList) return `saiser Price List: `;
    for (const [index, iqr] of iqr1.entries()) {
      if (!iqr.ItemCode) return `saiser Code Article dans ligne ${index + 1}`;
      if (!iqr.ItemName) return `saiser Nom Article  dans ligne ${index + 1}`;
      if (!iqr.OnHandBef) return `saiser Quantity dans ligne ${index + 1}`;
      if (!iqr.CountQuantité) return `saiser Quantity dans ligne ${index + 1}`;
      if (!iqr.Quantity) return `saiser Quantity dans ligne ${index + 1}`;
      if (!iqr.UM) return `saiser Unite de Mesure dans ligne ${index + 1}`;
    }
  
    return true;
  };

  const changeWarehouse = async (name, value) => {
    try {
      
      const res = await axiosInstance.get("Warehouse/");
      const warehouses = res.data;

      
      const selectedWarehouse = warehouses.find(warehouse => warehouse.WhsCode === value);
      if (selectedWarehouse) {
        setOiqr((prevData) => ({
          ...prevData,
          [name]: selectedWarehouse.id, 
        }));
      } else {
        console.error("Warehouse not found for the provided WhsCode");
      }
    } catch (error) {
      console.error("Error fetching warehouse data:", error);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    
    if (name === "WhsCode") {
      await changeWarehouse(name, value);
    } else if (name === "PriceList") {
      setPriceListModified(true);
      setOiqr((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setOiqr((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (state.Mode === "OK") {
      if (oiqr.WhsCode === "") {
        setState({ ...state, Mode: "Créer" });
      } else {
        setState({ ...state, Mode: "Mettre à jour" });
      }
    }
  };
  
  const prepareDataForSubmission = () => {
    const preparedIqr1 = iqr1.map(iqr => {
      const umItem = modalContentItemCode.find(item => item.NomUM === iqr.UM)?.CodeUMA || modalContentUM.find(item => item.description === iqr.UM)?.id || iqr.UM;
      return {...iqr,UM: umItem,};
    });
    const preparedOiqr = { ...oiqr, WhsCode: modalContentWhsCode.find(item => item.description === oiqr.WhsCode)?.number  || 4,};
    return { preparedIqr1, preparedOiqr };
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { preparedIqr1, preparedOiqr } = prepareDataForSubmission();
    const fieldCheckResult = validation();
    if (fieldCheckResult !== true) { setState({ ...state, open: true, message: `${fieldCheckResult}`, severity: "error" }); return; }
  
    try {
      if (state.Mode === "Créer") {
        console.log("IQR1 :" ,preparedIqr1);
        await Promise.all([
          axiosInstance.post("OIQR", preparedOiqr),
          ...preparedIqr1.map(item => axiosInstance.post("IQR1", item))
        ]);
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Operation completed successfully", severity: "success" });
      } else if (state.Mode === "Mettre à jour") {
        console.log('Oiqr',preparedOiqr);
        await  axiosInstance.put(`OIQR/${oiqr.id}`, preparedOiqr);
        
        const newItems = []; 
        await Promise.all(
          preparedIqr1.map(async (item, index) => {
            const updatedItem = { ...item };
            console.log('1',updatedItem);
            if (isNaN(updatedItem.UM)) {
              const resUM = await axiosInstance.get("UM/");
              const umData = resUM.data;
              const selectedUM = umData.find(um => um.NomUM === updatedItem.UM);
              if (selectedUM) {
                updatedItem.UM = selectedUM.id;
              } else { setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "UM not found for the provided value", severity: "error" });
                return;
              }
            }
            if (updatedItem.id) {
              try {
                console.log('befor up :',updatedItem);
                const response = await axiosInstance.put(`IQR1/${updatedItem.id}`, updatedItem);
                console.log('Response:', response);
              } catch (error) {
                console.error('Error occurred during PUT request:', error);
              }
              console.log('after up :',updatedItem);
            }
            
             else {
              updatedItem.DocEntry = preparedOiqr.DocEntry;
              if (!updatedItem.LineNum) {
                updatedItem.LineNum = (index + 1).toString(); 
              }

              if (updatedItem.ItemCode && updatedItem.ItemName && updatedItem.OnHandBef && updatedItem.CountQuantité && updatedItem.Quantity && updatedItem.UM && updatedItem.Price && updatedItem.LineTotal && updatedItem.TotalCompte) {
                newItems.push(updatedItem);
                console.log('new line :',newItems);
              } else {
                setState({
                  Mode: 'Mettre à jour',
                  vertical: 'top',
                  horizontal: 'center',
                  open: true,
                  message: "Veuillez remplir tous les champs obligatoires pour les nouvelles lignes.",
                  severity: "error"
                });
                return;
              }
            }
          })
        );
        if (newItems.length > 0) {
          console.log('line 1:',newItems);
          await Promise.all(newItems.map(item => axiosInstance.post("IQR1", item)));
        }
        setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success" });
      }else {
        navigate("/");
      }
      setOiqr({ id: '', DocEntry: '', DocNum: '', DocDate: today, Hour: currentTime, Comment: '', UserSign: 1, DocStatus: '', WhsCode: '', PriceList: '',});
      setIqr1([ { id: '', DocEntry: '', LineNum: '1', ItemCode: '', ItemName: '', OnHandBef: '', CountQuantité: '0', Quantity: '', UM: '', Price: '0.00', LineTotal: '0.00', TotalCompte: '',isEditing: true,}]);
      setEditIndex(0);
      fetchNextDocEntry("Créer");
    } catch (error) {
      handelError(error);
    }
  };
  
  const handleOpenModal = async (field, index) => {
    setSelectedField({ name: field, index });
    setOpenm(true);

    if (field === 'UM') {
      try {
        const res = await axiosInstance.get("UM/");
        const formattedData1 = res.data.map(item => ({
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
          let nomWarehouse = item.Magasin; // Fetch Magasin
          try {
            const umResponse = await axiosInstance.get(`UM/${item.CodeUMA}`);
            nomUM = umResponse.data.NomUM;
          } catch (umError) {
            console.error("Failed to fetch NomUM data:", umError);
          }



          return {
            number: item.ItemCode,
            description: item.ItemName,
            id: item.id,
            CodeUMA: item.CodeUMA,
            NomUM: nomUM ,// Include NomUM in the data
          };
        });
        const finalFormattedDataItemCode = await Promise.all(formattedDataItemCode);
        setModalContentItemCode(finalFormattedDataItemCode);
      } catch (error) {
        console.error("Failed to fetch Item data:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenm(false);
    setPage(0);
    setSearchQuery("");
    setSearchInputVisible(false);
    setSelectedItem([]);
    
  };

  const handleSelect = (item) => {
    seIcoode(true);
    const updatediqr1 = iqr1.map((iqr, i) => (
      i === selectedField.index
        ? {
          ...iqr,
          [selectedField.name]: selectedField.name === "ItemCode" ? item.number : item.description,
          ...(selectedField.name === "ItemCode" && { ItemName: item.description }),
          ...(selectedField.name === "ItemCode" && { UM: item.NomUM  }),
          ...(selectedField.name === "UM" && { UM: item.description }),
        }
        : iqr
    ));

    const updatedoiqr = {
      ...oiqr,
      [selectedField.name]: selectedField.name === "WhsCode" ? item.description : oiqr[selectedField.name],
      ...(selectedField.name === "WhsCode" && { WhsCode: item.description })
    };

    setIqr1(updatediqr1);
    setOiqr(updatedoiqr);
    handleCloseModal();
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  //_________________________________________________________________________________________________________________________________________________________


  const handleSelectItem = (item) => {
      const isSelected = selectedItem.some(selected => selected.number === item.number);
    
      if (selectedField.name === "ItemCode" && iqr1[selectedField.index].ItemCode) {
        
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
  

  const fetchPriceForItem = async (prixListId, itemCode) => {
    try {
      const response = await axiosInstance.get(
        `/PriceListLine/PriceList/${prixListId}/ItemCode/${itemCode}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching item prix:", error);
      return { Price: "0.00" }; 
    }
  };
  
  const handleSaveSelectedItem = async () => {
    if (selectedField.name === "ItemCode") {
      const next = await fetchNextDocEntry(); 
      const updatediqr1 = iqr1.filter(row => row.ItemCode !== "");
  
      if (selectedItem.length > 0) {
        const currentRow = iqr1[selectedField.index];
  
        if (!currentRow.ItemCode) {
          for (const item of selectedItem) {
            const prixData = await fetchPriceForItem(oiqr.PriceList, item.number);
            updatediqr1.push({
              DocEntry: next,
              LineNum: updatediqr1.length + 1,
              ItemCode: item.number,
              ItemName: item.description,
              Quantity: 1,
              WhsCode: item.NomWarehouse || "",
              UM: item.NomUM || "",
              Price: prixData.Price,
              isEditing: false,
            });
          }
        } else {
          // إذا كان السطر ممتلئًا، قم بتحديث القيم الخاصة بالسطر المفتوح فقط
          const prixData = await fetchPriceForItem(oiqr.PriceList, selectedItem[0].number);
          const updatedRow = {
            ...currentRow,
            ItemCode: selectedItem[0].number,
            ItemName: selectedItem[0].description,
            WhsCode: selectedItem[0].NomWarehouse || "",
            UM: selectedItem[0].NomUM || "",
            Price: prixData.Price,
          };
  
          updatediqr1[selectedField.index] = updatedRow;
        }
  
        setIqr1(updatediqr1);
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
  
  const start = <Breadcrumb routeSegments={[{ name: "Transactions de stock", path: "/InventoryCounting" }, { name: "Inventaire" }]} />;
  const end = <InventoryCountingToolBar setPriceListModified={setPriceListModified} currentTime={currentTime} setshowListOiqr={setshowListOiqr} setEditIndex={setEditIndex} today={today} fetchNextDocEntry={fetchNextDocEntry} iqr1={iqr1} setIqr1={setIqr1} oiqr={oiqr} setOiqr={setOiqr} state={state} setState={setState} handelError={handelError} />;

  return (
    <Container>
      <div className="card">
        <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600' }} />
      </div>

      <Stack spacing={3}>
        {showListOiqr ? (
          <InventoryCountingList state={state} setState={setState} setIqr1={setIqr1} setEditIndex={setEditIndex} oiqr={oiqr} setOiqr={setOiqr} setshowListOiqr={setshowListOiqr} />
        ) : (
          <SimpleCard>
            <InventoryCountingForm handleSaveSelectedItem={handleSaveSelectedItem} calculateUpdatedValues={calculateUpdatedValues}
              searchInputVisible={searchInputVisible} setSearchInputVisible={setSearchInputVisible} handleSelectItem={handleSelectItem}
              PriceListData={PriceList} handleChangePage={handleChangePage}  
              page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleCloseModal={handleCloseModal}
              selectedField={selectedField} setLastSavedRow={setLastSavedRow} setSelectedItem={setSelectedItem}
              selectedItem={selectedItem} changeWarehouse={changeWarehouse}setState={setState}setOiqr={setOiqr}
              handleSubmit={handleSubmit} editIndex={editIndex} setEditIndex={setEditIndex} seIcoode={seIcoode}
              currentTime={currentTime} Mode={state.Mode} handleChange={handleChange}lastSavedRow={lastSavedRow} 
              iqr1={iqr1} setIqr1={setIqr1} state={state}  validation={validation} axiosInstance={axiosInstance} 
              handleManualPriceChange={handleManualPriceChange}handleChangeRowsPerPage={handleChangeRowsPerPage} 
              fetchNextDocEntry={fetchNextDocEntry}handelError={handelError}today={today}oiqr={oiqr}openm={openm}
              handleOpenModal={handleOpenModal}allFieldsFilled={allFieldsFilled}
              modalContent={{ UM: modalContentUM, WhsCode: modalContentWhsCode, ItemCode: modalContentItemCode }}
            />
          </SimpleCard>
        )}
      </Stack>
    </Container>
  );
};

export default AppForm;