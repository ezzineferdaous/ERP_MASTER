// import React, { useRef , useEffect,useState  } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   TextField,
//   Modal,
//   Box,
//   Typography,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   InputAdornment,
//   TablePagination,
//   Radio 
  
// } from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faTrash,
//   faTimes,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import { styled } from "@mui/system";
// import AddIcon from "@mui/icons-material/Add";


// // Styled component for table cell
// const StyledTableCell = styled(TableCell)(() => ({
//   borderBottom: "none",
//   padding: 0,
//   width: "80px",
//   height: "40px",
//   textAlign: "center",
// }));

// // Another styled component for table cell with different styles
// const TableCellK = styled(TableCell)(() => ({
//   textAlign: "center",
//   width: "80px",
//   height: "40px",
//   borderBottom: "none",
// }));


// // Modal style
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   height: 600,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };


// // CSS to hide the spinners in number inputs
// const styles = `
//     input[type='number']::-webkit-outer-spin-button,
//     input[type='number']::-webkit-inner-spin-button {
//       -webkit-appearance: none;
//       margin: 0;
//     }

//     input[type='number'] {
//       -moz-appearance: textfield;
//     }
//   `;


// const InventoryTransferTable  = React.memo((props) => {
//   // add  thes varibel  
//     const [refresh, setRefresh] = useState(false);
//     const [focusField, setFocusField] = useState({ index: null, fieldName: null });
//     const inputRefs = useRef({});
//     const [tempValue, setTempValue] = useState("");
//     const tableContainerRef = useRef(null);

    
 

// const handleInputChange = (index, e) => {
//   const { name, value } = e.target;

//   props.setWTR1((prevWTR1) => {
//     const updatedWTR1 = [...prevWTR1];
//     updatedWTR1[index][name] = value;

//     // Perform calculations if necessary
//     calculate(updatedWTR1, index, name);

//     return updatedWTR1;
//   });
// };

  

// const calculate = (updatedWTR1, index, field) => {
//   // Retrieve current row values
//   const row = updatedWTR1[index];
//   const Quantity = parseFloat(row.Quantity || 0);
//   const prix = parseFloat(row.Price || 0);
//   const discount = parseFloat(row.Discount || 0); // Example field if needed
//   const vat = parseFloat(row.VAT || 0); // Example VAT field

//   // Update LineTotal if Quantity or Price is updated
//   if (field === "Quantity" || field === "Price") {
//     row.LineTotal = (Quantity * prix).toFixed(2);
//   }

//   // Example: Apply Discount and VAT for additional calculations
//   if (field === "Price" || field === "Discount" || field === "VAT") {
//     const discountedPrice = prix - (prix * discount) / 100;
//     row.LineTotalWithVAT = ((discountedPrice * Quantity) + (discountedPrice * Quantity * vat) / 100).toFixed(2);
//   }

//   // Log the updated row values to the console
//   console.log(`Row ${index + 1}`, row);
// };

//   // add  thes function
//   const handleFocus = (value) => {
//     setTempValue(value);  
//     console.log("value" , tempValue);
//     setRefresh(prev => !prev);
//   };
// // add  thes function
//   const handleBlur = (index, e) => {
//     const { name, value } = e.target;
//      if (value !== tempValue  ) {
//        handleInputChange(index, e);
//        if(name !== "Quantity"){
//         calculate(index);
//        }
//      }
//   };
//   // Add a new row to RDR if all fields are filled
//   const RDR1D = () => {
//     if (props.allFieldsFilled()) {
      
//       props.setEditIndex(props.WTR1.length);
//       props.fetchNextDocEntry();
//       props.setWTR1([
//         ...props.WTR1,
//         {
//           DocEntry: "",
//           LineNum: props.WTR1.length + 1,
//           ItemCode: "",
//           ItemName: "",
//           Quantity: 1,
//           Price: "",
//           LineTotal: "",
//           UM: "",
//           isEditing: true, // chenge

//         },     

//       ]);        

//     } else {
//       props.setState({ ...props.state, open: true, message: "Please choose Code Article before adding a new row.", severity: "error" });
//   }
//   };
//   // Delete the selected row
//   const handleDelete = (index) => {
//     if (props.WTR1.length <= 1) {
//       props.setState({ ...props.state, open: true, message: "Il doit rester au moins une ligne ", severity: "warning" });
//       return;  
//     }
//     const updatedPOR1 = [...props.WTR1];
//     updatedPOR1.splice(index, 1);
//     props.setWTR1(updatedPOR1);
//     console.log("Data to delete:", updatedPOR1);
//   };
//  // incrementation of the lineNum
//  useEffect(() => {
//   props.setWTR1((prevIge12) =>
//     prevIge12.map((item, i) => ({
//       ...item,
//       LineNum: i + 1,
//     }))
//   );
// }, [props.setWTR1]);

// useEffect(() => {
//   if (tableContainerRef.current) {
//     tableContainerRef.current.scrollTop =
//       tableContainerRef.current.scrollHeight;
//   }
// }, [props.WTR1.length]);

// // add  thes function
// const handleEdit = (index, fieldName) => {

//   if (props.WTR1[index].isEditing || props.state.Mode !== "Créer") {
//      return;
//   }

//   if (props.allFieldsFilled()) {
//      const updatedRows = props.WTR1.map((row, rowIndex) => ({
//         ...row,
//         isEditing: rowIndex === index,
//      }));
//      props.setWTR1(updatedRows);
//      setFocusField({ index, fieldName });
//      console.log("setFocusField:", focusField);
//   } else {
//      alert("Please fill all fields before adding a new row!");
//   }
// };
// // add  thes useEffect
// useEffect(() => {
// if (focusField.index !== null && focusField.fieldName) {
//    const refKey = `${focusField.fieldName}-${focusField.index}`;
//    const input = inputRefs.current[refKey];
//    if (input) {
//       input.focus();
//    }
//    setFocusField({ index: null, fieldName: null });
// }
// }, [focusField]);




// return (
//   <Box>
//     <style>{styles}</style>
//     {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
//       <Button onClick={RDR1D} variant="contained">
//         <AddIcon fontSize="small" />
//       </Button>
//     )}
//     <TableContainer
//       ref={props.state.Mode === "Créer" ? tableContainerRef : null}
//       component={Paper}
//       style={{
//         marginTop: "2%",
//         maxHeight: props.state.Mode === "Créer" ? "265px" : "250px",
//         overflowY: "auto",
//       }}
//     >
  
  
//     <Table border="1" style={{ width: "100%", tableLayout: "fixed" }}>
//           <TableHead
//             style={{
//               backgroundColor: "lightgrey",
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//               height: "20px",
//             }}
//           >    
//      <TableRow>
//            <TableCellK style={{ width: "20px" }}>ID</TableCellK>
//            <TableCellK >Code Article</TableCellK>
//            <TableCellK  >Nom Article</TableCellK>
//            <TableCellK >Quantité</TableCellK>
//            <TableCellK >Prix- TTC</TableCellK>
//            <TableCellK >Total ligne</TableCellK>
//            <TableCellK >Unite de Mesure</TableCellK>
//            {props.state.Mode !== "Mettre à jour" &&
//             props.state.Mode !== "OK" &&
//             <TableCellK>Action</TableCellK>}  
                 
//       </TableRow>
//        </TableHead>
//      <TableBody>
//        {props.WTR1.map((apin, index) => (
//           // edet this
//           <TableRow key={index}            
//               onClick={(e) => {
//               // Check if the clicked field is not "Action"
//                const field = e.target.dataset.field || e.currentTarget.dataset.field;
//                 if (field !== "Action") {
//                   handleEdit(index, field);
//                 }
//               }} style={{ cursor: 'pointer' }}> 
//            <StyledTableCell>{index + 1}</StyledTableCell>
//            {apin.isEditing  ? (
//              <>
//                <StyledTableCell style={{display: 'none'}}>
//                  <TextField
//                    fullWidth
//                    style={{ width: '100%', height: '53px' }}
//                    type="number"
//                    name="DocEntry"
//                    value={apin.DocEntry}
//                    onChange={(e) => handleInputChange(index, e)}
//                    // disabled={!WTR1.ItemCode}
//                    disabled
//                    inputProps={{
//                    style: { borderRadius: '0px' },
//                   //  disableUnderline: true,
               
//                    }}
//                  />
//                </StyledTableCell>
//                <StyledTableCell  style={{display: 'none'}}>
//                <TextField
//                  fullWidth
//                  style={{ width: '100%', height: '53px' }}
//                  name="LineNum"
//                  value={apin.LineNum}
//                  onChange={(e) => handleInputChange(index, e)}
//                  disabled
//                  inputProps={{ style: { borderRadius: '0px' } }}
//                />
//              </StyledTableCell>
//                <StyledTableCell>
//                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//                    <TextField
//                      fullWidth
//                      style={{ width: '100%', height: '53px' }}
//                      name="ItemCode"
//                      value={apin.ItemCode}
//                      // edet this [
//                       data-index={index}
//                       inputRef={(el) => (inputRefs.current[`ItemCode-${index}`] = el)}
//                       //]
//                      onChange={(e) => handleInputChange(index, e)}
//                      disabled={ props.mode === 'Mettre à jour'}
//                      InputProps={{
//                        style: { borderRadius: '0px', paddingRight: '15px' },
//                      }}
//                    />
//                    <FontAwesomeIcon
//                      icon={faBars}
//                      onClick={() => props.handleOpenModal('ItemCode', 'ItemCode', index)}
//                      style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
//                    />
//                  </div>
//                </StyledTableCell>
//                <StyledTableCell>
//                  <TextField
//                    fullWidth
//                    style={{ width: '100%', height: '53px' }}
//                    name="ItemName"
//                    value={apin.ItemName}
//                     // edet this [
//                       data-index={index}
//                       inputRef={(el) => (inputRefs.current[`ItemName-${index}`] = el)}
//                       // ]
//                    onChange={(e) => handleInputChange(index, e)}
//                    disabled={!apin.ItemCode}
//                    inputProps={{ style: { borderRadius: '0px' } }}
//                  />
//                </StyledTableCell>
//                <StyledTableCell>
//                <TextField
//                  fullWidth
//                  style={{ width: '100%', height: '53px' }}
//                  type="number"
//                  name="Quantity"
//                 // edet this [
//                   defaultValue={apin.Quantity}
//                   inputRef={(el) => (inputRefs.current[`Quantity-${index}`] = el)}
//                   data-index={index}
//                   onFocus={(e) => handleFocus(e.target.value)}
//                   onBlur={(e) => handleBlur(index, e)}  
//                   // ]             
//                  disabled={!apin.ItemCode}
//                  inputProps={{
//                    style: {
//                      borderRadius: "0px",
//                      appearance: "textfield",
//                    },
//                  }}
//                />

//                </StyledTableCell>
               

               
//                <StyledTableCell>
//               <TextField
//                      fullWidth
//                      style={{ width: '100%', height: '53px' }}
//                      type="number"
//                      name="Price"
//                      value={apin.Price} 
//                      // edet this [
//                       data-index={index}
//                       inputRef={(el) => (inputRefs.current[`Price-${index}`] = el)}
//                       onChange={(e) =>{handleInputChange(index, e);} }
//                       //]
//                       disabled={!apin.ItemCode}
//                       inputProps={{
//                         style: {
//                           borderRadius: "0px",
//                           appearance: "textfield",
//                         },
//                       }}
//                    />

//                </StyledTableCell>
             
//                <StyledTableCell>
//                    <TextField
//                       fullWidth
//                       style={{ width: "100%", height: "53px" }}
//                       type="number"
//                       name="LineTotal"
//                          // edet this [
//                           data-index={index}
//                           inputRef={(el) => (inputRefs.current[`LineTotal-${index}`] = el)}
//                           //]
//                       value={apin.LineTotal}
//                       onChange={(e) => handleInputChange(index, e)}
//                       disabled={!apin.ItemCode}
//                       inputProps={{
//                          readOnly: true ,
//                         style: { borderRadius: "0px", appearance: "textfield", },
                      
//                       }}
//                     />
//                   </StyledTableCell>
//                <StyledTableCell>
//                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//                    <TextField
//                      fullWidth
//                      style={{ width: '100%', height: '53px' }}
//                      name="UM"
//                      value={apin.UMName || ""} // Show name instead of ID
                   
//                       // edet this [
//                         data-index={index}
//                         inputRef={(el) => (inputRefs.current[`UM-${index}`] = el)}
//                         onChange={(e) => handleInputChange(index, e)}  
                 
//                         //]
//                      disabled={!apin.ItemCode}
//                      InputProps={{
//                       readOnly: true,
//                        style: { borderRadius: '0px', paddingRight: '15px' },
//                      }}
//                    />
//                     <FontAwesomeIcon
//                        icon={faBars}
//                        onClick={() =>props.handleOpenModal('UM', 'UM', index)}
//                        style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
//                      />
//                    </div>
//                  </StyledTableCell>
//                  {props.state.Mode !== "Mettre à jour" &&
//                       props.state.Mode !== "OK" && (                   
               
//                   <StyledTableCell data-field="Action">
//                   <IconButton
//                     sx={{
//                       fontSize: 10,
//                       '&:hover': { backgroundColor: 'transparent' }
//                     }}
//                     style={{ marginLeft: '10px' }}
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent triggering the onClick on the row
//                       handleDelete(index);
//                     }}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </IconButton>
              
//                    </StyledTableCell>
//                 ) }
//                </>
//            ) : (
//              <>
              
//                 {/* edet this [ */}
//                 <StyledTableCell name="ItemCode" data-field="ItemCode" style={{ textAlign: "center" }}>{apin.ItemCode}</StyledTableCell>
//                   <StyledTableCell name="ItemName" data-field="ItemName" style={{ textAlign: "center" }}>{apin.ItemName}</StyledTableCell>
//                   <StyledTableCell name="Quantity" data-field="Quantity" style={{ textAlign: "center" }}>{apin.Quantity}</StyledTableCell>
//                   <StyledTableCell data-field="Price" style={{ textAlign: "center" }}>{apin.Price}</StyledTableCell>
//                   <StyledTableCell data-field="LineTotal" style={{ textAlign: "center" }}>{apin.LineTotal}</StyledTableCell>
//                   <StyledTableCell data-field="UM" style={{ textAlign: "center" }}>{apin.UM}</StyledTableCell>
//                   {props.state.Mode !== "Mettre à jour" && 
//                   props.state.Mode !== "OK" &&(
//                  <StyledTableCell data-field="Action">
//                  <IconButton
//                    sx={{
//                      fontSize: 10,
//                      '&:hover': { backgroundColor: 'transparent' }
//                    }}
//                    style={{ marginLeft: '10px' }}
//                    onClick={(e) => {
//                      e.stopPropagation(); // Prevent triggering the onClick on the row
//                      handleDelete(index);
//                    }}
//                  >
//                    <FontAwesomeIcon icon={faTrash} />
//                  </IconButton>
//                </StyledTableCell>
//              )}
//              </>
//            )}
//          </TableRow>
//        ))}
//      </TableBody>
//    </Table>
   
//    <Modal
//           open={props.open}
//           onClose={props.handleCloseModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={modalStyle}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Typography variant="h6" component="h2">
//                 Liste :{" "}
//                 {props.selectedField.name === "ItemCode"
//                   ? "Articles"
//                   // : props.selectedField.name === "WhsCode"
//                   // ? "Magasin"
//                   : "Unite de Mesure"}
//               </Typography>
//               <IconButton onClick={props.handleCloseModal}>
//                 <FontAwesomeIcon icon={faTimes} />
//               </IconButton>
//             </div>
//             <IconButton onClick={props.handleSearchIconClick}>
//               <FontAwesomeIcon icon={faSearch} />
//             </IconButton>
//             {props.searchInputVisible && (
//               <TextField
//                 placeholder="Search..."
//                 variant="outlined"
                
//                 style={{ marginBottom: "10px" }}
//                 onChange={(e) => props.setSearchQuery(e.target.value)}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={props.handleSearchIconClick}>
//                         <FontAwesomeIcon icon={faTimes} />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                   style: { borderRadius: "0px" },
//                 }}
//               />
//             )}

//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell style={{ textAlign: "center" }}>
//                       Select
//                     </TableCell>
//                     <TableCell>
//                       {props.selectedField.name === "ItemCode"
//                         ? "N° article"
//                         // : props.selectedField.name === "WhsCode"
//                         // ? "N° magasin"
                       
//                         : "N° unite"}
//                     </TableCell>
//                     <TableCell>
//                       {props.selectedField.name === "ItemCode"
//                         ? "Description article"
//                         // : props.selectedField.name === "WhsCode"
//                         // ? "Description magasin"
//                         : "Description unite"}
//                     </TableCell>
//                   </TableRow>
                  
//                 </TableHead>
//                 <TableBody>
//                     {props.paginatedData.map((item, index) => (
//                       <TableRow
//                         key={index}
//                         onClick={(e) => {
//                           if (e.target.type !== 'checkbox') {
//                             props.handleSelectItem(item);
//                           }
//                         }}
//                         style={{ cursor: 'pointer' }}
//                       >
//                         <TableCell style={{ textAlign: "center", marginLeft: '25px' }}>
//                           {props.selectedField.name === "ItemCode" ? (
//                             <FormControlLabel
//                               control={
//                                 <Checkbox
//                                   checked={Array.isArray(props.selectedItem) &&
//                                     props.selectedItem.some(
//                                       (selected) => selected.number === item.number
//                                     )}
//                                   onChange={() => props.handleSelectItem(item)}
//                                   disabled={
//                                     props.selectedField.name === "ItemCode" &&
//                                     props.WTR1[props.selectedField.index] &&
//                                     props.WTR1[props.selectedField.index].ItemCode &&
//                                     props.selectedItem.length > 0
//                                   }
//                                 />
//                               }
//                             />
//                           ) : (
//                             <Radio
//                               checked={
//                                 Array.isArray(props.selectedItem) &&
//                                 props.selectedItem.length > 0 &&
//                                 props.selectedItem[0].number === item.number
//                               }
//                               onChange={() => props.setSelectedItem([item])}
//                               value={item.number || ''}
//                               name="radio-buttons"
//                               inputProps={{ 'aria-label': item.number }}
//                             />
//                           )}
//                         </TableCell>

//                         {props.selectedField.name === "CardCode" ? (
//                           <>
//                             <TableCell>{item.description}</TableCell>
//                             <TableCell>{item.number}</TableCell>
//                           </>
//                         ) : (
//                           <>
//                             <TableCell>{item.number}</TableCell>
//                             <TableCell>{item.description}</TableCell>
//                           </>
//                         )}
//                       </TableRow>
//                     ))}
//               </TableBody>
//               </Table>
//               <TablePagination
//                 component="div"
//                 count={props.filterData(props.content).length}
//                 page={props.page}
//                 onPageChange={props.handleChangePage}
//                 rowsPerPage={props.rowsPerPage}
//                 onRowsPerPageChange={props.handleChangeRowsPerPage}
//                 rowsPerPageOptions={[]}
//               />
//             </TableContainer>
//             <Button
//               color="primary"
//               variant="contained"
//               onClick={props.handleSaveSelectedItem}
//               style={{ marginTop: "10px" }}
//             >
//               sélectionner
//             </Button>
//           </Box>
//     </Modal>
//  </TableContainer>
//  </Box>
// );
// });
// export default InventoryTransferTable;














// InventoryTransferTable
import React,{ useEffect,useState, useRef } from "react";
import { Table, TableBody,FormControlLabel, Checkbox, TableCell ,TablePagination, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Modal, Box, Typography, Button, Radio, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Span } from "app/components/Typography";
import { faEdit, faBars, faTrash, faSave, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { styled } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';




const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: "none",
  textAlign: "center",
  padding: 0,
  width: "80px",
  height: "40px",
}));


const TableCellK = styled(TableCell)(() => ({
  textAlign: "center",
  width: "80px",
  height: "40px",
  borderBottom: "none",
}));





const modalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 650,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const InventoryTransferTable = (props) => {

  const tableContainerRef = useRef(null);
  const [focusField, setFocusField] = useState({ index: null, fieldName: null });
  const inputRefs = useRef({});

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [props.WTR1.length]);

  
 


const handleCalculations = (index) => {
  let updatedige1 = [...props.WTR1];

  let Quantity = parseFloat(updatedige1[index].Quantity) || 0;
  let prix = parseFloat(updatedige1[index].Price) || 0;

  const lineTotal = (Quantity * prix).toFixed(2);
  updatedige1[index] = {
    ...updatedige1[index],
    LineTotal: lineTotal,
  };
  console.log("lineTotal:  " ,Quantity);
  props.setWTR1(updatedige1.map((item, i) => ({
    ...item,
    LineNum: i + 1,
  })));
  console.log("QT:  " ,Quantity);
};
const handleInputChange = (index, event) => {
  const { name, value } = event.target;
  const updatedige1 = props.WTR1.map((ige, i) =>
    i === index ? { ...ige, [name]: value } : ige
  );
  props.setWTR1(updatedige1);

};


  const addige = () => {
    if (props.allFieldsFilled()) {
      const updatedRows = props.WTR1.map(row => ({ ...row, isEditing: false }));

      props.fetchNextDocEntry();
      props.setWTR1([...updatedRows, { DocEntry: '', LineNum:props.WTR1.length + 1, ItemCode: '', ItemName: '', Quantity: '1', Price: '0.00',  LineTotal: '0.00' ,UM: '',isEditing: true, }]);
    } else {
      props.setState({ ...props.state, open: true, message: "Please choose Code Article before adding a new row.", severity: "error" });
    }
  };


  const handleDelete = (index) => {
    if (props.WTR1.length <= 1) {
      props.setState({ ...props.state, open: true, message: "Il doit rester au moins une ligne ", severity: "warning" });
      return;  
    }
    const updatedPOR1 = [...props.WTR1];
    updatedPOR1.splice(index, 1);
    props.setWTR1(updatedPOR1);
    console.log("Data to delete:", updatedPOR1);
  };

  const handleEdit = (index, fieldName) => {
    console.log("index:", index);
    console.log("fieldName:", fieldName);
    if (props.WTR1[index].isEditing || props.state.Mode !== "Créer") {
       return;
    }

    if (props.allFieldsFilled()) {
       const updatedRows = props.WTR1.map((row, rowIndex) => ({
          ...row,
          isEditing: rowIndex === index,
       }));
       props.setWTR1(updatedRows);
       setFocusField({ index, fieldName });
       console.log("setFocusField:", focusField);
    } else {
       alert("Please fill all fields before adding a new row!");
    }
 };

 useEffect(() => {
  if (focusField.index !== null && focusField.fieldName) {
     const refKey = `${focusField.fieldName}-${focusField.index}`;
     const input = inputRefs.current[refKey];
     if (input) {
        input.focus();
     }
     setFocusField({ index: null, fieldName: null });
  }
}, [focusField]);
  




  const filterData = (data) => {
    return data.filter(item =>
      item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) || item.description.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
  };
  let content = [];
  if (props.selectedField?.name === 'UM') {
    content = props.modalContent.UM || [];
      } else if (props.selectedField?.name === "CardCode") {
      content = props.modalContent.CardCode || []; // Fetch CardCode data if the field is CardCode
    } else if (props.selectedField?.name === 'Filler') {
      content = props.modalContent.Filler || [];
    } else if (props.selectedField?.name === 'ToWhs') {
      content = props.modalContent.ToWhs || [];
  } else {
    content = props.modalContent.ItemCode || [];
  }

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(parseInt(event.target.value, 2));
    props.setPage(0);
  };

  
  const paginatedData = filterData(content).slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage);

  
  return (
  <>
    {props.state.Mode !== "Mettre à jour" &&  props.state.Mode !== "OK"  && (
    <Button color="primary" variant="contained" type="reset" onClick={addige} style={{ marginLeft: "10px" }}>
    <AddIcon fontSize="small" />
   </Button>
    )}
    <TableContainer
      ref={props.state.Mode === "Créer" ? tableContainerRef : null} 
      component={Paper}
      style={{ marginTop: '2%', maxHeight: props.state.Mode === "Créer" ? '265px' : '250px', overflowY: 'auto' }}
    >
      <Table border="1" style={{ width: '100%', tableLayout: 'fixed', borderTop:'2px solid gray',}}>
        <TableHead style={{ backgroundColor: "lightgrey",  position: 'sticky', top: 0, zIndex: 1 ,height: "20px",}}>
          <TableRow >
            <TableCellK>ID</TableCellK>
            <TableCellK>Code Article</TableCellK>
            <TableCellK>Nom Article</TableCellK>
            <TableCellK>Quantité</TableCellK>
            <TableCellK>Prix - TTC</TableCellK>
            <TableCellK>Total</TableCellK>
            <TableCellK>Unite de Mesure</TableCellK>
            {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
            <TableCellK>Action</TableCellK>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.WTR1.map((ige, index) => (
            <TableRow key={index}              
              onClick={(e) => { const field = e.target.dataset.field || e.currentTarget.dataset.field;
                if (field !== "Action") {handleEdit(index, field);}}}
              style={{borderBottom:'2px solid gray', cursor: 'pointer' , borderTop:'2px solid gray'}}>
              <StyledTableCell >{index + 1}</StyledTableCell>
              {ige.isEditing  ? (
                <>

              <StyledTableCell style={{ display:"none"}}>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px", borderRadius:'10px'}}
                  type="Number"
                  name="DocEntry"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={ige.DocEntry || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  disabled={!ige.ItemCode}
                  
                />
              </StyledTableCell>

              <StyledTableCell style={{ display:"none"}}>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="LineNum"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={ige.LineNum || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  disabled={!ige.ItemCode}
                  
                />
              </StyledTableCell>
              <StyledTableCell>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    style={{ width: "100%", height: "53px" }}
                    name="ItemCode"
                    value={ige.ItemCode || ''}
                    data-index={index}
                    inputRef={(el) => (inputRefs.current[`ItemCode-${index}`] = el)}
                    onChange={(e) => handleInputChange(index, e)}
                    InputProps={ {style: {borderRadius: '0px', paddingRight: "15px" }}}
                  />
                  <Link to="#" style={{ textDecoration: 'none' }}>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: 5,
                        top: 3,
                        bottom: 2,
                        fontSize: 15,
                        '&:hover': { backgroundColor: 'transparent' }
                      }}
                      onClick={() => props.handleOpenModal('ItemCode', index)}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                  </Link>
                </div>
              </StyledTableCell>

              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  name="ItemName"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={ige.ItemName || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`ItemName-${index}`] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                  disabled={!ige.ItemCode}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="Quantity"
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`Quantity-${index}`] = el)}
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={ige.Quantity || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  onBlur={() => handleCalculations(index)} // ADD 
                  disabled={!ige.ItemCode}
                />
              </StyledTableCell>
             
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="Price"
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`Price-${index}`] = el)}
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={ige.Price || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  onBlur={() => handleCalculations(index)} // ADD 
                  disabled={!ige.ItemCode}
                />
              </StyledTableCell>
            
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="LineTotal"
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`LineTotal-${index}`] = el)}
                  InputProps={{ style: { borderRadius: '0px', }, readOnly: true,   inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={ige.LineTotal || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  disabled={!ige.ItemCode}
                />
              </StyledTableCell>

              <StyledTableCell>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    style={{ width: "100%", height: "53px" }}
                    name="UM"
                    value={ige.UM || ''}
                    data-index={index}
                    inputRef={(el) => (inputRefs.current[`UM-${index}`] = el)}
                    onChange={(e) => handleInputChange(index, e)}
                    InputProps={ {style: {borderRadius: '0px', paddingRight: "15px" }}}
                    disabled={!ige.ItemCode}
                  />
                  <Link to="#" style={{ textDecoration: 'none' }}>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: 5,
                        top: 3,
                        bottom: 2,
                        fontSize: 15,
                        '&:hover': { backgroundColor: 'transparent' }
                      }}
                      onClick={() => props.handleOpenModal('UM', index)}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                  </Link>
                </div>
              </StyledTableCell>
              <StyledTableCell data-field="Action">

                <IconButton
                  sx={{
                    fontSize: 10,
                    '&:hover': { backgroundColor: 'transparent' }
                  }}
                  style={{ marginLeft: '10px', }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the onClick on the row
                    handleDelete(index);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </StyledTableCell>
              </>


            ) : (
                <>

                  <StyledTableCell name="ItemCode" data-field="ItemCode" >{ige.ItemCode}</StyledTableCell>
                  <StyledTableCell name="ItemName" data-field="ItemName" >{ige.ItemName}</StyledTableCell>
                  <StyledTableCell name="Quantity" data-field="Quantity" >{ige.Quantity}</StyledTableCell>
                  <StyledTableCell name="Price" data-field="Price" >{ige.Price}</StyledTableCell>
                  <StyledTableCell name="LineTotal" data-field="LineTotal" >{ige.LineTotal}</StyledTableCell>
                  <StyledTableCell name="UM" data-field="UM" >{ige.UM}</StyledTableCell>
                  {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
                  <StyledTableCell data-field="Action">
                    <IconButton sx={{fontSize: 10, '&:hover': { backgroundColor: 'transparent' } }} style={{ marginLeft: '10px', }} 
                      onClick={(e) => { e.stopPropagation();  handleDelete(index); }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </StyledTableCell>
                )}
                </>
              )}
            </TableRow>
          ))}
          <TableRow>

          </TableRow>
        </TableBody>
      </Table>
      <Modal
       open={props.openm}
        onClose={props.handleCloseModal}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2" >
              Liste : {props.selectedField.name === "ItemCode" ? "Articles" : props.selectedField.name === "WhsCode" ? 
              "Magasin": props.selectedField.name === "CardCode" ? "fournisseur" : "Unite de Mesure" }
            </Typography>
            <IconButton onClick={props.handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </div>
          <IconButton onClick={props.handleSearchIconClick}>          
              <FontAwesomeIcon icon={faSearch} />
            </IconButton>
            {props.searchInputVisible &&
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              style={{ marginBottom: '10px' }}
              onChange={(e) => {console.log("Input value:", e.target.value); props.setSearchQuery(e.target.value.toLowerCase())}}
              InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={props.handleSearchIconClick} >
                    <FontAwesomeIcon icon={faTimes} />
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderRadius: "0px" },
            }} />}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                    <TableCell style={{ textAlign: "center" }}>Select</TableCell>
                    <TableCell>{props.selectedField.name === "ItemCode" ? "N° article" : props.selectedField.name === "WhsCode" ? "N° magasin": props.selectedField.name === "CardCode" ? "N° fournisseur" : "N° unite"}</TableCell>
                    <TableCell>{props.selectedField.name === "ItemCode" ? "Description article" : props.selectedField.name === "WhsCode" ? "Description magasin": props.selectedField.name === "CardCode" ? "Description fournisseur"  : "Description unite"}</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {paginatedData.map((item, index) => (
                    <TableRow key={index} onClick={(e) => { if (e.target.type !== 'checkbox') { props.handleSelectItem(item);}}} style={{ cursor: 'pointer' }}>
                      <TableCell style={{ textAlign: "center", marginLeft: '25px' }}>
                      {props.selectedField.name === "ItemCode" ? (
                        <FormControlLabel 
                        control={
                          <Checkbox
                          checked={props.selectedItem.some(selected => selected.number === item.number)} 
                          onChange={() => props.handleSelectItem(item)} 
                          disabled={props.selectedField.name === "ItemCode" && 
                          props.WTR1[props.selectedField.index] && 
                          props.WTR1[props.selectedField.index].ItemCode && 
                          props.selectedItem.length > 0} 
                        />
                        } 
                      />
                    
                      ) : (
                        <Radio
                          checked={props.selectedItem.length > 0 && props.selectedItem[0].number === item.number}
                          onChange={() => props.setSelectedItem([item])}
                          value={item.number || ''}
                          name="radio-buttons"
                          inputProps={{ 'aria-label': item.number }}
                        />
                      )}
                      </TableCell>
                      {props.selectedField.name === "CardCode" ? (
                        <TableCell>{item.description}</TableCell>
                      ) : (
                        <TableCell>{item.number}</TableCell>
                      )}
                      {props.selectedField.name === "CardCode" ? (
                        <TableCell>{item.number}</TableCell>
                      ) : (
                        <TableCell>{item.description}</TableCell>
                      )}
                      
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
            <TablePagination
            component="div"
            count={filterData(content).length}
            page={props.page}
            onPageChange={handleChangePage}
            rowsPerPage={props.rowsPerPage} 
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[]}
          />

          </TableContainer>
          <Button color="primary" variant="contained" onClick={props.handleSaveSelectedItem} style={{ marginTop: '10px' }}>
          Sélectionner
            </Button>
        </Box>
      </Modal>
 
      
    </TableContainer>
  </>);
};


export default InventoryTransferTable;


