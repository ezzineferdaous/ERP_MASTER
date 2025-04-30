// import { Stack} from "@mui/material";
// import { styled } from "@mui/system";
// import { Breadcrumb, SimpleCard } from "app/components";
// import GoodsReceiptPOForm from "./GoodsReceiptPOForm";
// import AppToolBar from "./AppToolBar.jsx";
// import AppList from "./AppList.jsx";
// import { Menubar } from 'primereact/menubar';
// import { useState} from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// const Container = styled("div")(({ theme }) => ({  
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
//   "& .breadcrumb": {
//     marginBottom: "30px",
//     [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
//   },"& .buttoncard": {
//     gap: "1rem",
//     display: "flex",
//     padding:"1rem",
//   },
// }));



// const AppForm = () => {
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     Mode: "Créer",
//     message: "",
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//     severity: "success"
//   });

//   const [editIndex, setEditIndex] = useState(0);
//   const [showListOign, setshowListOign] = useState(false);
//   const today = new Date().toISOString().split('T')[0];
//   const [open, setOpen] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(0);
//   const [selectedField, setSelectedField] = useState("");
//   const [selectedItem, setSelectedItem] = useState({ number: "", description: "" });
//   const [searchInputVisible, setSearchInputVisible] = useState(false);
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;
//   const axiosInstance = axios.create({
//     timeout: 5000,
//     baseURL: baseUrl,
//     withCredentials: true,
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [lastSavedRow, setLastSavedRow] = useState(null);
//   const [modalContentUM, setModalContentUM] = useState([]);
//   const [modalContentItemCode, setModalContentItemCode] = useState([]);
//   const [modalContentWhsCode, setModalContentWhsCode] = useState([]);
//   const [Oign, setOign] = useState({
//     id: '',
//     DocEntry: '',
//     DocNum: '',
//     DocDate: today,
//     UserSign: 1,
//     Comment: '',
//   });
  

//   const [IGN1, setIGN1] = useState([
//     {
//       id: '',
//       DocEntry: "",
//       LineNum: 1,
//       ItemCode: "",
//       ItemName: "",
//       Quantity: 1,
//       WhsCode: "",
//       Price: "",
//       Discount: "",
//       LineTotal: "",
//       UM: "",
//       isEditing: true, // chenge
//     },
//   ]);
//   const handleSelectItem = (item) => {
//     // Ensure selectedItem is always an array
//     if (!Array.isArray(selectedItem)) {
//       setSelectedItem([item]);
//       return;
//     }
  
//     const isSelected = selectedItem.some(
//       (selected) => selected.number === item.number
//     );
  
//     if (selectedField.name === "ItemCode" && IGN1[selectedField.index].ItemCode) {
//       setSelectedItem([item]);
//     } else {
//       if (isSelected) {
//         setSelectedItem((prevSelected) =>
//           prevSelected.filter((selected) => selected.number !== item.number)
//         );
//       } else {
//         setSelectedItem((prevSelected) => [...prevSelected, item]);
//       }
//     }
//   };

  
//   const fetchNextDocEntry = async (nextMode) => {
//     try {
//       const response = await axiosInstance.get('/OIGN//data/MaxDoc');
//       const nextDocEntry = response.data.DocEntry;
//       if (state.Mode === "Créer" || state.Mode === "OK" || nextMode === "Créer") {
//         setOign((prevData) => ({
//           ...prevData,
//           DocEntry: nextDocEntry,
//           DocNum: nextDocEntry,
//         }));
//         setIGN1((prevIge1) =>
//           prevIge1.map((item) => ({
//             ...item,
//             DocEntry: nextDocEntry,
//           }))
//         );
//       }
//     } catch (error) {
//       handelError(error);
//     }
//   };

//     // Function to handle adding a new OIGN
//     const Add = async (e) => {
//       fetchNextDocEntry("Créer");
//       setEditIndex(0);
//       setOign({
//           id: '',
//           DocEntry: '',
//           DocNum: '',
//           DocDate: today,
//           UserSign: 1,
//           Comment: '',
//       });
//       setIGN1([
//         {
//           id: '',
//           DocEntry: "",
//           LineNum: 1,
//           ItemCode: "",
//           ItemName: "",
//           Quantity: 1,
//           WhsCode: "",
//           Price: "",
//           Discount: "",
//           LineTotal: "",
//           UM: "",
//           isEditing: true, // chenge
  
//         },
//       ]);
//       setState({ ...state, Mode: "Créer" });
//     };

  

//   const handelError = (error) => {
//     if (error.response) {
//       setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error" });
//     } else if (error.request) {
//       setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "network error", severity: "error" });
//     } else {
//       setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error, severity: "error" });
//     }
//   };

//   const handleChange = (event) => {
    
//     const formattedValue = typeof value === 'string' ? value.replace(',', '.') : value;

//     const { name, value } = event.target;
//     setOign((prevData) => ({
//       ...prevData,
//       [name]: formattedValue,
//     }));
    
//     if (state.Mode === "OK") {
//       if (Oign.id === "") {
//         setState({ ...state, Mode: "Créer" });
//       } else {
//         setState({ ...state, Mode: "Mettre à jour" });
//       }
//     }
//   }



//   const handleOpenModal = async (field, targetField, index = null) => {
//     setSelectedField({ name: targetField, index: index });

//     console.log('field:', field);
//     console.log('index:', index);
//     setOpen(true);

//     if (field === 'UM') {
//       try {
//         const res = await axiosInstance.get("UM/");
//         const formattedData1 = res.data.map(item => ({
//           type: "UM",
//           number: item.CodeUM,
//           description: item.NomUM,
//           id: item.id
//         }));
//         setModalContentUM(formattedData1);
//       } catch (error) {
//         console.error("Failed to fetch UM data:", error);
//       }
//     } else if (field === 'WhsCode') {
//       try {
//         const res = await axiosInstance.get("Warehouse/");
//         const formattedData2 = res.data.map(item => ({
//           type: "WhsCode",
//           number: item.CodeWarehouse,
//           description: item.NomWarehouse,
//           id: item.id
//         }));
//         setModalContentWhsCode(formattedData2);
//       } catch (error) {
//         console.error("Failed to fetch Warehouse data:", error);
//       }
//     }  else if (field === 'ItemCode') {
//       try {
//           const res = await axiosInstance.get("Item/");
//           const formattedDataItemCode = res.data.map(async item => {
//               let nomUM = item.NomUM;
//               let nomWarehouse = item.Magasin;

//               try {
//                 const umResponse = await axiosInstance.get(`UM/${item.NomUM}`);
//                 nomUM = umResponse.data.NomUM;
//               } catch (umError) {
//                 console.error("Failed to fetch NomUM data:", umError);
//               }
    
//               try {
//                 const whResponse = await axiosInstance.get(
//                   `Warehouse/code/${item.Magasin}`
//                 );
//                 nomWarehouse = whResponse.data.NomWarehouse;
//               } catch (whError) {
//                 console.error("Failed to fetch NomWarehouse data:", whError);
//                 nomWarehouse = "";
//               }
              

//               return {
//                   number: item.ItemCode,
//                   description: item.ItemName,
//                   id: item.id,
//                   CodeUMA: item.CodeUMA,
//                   NomUM: nomUM,
//                   Magasin: item.Magasin,
//                   NomWarehouse: nomWarehouse || "",
//               };
           
//           });
//           const finalFormattedDataItemCode = await Promise.all(formattedDataItemCode);
//           setModalContentItemCode(finalFormattedDataItemCode);
//       } catch (error) {
//           console.error("Failed to fetch Item data:", error);
//       }}
//   };

//   const handleCloseModal = () =>{
//      setOpen(false);
//     setPage(0);
   
//   } 

//   const handleSelect = async (item) => {
//     if (!item || (!item.number && !item.description)) {
//       console.error('Invalid item selected:', item);
//       return;
//     }
  
//     let updatedItem = { ...item };
  
//     if (selectedField.name === "ItemCode") {
//       try {
//         // Fetch UM data
//         const umResponse = await axiosInstance.get(`UM/${item.NomUM}`);
//         updatedItem.NomUM = umResponse.data.NomUM;
//       } catch (umError) {
//         console.error("Failed to fetch NomUM data:", umError);
//       }
  
//       try {
//         // Fetch Warehouse data
//         const whResponse = await axiosInstance.get(`Warehouse/code/${item.Magasin}`);
//         updatedItem.NomWarehouse = whResponse.data.NomWarehouse;
//       } catch (whError) {
//         console.error("Failed to fetch NomWarehouse data:", whError);
//         updatedItem.NomWarehouse = "";
//       }
  
    
//     }
  
//     const updatedIGN1 = IGN1.map((iqr, i) => (
//       i === selectedField.index
//         ? {
//             ...iqr,
//             [selectedField.name]: selectedField.name === "ItemCode" ? updatedItem.number : updatedItem.description,
//             ...(selectedField.name === "ItemCode" && {
//               ItemName: updatedItem.description,
//               UM: updatedItem.NomUM || iqr.UM,  // Update UM
//               WhsCode: updatedItem.NomWarehouse || iqr.WhsCode,  // Update Warehouse
//             }),
//             ...(selectedField.name === "UM" && { UM: updatedItem.description }),
//             ...(selectedField.name === "WhsCode" && { WhsCode: updatedItem.description })
//           }
//         : iqr
//     ));
  
//     setIGN1(updatedIGN1);
//     handleCloseModal();
//   };
  
//  // Save the selected item from modal
//  const handleSaveSelectedItem = () => {
//   if (selectedField.name === "ItemCode") {
//     const next = fetchNextDocEntry();
//     const updatedRdp1 = IGN1.filter(row => row.ItemCode !== "");

//     if (selectedItem.length > 0) {
//       const currentRow = IGN1[selectedField.index];

//       if (!currentRow.ItemCode) {
//         selectedItem.forEach(item => {
//           updatedRdp1.push({
//             DocEntry: next,
//             LineNum: updatedRdp1.length + 1,
//             ItemCode: item.number,
//             ItemName: item.description,
//             Quantity: 1,
//             WhsCode: item.NomWarehouse || "",
//             Price: "",
//             Discount: "",
//             LineTotal: "",
//             UM: item.NomUM || "",
//             // edit  this  
//             isEditing: false,
//           });
//         });
//       } else {
//         const updatedRow = {
//           ...currentRow,
//           ItemCode: selectedItem[0].number,
//           ItemName: selectedItem[0].description,
//           WhsCode: selectedItem[0].NomWarehouse || "",
//           UM: selectedItem[0].NomUM || "",
//         };
//         updatedRdp1[selectedField.index] = updatedRow;
//       }

//       setIGN1(updatedRdp1);
//       handleCloseModal();
//     } else {
//       handleCloseModal();
//       console.error("No item selected!");
//     }
//   } else {
//     if (selectedItem.length > 0) {
//       handleSelect(selectedItem[0]);
//     } else {
//       handleCloseModal();
//       console.error("No item selected!");
//     }
//   }

//   setSelectedItem([]);
//   setPage(0);
//   setSearchQuery("");
//   setSearchInputVisible(false);
// };


//     const prepareDataForSubmission = () => {
//       return IGN1.map((IGN1) => {
//         const umItem =
//           modalContentItemCode.find((item) => item.NomUM === IGN1.UM)?.CodeUMA ||
//           modalContentUM.find((item) => item.description === IGN1.UM)?.id;
//         const whsCodeItem =
//           modalContentItemCode.find((item) => item.NomWarehouse === IGN1.WhsCode)
//             ?.Magasin ||
//           modalContentWhsCode.find((item) => item.description === IGN1.WhsCode)
//             ?.id;
  
//         return {
//           ...IGN1,
//           UM: umItem,
//           WhsCode: whsCodeItem || IGN1.WhsCode,
//         };
//   });
//   };
//    // Check if all fields in por are filled
//   const allFieldsFilled = () => {
//     return IGN1.every((por) => {
//       return por.ItemCode;
//     });
//   };


//   const updateStock = async (preparedIqr1) => {
//     try {
//       const itemResponse = await axiosInstance.get("Item/");  
//       const items = itemResponse.data;
//       const updatedItems = [];
//       const quantitiesMap = {};
  
//       for (let rdn1Item of preparedIqr1) {
//         const itemCode = rdn1Item.ItemCode;
//         const QuantityRdn1 = parseInt(rdn1Item.Quantity, 10);
//         if (quantitiesMap[itemCode]) {
//           quantitiesMap[itemCode] += QuantityRdn1;
//         } else {
//           quantitiesMap[itemCode] = QuantityRdn1;
//         }
//       }
  
//       for (let item of items) {
//         const itemCode = item.ItemCode;
//         const currentStock = item.EnStock ? parseInt(item.EnStock, 10) : 0;
//         if (quantitiesMap[itemCode]) {
//           const newQuantité = currentStock + quantitiesMap[itemCode];
  
//           updatedItems.push({
//             ItemCode: itemCode,
//             newQuantité: newQuantité
//           });
//         }
//       }
  
//       for (let update of updatedItems) {
//         await axiosInstance.post('Item/stock', {
//           ItemCode: update.ItemCode ,
//           newQuantité: update.newQuantité ,
//         });
//       }
  
//     } catch (error) {
//       console.error("Une erreur s'est produite lors du changement d'inventaire :", error);
//     }
//   };
  


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const fieldCheckResult = allFieldsFilled();

//     if (fieldCheckResult !== true) {
//       setState({
//         ...state,
//         open: true,
//         message: ` ${fieldCheckResult}`,
//         severity: "error",
//       });
//       return;
//     }
//     const preparedIqr1 = prepareDataForSubmission();

//     if (state.Mode === "Créer") {
//       try {
//         await Promise.all([
//           axiosInstance.post("OIGN", Oign),
//           ...preparedIqr1.map((item) => axiosInstance.post("IGN1", item)),
//           ...preparedIqr1.map((item) =>
//             axiosInstance.post(`Stock/${item.id ?? ""}`, {
//               TransType: 59,
//               DocNum: Oign.DocNum,
//               CardCode: Oign.CardCode,
//               ItemCode: item.ItemCode,
//               LineNum: item.LineNum,
//               InQty: item.Quantity,
//               OutQty:0,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//             })
//           ),
//         ]);
//         setState({
//           Mode: "Créer",
//           vertical: "top",
//           horizontal: "center",
//           open: true,
//           message: "Operation completed successfully",
//           severity: "success",
//         });
//         setOign({
//           DocEntry: '', 
//           DocNum: '', 
//           DocDate: today, 
//           UserSign: '',
//            Comment: '' });
//           setIGN1([{
//             DocEntry: "",
//             LineNum: 1,
//             ItemCode: "",
//             ItemName: "",
//             Quantity: 1,
//             WhsCode: "",
//             Price: "",
//             Discount: "",
//             LineTotal: "",
//             UM: "",
//             isEditing: true, // chenge
//           }]);
  
//         setEditIndex(0);
//         await fetchNextDocEntry("Créer");
//           // add this 
//           await updateStock(preparedIqr1);
//       } catch (error) {
//         handelError(error);
//       }
//     } else if (state.Mode === "Mettre à jour") {
//       try {
//         await Promise.all([
//           axiosInstance.put(`OIGN/${Oign.id}`, Oign),
//           ...preparedIqr1.map((item) =>
//             axiosInstance.put(`Stock/${item.id ?? ""}`, {
//               TransType: 59,
//               DocNum: Oign.DocNum,
//               CardCode: Oign.CardCode,
//               ItemCode: item.ItemCode,
//               LineNum: item.LineNum,
//               InQty:  item.Quantity,
//               OutQty:0,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//             })
//           ),
//         ]);
//         setEditIndex(0);
//         setState({
//           Mode: "Créer",
//           vertical: "top",
//           horizontal: "center",
//           open: true,
//           message: "Opération correctement achevée",
//           severity: "success",
//         });

//         setOign({
//           DocEntry: '', 
//           DocNum: '', 
//           DocDate: today, 
//           UserSign: '',
//            Comment: '' });
//           setIGN1([{
//             DocEntry: "",
//             LineNum: 1,
//             ItemCode: "",
//             ItemName: "",
//             Quantity: 1,
//             WhsCode: "",
//             Price: "",
//             Discount: "",
//             LineTotal: "",
//             UM: "",
//             isEditing: true, // chenge
//           }]);
  

//         await fetchNextDocEntry("Créer");
//           // add this 
//           await updateStock(preparedIqr1);
//       } catch (error) {
//         handelError(error);
//       }
//     } else {
//       navigate("/");
//     }
//   };


 

//   const start = <Breadcrumb routeSegments={[
//     { name: "Transactions de stock", path: "/GoodsIssue" }, 
//     { name: "Entrée de marchandises" }]} />;
//       const end = 
//       <AppToolBar 
//       setshowListOign={setshowListOign} 
//       setEditIndex={setEditIndex} 
//       today={today} 
//       fetchNextDocEntry={fetchNextDocEntry} 
//       IGN1={IGN1} 
//       setIGN1={setIGN1}
//       Oign={Oign} 
//       setOign={setOign} 
//       state={state} 
//       setState={setState} 
//       handelError={handelError}
//       Add={Add}
//       />

//   return (
//     <Container>      
//       <div className="card">
//         <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600' }}/>
//       </div>

//       <Stack spacing={3}>
//         {showListOign ? (
//           <AppList 
//           setIGN1={setIGN1} 
//           setEditIndex={setEditIndex} 
//           Oign={Oign} 
//           setOign={setOign} 
//           setState={setState} 
//           state={state} 
//           setshowListOign={setshowListOign} />
//         ) : (
//           <SimpleCard>          
//             <GoodsReceiptPOForm  
//               handleCloseModal={handleCloseModal} 
//               handleSelect={handleSelect}
//               handleSelectItem={handleSelectItem}
//               handleOpenModal={handleOpenModal} 
//               setLastSavedRow={setLastSavedRow} 
//               setPage={setPage}
//               lastSavedRow={lastSavedRow}
//               setSearchQuery={setSearchQuery} 
//               searchQuery={searchQuery} 
//               setSearchInputVisible={setSearchInputVisible}
//               searchInputVisible={searchInputVisible} 
//               setSelectedItem={setSelectedItem} 
//               selectedItem={selectedItem}
//               setSelectedField={setSelectedField} 
//               allFieldsFilled={allFieldsFilled}
//               selectedField={selectedField} 
//               modalContent={{
//                  UM: modalContentUM, 
//                  WhsCode: modalContentWhsCode, 
//                  ItemCode: modalContentItemCode
//                  }}
//                  rowsPerPage={rowsPerPage}
//                  page={page}
//               open={open} 
//               setOpen={setOpen}   
//               handleSaveSelectedItem={handleSaveSelectedItem}
//               Mode={state.Mode} 
//               Oign={Oign} 
//               editIndex={editIndex} 
//               setRowsPerPage={setRowsPerPage}
//               setOign={setOign} 
//               setEditIndex={setEditIndex} 
//               today={today} 
//               IGN1={IGN1} 
//               setIGN1={setIGN1} 
//               state={state} 
//               setState={setState} 
//               handelError={handelError} 
//               handleChange={handleChange} 
//               handleSubmit={handleSubmit} 
//               fetchNextDocEntry={fetchNextDocEntry}
//               setshowListOign={setshowListOign}
//             />
//           </SimpleCard>
//         )} 
//       </Stack>
//     </Container>
//   );
// };

// export default AppForm;


import { Stack, IconButton } from "@mui/material";
import { styled } from "@mui/system"; 
import { Breadcrumb, SimpleCard } from "app/components";
import GoodsIssueForm from "./GoodsReceiptPOForm";
import GoodsIssueToolBar from "./AppToolBar";
import GoodsIssueList from "./AppList";
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
  const [IGN1, setIGN1] = useState([
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
  const [Oign, setOign] = useState({
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
      const response = await axiosInstance.get('/OIGN//data/MaxDoc');
      const nextDocEntry = response.data.DocEntry;
      if(state.Mode === "Créer"|| nextMode === "Créer" ){
      setOign((prevData) => ({
        ...prevData,
        DocEntry: nextDocEntry,
      }));
      setOign((prevData) => ({
        ...prevData,
        DocNum: nextDocEntry,
      }));
      setIGN1((prevIge1) => prevIge1.map((item) => ({
        ...item,
        DocEntry: nextDocEntry,
      })));
      }

    } catch (error) {
      handelError(error);
    }
  };

  const allFieldsFilled = () => {
    return IGN1.every(ige => ( ige.ItemCode  ));
  };

  const validation = () => {



  for (const [index, ige] of IGN1.entries()) {
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
    
    setOign((prevData) => ({
        ...prevData,
        [name]: value,
    }));

    if(state.Mode === "OK" ){
        if(Oign.id === "") {
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
    const updatedige1 = IGN1.map((ige, i) => (
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
    setIGN1(updatedige1);
    handleCloseModal();
  };


  const prepareDataForSubmission = () => {
    return IGN1.map(ige => {
    
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
        const Quantityige1 = parseInt(ige1Item.Quantity, 10); 
        if (quantitiesMap[itemCode]) {
          quantitiesMap[itemCode] += Quantityige1;
        } else {
          quantitiesMap[itemCode] = Quantityige1;
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
    const fieldCheckResult = validation();
    if (fieldCheckResult !== true) {
      setState({   ...state,  open: true, message: ` ${fieldCheckResult}`,  severity: "error"  });
      return;
    }
    const preparedIge1 = prepareDataForSubmission();
  
    if(state.Mode === "Créer") {
    try {
      await Promise.all([
      axiosInstance.post("OIGN", Oign),
      ...preparedIge1.map((item) => axiosInstance.post("IGN1", item)),
      ...preparedIge1.map((item) =>
        axiosInstance.post(`Stock/${item.id ?? ""}`, {
          TransType: 59,
          DocNum: Oign.DocNum,
          CardCode: Oign.CardCode,
          ItemCode: item.ItemCode,
          LineNum: item.LineNum,
          InQty: item.Quantity,
          OutQty:0,
          WhsCode: item.WhsCode,
          Price: item.Price,
        })
      ),
    ]);
      setState({Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Operation completed successfully", severity: "success" });
      setOign({ DocEntry: '', DocNum: '', DocDate: today, UserSign: 1, Comment: '' });
      setIGN1([{  DocEntry: '',  LineNum: '1',  ItemCode: '',  ItemName: '',  Quantity: '1',   WhsCode: '',  Price: '0.00',  Discount: '0',  LineTotal: '0.00',  UM: '' ,isEditing: true, }]);
      fetchNextDocEntry("Créer");
      
      await updateStock(preparedIge1);
    } catch (error) {
      handelError(error);
    }
    }  else if(state.Mode === "Mettre à jour")  {
      try {
        await Promise.all([
                    axiosInstance.post("OIGN", Oign),
                    ...preparedIge1.map((item) => axiosInstance.post("IGN1", item)),
                    ...preparedIge1.map((item) =>
                      axiosInstance.post(`Stock/${item.id ?? ""}`, {
                        TransType: 59,
                        DocNum: Oign.DocNum,
                        CardCode: Oign.CardCode,
                        ItemCode: item.ItemCode,
                        LineNum: item.LineNum,
                        InQty: item.Quantity,
                        OutQty:0,
                        WhsCode: item.WhsCode,
                        Price: item.Price,
                      })
                    ),
                  ]);
        fetchNextDocEntry();
        setState({  Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Opération correctement achevée", severity: "success"});
        setOign({ DocDate: today, UserSign: '', Comment: '' });
        setIGN1([{  LineNum: '1',  ItemCode: '',  ItemName: '',  Quantity: '1',  WhsCode: '',  Price: '0.00',  Discount: '0',  LineTotal: '0.00',  UM: '' ,isEditing: true, }]);
        await(fetchNextDocEntry("Créer"));
      } catch (error) { handelError(error); }
    }else {
      navigate("/");
    }
  };



  //_________________________________________________________________________________________________________________________________________________________


  const handleSelectItem = (item) => {
    const isSelected = selectedItem.some(selected => selected.number === item.number);
  
    if (selectedField.name === "ItemCode" && IGN1[selectedField.index].ItemCode) {
      
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
      const updatedige1 = IGN1.filter(row => row.ItemCode !== "");
  
      if (selectedItem.length > 0) {
        // تحقق مما إذا كان السطر الذي تم فتح المودال له فارغًا أو ممتلئًا
        const currentRow = IGN1[selectedField.index];
  
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
  
        setIGN1(updatedige1);
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
  

  const start = <Breadcrumb routeSegments={[{ name: "Transactions de stock", path: "/GoodsIssue" }, { name: "Entrée de marchandises" }]} />;
  const end = <GoodsIssueToolBar setshowListOige={setshowListOige}  today={today} fetchNextDocEntry={fetchNextDocEntry} IGN1={IGN1} setIGN1={setIGN1}  Oign = {Oign} setOign ={setOign} state ={state} setState ={setState} handelError={handelError}  /> 

 
  return (
    <Container>      
      <div className="card">
            <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600' }}/>
      </div>

      <Stack spacing={3}>
         { showListOige ? (
          <GoodsIssueList state={state} setState={setState} setIGN1={setIGN1}  Oign={Oign} setOign={setOign} setshowListOige={setshowListOige} /> 
         ) : ( 
         <SimpleCard>           
          <GoodsIssueForm handleSelectItem={handleSelectItem} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} searchQuery={searchQuery} setSearchQuery={setSearchQuery}  handleCloseModal={handleCloseModal}
             handleOpenModal={handleOpenModal} handleSaveSelectedItem={handleSaveSelectedItem}
             setSearchInputVisible={setSearchInputVisible} searchInputVisible={searchInputVisible}
               openm={openm} validation={validation}
             modalContent={{ UM: modalContentUM, WhsCode: modalContentWhsCode, ItemCode: modalContentItemCode }}
              selectedField={selectedField} setLastSavedRow={setLastSavedRow} lastSavedRow={lastSavedRow} setSelectedItem={setSelectedItem}
               selectedItem={selectedItem}    Mode= {state.Mode} handleChange={handleChange} handleSubmit={handleSubmit}  allFieldsFilled={allFieldsFilled} fetchNextDocEntry={fetchNextDocEntry} handelError={handelError} today={today} Oign={Oign} setOign={setOign} IGN1={IGN1} setIGN1={setIGN1} state={state} setState={setState}/>
        </SimpleCard>
      )}
      </Stack>
    </Container>
  );
};

export default AppForm;
