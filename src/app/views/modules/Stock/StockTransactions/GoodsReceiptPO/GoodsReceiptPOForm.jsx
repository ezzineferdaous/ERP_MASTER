// // GoodsIssueForm
// import React, {  useEffect} from "react";
// import { Button, Grid, styled, TextField, Snackbar, Alert } from "@mui/material";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { Span } from "app/components/Typography";
// import TableGoodsReceiptPOForm from './TableGoodsReceiptPOForm';
// import axios from 'axios';
// import Modal from "react-modal"; // Import Modal for popup functionality
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_blue.css";
// import '../../../Style.css';

// // Styled component for TextValidator with custom styles
// const TextFieldD = styled(TextValidator)(() => ({
//   width: "100%",
//   marginBottom: "16px",
// }));

// const GoodsIssueForm = (props) => {
//     // Initialize today's date in the required format
//     const handleSearchIconClick = () => {
//       props.setSearchInputVisible(!props.searchInputVisible);// Invert visibility state
//       props.setSearchQuery("");// Reset search query
//     };

//  // Filter the modal data based on the search query (either by number or description)
//  const filterData = (data) => {        console.log("Search Query:", props.searchQuery); // ???? ?? ???? searchQuery     
//  console.log("Data before filtering:", data);           
//   return data.filter( (item) =>             

// item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) || item.description.toLowerCase().includes(props.searchQuery.toLowerCase())     
// );    };

// const handleChangePage = (event, newPage) => {
//   props.setPage(newPage); // Set the current page to the selected new page
// };

// // Handle changes in the number of rows displayed per page
// const handleChangeRowsPerPage = (event) => {
//   props.setRowsPerPage(parseInt(event.target.value, 2)); // Set rows per page
//   props.setPage(0); // Reset to the first page
// };


// // déterminer le contenu à utiliser en fonction de l' selectedFieldaccessoire.

// let content = [];
// if (props.selectedField?.name === 'UM') {
// content = props.modalContent.UM || [];
// } else if (props.selectedField?.name === 'WhsCode') {
// content = props.modalContent.WhsCode || [];
// } else {
// content = props.modalContent.ItemCode || [];
// }


//     // Apply pagination to the filtered data
//     const paginatedData = filterData(content).slice(
//       props.page * props.rowsPerPage,
//       props.page * props.rowsPerPage + props.rowsPerPage
//     );

 

  
//   const handleReset = () => {
//     props.setOign({ DocEntry: '', DocNum: '', DocDate: props.today, UserSign: '', Comment: '' });
//     props.setIGN1([{
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
//       isEditing: true, 

//     }]);

//     props.fetchNextDocEntry()


//   }
//   const { vertical, horizontal, open, message, severity } = props.state;


//   // Close Snackbar
//   const handleClose = () => {
//     props.setState({ ...props.state, open: false });
//   };
 

//  // Fetch next document entry and set the root element for the modal when the component mounts
//  useEffect(() => {
//   props.fetchNextDocEntry(); // Fetch the next document entry
//   Modal.setAppElement("#root"); // Set the root element for accessibility purposes in Modal
// }, []);

// return (
//     <>
//      <ValidatorForm onSubmit={props.handleSubmit}>
//   <Grid container spacing={0}>
//     <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//       {/* <label htmlFor="DocEntry">Document Entry:</label> */}
//       <TextFieldD
//         type="number"
//         name="DocEntry"
//         value={props.Oign.DocEntry}
//         onChange={props.handleChange}
//         required
//         disabled
//         style={{display : "none"}}
//         size="small"
//       />
//       <label htmlFor="DocNum">Numéro Document:</label>
//       <TextFieldD
//         type="text"
//         name="DocNum"
//         value={props.Oign.DocNum}
//         onChange={props.handleChange}
//         required
//         disabled
//         size="small"
//       />
//     </Grid>
//     <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}></Grid>
//     <Grid item lg={4} md={6} sm={12} xs={12}> {/* Flatpickr DocDate */}
//         <div style={{ position: "relative", width: "100%" }}>
//             <Flatpickr
//               className="Flatpickr-flatpickr"
//                 data-enable-time={false}
//                 value={props.Oign.DocDate ? new Date(props.Oign.DocDate) : new Date()}
//                 onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
//                 options={{ dateFormat: "d/m/Y"}}
//                 disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
//             />
//             <label className="label-flatpickr" style={{top: props.Oign.DocDate ? "-10px" : "12px"}} > Date Document </label>
//         </div>
//     </Grid>
// </Grid>

//   <TableGoodsReceiptPOForm 
//     filterData={filterData}
//     handleChangePage={handleChangePage}
//   handleSelectItem={props.handleSelectItem} 
//   IGN1={props.IGN1} 
//   setIGN1={props.setIGN1}
//    editIndex={props.editIndex}
//     state={props.state} 
//   setEditIndex={props.setEditIndex} 
//   fetchNextDocEntry={props.fetchNextDocEntry}
//   open={props.open}
//   paginatedData={paginatedData}
//    setOpen={props.setOpen}
//     Mode={props.state.Mode} 
//     setModalContent={props.setModalContent}
//    setSelectedField={props.setSelectedField}  
//    modalContent={paginatedData} 
//    selectedField={props.selectedField} 
//    searchQuery={props.searchQuery}
//    lastSavedRow={props.lastSavedRow}
//    handleChangeRowsPerPage={handleChangeRowsPerPage}
//    handleSaveSelectedItem={props.handleSaveSelectedItem}
//    handleSearchIconClick={handleSearchIconClick}
//    setSelectedItem={props.setSelectedItem} 
//      selectedItem={props.selectedItem} 
//    setSearchInputVisible={props.setSearchInputVisible}
//    searchInputVisible={props.searchInputVisible}
//     setSearchQuery={props.setSearchQuery}
//    setLastSavedRow={props.setLastSavedRow}
//     handleOpenModal={props.handleOpenModal} 
//    handleCloseModal={props.handleCloseModal} 
//    content={content}
//    setState={props.setState}
//    handleSelect={props.handleSelect}
//    allFieldsFilled={props.allFieldsFilled}
//   />

//   <Grid container>
//     <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2, mb: 2 }}>
//       <TextField
//         style={{ width: '100%' }}
//         name="Comment"
//         label="Remarque"
//         value={props.Oign.Comment}
//         onChange={props.handleChange}
//         validators={["minStringLength:1", "maxStringLength:6"]}
//         readOnly={props.state.Mode === "création"}
        
//       />
//       {/* <label htmlFor="UserSign">UserSign:</label> */}
//       <TextFieldD
//         type="number"
//         name="UserSign"
//         size="small"
//         value={props.Oign.UserSign}
//         onChange={props.handleChange}
//         disabled={props.state.Mode === "Mettre à jour" }
//         required
//         style={{display : "none"}}
//       />
//     </Grid>
//   </Grid>

//         <Button color="primary" variant="contained" type="submit">
//           <Span sx={{ pl: 1, textTransform: 'capitalize' }}>{props.Mode}</Span>
//         </Button>


//         <Button color="primary" variant="contained" type="reset" onClick={handleReset} sx={{ ml: 2 }} style={{ marginLeft: "10px" }}>
//           <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Interrompre</Span>
//         </Button>
//       </ValidatorForm>
//       <Snackbar
//         open={props.open}
//         autoHideDuration={6000}
//         onClose={props.handleClose}
//         anchorOrigin={{ vertical, horizontal }}
//         key={vertical + horizontal}
//       >
//         <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
//           {message}
//         </Alert>
//       </Snackbar>
//     </>
//   );

  
// };

// export default GoodsIssueForm;














// GoodsIssueForm
import React, {  useEffect } from "react";
import { Button, Grid, styled, TextField, Snackbar, Alert } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";
import IGN1voiceTable from './TableGoodsReceiptPOForm';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import '../../../Style.css';

const TextFieldD = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const GoodsIssueForm = (props) => { 

  const { vertical, horizontal, open, message, severity } = props.state;
  const handleSearchIconClick = () => {props.setSearchInputVisible(!props.searchInputVisible);props.setSearchQuery("");};

  const handleClose = () => {
      props.setState({ ...props.state, open: false });
  };

  const handleInterrompre =()=>{
      props.setOign({ DocDate: props.today, UserSign: 1, Comment: '' });
      props.setIGN1([{ LineNum: '1', ItemCode: '', ItemName: '', Quantity: '1',  WhsCode: '', Price: '0.00', Discount: '0', LineTotal: '0.00', UM: '',isEditing: true, }]);
  };

  useEffect(() => { props.fetchNextDocEntry();}, []);

    
  return (
    <>
      <ValidatorForm  onSubmit={props.handleSubmit}>
        <Grid style={{marginTop:'-90px' }} container spacing={6}>
          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            <TextFieldD
              type='Number'
              name="DocEntry"
              value={props.Oign.DocEntry}
              onChange={props.handleChange}
              InputProps={{  inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
              disabled
              style={{ display:"none"}}
              
            />
            <label htmlFor="DocNum">Numéro Document:</label>
            <TextFieldD
            size="small"
              type="text"
              name="DocNum"
              value={props.Oign.DocNum}
              onChange={props.handleChange}
              required
              disabled
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}></Grid>
          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            <TextFieldD
              type="text"
              name="UserSign"
              value={props.Oign.UserSign}
              onChange={props.handleChange}
              InputProps={{  inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
              required
              disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"} 
              style={{ display:"none"}}
            />
            <div style={{ position: "relative", width: "100%" }}>
                <label className="label-flatpickr2" style={{top: props.Oign.DocDate ? "-10px" : "12px"}} > Date Document </label>
                <Flatpickr
                  className="Flatpickr-flatpickr"
                    data-enable-time={false}
                    value={props.Oign.DocDate ? new Date(props.Oign.DocDate) : new Date()}
                    onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                    options={{ dateFormat: "d/m/Y"}}
                    disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                />
            </div>
          </Grid>
        </Grid>
        <IGN1voiceTable handleSelectItem={props.handleSelectItem} handleSaveSelectedItem={props.handleSaveSelectedItem}
        searchInputVisible={ props.searchInputVisible} handleSearchIconClick={handleSearchIconClick}
          page={props.page} setPage={props.setPage} rowsPerPage={props.rowsPerPage} setRowsPerPage={props.setRowsPerPage}  searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery}  handleCloseModal={props.handleCloseModal} validation={props.validation}
             handleOpenModal={props.handleOpenModal}  openm={props.openm} modalContent={props.modalContent}
              selectedField={props.selectedField} setLastSavedRow={props.setLastSavedRow} lastSavedRow={props.lastSavedRow} setSelectedItem={props.setSelectedItem}
               selectedItem={props.selectedItem}    IGN1={props.IGN1} setIGN1={props.setIGN1}  state={props.state} setState={props.setState} fetchNextDocEntry={props.fetchNextDocEntry} allFieldsFilled={props.allFieldsFilled} 
        /> 
        <Grid container spacing={0}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2, mb: 2 }}>
            <TextField
              style={{ width: '100%' ,}}
              name="Comment"
              label="Remarque"
              size="small"
              value={props.Oign.Comment}
              onChange={props.handleChange}
              validators={["minStringLength:1", "maxStringLength:6"]}
              rows={4} multiline maxRows={4}
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>{props.Mode}</Span>
        </Button>
        {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" &&(
        <Button color="primary" variant="contained" type="reset" style={{ marginLeft: "10px" }} onClick={handleInterrompre}>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Interrompre</Span>
        </Button>
        )}
      </ValidatorForm>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GoodsIssueForm;
