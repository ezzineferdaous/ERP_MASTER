// GoodsIssueForm
import React, {  useEffect } from "react";
import { Button, Grid, styled, TextField, Snackbar, Alert } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";
import GoodsIssueFormIge1 from './GoodsIssueFormIge1';
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
      props.setOige({ DocDate: props.today, UserSign: 1, Comment: '' });
      props.setige1([{ LineNum: '1', ItemCode: '', ItemName: '', Quantity: '1',  WhsCode: '', Price: '0.00', Discount: '0', LineTotal: '0.00', UM: '',isEditing: true, }]);
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
              value={props.oige.DocEntry}
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
              value={props.oige.DocNum}
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
              value={props.oige.UserSign}
              onChange={props.handleChange}
              InputProps={{  inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
              required
              disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"} 
              style={{ display:"none"}}
            />
            <div style={{ position: "relative", width: "100%" }}>
                <label className="label-flatpickr2" style={{top: props.oige.DocDate ? "-10px" : "12px"}} > Date Document </label>
                <Flatpickr
                  className="Flatpickr-flatpickr"
                    data-enable-time={false}
                    value={props.oige.DocDate ? new Date(props.oige.DocDate) : new Date()}
                    onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                    options={{ dateFormat: "d/m/Y"}}
                    disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                />
            </div>
          </Grid>
        </Grid>
        <GoodsIssueFormIge1 handleSelectItem={props.handleSelectItem} handleSaveSelectedItem={props.handleSaveSelectedItem}
        searchInputVisible={ props.searchInputVisible} handleSearchIconClick={handleSearchIconClick}
          page={props.page} setPage={props.setPage} rowsPerPage={props.rowsPerPage} setRowsPerPage={props.setRowsPerPage}  searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery}  handleCloseModal={props.handleCloseModal} validation={props.validation}
             handleOpenModal={props.handleOpenModal}  openm={props.openm} modalContent={props.modalContent}
              selectedField={props.selectedField} setLastSavedRow={props.setLastSavedRow} lastSavedRow={props.lastSavedRow} setSelectedItem={props.setSelectedItem}
               selectedItem={props.selectedItem}    ige1={props.ige1} setige1={props.setige1}  state={props.state} setState={props.setState} fetchNextDocEntry={props.fetchNextDocEntry} allFieldsFilled={props.allFieldsFilled} 
        /> 
        <Grid container spacing={0}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2, mb: 2 }}>
            <TextField
              style={{ width: '100%' ,}}
              name="Comment"
              label="Remarque"
              size="small"
              value={props.oige.Comment}
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
