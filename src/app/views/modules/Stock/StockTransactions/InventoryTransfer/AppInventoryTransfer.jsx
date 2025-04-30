
// import { Stack } from "@mui/material";
// import { styled } from "@mui/system";
// import { Breadcrumb, SimpleCard } from "app/components";
// import InventoryTransferForm from "./InventoryTransferForm";
// import InventoryTransferList from "./InventoryTransferList";
// import InventoryTransferToolBar from "./InventoryTransferToolBar";
// import { Menubar } from 'primereact/menubar';
// import { useState } from 'react';
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



// const AppInventoryTransfer = () => {
//   const navigate = useNavigate();
//   const [showListOwtr , setshowListOwtr] = useState(false);
//   const baseUrl = process.env.REACT_APP_API_BASE_URL;
//   const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     timeout: 5000,
//     withCredentials: true
//   });
// const today = new Date().toISOString().split('T')[0];
// const [Owtr, setOwtr] = useState({
//   id:'',
//   DocEntry: '',
//   DocNum: '',
//   DocDate: today,
//   UserSign: '',
//   Comment: '',
//   Filler: '',
//   ToWhs: '',
// });

// const [editIndex, setEditIndex] = useState(0);
// // State for line items data
// const [WTR1, setWTR1] = useState([
//   {
//     id:'',
//     DocEntry: "",
//     LineNum: 1,
//     ItemCode: "",
//     ItemName: "",
//     Quantity: 1,
//     Price: "",
//     LineTotal: "",
//     UM: "",
//     isEditing: true, 
//   },
// ]);
// const [state, setState] = useState({
//   Mode: "Créer",
//   message: "",
//   open: false,
//   vertical: 'top',
//   horizontal: 'center',
//   severity: "success"
// });


// const [open, setOpen] = useState(false);
// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(5);
// const [selectedField, setSelectedField] = useState("");
// const [selectedItem, setSelectedItem] = useState({ type: "", number: "", description: "" });
// const [searchInputVisible, setSearchInputVisible] = useState(false);
// const [searchQuery, setSearchQuery] = useState("");
// const [lastSavedRow, setLastSavedRow] = useState(null);
// const [modalContentUM, setModalContentUM] = useState([]);
// const [modalContentTowhs, setModalContentThows] = useState([]);
// const [modalContentItemCode, setModalContentItemCode] = useState([]);
// const [modalContentFiller, setModalContentFiller] = useState([]);


// const handleSelectItem = (item) => {
//   // Ensure selectedItem is always an array
//   if (!Array.isArray(selectedItem)) {
//     setSelectedItem([item]);
//     return;
//   }

//   const isSelected = selectedItem.some(
//     (selected) => selected.number === item.number
//   );

//   if (selectedField.name === "ItemCode" && WTR1[selectedField.index].ItemCode) {
//     setSelectedItem([item]);
//   } else {
//     if (isSelected) {
//       setSelectedItem((prevSelected) =>
//         prevSelected.filter((selected) => selected.number !== item.number)
//       );
//     } else {
//       setSelectedItem((prevSelected) => [...prevSelected, item]);
//     }
//   }

//   // Update Filler or ToWhs based on selectedField
  
//   if (selectedField.name === "Filler") {
//     handleChange({ target: { name: "Filler", value: item.value } });
//   } else if (selectedField.name === "ToWhs") {
//   handleChange({ target: { name: "ToWhs", value: item.value } });
//   }
// };


// const fetchNextDocEntry = async (nextMode) => {
//   try {
//     const response = await axiosInstance.get("/OWTR/data/MaxDoc");
//     const nextDocEntry = response.data.DocEntry;

//     console.log(nextDocEntry);
//     console.log(state.Mode);
//     console.log(nextMode);

//     if (
//       state.Mode === "Créer" ||
//       state.Mode === "OK" ||
//       nextMode === "Créer"
//     ) {
//       setOwtr((prevData) => ({
//         ...prevData,
//         DocEntry: nextDocEntry,
//         DocNum: nextDocEntry,
//       }));
//       setWTR1((prevIge1) =>
//         prevIge1.map((item) => ({
//           ...item,
//           DocEntry: nextDocEntry,
//         }))
//       );
//     }

//     console.log("after fetchNextDocEntry: " + state.Mode);
//   } catch (error) {
//     handelError(error);
//   }
// };

// // Function to handle adding a new Owtr
// const Add = async (e) => {
//   fetchNextDocEntry("Créer");
//   setEditIndex(0);
//   setOwtr({
//     id:'',
//     DocEntry: '',
//     DocNum: '',
//     DocDate: today,
//     UserSign: '',
//     Comment: '',
//     Filler: '',
//     ToWhs: '',
//   });
//   setWTR1([
//     {
//       DocEntry: "",
//       LineNum: "1",
//       ItemCode: "",
//       ItemName: "",
//       Quantity: 1,
//       Price: "",
//       LineTotal: "",
//       UM: "",
//       isEditing: true, // chenge

//     },
//   ]);
//   setState({ ...state, Mode: "Créer" });
// };



//  const handelError = (error) => {
//     if (error.response) {
//       setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error.response.data.message, severity: "error" });
//     } else if (error.request) {
//       setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "network error", severity: "error" });
//     } else {
//       setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: error, severity: "error" });
//     }
//   };
// // Handle input changes for form fields
// const handleChange = (event) => {
//   const formattedValue = typeof value === 'string' ? value.replace(',', '.') : value;
//   const { name, value } = event.target;
//   setOwtr((prevData) => ({
//     ...prevData,
//     [name]: formattedValue,

//   }));
//   if( state.Mode === "OK"){
//     if(Owtr.id === "") {
//       setState({ ...state, Mode: "Créer" });
//     } else  {setState({ ...state, Mode: "Mettre à jour" }); }

//   }

// };

//   // Handle API errors
//   const handleOpenModal = async (field, targetField, index = null) => {
//     //setSelectedField({ name: field, index });
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
//     }else if (field === 'Filler') {
//       try {
//           const res = await axiosInstance.get("Warehouse/"); // Adjust API as needed
//           const formattedDataFiller = res.data.map(item => ({
//               type: "Filler",
//               number: item.CodeWarehouse,
//               description: item.NomWarehouse,
//               id: item.id
//           }));
//           setModalContentFiller(formattedDataFiller); // Set data for `ToWhs`
//       } catch (error) {
//           console.error("Failed to fetch ToWhs data:", error);
//       }
//   } else if (field === 'ToWhs'){
//     try {
//         const res = await axiosInstance.get("Warehouse/"); // Adjust API as needed
//         const formattedDataTowhs = res.data.map(item => ({
//             type: "ToWhs",
//             number: item.CodeWarehouse,
//             description: item.NomWarehouse,
//             id: item.id
//         }));
//         setModalContentThows(formattedDataTowhs); // Set data for `ToWhs`
//     } catch (error) {
//         console.error("Failed to fetch ToWhs data:", error);
//     }
//     } else if (field === 'ItemCode') {
//             try {
//               const res = await axiosInstance.get("Item/");
//               const formattedDataItemCode = res.data.map(async item => {
//                 let nomUM = item.CodeUMA;
//                 let nomWarehouse = item.Magasin; // Fetch Magasin
               
//                 try {
//                   const umResponse = await axiosInstance.get(`UM/${item.CodeUMA}`);
//                   nomUM = umResponse.data.NomUM;
//                 } catch (umError) {
//                   console.error("Failed to fetch NomUM data:", umError);
//                 }
//                 try {
//                   const whResponse = await axiosInstance.get(
//                     `Warehouse/code/${item.Magasin}`
//                   );
//                   nomWarehouse = whResponse.data.NomWarehouse;
//                 } catch (whError) {
//                   console.error("Failed to fetch NomWarehouse data:", whError);
//                   nomWarehouse = "";
//                 }
                
             
      
//                 return {
//                   number: item.ItemCode,
//                   description: item.ItemName,
//                   id: item.id,
//                   CodeUMA: item.CodeUMA,
//                   NomUM: nomUM ,// Include NomUM in the data
//                   Magasin: item.Magasin, // Include Magasin
//                   NomWarehouse: nomWarehouse || "", // Include NomWarehouse
               
              
//                 };
//               });
//               const finalFormattedDataItemCode = await Promise.all(formattedDataItemCode);
//               setModalContentItemCode(finalFormattedDataItemCode);
//             } catch (error) {
//               console.error("Failed to fetch Item data:", error);
//             }
//           }
//   };


 
//  // Close the modal
//  const handleCloseModal = () => {
//   setOpen(false);
//   setPage(0);
// };

// const handleSelect = async (item) => {
//   if (!item || (!item.number && !item.description)) {
//     console.error('Invalid item selected:', item);
//     return;
//   }

//   let updatedItem = { ...item };

//   // Handle ItemCode-specific logic
//   if (selectedField.name === "ItemCode") {
//     try {
//       // Fetch UM data
//       const umResponse = await axiosInstance.get(`UM/${item.NomUM}`);
//       updatedItem.NomUM = umResponse.data.NomUM;
//     } catch (umError) {
//       console.error("Failed to fetch NomUM data:", umError);
//     }

//   }

 
//   // Ensure Filler and ToWhs are not the same
//   const isFillerOrToWhs = selectedField.name === "Filler" || selectedField.name === "ToWhs";
//   if (
//     isFillerOrToWhs &&
//     ((selectedField.name === "Filler" && item.id === Owtr.ToWhsID) ||
//       (selectedField.name === "ToWhs" && item.id === Owtr.FillerID))
//   ) {
//     console.error("Error: Filler and ToWhs cannot have the same selection.");
//     alert("Error: Filler and ToWhs cannot have the same selection.");
//     return;
//   }

//   // Map updated values for WTR1
//   // const updatedWTR1 = WTR1.map((iqr, i) =>
//   //   i === selectedField.index
//   //     ? {
//   //         ...iqr,
//   //         [selectedField.name]: selectedField.name === "ItemCode" ? updatedItem.number : updatedItem.description,
//   //         ...(selectedField.name === "ItemCode" && {
//   //           ItemName: updatedItem.description,
//   //           UM: updatedItem.NomUM || iqr.UM, // Update UM if fetched
//   //         }),
//   //           ...(selectedField.name === "UM" && { UM: updatedItem.description }),
//   //       }
//   //     : iqr
//   // );

//   // console.log("Updated WTR1:", updatedWTR1); // Debug log for WTR1

//   // Map updated values for Owtr (for Filler and ToWhs)
//   const updatedOwtr = {
//     ...Owtr,
//     [selectedField.name]: item.description,
//     ...(selectedField.name === "Filler" && {
//       FillerDescription: item.description,
//       FillerID: item.id,
//     }),
//     ...(selectedField.name === "ToWhs" && {
//       ToWhsDescription: item.description,
//       ToWhsID: item.id,
//     }),
//   };

//   console.log("Updated Owtr:", updatedOwtr); // Debug log for Owtr

//   // Update the states
//   // setWTR1(updatedWTR1);
//   setOwtr(updatedOwtr);
//   handleCloseModal();
// };





    




//   const handleSaveSelectedItem = () => {
//     if (selectedField.name === "ItemCode") {
//       const next = fetchNextDocEntry();
//       const updatedRdp1 = WTR1.filter(row => row.ItemCode !== "");
  
//       if (selectedItem.length > 0) {
//         const currentRow = WTR1[selectedField.index];
  
//         if (!currentRow.ItemCode) {
//           selectedItem.forEach(item => {
//             updatedRdp1.push({
//               DocEntry: next,
//               LineNum: updatedRdp1.length + 1,
//               ItemCode: item.number,
//               ItemName: item.description,
//               Quantity: 1,
//               Price: "",
//               LineTotal: "",
//               UM: item.NomUM || "",      // ID
//               isEditing: false,
//             });
            
//           });
//         } else {
//           const updatedRow = {
//             ...currentRow,
//             ItemCode: selectedItem[0].number,
//             ItemName: selectedItem[0].description,
//             UM: selectedItem[0].NomUM || "",
           
//           };
          
//           updatedRdp1[selectedField.index] = updatedRow;
//         }
  
//         setWTR1(updatedRdp1);
//         handleCloseModal();
//       } else {
//         handleCloseModal();
//         console.error("No item selected!");
//       }
//     } else {
//       if (selectedItem.length > 0) {
//         handleSelect(selectedItem[0]);
//       } else {
//         handleCloseModal();
//         console.error("No item selected!");
//       }
//     }
  
//     setSelectedItem([]);
//     setPage(0);
//     setSearchQuery("");
//     setSearchInputVisible(false);
//   };


// const prepareDataForSubmission = () => {
//   return WTR1.map((WTR1) => {
//     const umItem =
//     modalContentItemCode.find((item) => item.NomUM === WTR1.UM)?.CodeUMA ||
//     modalContentUM.find((item) => item.description === WTR1.UM)?.id;
      
//     const whsCodeItem =
//       modalContentItemCode.find((item) => item.NomWarehouse === WTR1.WhsCode)
//     const Filler=
//      modalContentFiller.find(item => item.description === Owtr.Filler)?.id || Owtr.Filler // Map Filler
//      const ToWhs=
//      modalContentTowhs.find(item => item.description === Owtr.ToWhs)?.id || Owtr.ToWhs // Map ToWhs

    
//      // Use ID
//     return {
//       ...WTR1,
//       UM: umItem,
//       WhsCode: whsCodeItem || WTR1.WhsCode,
//       Filler:Filler,
//       ToWhs:ToWhs

//     };
//   });
// };

//   // Check if all fields in por are filled
//   const allFieldsFilled = () => {
//     return WTR1.every((por) => {
//       return por.ItemCode;
//     });
//   };



//    // Handle form submission
//    const handleSubmit = async (event) => {
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


//         const preparedIqr1 = prepareDataForSubmission();
//     if (state.Mode === "Créer") {
//       try {
//         await Promise.all([
//           axiosInstance.post("OWTR", Owtr), // Post OWTR data
//           ...preparedIqr1.map((item) => axiosInstance.post("WTR1", item)), // Post WTR1 data
//           ...preparedIqr1.flatMap((item) => [
//             axiosInstance.post(`Stock/${item.id ?? ""}`, {
//               TransType: 67,
//               DocNum: Owtr.DocNum,
//               CardCode: Owtr.CardCode,
//               ItemCode: item.ItemCode,
//               LineNum: item.LineNum,
//               InQty: item.Quantity,
//               OutQty: 0,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//             }),
//             axiosInstance.post(`Stock/${item.id ?? ""}`, {
//               TransType: 67,
//               DocNum: Owtr.DocNum,
//               CardCode: Owtr.CardCode,
//               ItemCode: item.ItemCode,
//               LineNum: item.LineNum,
//               InQty: 0,
//               OutQty: item.Quantity,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//             }),
//           ]),
//         ]);
        
    
//         setState({
//           Mode: 'Créer',
//           vertical: 'top',
//           horizontal: 'center',
//           open: true,
//           message: "Opération correctement achevée",
//           severity: "success",
//         });
    
//         // Reset form data after successful submission
//         setOwtr({
//           DocEntry: '',
//           DocNum: '',
//           DocDate: today,
//           UserSign: '',
//           Comment: '',
//           Filler: '',
//           ToWhs: '',
//         });
//         setWTR1([
//           {
//             DocEntry: "",
//             LineNum: "",
//             ItemCode: "",
//             ItemName: "",
//             Quantity: 1,
//             Price: "",
//             LineTotal: "",
//             UM: "",
//             isEditing: true,
//           },
//         ]);
    
//         setEditIndex(0);
//         await fetchNextDocEntry('Créer');
        
//       } catch (error) {
//         handelError(error);
//       }
//     } else if (state.Mode === "Mettre à jour") {
//       try {
//         await Promise.all([
//           axiosInstance.put(`OWTR/${Owtr.id}`, Owtr),
//           ...preparedIqr1.map((item) =>
//             axiosInstance.put(`Stock/${item.id ?? ""}`, {
//               TransType: 67,
//               DocNum: Owtr.DocNum,
//               CardCode: Owtr.CardCode,
//               ItemCode: item.ItemCode,
//               LineNum: item.LineNum,
//               InQty:  item.Quantity,
//               OutQty:0,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//             },

//             axiosInstance.put(`Stock/${item.id ?? ""}`, {
//               TransType: 67,
//               DocNum: Owtr.DocNum,
//               CardCode: Owtr.CardCode,
//               ItemCode: item.ItemCode,
//               LineNum: item.LineNum,
//               InQty: 0,
//               OutQty: item.Quantity,
//               WhsCode: item.WhsCode,
//               Price: item.Price,
//             }

//           )))
//         ]);
    
//         setState({
//           Mode: 'Créer',
//           vertical: 'top',
//           horizontal: 'center',
//           open: true,
//           message: "Opération correctement achevée",
//           severity: "success",
//         });
    
//         // Reset form data after successful submission
//         setOwtr({
//           DocEntry: '',
//           DocNum: '',
//           DocDate: today,
//           UserSign: '',
//           Comment: '',
//           Filler: '',
//           ToWhs: '',
//         });
//         setWTR1([
//           {
//             DocEntry: "",
//             LineNum: "",
//             ItemCode: "",
//             ItemName: "",
//             Quantity: 1,
//             Price: "",
//             LineTotal: "",
//             UM: "",
//             isEditing: true,
//           },
//         ]);
    
//         setEditIndex(0);
//         await fetchNextDocEntry('Créer');
//       } catch (error) {
//         handelError(error);
//       }
//     } else {
//       navigate("/");
//     }
    
    
// };


//   const start = <Breadcrumb routeSegments={[{
//      name: "Transactions de stock", path: "/GoodsIssue" }, 
//      {
//        name: "Transfert" }]} />;
//      const end = <InventoryTransferToolBar 

//     Add={Add}
//     state={state}
//     setshowListOwtr={setshowListOwtr}
//     setEditIndex={setEditIndex} 
//     today={today} 
//     fetchNextDocEntry={fetchNextDocEntry} 
//     WTR1={WTR1} 
//     setWTR1={setWTR1}  
//     Owtr = {Owtr} 
//     setOwtr ={setOwtr}
//     setState ={setState} 
//     handelError={handelError}  
//    />

//   return (
  
//      <Container>      
//      <div className="card">
//      {/* end={end} */}
//            <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600'}}/>
//      </div>

//      <Stack spacing={3}>
//         { showListOwtr ? (
//          <InventoryTransferList
//          setWTR1={setWTR1} 
//          setEditIndex={setEditIndex} 
//          Owtr={Owtr} 
//          setOwtr={setOwtr} 
//          setState={setState} 
//          state={state} 
//          setshowListOwtr={setshowListOwtr} />
//         ) : (
//         <SimpleCard>          
//          <InventoryTransferForm  handleCloseModal={handleCloseModal}
//           handleSelect={handleSelect}
//           setPage={setPage}
//              handleSelectItem={handleSelectItem}
//              handleOpenModal={handleOpenModal}
//             setLastSavedRow={setLastSavedRow} 
//             lastSavedRow={lastSavedRow}
//              setSearchQuery={setSearchQuery} 
//              searchQuery={searchQuery} 
//              setSearchInputVisible={setSearchInputVisible}
//              searchInputVisible={searchInputVisible} 
//              setSelectedItem={setSelectedItem} 
//              selectedItem={selectedItem}
//              setSelectedField={setSelectedField} 
//              selectedField={selectedField} 
//               modalContent={{ 
//               UM: modalContentUM, 
//               ToWhs: modalContentTowhs,
//               Filler: modalContentFiller, 
//               ItemCode: modalContentItemCode }}
//               open={open} setOpen={setOpen}   
//               setRowsPerPage={setRowsPerPage}

//               Mode={state.Mode} Owtr={Owtr} 
//               editIndex={editIndex} 
//               setOwtr={setOwtr} 
//               setEditIndex={setEditIndex} 
//               today={today} 
//               WTR1={WTR1} 
//               handleSaveSelectedItem={handleSaveSelectedItem}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               setWTR1={setWTR1} 
//               allFieldsFilled={allFieldsFilled}
//               state={state} 
//               setState={setState}
//               handelError={handelError} 
//               handleChange={handleChange} 
//               handleSubmit={handleSubmit} 
//               fetchNextDocEntry={fetchNextDocEntry}/>
//        </SimpleCard>
//       )} 
//      </Stack>
//    </Container>
//   );
// };

// export default AppInventoryTransfer;



// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
















import { Stack , IconButton } from "@mui/material";
import { styled } from "@mui/system"; 
import { Breadcrumb, SimpleCard } from "app/components";
import InventoryTransferForm from "./InventoryTransferForm" ;
import GoodsIssueToolBar from "./InventoryTransferToolBar";
import GoodsIssueList from "./InventoryTransferList";
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
  const [modalContentTowhs, setModalContentThows] = useState([]);
const [modalContentFiller, setModalContentFiller] = useState([]);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [modalContentCardCode, setModalContentCardCode] = useState([]);
  const [warehouseError, setWarehouseError] = useState(false);


  const [WTR1, setWTR1] = useState([
    {
      id:'',
      DocEntry: '',
      LineNum: '1',
      ItemCode: '',
      ItemName: '',
      Quantity: '1',
      Price: '',
      Discount: '0',
      LineTotal: '',
      UM: '',
      isEditing: true,
    }
  ]);
  const [Owtr, setOwtr] = useState({
    id:'',
    DocEntry: '',
    DocNum: '',
    DocDate: today,
    UserSign: 1,
    Comment: '',
    Filler: '',
    ToWhs: '',
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
      const response = await axiosInstance.get('/OWTR//data/MaxDoc');
      const nextDocEntry = response.data.DocEntry;
      if(state.Mode === "Créer"|| nextMode === "Créer" ){
      setOwtr((prevData) => ({
        ...prevData,
        DocEntry: nextDocEntry,
      }));
      setOwtr((prevData) => ({
        ...prevData,
        DocNum: nextDocEntry,
      }));
      setWTR1((prevIge1) => prevIge1.map((item) => ({
        ...item,
        DocEntry: nextDocEntry,
      })));
      }
console.log("data_res:",nextDocEntry );
    } catch (error) {
      handelError(error);
    }


  };

const allFieldsFilled = () => {
  return WTR1.every(ige => ( ige.ItemCode  ));
 
};

  const validation = () => {
    if (!Owtr.Filler) return "Veuillez sélectionner le magasin cédant.";
    if (!Owtr.ToWhs) return "Veuillez sélectionner le magasin destinataire.";
  
    for (let i = 0; i < WTR1.length; i++) {
      const line = WTR1[i];
      if (!line.ItemCode) return `Saisir un article dans la ligne ${i + 1}`;
      if (!line.Quantity || Number(line.Quantity) <= 0) return `Quantité invalide dans la ligne ${i + 1}`;
    }
  
    return true;
    
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    const newOwtr = {
      ...Owtr,
      [name]: value,
    };
  
    // Block if Filler and ToWhs are the same
    if (
      (name === "Filler" && value === Owtr.ToWhs) ||
      (name === "ToWhs" && value === Owtr.Filler)
    ) {
      alert("Le magasin cédant et le magasin destinataire doivent être différents !");
      return; //  Stop here
    }
  
    setOwtr(newOwtr);
    console.log("new", newOwtr);
    
  
    // Optional: Update mode
    if (state.Mode === "OK") {
      setState({ ...state, Mode: Owtr.id === "" ? "Créer" : "Mettre à jour" });
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
      
    }else if (field === 'Filler') {
            try {
                const res = await axiosInstance.get("Warehouse/"); // Adjust API as needed
                const formattedDataFiller = res.data.map(item => ({
                    type: "Filler",
                    number: item.CodeWarehouse,
                    description: item.NomWarehouse,
                    id: item.id
                }));
                console.log(formattedDataFiller);

                setModalContentFiller(formattedDataFiller); // Set data for `ToWhs`
            } catch (error) {
                console.error("Failed to fetch ToWhs data:", error);
            }
        } else if (field === 'ToWhs'){
          try {
              const res = await axiosInstance.get("Warehouse/"); // Adjust API as needed
              const formattedDataTowhs = res.data.map(item => ({
                  type: "ToWhs",
                  number: item.CodeWarehouse,
                  description: item.NomWarehouse,
                  id: item.id
              }));
              setModalContentThows(formattedDataTowhs); // Set data for `ToWhs`
          } catch (error) {
              console.error("Failed to fetch ToWhs data:", error);
          }
          }
else if (field === 'ItemCode') {
        try {
            const res = await axiosInstance.get("Item/");
            const formattedDataItemCode = res.data.map(async item => {
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
                    NomUM: nomUM,
                    Magasin: item.Magasin,
                    NomWarehouse: nomWarehouse || "",
                    GroupeTax: item.GroupeTax,
                    NomTax: taxName || 0
                };
            });
            const finalFormattedDataItemCode = await Promise.all(formattedDataItemCode);
            setModalContentItemCode(finalFormattedDataItemCode);
        } catch (error) {
            console.error("Failed to fetch Item data:", error);
        }
     } 
  
  };
  
 
  const prepareDataForSubmission = () => {
    return WTR1.map(ige => {
    
      const umItem = modalContentItemCode.find(item => item.NomUM === ige.UM)?.CodeUMA || modalContentUM.find(item => item.description === ige.UM)?.id;
 
      const Filler = modalContentFiller.find(item => item.description === Owtr.Filler)?.id || Owtr.Filler // Map Filler
      const ToWhs  = modalContentTowhs.find(item => item.description === Owtr.ToWhs)?.id || Owtr.ToWhs // Map ToWhs
      return {
        ...ige,
        UM: umItem ,
        Filler:Filler,
        ToWhs:ToWhs      
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
    // 1) Build your quantities map
    const res = await axiosInstance.get("Item/");
    const items = res.data;
    const quantities = {};
    preparedIge1.forEach(row => {
      const qty = parseInt(row.Quantity, 10) || 0;
      quantities[row.ItemCode] = (quantities[row.ItemCode] || 0) + qty;
    });

    // 2) Compute new stock values
    const updates = items
      .filter(item => quantities[item.ItemCode])
      .map(item => ({
        ItemCode: item.ItemCode,
        // use a plain ASCII key here!
        newQuantity: (parseInt(item.EnStock, 10) || 0) + quantities[item.ItemCode]
      }));
     

    // 3) Fire off your POSTs
    for (let u of updates) {
      console.log("Posting stock update:", u);
      await axiosInstance.post("Item/stock", u);
    } console.log("result:",updates )

    return true;   // all went well
  } catch (err) {
    // log the server’s error payload, not just the 500
    console.error("Stock update failed:", err.response?.data || err.message);
    return false;
  }
};



// const handleSubmit = async (event) => {
//   event.preventDefault();

//   // Validate fields
//   const fieldCheckResult = validation();
//   if (fieldCheckResult !== true) {
//     setState({
//       ...state,
//       open: true,
//       message: ` ${fieldCheckResult}`,
//       severity: "error",
//     });
//     return;
//   }

//   const preparedIqr1 = prepareDataForSubmission();

//   try {
//     if (state.Mode === "Créer") {
//       // — Post stock movements (inbound + outbound)
//       await Promise.all([
//             axiosInstance.post("OWTR", Owtr), // Post OWTR data
//             ...preparedIqr1.map((item) => axiosInstance.post("WTR1", item)), // Post WTR1 data
//             ...preparedIqr1.flatMap((item) => [
//               axiosInstance.post(`Stock/${item.id ?? ""}`, {
//                 TransType: 67,
//                 DocNum: Owtr.DocNum,
//                 CardCode: Owtr.CardCode,
//                 ItemCode: item.ItemCode,
//                 LineNum: item.LineNum,
//                 InQty: item.Quantity,
//                 OutQty: 0,
//                 WhsCode: item.Filler  ,
//                 Price: item.Price,
//               }),
//               axiosInstance.post(`Stock/${item.id ?? ""}`, {
//                 TransType: 67,
//                 DocNum: Owtr.DocNum,
//                 CardCode: Owtr.CardCode,
//                 ItemCode: item.ItemCode,
//                 LineNum: item.LineNum,
//                 InQty: 0,
//                 OutQty: item.Quantity,
//                 WhsCode: item.Filler,
//                 Towhs: item.Towhs,
//                 Price: item.Price,
//               }),
//             ]),
//           ]);

//       // — Success for Créér
//       setState({
//         Mode: "Créer",
//         open: true,
//         message: "Opération achevée",
//         severity: "success",
//       });
//       setOwtr({
//         DocEntry: "",
//         DocNum: "",
//         DocDate: today,
//         UserSign: 1,
//         Comment: "",
//         Filler: "",
//         ToWhs: "",
//       });
//       setWTR1([
//         {
//           DocEntry: "",
//           LineNum: "1",
//           ItemCode: "",
//           ItemName: "",
//           Quantity: "1",
//           Price: "0.00",
//           Discount: "0",
//           LineTotal: "0.00",
//           UM: "",
//           isEditing: true,
//         },
//       ]);
//       fetchNextDocEntry("Créer");

//       // Update stock if needed
//       await updateStock(preparedIqr1);

//     } else if (state.Mode === "Mettre à jour") {
//       // — Post Owtr header + detail + stock movements
//       await Promise.all([
//         axiosInstance.post("OWTR", Owtr), // Post OWTR data
//         ...preparedIqr1.map((item) => axiosInstance.post("WTR1", item)), // Post WTR1 data
//         ...preparedIqr1.flatMap((item) => [
//           axiosInstance.put(`Stock/${item.id ?? ""}`, {
//             TransType: 67,
//             DocNum: Owtr.DocNum,
//             CardCode: Owtr.CardCode,
//             ItemCode: item.ItemCode,
//             LineNum: item.LineNum,
//             InQty: item.Quantity,
//             OutQty: 0,
//             WhsCode: item.WhsCode,
//             Price: item.Price,
//           }),
//           axiosInstance.put(`Stock/${item.id ?? ""}`, {
//             TransType: 67,
//             DocNum: Owtr.DocNum,
//             CardCode: Owtr.CardCode,
//             ItemCode: item.ItemCode,
//             LineNum: item.LineNum,
//             InQty: 0,
//             OutQty: item.Quantity,
//             WhsCode: item.Filler,
//             Towhs: item.Towhs,
//             Price: item.Price,
//           }),
//         ])
//           ]);

//       // — Success for Mettre à jour
//       setState({
//         Mode: "Créer",
//         vertical: "top",
//         horizontal: "center",
//         open: true,
//         message: "Opération correctement achevée",
//         severity: "success",
//       });
//       setOwtr({
//         DocDate: today,
//         UserSign: "",
//         Comment: "",
//         Filler: "",
//         ToWhs: "",
//       });
//       setWTR1([
//         {
//           LineNum: "1",
//           ItemCode: "",
//           ItemName: "",
//           Quantity: "1",
//           Price: "0.00",
//           Discount: "0",
//           LineTotal: "0.00",
//           UM: "",
//           isEditing: true,
//         },
//       ]);
//       fetchNextDocEntry("Créer");

//     } else {
//       // Fallback: navigate away
//       navigate("/");
//     }
//   } catch (error) {
//     handelError(error);
//   }
// };

/* Correction 29/04/2025  START */

const handleSubmit = async (event) => {
  event.preventDefault();
  const fieldCheckResult = validation();

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

  console.log("Owtr");
  console.log(Owtr);
  console.log("preparedIqr1");
  console.log(preparedIqr1);

  if (state.Mode === "Créer") {
    try {
      await Promise.all([
        axiosInstance.post("OWTR", {
            DocEntry: 9,
            DocNum: 9,            
            DocDate: "2025-04-29",
            Comment: "",
            UserSign: 1,
            Filler: 1,
            ToWhs: 2 
        }),
        ...preparedIqr1.map((item) => axiosInstance.post("WTR1", item)),
      ]);
      setState({
        Mode:     "Créer",
        open:     true,
        message:  "Opération achevée",
        severity: "success",
      });
      setOwtr({
        DocEntry: "",
        DocNum:   "",
        DocDate:  today,
        UserSign: 1,
        Comment:  "",
        Filler:   "",
        ToWhs:    "",
      });
      setWTR1([{
        DocEntry:  "",
        LineNum:   "1",
        ItemCode:  "",
        ItemName:  "",
        Quantity:  "1",
        Price:     "0.00",
        Discount:  "0",
        LineTotal: "0.00",
        UM:        "",
        isEditing: true,
      }]);
      fetchNextDocEntry("Créer");
       await fetchNextDocEntry("Créer");
    } catch (error) {
      handelError(error);
    }
  } else if (state.Mode === "Mettre à jour") {
    try {
      await Promise.all([axiosInstance.put(`OWTR/${Owtr.id}`, Owtr)]);
       setState({
        Mode:     "Créer",
        open:     true,
        message:  "Opération achevée",
        severity: "success",
      });
      setOwtr({
        DocEntry: "",
        DocNum:   "",
        DocDate:  today,
        UserSign: 1,
        Comment:  "",
        Filler:   "",
        ToWhs:    "",
      });
      setWTR1([{
        DocEntry:  "",
        LineNum:   "1",
        ItemCode:  "",
        ItemName:  "",
        Quantity:  "1",
        Price:     "0.00",
        Discount:  "0",
        LineTotal: "0.00",
        UM:        "",
        isEditing: true,
      }]);
      fetchNextDocEntry("Créer");

      await fetchNextDocEntry("Créer");
    } catch (error) {
      handelError(error);
    }
  } else {
    navigate("/");
  }
};

/*
const handleSubmit = async (event) => {
  event.preventDefault();

  // 1) التحقق من صحة البيانات
  const fieldCheckResult = validation();
  if (fieldCheckResult !== true) {
    setState({
      ...state,
      open: true,
      message: `${fieldCheckResult}`,
      severity: "error",
    });
    return;
  }
 
  const preparedIqr1 = prepareDataForSubmission();

  // مساعدة لتسجيل الأخطاء وإظهار Snackbar
  const logAndNotify = (step, err, itemCode) => {
    console.error(`❌ خطأ في خطوة ${step}${itemCode ? ` (ItemCode: ${itemCode})` : ""}:`, {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    setState({
      ...state,
      open: true,
      message: `خطأ في ${step}: ${err.response?.data?.message || err.message}`,
      severity: "error",
    });
  };

  // 2) تجهيز payload للـ header مع حقول الأي دي الصحيحة
  const headerPayload = {
    DocEntry: Owtr.DocEntry,
    DocNum:   Owtr.DocNum,
    DocDate:  Owtr.DocDate,
    UserSign: Owtr.UserSign,
    Comment:  Owtr.Comment,
    Filler:   Owtr.FillerID,             // رقم مستودع الإرسال
    ToWhs:    Owtr.ToWhsID,              // رقم مستودع الاستلام
    CardCode: Owtr.CardCodeID || Owtr.CardCode  // رقم العميل/المورد
  };

  console.log("🔍 Payload OWTR (مصحح):\n", JSON.stringify(headerPayload, null, 2));

  try {
    if (state.Mode === "Créer") {
      console.log("🚀 [Créer] بدء الحفظ خطوة بخطوة...");

      // 3) رفع الـ header (OWTR)
      try {
        const { data: hdr } = await axiosInstance.post("OWTR", headerPayload);
        console.log("✅ OWTR تم بنجاح:", hdr);
      } catch (err) {
        logAndNotify("OWTR", err);
        return;
      }

      // 4) رفع تفاصيل WTR1
      console.log("🔼 رفع تفاصيل WTR1...");
      for (const item of preparedIqr1) {
        try {
          const { data: d } = await axiosInstance.post("WTR1", item);
          console.log(`✅ WTR1[${item.ItemCode}] تم بنجاح:`, d);
        } catch (err) {
          logAndNotify("WTR1", err, item.ItemCode);
          return;
        }
      }

      // 5) رفع تحركات المخزون (in + out)
      console.log("🔼 رفع تحركات المخزون...");
      for (const item of preparedIqr1) {
        // In
        try {
          const { data: inRes } = await axiosInstance.post(
            `Stock/${item.id ?? ""}`,
            {
              TransType: 67,
              DocNum:    Owtr.DocNum,
              CardCode:  headerPayload.CardCode,
              ItemCode:  item.ItemCode,
              LineNum:   item.LineNum,
              InQty:     item.Quantity,
              OutQty:    0,
              WhsCode:   item.Filler,
              Price:     item.Price,
            }
          );
          console.log(`✅ Stock In[${item.ItemCode}] تم بنجاح:`, inRes);
        } catch (err) {
          logAndNotify("Stock In", err, item.ItemCode);
          return;
        }
        // Out
        try {
          const { data: outRes } = await axiosInstance.post(
            `Stock/${item.id ?? ""}`,
            {
              TransType: 67,
              DocNum:    Owtr.DocNum,
              CardCode:  headerPayload.CardCode,
              ItemCode:  item.ItemCode,
              LineNum:   item.LineNum,
              InQty:     0,
              OutQty:    item.Quantity,
              WhsCode:   item.Filler,
              Towhs:     item.Towhs,
              Price:     item.Price,
            }
          );
          console.log(`✅ Stock Out[${item.ItemCode}] تم بنجاح:`, outRes);
        } catch (err) {
          logAndNotify("Stock Out", err, item.ItemCode);
          return;
        }
      }

      // 6) النجاح وإعادة التهيئة
      console.log("🎉 تم حفظ كل شيء بنجاح!");
      setState({
        Mode:     "Créer",
        open:     true,
        message:  "Opération achevée",
        severity: "success",
      });
      setOwtr({
        DocEntry: "",
        DocNum:   "",
        DocDate:  today,
        UserSign: 1,
        Comment:  "",
        Filler:   "",
        ToWhs:    "",
      });
      setWTR1([{
        DocEntry:  "",
        LineNum:   "1",
        ItemCode:  "",
        ItemName:  "",
        Quantity:  "1",
        Price:     "0.00",
        Discount:  "0",
        LineTotal: "0.00",
        UM:        "",
        isEditing: true,
      }]);
      fetchNextDocEntry("Créer");

      // 7) تحديث المخزون الفعلي
      await updateStock(preparedIqr1);

    } else if (state.Mode === "Mettre à jour") {
      console.log("🔁 [Mettre à jour] بدء التحديث خطوة بخطوة...");
      // نفس الهيكل السابق لكن باستخدام PUT: OWTR/:id, WTR1/:id, Stock/:id
    } else {
      navigate("/");
    }
  } catch (err) {
    console.error("❌ خطأ غير متوقع في handleSubmit:", err);
    handelError(err);
  }
}; */


/* Correction 29/04/2025 END */




 const handleSelect = (item) => {
    const { name: field } = selectedField;
  
    if (field === "Filler" || field === "ToWhs") {
      const newValue = item.description;
      const otherField = field === "Filler" ? "ToWhs" : "Filler";
      const otherValue = Owtr[otherField];
  
      if (newValue === otherValue) {
        alert("Le magasin cédant et le magasin destinataire doivent être différents !");
        return; // Stop selection
      }
  
    //   setOwtr(prev => ({
    //     ...prev,
    //     [field]: newValue,
    //     ...(field === "CardCode" && { CardCode: item.number })
    //   }));
    }
  
    // If it's a row-level field (WTR1)
    const updatediqr1 = WTR1.map((iqr, i) => (
      i === selectedField.index
        ? {
            ...iqr,
            [field]: field === "ItemCode" ? item.number : item.description,
            ...(field === "ItemCode" && { ItemName: item.description }),
            ...(field === "ItemCode" && { UM: item.NomUM }),
            ...(field === "ItemCode" && { WhsCode: item.NomWarehouse }),
            ...(field === "UM" && { UM: item.description }),
          }
        : iqr

    ));

     // Map updated values for Owtr (for Filler and ToWhs)
  const updatedOwtr = {
    ...Owtr,
    [selectedField.name]: item.description,
    ...(selectedField.name === "Filler" && {
      FillerDescription: item.description,
      FillerID: item.id,
    }),
    ...(selectedField.name === "ToWhs" && {
      ToWhsDescription: item.description,
      ToWhsID: item.id,
    }),
  };
   

  console.log("Updated Owtr:", updatedOwtr); // Debug log for Owtr

  // Update the states
  setWTR1(updatediqr1);
  setOwtr(updatedOwtr);
  handleCloseModal();
};

  //_________________________________________________________________________________________________________________________________________________________


const handleSelectItem = (item) => {
      // Ensure selectedItem is always an array
      if (!Array.isArray(selectedItem)) {
        setSelectedItem([item]);
        return;
      }
    
      const isSelected = selectedItem.some(
        (selected) => selected.number === item.number
      );
    
      if (selectedField.name === "ItemCode" && WTR1[selectedField.index].ItemCode) {
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
        // Update Filler or ToWhs based on selectedField
  
          if (selectedField.name === "Filler") {
            handleChange({ target: { name: "Filler", value: item.value } });
          } else if (selectedField.name === "ToWhs") {
          handleChange({ target: { name: "ToWhs", value: item.value } });
          }


    }
  
  const handleSaveSelectedItem = () => {
    if (selectedField.name === "ItemCode") {
      const next = fetchNextDocEntry();
      const updatedRdp1 = WTR1.filter(row => row.ItemCode !== "");
  
      if (selectedItem.length > 0) {
        const currentRow = WTR1[selectedField.index];
  
        if (!currentRow.ItemCode) {
          selectedItem.forEach(item => {
            updatedRdp1.push({
              DocEntry: next,
              LineNum: updatedRdp1.length + 1,
              ItemCode: item.number,
              ItemName: item.description,
              Quantity: 1,
              Price: "",
              LineTotal: "",
              UM: item.NomUM || "",      // ID
              isEditing: false,
            });
            
          });
        } else {
          const updatedRow = {
            ...currentRow,
            ItemCode: selectedItem[0].number,
            ItemName: selectedItem[0].description,
            UM: selectedItem[0].NomUM || "",
           
          };
          
          updatedRdp1[selectedField.index] = updatedRow;
        }
  
        setWTR1(updatedRdp1);
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

  const start = <Breadcrumb routeSegments={[{ name: "Transactions de stock", path: "/GoodsIssue" }, { name: "Transfert de Stock" }]} />;
  const end = <GoodsIssueToolBar setshowListOige={setshowListOige}  today={today} fetchNextDocEntry={fetchNextDocEntry} WTR1={WTR1} setWTR1={setWTR1}  Owtr = {Owtr} setOwtr ={setOwtr} state ={state} setState ={setState} handelError={handelError}  /> 

 
  return (
    <Container>      
      <div className="card">
            <Menubar start={start} end={end} style={{ border: '1px solid #dee2e600' }}/>
      </div>

      <Stack spacing={3}>
         { showListOige ? (
          <GoodsIssueList state={state} setState={setState} setWTR1={setWTR1}  Owtr={Owtr} setOwtr={setOwtr} setshowListOige={setshowListOige} /> 
         ) : ( 
         <SimpleCard>           
          <InventoryTransferForm handleSelectItem={handleSelectItem} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} searchQuery={searchQuery} setSearchQuery={setSearchQuery}  handleCloseModal={handleCloseModal}
             handleOpenModal={handleOpenModal} handleSaveSelectedItem={handleSaveSelectedItem}
             setSearchInputVisible={setSearchInputVisible} searchInputVisible={searchInputVisible}
               openm={openm} validation={validation}
               modalContent={{ UM: modalContentUM, WhsCode: modalContentWhsCode, ItemCode: modalContentItemCode,CardCode: modalContentCardCode , ToWhs: modalContentTowhs ,Filler: modalContentFiller }}
              selectedField={selectedField} setLastSavedRow={setLastSavedRow} lastSavedRow={lastSavedRow} setSelectedItem={setSelectedItem}
               selectedItem={selectedItem}    Mode= {state.Mode} handleChange={handleChange} handleSubmit={handleSubmit} warehouseError={warehouseError}
                allFieldsFilled={allFieldsFilled} fetchNextDocEntry={fetchNextDocEntry} handelError={handelError} today={today} Owtr={Owtr} setOwtr={setOwtr} WTR1={WTR1} setWTR1={setWTR1} state={state} setState={setState}

               />
        </SimpleCard>
      )}
      </Stack>
    </Container>
  );
};

export default AppForm;

