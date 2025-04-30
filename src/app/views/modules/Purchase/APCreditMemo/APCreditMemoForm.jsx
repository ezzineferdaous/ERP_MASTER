// frontend/src/components/APCreditMemoForm.js
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
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import APCreditTable from "./APCreditTable";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import '../../Style.css';

// Styled text field
const StyledTextField = styled(TextValidator)(({ theme }) => ({
  width: "100%",
  padding: "2px",
  marginBottom: "8px",
  "& .MuiInputBase-input": {
    "&[readonly]": {
      fontWeight: "",
      color: "black",
    },
  },
}));

const APCreditMemoForm = (props) => {
  // Toggle search input visibility
  const handleSearchIconClick = () => {
    props.setSearchInputVisible(!props.searchInputVisible);
    props.setSearchQuery("");
  };

  // Filter modal data based on search query
  const filterData = (data) => {        console.log("Search Query:", props.searchQuery); // ???? ?? ???? searchQuery     
     console.log("Data before filtering:", data);           
      return data.filter( (item) =>             
    
    item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) || item.description.toLowerCase().includes(props.searchQuery.toLowerCase())     
   );    };

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    props.setRowsPerPage(parseInt(event.target.value, 50));
    props.setPage(0);
  };

  let content = [];
  if (props.selectedField?.name === "UM") {
    content = props.modalContent.UM || [];
  } else if (props.selectedField?.name === "WhsCode") {
    content = props.modalContent.WhsCode || [];
  } else if (props.selectedField?.name === "CardCode") {
    content = props.modalContent.CardCode || [];
  } else {
    content = props.modalContent.ItemCode || [];
  }

  const paginatedData = filterData(content).slice(
    props.page * props.rowsPerPage,
    props.page * props.rowsPerPage + props.rowsPerPage
  );



  
  // Define state for Snackbar
  const { vertical, horizontal, open, message, severity } = props.state;
  // Set default DocStatus to 'O' (Open) if it's empty
  useEffect(() => {
    if (!props.oRPC.DocStatus.trim()) {
      props.setoRPC((prevFormData) => ({
        ...prevFormData,
        DocStatus: "O",
      }));
    }
  }, [props.oRPC.DocStatus, props.setoRPC]);

  // Reset form data to initial values
  const handleReset = () => {
    props.fetchNextDocEntry();
    props.setoRPC({
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
      TotalHT: "",
      DiscPrcnt: "",
      RemiseTotal: "",
      VatSum: "",
      DocTotal: "",
    });
    // Reset table data
    props.setRPC1([
      {
        DocEntry: "",
        LineNum: "1",
        ItemCode: "",
        ItemName: "",
        Quantity: 1,
        WhsCode: "",
         PrixHT: "",
        Price: "",
        Discount: "",
        VAT: "0",
        LineTotal: "",
        UM: "",
        isEditing: true, // chenge
      },
    ]);
  };

  // Close Snackbar
  const handleClose = () => {
    props.setState({ ...props.state, open: false });
  };

  useEffect(() => {
    props.fetchNextDocEntry();
    Modal.setAppElement("#root");
  }, []);


  

  return (
    <div>
      <ValidatorForm onSubmit={props.handleSubmit} onError={() => null}>
        <Grid container spacing={0} >
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <StyledTextField
              type="text"
              name="CardCode"
              size="small"
              value={props.oRPC.CardCode}
              onChange={props.handleChange}
              label="Code fournisseur"
              inputProps={{ readOnly: true }}
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
              value={props.oRPC.DocNum}
              onChange={props.handleChange}
              label="Numéro de Facture"
              inputProps={{ readOnly: true }}
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
                value={props.oRPC.DocStatus.trim() || "O"}
                onChange={props.handleChange}
                style={{ width: "100%" }}
                inputProps={{ readOnly: true }}
              >
                <MenuItem key="O" value="O">
                  Ouvert 
                </MenuItem>
                <MenuItem key="C" value="C">
                Clôturée
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <StyledTextField
            type="text"
            name="UserSign"
            label="Utilisateur"
            size="small"
            value={props.oRPC.UserSign}
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
               
                value={props.oRPC.Canceled || ""}
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
            value={props.oRPC.DocEntry}
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
              value={props.oRPC.CardName}
              onChange={props.handleChange}
              label="Nom fournisseur"
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
                                value={props.oRPC.DocDate ? new Date(props.oRPC.DocDate) : new Date()}
                                onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                                options={{ dateFormat: "d/m/Y"}}
                                disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                            />
                            <label className="label-flatpickr" style={{top: props.oRPC.DocDate ? "-10px" : "12px"}} > Date Document </label>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                                    <div style={{ position: "relative", width: "100%" }}>
                                        <Flatpickr
                                        className="Flatpickr-flatpickr"
                                            data-enable-time={false}
                                            value={props.oRPC.DueDate ? new Date(props.oRPC.DueDate) : new Date()}
                                            onChange={(date) => props.handleChange({  target: { name: "DueDate", value: date[0] }, }) }
                                            options={{ dateFormat: "d/m/Y"}}
                                            disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                                        />
                                        <label className="label-flatpickr" style={{top: props.oRPC.DueDate ? "-10px" : "12px"}} > Date d'écheance </label>
                                    </div>
                    </Grid>
        </Grid>

        <APCreditTable
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
          RPC1={props.RPC1}
          setRPC1={props.setRPC1}
          Mode={props.Mode}
          setoRPC={props.setoRPC}
          state={props.state}
          vatOptions={props.vatOptions}
          handleCloseModal={props.handleCloseModal}
          handleSaveSelectedItem={props.handleSaveSelectedItem}
          handleSelectItem={props.handleSelectItem}
          handleOpenModal={props.handleOpenModal}
          setLastSavedRow={props.setLastSavedRow}
          lastSavedRow={props.lastSavedRow}
          setSearchQuery={props.setSearchQuery}
          setState={props.setState}
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
        />

        <Grid container spacing={0}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
            <TextField
              name="Comment"
              label="Remarque"
             
              value={props.oRPC.Comment}
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
              name="TotalHT"
              size="small"
              value={props.oRPC.TotalHT}
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
                  value={props.oRPC.DiscPrcnt}
                  onChange={props.handleChange}
                  onBlur={()=> props.handleCalculate()} // Trigger calculation on blur
                  label="Remise"
                  fullWidth
                  size="small"
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
                  value={props.oRPC.RemiseTotal}
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
              name="VatSum"
              size="small"
              value={props.oRPC.VatSum}
              onChange={props.handleChange}
              label="TVA/Taxes"
              fullWidth
              inputProps={{ readOnly: true }}
            />
            <StyledTextField
              type="number"
              name="DocTotal"
              size="small"
              value={props.oRPC.DocTotal}
              onChange={props.handleChange}
              label="Total"
              fullWidth
              inputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

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
                Reset
              </Button>
            )}
        </Box>
      </ValidatorForm>

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
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default APCreditMemoForm;













