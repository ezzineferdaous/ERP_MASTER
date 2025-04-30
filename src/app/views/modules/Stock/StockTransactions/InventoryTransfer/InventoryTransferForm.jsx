// import React, {  useEffect } from "react";
// import { Button, Grid, styled, TextField, Snackbar, Alert, IconButton } from "@mui/material";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { Span } from "app/components/Typography";
// import InventoryTransferTable from './InventoryTransferTable';
// import axios from 'axios';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import Modal from "react-modal"; // Import Modal for popup functionality
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_blue.css";
// import '../../../Style.css';

// // Styled component for TextValidator with custom styles
// const TextFieldD = styled(TextValidator)(() => ({
//   width: "100%",
//   marginBottom: "16px",
// }));

// // Styled component for TextField with custom styles
// const StyledTextField = styled(TextField)(() => ({
//   width: "100%",
//   marginBottom: "16px",
// }));

// const InventoryTransferForm = (props) => {
//   const handleSearchIconClick = () => {
//     props.setSearchInputVisible(!props.searchInputVisible);// Invert visibility state
//     props.setSearchQuery("");// Reset search query
//   };


//    // Filter the modal data based on the search query (either by number or description)
//    const filterData = (data) => {        console.log("Search Query:", props.searchQuery); // ???? ?? ???? searchQuery     
//      console.log("Data before filtering:", data);           
//       return data.filter( (item) =>             
    
//     item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) || item.description.toLowerCase().includes(props.searchQuery.toLowerCase())     
//    );    };


//   const handleChangePage = (event, newPage) => {
//     props.setPage(newPage); // Set the current page to the selected new page
//   };

// // Handle changes in the number of rows displayed per page
// const handleChangeRowsPerPage = (event) => {
//   props.setRowsPerPage(parseInt(event.target.value, 2)); // Set rows per page
//   props.setPage(0); // Reset to the first page
// };


//     // Determine which modal content to display based on the selected field
//     let content = [];
//     if (props.selectedField?.name === "UM") {
//       content = props.modalContent.UM || []; // Fetch UM data if the field is UM
   
//     } else if (props.selectedField?.name === "CardCode") {
//       content = props.modalContent.CardCode || []; // Fetch CardCode data if the field is CardCode
//     } else if (props.selectedField?.name === 'Filler') {
//       content = props.modalContent.Filler || [];
//     } else if (props.selectedField?.name === 'ToWhs') {
//       content = props.modalContent.ToWhs || [];
//     } else {
//       content = props.modalContent.ItemCode || []; // Default to ItemCode data
//     }

//      // Apply pagination to the filtered data
//   const paginatedData = filterData(content).slice(
//     props.page * props.rowsPerPage,
//     props.page * props.rowsPerPage + props.rowsPerPage
//   );




//   const handleReset = () => {
//     props.setOwtr({ DocEntry: '', DocNum: '', DocDate: props.today, UserSign: '' , Comment: '', Filler: '', ToWhs: '' });
//     props.setWTR1([{
//       DocEntry: "",
//       LineNum: "",
//       ItemCode: "",
//       ItemName: "",
//       Quantity: "",
//       Price: "",
//       LineTotal: "",
//       UM: "",
//       isEditing: true, 
//     }]);

//     props.fetchNextDocEntry();
//   };
//   const { vertical, horizontal, open, message, severity } = props.state;


//   // Close Snackbar
//   const handleClose = () => {
//     props.setState({ ...props.state, open: false });
//   };
//   // Le useEffecthook est utilisé pour exécuter des effets secondaires dans un composant fonctionnel.
//   //  Dans cet extrait, le useEffecthook prend deux arguments : une fonction pour exécuter l'effet secondaire et un tableau de dépendances.
//   useEffect(() => {
//     props.fetchNextDocEntry();
//     Modal.setAppElement("#root"); // Set the root element for accessibility purposes in Modal

//     // Custom rule to ensure Filler and ToWhs are not the same
//     ValidatorForm.addValidationRule('isNotSame', () => {
//       if (props.Owtr.Filler === props.Owtr.ToWhs) {
//         return false;
//       }
//       return true;
//     });

//     // Cleanup the validation rule on component unmount
//     return () => ValidatorForm.removeValidationRule('isNotSame');
//   }, [props.Owtr.Filler, props.Owtr.ToWhs]);

//   // Add console.log to debug 
//   console.log("Filler type:", typeof props.Owtr.Filler, "Value:", props.Owtr.Filler);
//   console.log("ToWhs type:", typeof props.Owtr.ToWhs, "Value:", props.Owtr.ToWhs);

  
//   return (
//     <>
   
//       <ValidatorForm onSubmit={props.handleSubmit}>
        
//         <Grid container spacing={6}>
//           <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//             {/* <label htmlFor="DocEntry">Document Entry:</label> */}
//             <TextFieldD
//               type="number"
//               name="DocEntry"
//               size="small"
//               value={props.Owtr.DocEntry}
//               onChange={props.handleChange}
//               required
//               disabled
//               style={{display : "none"}}
              
//             />
//             <label htmlFor="DocNum">Numéro Document:</label>
//             <TextFieldD
//               type="text"
//               name="DocNum"
//               size="small"
//               value={props.Owtr.DocNum}
//               onChange={props.handleChange}
//               required
//               disabled
//             />
//             <Grid item lg={4} md={6} sm={12} xs={12}> {/* Flatpickr DocDate */}
//               <div style={{ position: "relative", width: "100%" }}>
//                   <Flatpickr 
                   
//                     id="fb"
//                       data-enable-time={false}
//                       value={props.Owtr.DocDate ? new Date(props.Owtr.DocDate) : new Date()}
//                       onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
//                       options={{ dateFormat: "d/m/Y"}}
//                       disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
//                   />
//                   <label className="label-flatpickr" style={{top: props.Owtr.DocDate ? "-10px" : "12px"}} > Date Document </label>
//               </div>
//           </Grid>
//           </Grid>
//           <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}></Grid>

//           <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
//           {/* <StyledTextField
//           type="text"
//           name="Filler"
//           size="small"
//           value={props.Owtr.Filler}
//           onChange={props.handleChange}
//           required
//           label="Magasin cédant:"
//           disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
//           InputProps={{
//             endAdornment: (
//               props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
//                 <IconButton
//                   sx={{
//                     position: 'absolute',
//                     right: 5,
//                     top: 3,
//                     bottom: 2,
//                     fontSize: 15,
//                     '&:hover': {
//                       backgroundColor: 'transparent'
//                     }
//                   }}
//                   onClick={() => props.handleOpenModal('Filler', 'Filler')}
//                 >
//                   <FontAwesomeIcon icon={faBars} />
//                 </IconButton>
//               )
//             )
//           }}
//           /> */}



// <StyledTextField
//   type="text"
//   name="Filler"
//   size="small"
//   value={props.Owtr.Filler}
//   onChange={props.handleChange}
//   required
//   label="Magasin cédant:"
//   InputProps={{
//     readOnly: props.state.Mode === "Mettre à jour" || props.state.Mode === "OK", //make it en gras 
//     endAdornment: (
//       props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
//         <IconButton
//           sx={{
//             position: 'absolute',
//             right: 5,
//             top: 3,
//             bottom: 2,
//             fontSize: 15,
//             '&:hover': {
//               backgroundColor: 'transparent'
//             }
//           }}
//           onClick={() => props.handleOpenModal('Filler', 'Filler')}
//         >
//           <FontAwesomeIcon icon={faBars} />
//         </IconButton>
//       )
//     )
//   }}
// />

//           <StyledTextField
//             type="text"
//             name="ToWhs"
//             value={props.Owtr.ToWhs}
//             onChange={props.handleChange}
//             required
//             size="small"
//             label="Magasin destinataire:"
           
//             InputProps={{
//               readOnly: props.state.Mode === "Mettre à jour" || props.state.Mode === "OK",//make it en gras 
//               endAdornment: (
//                 props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
//                   <IconButton
//                     sx={{
//                       position: 'absolute',
//                       right: 5,
//                       top: 3,
//                       bottom: 2,
//                       fontSize: 15,
//                       '&:hover': {
//                         backgroundColor: 'transparent'
//                       }
//                     }}
//                     onClick={() => props.handleOpenModal('ToWhs', 'ToWhs')}
//                   >
//                     <FontAwesomeIcon icon={faBars} />
//                   </IconButton>
//                 )
//               )
//             }}
//           />




//           </Grid>
//         </Grid>

//         <InventoryTransferTable
//           handleCloseModal={props.handleCloseModal}
//           handleSelectItem={props.handleSelectItem}
//           allFieldsFilled={props.allFieldsFilled}
//           handleSelect={props.handleSelect}
//           handleOpenModal={props.handleOpenModal}
//           setLastSavedRow={props.setLastSavedRow}
//           lastSavedRow={props.lastSavedRow}
//           setSearchQuery={props.setSearchQuery}
//           searchQuery={props.searchQuery}
//           setSearchInputVisible={props.setSearchInputVisible}
//           searchInputVisible={props.searchInputVisible}
//           setSelectedItem={props.setSelectedItem}
//           selectedItem={props.selectedItem}
//           setSelectedField={props.setSelectedField}
//           selectedField={props.selectedField}
//           setModalContent={props.setModalContent}
//           rowsPerPage={props.rowsPerPage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//           handleSaveSelectedItem={props.handleSaveSelectedItem}
//           handleSearchIconClick={handleSearchIconClick}
//           content={content}
//           Mode={props.state.Mode} 
//           handleChangePage={handleChangePage}
//           modalContent={paginatedData}
//           paginatedData={paginatedData}
//           open={props.open}
//           setOpen={props.setOpen}
//           WTR1={props.WTR1}
//           filterData={filterData}
//           setWTR1={props.setWTR1}
//           editIndex={props.editIndex}
//           setState={props.setState}
//           state={props.state}
         
//           setEditIndex={props.setEditIndex}
//           fetchNextDocEntry={props.fetchNextDocEntry}
//         />

//         <Grid container>
//           <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2, mb: 2 }}>
//             <TextField
//               style={{ width: '100%' }}
//               name="Comment"
//               label="Remarque"
              
//               value={props.Owtr.Comment}
//               onChange={props.handleChange}
//               validators={["minStringLength:1", "maxStringLength:6"]}
//               readOnly={props.state.Mode === "création"}
//             />


//             <TextFieldD
//               type="number"
//               size="small"
//               name="UserSign"
//               value={props.Owtr.UserSign}
//               onChange={props.handleChange}
//               disabled={props.state.Mode === "Mettre à jour"}
//               req
//               InputProps={{
//                 disableUnderline: true,
//                 sx: {
//                   '& input[type=number]': {
//                     MozAppearance: 'textfield',
//                     WebkitAppearance: 'none',
//                     appearance: 'textfield',
//                     '&::-webkit-outer-spin-button': {
//                       display: 'none',
//                     },
//                     '&::-webkit-inner-spin-button': {
//                       display: 'none',
//                     },
//                   },
//                 },
//               }}
//               style={{display: "none"}}
//             />
           
//           </Grid>
//         </Grid>

//         <Button color="primary" variant="contained" type="submit">
//           <Span sx={{ pl: 1, textTransform: 'capitalize' }}>{props.Mode}</Span>
//         </Button>

//         <Button color="primary" variant="contained" type="reset" onClick={handleReset} sx={{ ml: 2 }} style={{ marginLeft: "10px" }}>
//           <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Interrompre</Span>
//         </Button>
//       </ValidatorForm>
//       {/* ce code crée une notification Snackbar avec un message, une position et une fonctionnalité de masquage automatique. Il utilise également un composant Alert pour le style et l'indication de gravité. 
//       La handleClosefonction gère la visibilité du Snackbar, et la position du Snackbar est définie de manière dynamique en fonction des valeurs verticalet horizontal. */}
//       <Snackbar
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
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

// export default InventoryTransferForm;










// InventoryTransferForm
import React, {  useEffect } from "react";
import { Button, Grid, styled, TextField, Snackbar, Alert , IconButton } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal"; // Import Modal for popup functionality
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Span } from "app/components/Typography";
import InventoryTransferTable from './InventoryTransferTable';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import '../../../Style.css';

const TextFieldD = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

// // Styled component for TextField with custom styles
const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const InventoryTransferForm = (props) => { 

  const { vertical, horizontal, open, message, severity } = props.state;
  const handleSearchIconClick = () => {props.setSearchInputVisible(!props.searchInputVisible);props.setSearchQuery("");};

  const handleClose = () => {
      props.setState({ ...props.state, open: false });
  };

  const handleInterrompre =()=>{
      props.setOwtr({ DocDate: props.today, UserSign: 1, Comment: '' });
      props.setWTR1([{ LineNum: '1', ItemCode: '', ItemName: '', Quantity: '1',  Price: '0.00', Discount: '0', LineTotal: '0.00', UM: '',isEditing: true, }]);
  };

  useEffect(() => {
    props.fetchNextDocEntry();
    Modal.setAppElement("#root"); // Set the root element for accessibility purposes in Modal

    // Custom rule to ensure Filler and ToWhs are not the same
    ValidatorForm.addValidationRule('isNotSame', () => {
      if (props.Owtr.Filler === props.Owtr.ToWhs) {
        return false;
      }
      return true;
    });

    // Cleanup the validation rule on component unmount
    return () => ValidatorForm.removeValidationRule('isNotSame');
  }, [props.Owtr.Filler, props.Owtr.ToWhs]);

  // Add console.log to debug 
  console.log("Filler type:", typeof props.Owtr.Filler, "Value:", props.Owtr.Filler);
  console.log("ToWhs type:", typeof props.Owtr.ToWhs, "Value:", props.Owtr.ToWhs);


    
  return (
    <>
      <ValidatorForm  onSubmit={props.handleSubmit}>
        <Grid style={{marginTop:'-90px' }} container spacing={6}>
          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            <TextFieldD
              type='Number'
              name="DocEntry"
              value={props.Owtr.DocEntry}
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
              value={props.Owtr.DocNum}
              onChange={props.handleChange}
              required
              disabled
            />
          
      
          <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            <TextFieldD
              type="text"
              name="UserSign"
              value={props.Owtr.UserSign}
              onChange={props.handleChange}
              InputProps={{  inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
              required
              disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"} 
              style={{ display:"none"}}
            />
            <div style={{ position: "relative", width: "100%" }}>
                <label className="label-flatpickr2" style={{top: props.Owtr.DocDate ? "-10px" : "12px"}} > Date Document </label>
                <Flatpickr
                  className="Flatpickr-flatpickr"
                    data-enable-time={false}
                    value={props.Owtr.DocDate ? new Date(props.Owtr.DocDate) : new Date()}
                    onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                    options={{ dateFormat: "d/m/Y"}}
                    disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                />
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}></Grid>
         </Grid>
    
         <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}></Grid>


          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
          <StyledTextField
            type="text"
            name="Filler"
            size="small"
            value={props.Owtr.Filler}
            onChange={props.handleChange}
            required
            label="Magasin cédant:"       
             error={props.warehouseError}
             helperText={props.warehouseError ? "Le magasin cédant et destinataire doivent être différents." : ""}
            InputProps={{
              readOnly: props.state.Mode === "Mettre à jour" || props.state.Mode === "OK", //make it en gras 
              endAdornment: (
                props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 5,
                      top: 3,
                      bottom: 2,
                      fontSize: 15,
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                    onClick={() => props.handleOpenModal('Filler', 0)}

                  >
                    <FontAwesomeIcon icon={faBars} />
                  </IconButton>
                )
              )
            }}
          />
         
                    <StyledTextField
                      type="text"
                      name="ToWhs"
                      value={props.Owtr.ToWhs}
                      onChange={props.handleChange}
                      required
                      size="small"
                      label="Magasin destinataire:"
                      error={props.warehouseError}
                      helperText={props.warehouseError ? "Le magasin cédant et destinataire doivent être différents." : ""}
                      InputProps={{
                        readOnly: props.state.Mode === "Mettre à jour" || props.state.Mode === "OK",//make it en gras 
                        endAdornment: (
                          props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
                            <IconButton
                              sx={{
                                position: 'absolute',
                                right: 5,
                                top: 3,
                                bottom: 2,
                                fontSize: 15,
                                '&:hover': {
                                  backgroundColor: 'transparent'
                                }
                              }}
                              onClick={() => props.handleOpenModal('ToWhs', 0)}
                            >
                              <FontAwesomeIcon icon={faBars} />
                            </IconButton>
                          )
                        )
                      }}
                    />
          </Grid>

        </Grid>


        <InventoryTransferTable handleSelectItem={props.handleSelectItem} handleSaveSelectedItem={props.handleSaveSelectedItem}
        searchInputVisible={ props.searchInputVisible} handleSearchIconClick={handleSearchIconClick}
          page={props.page} setPage={props.setPage} rowsPerPage={props.rowsPerPage} setRowsPerPage={props.setRowsPerPage}  searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery}  handleCloseModal={props.handleCloseModal} validation={props.validation}
             handleOpenModal={props.handleOpenModal}  openm={props.openm} modalContent={props.modalContent}
              selectedField={props.selectedField} setLastSavedRow={props.setLastSavedRow} lastSavedRow={props.lastSavedRow} setSelectedItem={props.setSelectedItem}
               selectedItem={props.selectedItem}  handleChangeRowsPerPage={props.handleChangeRowsPerPage}   WTR1={props.WTR1} setWTR1={props.setWTR1}  state={props.state} setState={props.setState} fetchNextDocEntry={props.fetchNextDocEntry} allFieldsFilled={props.allFieldsFilled} 
        /> 
        <Grid container spacing={0}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2, mb: 2 }}>
            <TextField
              style={{ width: '100%' ,}}
              name="Comment"
              label="Remarque"
              size="small"
              value={props.Owtr.Comment}
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

export default InventoryTransferForm;
