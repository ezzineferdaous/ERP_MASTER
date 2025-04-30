// frontend/src/components/SalesOrderForm.js
import React, { useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  styled,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";// Import Material UI components for building the form layout and UI elements
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"; // Import ValidatorForm and TextValidator for form validation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome for icons
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Import specific icon from FontAwesome
import Modal from "react-modal"; // Import Modal for popup functionality
import AppSalesOrderTable from "./AppSalesOrderTable"; // Import custom component to handle the delivery table
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; // Optional: Theme for Flatpickr
import '../../Style.css';

// Styled TextField component using Material UI's styled utility
const StyledTextField = styled(TextValidator)(({ theme }) => ({
  width: "100%",// Full width input
  padding: "2px",// Padding around the input field
  marginBottom: "8px",// Bottom margin for spacing between fields
  "& .MuiInputBase-input": {
    "&[readonly]": {
      fontWeight: "",// Default font weight for read-only fields
      color: "black",// Text color for read-only fields
    },
  },
}));

// DeliveryForm component definition
const SalesOrderForm = (props) => {
  // Toggle the visibility of the search input field
  const handleSearchIconClick = () => {
    props.setSearchInputVisible(!props.searchInputVisible);// Invert visibility state
    props.setSearchQuery("");// Reset search query
  };
 // Filter the modal data based on the search query (either by number or description)
   const filterData = (data) => {        console.log("Search Query:", props.searchQuery); 
     console.log("Data before filtering:", data);           
      return data.filter( (item) =>             
    
    item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) || item.description.toLowerCase().includes(props.searchQuery.toLowerCase())     
   );    };

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage); // Set the current page to the selected new page
  };

  // Handle changes in the number of rows displayed per page
  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(parseInt(event.target.value, 2)); // Set rows per page
    props.setPage(0); // Reset to the first page
  };

    // Determine which modal content to display based on the selected field
  let content = [];
  if (props.selectedField?.name === "UM") {
    content = props.modalContent.UM || []; // Fetch UM data if the field is UM
  } else if (props.selectedField?.name === "WhsCode") {
    content = props.modalContent.WhsCode || []; // Fetch Warehouse data if the field is WhsCode
  } else if (props.selectedField?.name === "CardCode") {
    content = props.modalContent.CardCode || []; // Fetch CardCode data if the field is CardCode
  } else {
    content = props.modalContent.ItemCode || []; // Default to ItemCode data
  }

  // Apply pagination to the filtered data
  const paginatedData = filterData(content).slice(
    props.page * props.rowsPerPage,
    props.page * props.rowsPerPage + props.rowsPerPage
  );

  useEffect(() => {
    if (!props.oRDR.DocStatus.trim()) {
      props.setoRDR((prevFormData) => ({
        ...prevFormData,
        DocStatus: "O",
      }));
    }
  }, [props.oRDR.DocStatus, props.setoRDR]);

 // Reset form data to initial values (used when resetting the form)
  const handleReset = () => {
    props.fetchNextDocEntry(); // Fetch the next document entry
    props.setoRDR({
      DocNum: "",
      DocDate: props.today,
      DueDate: props.today,
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
     // Reset delivery line data (RDR1)
    props.setRDR1([
      {
        DocEntry: "",
        LineNum: "1",
        ItemCode: "",
        ItemName: "",
        Quantity: 1,
        WhsCode: "",
        PriceHT: "",
        VAT: "0",
        Price: "",
        Discount: "",
        LineTotal: "",
        UM: "",
        isEditing: true, // chenge

      },
    ]);
  };

  // Destructure state variables for Snackbar notifications
  const { vertical, horizontal, open, message, severity } = props.state;

 // Close the Snackbar notification
  const handleClose = () => {
    props.setState({ ...props.state, open: false }); // Close the Snackbar
  };
  // Fetch next document entry and set the root element for the modal when the component mounts
  useEffect(() => {
    props.fetchNextDocEntry(); // Fetch the next document entry
    Modal.setAppElement("#root"); // Set the root element for accessibility purposes in Modal
  }, []);

  return (
    <div>
      {/* ValidatorForm used for form validation on submit */}
      <ValidatorForm onSubmit={props.handleSubmit} onError={() => null}>
        {/* Grid layout for the form fields */}
        <Grid container spacing={0} >
          <Grid item lg={4} md={6} sm={12} xs={12}>
              {/* TextField for Client Code, read-only, with icon button for modal */}
            <StyledTextField
              type="text"
              name="CardCode"
              value={props.oRDR.CardCode}
              onChange={props.handleChange}
              label="Code Client"
              size="small"
              inputProps={{ readOnly: props.state.Mode === "OK" }}
              InputProps={{
                readOnly:
                  props.state.Mode === "Mettre à jour" ||
                  props.state.Mode === "OK",
                endAdornment: props.state.Mode !== "Mettre à jour" &&
                  props.state.Mode !== "OK" && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        right: 5,
                        top: 3,
                        bottom: 2,
                        fontSize: 15,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => props.handleOpenModal("CardCode")}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                  ),
              }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <StyledTextField
              type="text"
              name="DocNum"
              size="small"
              value={props.oRDR.DocNum}
              onChange={props.handleChange}
              label="Numéro de Facture"
              inputProps={{ readOnly: props.state.Mode === "OK" }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <FormControl
              fullWidth
              style={{
                marginRight: "40px",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              <InputLabel id="DocStatus">Statut</InputLabel>
              <Select
                label="DocStatus"
                labelId="DocStatus"
                name="DocStatus"
                size="small"
                value={props.oRDR.DocStatus.trim() || "O"}
                onChange={props.handleChange}
                style={{ width: "100%" }}
                inputProps={{ readOnly: true }}
              >
                <MenuItem key="O" value="O">
                ouvert
                </MenuItem>
                <MenuItem key="C" value="C">
                Fermée
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <StyledTextField
            type="text"
            name="UserSign"
            label="Utilisateur"
            size="small"
            value={props.oRDR.UserSign}
            onChange={props.handleChange}
            style={{ display: "none" }}
          />
          <Box
            style={{
              marginRight: "40px",
              width: "50%",
              padding: "2px",
              display: "none",
            }}
            className="breadcrumb"
          >
            <FormControl fullWidth>
              <InputLabel id="Canceled">Canceled</InputLabel>
              <Select
                label="Canceled"
                labelId="Canceled"
                name="Canceled"
                
                value={props.oRDR.Canceled || ""}
                onChange={props.handleChange}
                style={{ width: "100%" }}
                inputProps={{ readOnly: true }}
              >
                <MenuItem key="No" value="No">
                  NO
                </MenuItem>
                <MenuItem key="Yes" value="Yes">
                  Yes
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <StyledTextField
            type="number"
            name="DocEntry"
            label="Numéro Order"
            size="small"
            value={props.oRDR.DocEntry}
            onChange={props.handleChange}
            style={{ display: "none" }}
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid container spacing={0} >
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <StyledTextField
              type="text"
              name="CardName"
              size="small"
              value={props.oRDR.CardName}
              onChange={props.handleChange}
              label="Nom Client"
              inputProps={{
                readOnly:
                  props.state.Mode === "Mettre à jour" ||
                  props.state.Mode === "OK",
              }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}> {/* Flatpickr DocDate */}
                        <div style={{ position: "relative", width: "100%" }}>
                            <Flatpickr
                              className="Flatpickr-flatpickr"
                                data-enable-time={false}
                                value={props.oRDR.DocDate ? new Date(props.oRDR.DocDate) : new Date()}
                                onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                                options={{ dateFormat: "d/m/Y"}}
                                disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                            />
                            <label className="label-flatpickr" style={{top: props.oRDR.DocDate ? "-10px" : "12px"}} > Date Document </label>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <div style={{ position: "relative", width: "100%" }}>
                                        <Flatpickr
                                        className="Flatpickr-flatpickr"
                                            data-enable-time={false}
                                            value={props.oRDR.DueDate ? new Date(props.oRDR.DueDate) : new Date()}
                                            onChange={(date) => props.handleChange({  target: { name: "DueDate", value: date[0] }, }) }
                                            options={{ dateFormat: "d/m/Y"}}
                                            disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                                        />
                                        <label className="label-flatpickr" style={{top: props.oRDR.DueDate ? "-10px" : "12px"}} > Date d'écheance </label>
                                    </div>
                    </Grid>
        </Grid>
    {/* AppSalesOrderTable component for managing delivery lines */}
        <AppSalesOrderTable
          handleSearchIconClick={handleSearchIconClick}
          filterData={filterData}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          paginatedData={paginatedData}
          page={props.page}
          setPage={props.setPage}
          rowsPerPage={props.rowsPerPage}
          setRowsPerPage={props.setRowsPerPage}
          allFieldsFilled={props.allFieldsFilled}
          fetchNextDocEntry={props.fetchNextDocEntry}
          editIndex={props.editIndex}
          setEditIndex={props.setEditIndex}
          RDR1={props.RDR1}
          setRDR1={props.setRDR1}
          Mode={props.Mode}
          setoRDR={props.setoRDR}
          state={props.state}
          vatOptions={props.vatOptions}
          handleCloseModal={props.handleCloseModal}
          handleSaveSelectedItem={props.handleSaveSelectedItem}
          handleSelectItem={props.handleSelectItem}
          handleOpenModal={props.handleOpenModal}
          setLastSavedRow={props.setLastSavedRow}
          lastSavedRow={props.lastSavedRow}
          setSearchQuery={props.setSearchQuery}
          searchQuery={props.searchQuery}
          setSearchInputVisible={props.setSearchInputVisible}
          searchInputVisible={props.searchInputVisible}
          setSelectedItem={props.setSelectedItem}
          selectedItem={props.selectedItem}
          setSelectedField={props.setSelectedField}
          selectedField={props.selectedField}
          setModalContent={props.setModalContent}
          modalContent={paginatedData}
          open={props.open}
          setOpen={props.setOpen}
          content={content}
          handleCalculate={props.handleCalculate}
          setState={props.setState}
        />

        <Grid container spacing={0}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
            <TextField
              name="Comment"
              label="Remarque"
              
              value={props.oRDR.Comment}
              onChange={props.handleChange}
              rows={4}
              multiline
              maxRows={4}
              style={{ width: "50%" }}
            />
          </Grid>
          <Grid item lg={2} md={6} sm={12} xs={12} sx={{ mt: 4 }}></Grid>
          <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <StyledTextField
              type="number"
              name="TotalHT "
              size="small"
              value={props.oRDR.TotalHT }
              onChange={props.handleChange}
              label="Total avant remise"
              fullWidth
              inputProps={{ readOnly: true }}
            />
            <Grid item lg={12} md={6} sm={12} xs={12}>
            <Grid container>
                <Grid item lg={2} md={6} sm={12} xs={12}>
                <StyledTextField
  type="number"
  name="DiscPrcnt"
  value={props.oRDR.DiscPrcnt}
  onChange={props.handleChange}
  onBlur={()=> props.handleCalculate()} // Trigger calculation on blur
  label="Remise"
  fullWidth
/>
                </Grid>
                <Grid item lg={1} md={6} sm={12} xs={12}>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "gray",
                      marginLeft: "10px",
                    }}
                  >
                    %
                  </span>
                </Grid>

                <Grid item lg={9} md={6} sm={12} xs={12} >
                <StyledTextField
                  size="small"
                  type="text"
                  name="RemiseTotal"
                  value={props.oRDR.RemiseTotal}
                  onChange={props.handleChange}
                  onBlur={()=> props.handleCalculate()} // Trigger calculation on blur
                  label="Total Remise"
                  fullWidth
                  inputProps={{ inputMode: "decimal" }}
                />
                </Grid>
              </Grid>
            </Grid>

            <StyledTextField
              type="number"
              name=""
              size="small"
              value={props.oRDR.VatSum}
              onChange={props.handleChange}
              label="TVA/Taxes"
              fullWidth
              inputProps={{ readOnly: true }}
            />
            <StyledTextField
              type="number"
              name="DocTotal"
              size="small"
              value={props.oRDR.DocTotal}
              onChange={props.handleChange}
              label="Total"
              fullWidth
              inputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
    {/* Bottom section with form actions: Submit, Reset */}
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button color="primary" variant="contained" type="submit">
            {props.Mode}
          </Button>
          {props.state.Mode !== "Mettre à jour" &&
            props.state.Mode !== "OK" && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleReset}
              >
                Reset {/* Button to reset the form */}
              </Button>
            )}
        </Box>
      </ValidatorForm>
    {/* Snackbar for displaying notifications */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {message} {/* Displays the message in Snackbar */}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SalesOrderForm;