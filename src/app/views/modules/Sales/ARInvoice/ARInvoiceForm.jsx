import React, { useEffect } from "react";
import {Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, styled, Box, Snackbar, Alert,} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import ARInvoiceTable from "./ARInvoiceTable";
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

const StyledFlatpickrInput = styled(Flatpickr)(({ theme }) => ({
  width: "100%",
  '& .flatpickr-input': {
      width: "100%",
      padding: "16.5px 14px",
      borderRadius: "4px",
      border: `1px solid ${theme.palette.divider}`,
      fontSize: "0.875rem",
      color: theme.palette.text.primary,
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
  },
}));

const ARInvoiceForm = (props) => {

  const handleSearchIconClick = () => {
    props.setSearchInputVisible(!props.searchInputVisible);
    props.setSearchQuery("");
  };

  const filterData = (data) => {
    return data.filter(
      (item) =>
        item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(props.searchQuery.toLowerCase())
    );
  };

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

  const { vertical, horizontal, open, message, severity } = props.state;
  
  useEffect(() => {
    if (!props.Oinv.DocStatus.trim()) {
      props.setOinv((prevFormData) => ({
        ...prevFormData,
        DocStatus: "O",
      }));
    }
  }, [props.Oinv.DocStatus, props.setOinv]);

  const handleReset = () => {
    props.fetchNextDocEntry();
    props.setOinv({
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
    props.setInv1([
      {
        DocEntry: "",
        LineNum: "1",
        ItemCode: "",
        ItemName: "",
        Quantity: 1,
        WhsCode: "",
        PrixHT:"",
        Price: "",
        Discount: "",
        RemiseTotal:"",
        VAT: "0",
        LineTotal: "",
        UM: "",
        isEditing: true,
      },
    ]);
  };

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
        <Grid container spacing={10} style={{ marginTop: "-100px" }}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <StyledTextField
              type="text"
              name="CardCode"
              size="small"
              value={props.Oinv.CardCode}
              onChange={props.handleChange}
              label="Code Client"
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
              value={props.Oinv.DocNum}
              onChange={props.handleChange}
              label="Numéro de Facture "
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
                value={props.Oinv.DocStatus.trim() || "O"}
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
            value={props.Oinv.UserSign}
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
                size="small"
                value={props.Oinv.Canceled || ""}
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
            label="Numéro Livraison"
            size="small"
            value={props.Oinv.DocEntry}
            onChange={props.handleChange}
            style={{ display: "none" }}
            inputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid container spacing={10} style={{ marginTop: "-70px" }}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <StyledTextField
              type="text"
              name="CardName"
              size="small"
              value={props.Oinv.CardName}
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
                                value={props.Oinv.DocDate ? new Date(props.Oinv.DocDate) : new Date()}
                                onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                                options={{ dateFormat: "d/m/Y"}}
                                disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                            />
                            <label className="label-flatpickr" style={{top: props.Oinv.DocDate ? "-10px" : "12px"}} > Date Document </label>
                        </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Flatpickr
                              className="Flatpickr-flatpickr"
                                data-enable-time={false}
                                value={props.Oinv.DueDate ? new Date(props.Oinv.DueDate) : new Date()}
                                onChange={(date) => props.handleChange({  target: { name: "DueDate", value: date[0] }, }) }
                                options={{ dateFormat: "d/m/Y"}}
                                disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                            />
                            <label className="label-flatpickr" style={{top: props.Oinv.DueDate ? "-10px" : "12px"}} > Date d'écheance </label>
                        </div>
          </Grid>
        </Grid>

        <ARInvoiceTable handleCalculations2={props.handleCalculations2}
          handleSearchIconClick={handleSearchIconClick} filterData={filterData} handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage} paginatedData={paginatedData} modalContent={paginatedData} 
          setPage={props.setPage} rowsPerPage={props.rowsPerPage} setRowsPerPage={props.setRowsPerPage}open={props.open}
          allFieldsFilled={props.allFieldsFilled} fetchNextDocEntry={props.fetchNextDocEntry} 
           Inv1={props.Inv1} setInv1={props.setInv1} Mode={props.Mode}state={props.state}
          setOinv={props.setOinv}  vatOptions={props.vatOptions} handleCloseModal={props.handleCloseModal}page={props.page}
          handleSaveSelectedItem={props.handleSaveSelectedItem} handleSelectItem={props.handleSelectItem}content={content}
          handleOpenModal={props.handleOpenModal} setLastSavedRow={props.setLastSavedRow} lastSavedRow={props.lastSavedRow}
          setSearchQuery={props.setSearchQuery} searchQuery={props.searchQuery} setSearchInputVisible={props.setSearchInputVisible}
          searchInputVisible={props.searchInputVisible} setSelectedItem={props.setSelectedItem} selectedItem={props.selectedItem}
          setSelectedField={props.setSelectedField} selectedField={props.selectedField} setModalContent={props.setModalContent}
          setOpen={props.setOpen} setState={props.setState}
        />

        <Grid container spacing={0}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
            <TextField
              name="Comment"
              label="Remarque"
              size="small"
              value={props.Oinv.Comment}
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
              value={props.Oinv.TotalHT}
              onChange={props.handleChange}
              label="Total avant remise"
              fullWidth
              inputProps={{ readOnly: true }}
            />
            <Grid item lg={12} md={6} sm={12} xs={12}>
              <Grid container>
                <Grid item lg={2} md={6} sm={12} xs={12}>
                  <StyledTextField
                    size="small"
                    type="text"
                    name="DiscPrcnt"
                    value={props.Oinv.DiscPrcnt}
                    onChange={props.handleChange}
                    onBlur={() => props.handleCalculations2()}
                    label="Remise"
                    fullWidth
                    inputProps={{ inputMode: "decimal" }}
                  />
                </Grid>
                <Grid item lg={1} md={6} sm={12} xs={12}>
                  <span style={{ fontSize: "20px", color: "gray", marginLeft: "10px", }} > % </span>
                </Grid>
                <Grid item lg={9} md={6} sm={12} xs={12}>
                <StyledTextField
                  size="small"
                  type="text"  
                  name="RemiseTotal"
                  value={props.Oinv.RemiseTotal}
                  onChange={props.handleChange} 
                  onBlur={() => props.handleCalculations2()}
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
              value={props.Oinv.VatSum}
              onChange={props.handleChange}
              label="TVA/Taxes"
              fullWidth
              inputProps={{ readOnly: true }}
            />
            <StyledTextField
              type="number"
              name="DocTotal"
              size="small"
              value={props.Oinv.DocTotal}
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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled"> {message}  </Alert>
      </Snackbar>
    </div>
  );
};

export default ARInvoiceForm;

