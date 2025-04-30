import { Stack, IconButton } from "@mui/material";
import { styled } from "@mui/system"; 
import { Breadcrumb, SimpleCard } from "app/components";
import GoodsIssueForm from "./GoodsIssueForm";
import GoodsIssueToolBar from "./GoodslssueToolBar.jsx";
import GoodsIssueList from "./GoodslssueList.jsx";
import { Menubar } from 'primereact/menubar';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },"& .buttoncard": {
    gap: "1rem",
    display: "flex",
    padding:"1rem",
  },
})); 

const AppForm = () => {

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ baseURL: baseUrl,  timeout: 5000,  withCredentials: true  });
  const today = new Date().toISOString().split('T')[0];
  const [state, setState] = useState({ Mode:"Créer", message: "Error", open: false, vertical: 'top', horizontal: 'center', severity: "error" });
  const [showListOige , setshowListOige] = useState(false);
  const [openm, setOpenm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);
  const [lastSavedRow, setLastSavedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalContentUM, setModalContentUM] = useState([]);
  const [modalContentWhsCode, setModalContentWhsCode] = useState([]);
  const [modalContentItemCode, setModalContentItemCode] = useState([]);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [ige1, setige1] = useState([
    {
      id:'',
      DocEntry: '',
      LineNum: '1',
      ItemCode: '',
      ItemName: '',
      Quantity: '1',
      WhsCode: '',
      Price: '',
      Discount: '0',
      LineTotal: '',
      UM: '',
      isEditing: true,
    }
  ]);
  const [oige, setOige] = useState({
    id:'',
    DocEntry: '',
    DocNum: '',
    DocDate: today,
    UserSign: 1,
    Comment: '',
  });
  const handelError = (error) => {
    if (error.response) {
      
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error"});
    } else if (error.request) {
      
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Network error", severity: "error"});
    } else {
    
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.message || "An error occurred", severity: "error"});
    }
  };

  const fetchNextDocEntry = async (nextMode) => {
    try {
      const response = await axiosInstance.get('/OIGE//data/MaxDoc');
      const nextDocEntry = response.data.DocEntry;
      if(state.Mode === "Créer"|| nextMode === "Créer" ){
      setOige((prevData) => ({
        ...prevData,
        DocEntry: nextDocEntry,
      }));
      setOige((prevData) => ({
        ...prevData,
        DocNum: nextDocEntry,
      }));
      setige1((prevIge1) => prevIge1.map((item) => ({
        ...item,
        DocEntry: nextDocEntry,
      })));
      }

    } catch (error) {
      handelError(error);
    }
  };

  const allFieldsFilled = () => {
    return ige1.every(ige => ( ige.ItemCode  ));
  };

  const validation = () => {



  for (const [index, ige] of ige1.entries()) {
    if (!ige.ItemCode) return `saiser Code Article dans ligne ${index + 1}`;
    if (!ige.ItemName) return `saiser Nom Article  dans ligne ${index + 1}`;
    if (!ige.Quantity) return `saiser Quantity dans ligne ${index + 1}`;
    if (!ige.WhsCode) return `saiser Magasin dans ligne ${index + 1}`;
    if (!ige.Price) return `saiser Price - TTC   dans ligne ${index + 1}`;
    if (!ige.UM) return `saiser Unite de Mesure dans ligne ${index + 1}`;
  }
 
  return true;
};

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setOige((prevData) => ({
        ...prevData,
        [name]: value,
    }));

    if(state.Mode === "OK" ){
        if(oige.id === "") {
      setState({ ...state, Mode: "Créer" });
    } else  {setState({ ...state, Mode: "Mettre à jour" }); }
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


          return {
            number: item.ItemCode,
            description: item.ItemName,
            id: item.id,
            CodeUMA: item.CodeUMA,
            NomUM: nomUM ,// Include NomUM in the data
            Magasin: item.Magasin, // Include Magasin
            NomWarehouse: nomWarehouse || "" // Include NomWarehouse
          };
        });
        const finalFormattedDataItemCode = await Promise.all(formattedDataItemCode);
        setModalContentItemCode(finalFormattedDataItemCode);
      } catch (error) {
        console.error("Failed to fetch Item data:", error);
      }
    }
  };

  const handleSelect = (item) => {
    const updatedige1 = ige1.map((ige, i) => (
      i === selectedField.index
        ? {
      ...ige,
      [selectedField.name]: selectedField.name === "ItemCode" ? item.number : item.description,
      ...(selectedField.name === "ItemCode" && { ItemName: item.description }),
      ...(selectedField.name === "ItemCode" && { UM: item.NomUM  }),
      ...(selectedField.name === "ItemCode" && { WhsCode: item.NomWarehouse }),
      ...(selectedField.name === "UM" && { UM: item.description }),
      ...(selectedField.name === "WhsCode" && { WhsCode: item.description })
  }
        : ige
    ));
    setige1(updatedige1);
    handleCloseModal();
  };


  const prepareDataForSubmission = () => {
    return ige1.map(ige => {
    
      const umItem = modalContentItemCode.find(item => item.NomUM === ige.UM)?.CodeUMA || modalContentUM.find(item => item.description === ige.UM)?.id;
      const whsCodeItem = modalContentItemCode.find(item => item.NomWarehouse === ige.WhsCode)?.Magasin || modalContentWhsCode.find(item => item.description === ige.WhsCode)?.number;
    
      return {
        ...ige,
        UM: umItem ,
        WhsCode: whsCodeItem || ige.WhsCode,
      
      };
    });
  };

  const handleCloseModal = () => {
    setOpenm(false);
    setPage(0); 
    setSearchQuery("");  
    setSelectedItem([]);
    setSearchInputVisible(false);
  };

  const updateStock = async (preparedIge1) => {
    try {
      const itemResponse = await axiosInstance.get("Item/");  
      const items = itemResponse.data;
      console.log("002 Qty :" ,items);
      const updatedItems = [];
      const quantitiesMap = {};
      let stockError = false;
  
      for (let ige1Item of preparedIge1) {
        const itemCode = ige1Item.ItemCode;
        const quantityige1 = parseInt(ige1Item.Quantity, 10); 
        if (quantitiesMap[itemCode]) {
          quantitiesMap[itemCode] += quantityige1;
        } else {
          quantitiesMap[itemCode] = quantityige1;
        }
      }
  
      for (let item of items) {
        const itemCode = item.ItemCode;
        
        const currentStock =  parseInt(item.EnStock, 10);
        console.log("002: ",currentStock)
        if (quantitiesMap[itemCode]) {
          const quantityToDeduct = quantitiesMap[itemCode];
          if (quantityToDeduct > currentStock) {
            console.error(`Erreur: La quantité demandée pour l'article ${itemCode} est supérieure au stock disponible. Stock actuel: ${currentStock}`);
            stockError = true;  
            break; 
          }
  
          const newQuantity = currentStock - quantityToDeduct;
          console.log("002 newQuantity :" ,newQuantity);
  
          updatedItems.push({
            ItemCode: itemCode,
            newQuantity: newQuantity
          });
        }
      }

      if (stockError) {
        return false;  
      }
  
  
      for (let update of updatedItems) {
        await axiosInstance.post('Item/stock', {
          ItemCode: update.ItemCode ,
          newQuantity: update.newQuantity ,
        });
      }

      return true
  
    } catch (error) {
      console.error("Une erreur s'est produite lors du changement d'inventaire :", error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fieldCheckResult = validation();
    if (fieldCheckResult !== true) {
      setState({   ...state,  open: true, message: ` ${fieldCheckResult}`,  severity: "error"  });
      return;
    }
    const preparedIge1 = prepareDataForSubmission();
    const stockData = preparedIge1.map((item) => ({
      TransType: "60",  
      CardCode: "0", 
      DocNum: oige.DocNum, 
      ItemCode: item.ItemCode,  
      LineNum: item.LineNum,  
      WhsCode: item.WhsCode, 
      Price: item.Price,  
      InQty: "0",  
      OutQty: item.Quantity,  
    }));

    const stockUpdateSuccess = await updateStock(preparedIge1);
  
    if (!stockUpdateSuccess) {
      setState({
        ...state,
        open: true,
        message: "Erreur: La quantité demandée dépasse le stock disponible.",
        severity: "error",
      });
      return;  // إذا كان هناك خطأ في المخزون، توقف العملية
    }

    console.log("stoke :" , stockData );
    if(state.Mode === "Créer") {
    try {
      await Promise.all([
        axiosInstance.post("OIGE", oige),
        ...preparedIge1.map(item => axiosInstance.post("IGE1", item)),
        ...stockData.map((item) => axiosInstance.post("Stock", item)),

      ]);
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Operation completed successfully", severity: "success" });
      setOige({ DocEntry: '', DocNum: '', DocDate: today, UserSign: 1, Comment: '' });
      setige1([{  DocEntry: '',  LineNum: '1',  ItemCode: '',  ItemName: '',  Quantity: '1',   WhsCode: '',  Price: '0.00',  Discount: '0',  LineTotal: '0.00',  UM: '' ,isEditing: true, }]);
      
      fetchNextDocEntry("Créer");
      // await updateStock(preparedIge1);
    } catch (error) {
      handelError(error);
    }
    }  else if(state.Mode === "Mettre à jour")  {
      try {
        await Promise.all([
          axiosInstance.put("OIGE/"+oige.id+"", oige), 
        ]);
        
        fetchNextDocEntry();
        setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success"});
        setOige({ DocDate: today, UserSign: '', Comment: '' });
        setige1([{  LineNum: '1',  ItemCode: '',  ItemName: '',  Quantity: '1',  WhsCode: '',  Price: '0.00',  Discount: '0',  LineTotal: '0.00',  UM: '' ,isEditing: true, }]);
        await(fetchNextDocEntry("Créer"));
      } catch (error) { handelError(error); }
    }else {
      navigate("/");
    }
  };


  //_________________________________________________________________________________________________________________________________________________________


  const handleSelectItem = (item) => {
    const isSelected = selectedItem.some(selected => selected.number === item.number);
  
    if (selectedField.name === "ItemCode" && ige1[selectedField.index].ItemCode) {
      
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

  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedige1 = ige1.filter(row => row.ItemCode !== "");
  
      if (selectedItem.length > 0) {
        // تحقق مما إذا كان السطر الذي تم فتح المودال له فارغًا أو ممتلئًا
        const currentRow = ige1[selectedField.index];
  
        if (!currentRow.ItemCode) {
          // إذا كان السطر فارغًا، أضف العناصر المختارة كسطور جديدة
          selectedItem.forEach(item => {
            updatedige1.push({
              DocEntry: next,
              LineNum: updatedige1.length + 1,
              ItemCode: item.number,
              ItemName: item.description,
              Quantity: 1,
              WhsCode: item.NomWarehouse || "",
              Price: "",
              Discount: "",
              LineTotal: "",
              UM: item.NomUM || "",
              isEditing: false,

            });
          });
        } else {
          // إذا كان السطر ممتلئًا، قم بتحديث القيم الخاصة بالسطر المفتوح فقط
          const updatedRow = {
            ...currentRow,
            ItemCode: selectedItem[0].number,
            ItemName: selectedItem[0].description,
            WhsCode: selectedItem[0].NomWarehouse || "",
            UM: selectedItem[0].NomUM || "",
          };
  
          updatedige1[selectedField.index] = updatedRow;
        }
  
        setige1(updatedige1);
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
  

  const start = <Breadcrumb routeSegments={[{ name: "Transactions de stock", path: "/GoodsIssue" }, { name: "Sortie de marchandises" }]} />;
  const end = <GoodsIssueToolBar setshowListOige={setshowListOige}  today={today} fetchNextDocEntry={fetchNextDocEntry} ige1={ige1} setige1={setige1}  oige = {oige} setOige ={setOige} state ={state} setState ={setState} handelError={handelError}  /> 

 
  return (
    <Container>      
      <div className="card">
            <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600' }}/>
      </div>

      <Stack spacing={3}>
         { showListOige ? (
          <GoodsIssueList state={state} setState={setState} setige1={setige1}  oige={oige} setOige={setOige} setshowListOige={setshowListOige} /> 
         ) : ( 
         <SimpleCard>           
          <GoodsIssueForm handleSelectItem={handleSelectItem} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} searchQuery={searchQuery} setSearchQuery={setSearchQuery}  handleCloseModal={handleCloseModal}
             handleOpenModal={handleOpenModal} handleSaveSelectedItem={handleSaveSelectedItem}
             setSearchInputVisible={setSearchInputVisible} searchInputVisible={searchInputVisible}
               openm={openm} validation={validation}
             modalContent={{ UM: modalContentUM, WhsCode: modalContentWhsCode, ItemCode: modalContentItemCode }}
              selectedField={selectedField} setLastSavedRow={setLastSavedRow} lastSavedRow={lastSavedRow} setSelectedItem={setSelectedItem}
               selectedItem={selectedItem}    Mode= {state.Mode} handleChange={handleChange} handleSubmit={handleSubmit}  allFieldsFilled={allFieldsFilled} fetchNextDocEntry={fetchNextDocEntry} handelError={handelError} today={today} oige={oige} setOige={setOige} ige1={ige1} setige1={setige1} state={state} setState={setState}/>
        </SimpleCard>
      )}
      </Stack>
    </Container>
  );
};

export default AppForm;
