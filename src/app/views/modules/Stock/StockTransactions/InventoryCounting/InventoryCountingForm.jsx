//InventoryCountingForm.jsx
import React, { useEffect } from "react";
import { Button, Grid, styled, TextField, Snackbar, Alert, FormControl, IconButton, Select, MenuItem} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";
import InventoryCountingTable from './InventoryCountingTable';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import axios from 'axios';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import '../../../Style.css';

const TextFieldD = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const InventoryCountingForm = (props) => {

  const handleSearchIconClick = () => {props.setSearchInputVisible(!props.searchInputVisible);props.setSearchQuery("");};

  const { vertical, horizontal, open, message, severity } = props.state;
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ baseURL: baseUrl, timeout: 5000, withCredentials: true});
  const handleSearchChange = (e) => {
    props.setSearchQuery(e.target.value);
  };
  const filterData = (data) => {
    return data.filter(item =>
      item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) || item.description.toLowerCase().includes(props.searchQuery.toLowerCase()) 
    );
  };
  let content = [];
  if (props.selectedField?.name === 'UM') {
    content = props.modalContent.UM || [];
  } else if (props.selectedField?.name === 'WhsCode') {
    content = props.modalContent.WhsCode || [];
  } else {
    content = props.modalContent.ItemCode || [];
  }

  const handleValidationClick = async () => {
    try {
      let updatedData = { ...props.oiqr };
      if (updatedData.WhsCode) {
        const resWarehouse = await axiosInstance.get("Warehouse/");
        const warehouses = resWarehouse.data;
        const selectedWarehouse = warehouses.find(warehouse => warehouse.NomWarehouse === updatedData.WhsCode);
  
        if (selectedWarehouse) {
          updatedData.WhsCode = selectedWarehouse.CodeWarehouse;
        } else {
          props.setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Warehouse not found for the provided WhsCode", severity: "error" });
          return;
        }
      }
      updatedData.DocStatus = "V";
      await axiosInstance.put(`OIQR/${props.oiqr.id}`, updatedData);
      const newItems = []; console.log(props.iqr1);
      await Promise.all(
        
        props.iqr1.map(async (item, index) => {
          const updatedItem = { ...item };
          console.log(updatedItem);
          if (isNaN(updatedItem.UM)) {
            const resUM = await axiosInstance.get("UM/");
            const umData = resUM.data;
            const selectedUM = umData.find(um => um.NomUM === updatedItem.UM);
            if (selectedUM) {
              updatedItem.UM = selectedUM.id;
            } else { props.setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "UM not found for the provided value", severity: "error" });
              return;
            }
          }
          if (updatedItem.id) {
            try {
              console.log('befor up :',updatedItem);
              const response = await axiosInstance.put(`IQR1/${updatedItem.id}`, updatedItem);
              console.log('Response:', response);
            } catch (error) {
              console.error('Error occurred during PUT request:', error);
            }
            console.log('after up :',updatedItem);
          }
          else {
            updatedItem.DocEntry = updatedData.DocEntry; 
            if (!updatedItem.LineNum) {
              updatedItem.LineNum = (index + 1).toString(); 
            }
            if (updatedItem.ItemCode && updatedItem.ItemName && updatedItem.OnHandBef && updatedItem.CountQuantité && updatedItem.Quantity && updatedItem.UM && updatedItem.Price && updatedItem.LineTotal && updatedItem.TotalCompte) {
              newItems.push(updatedItem); 
            } else { props.setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Veuillez remplir tous les champs obligatoires pour les nouvelles lignes.", severity: "error" });
              return;
            }
          }
        })
      );

      const stockData = props.iqr1.map((item) => ({
        TransType: "10000071",
        CardCode: "0",
        DocNum: updatedData.DocNum, // Assuming this is the document number
        ItemCode: item.ItemCode,
        LineNum: item.LineNum,
        WhsCode: updatedData.WhsCode,
        Price: item.Price,
        InQty: item.Quantity > 0 ? item.Quantity : "0", // If positive, InQty
        OutQty: item.Quantity < 0 ? item.Quantity : "0", // If negative, OutQty
      }));
  
      // Send stockData to the server
      await Promise.all(stockData.map(item => axiosInstance.post("Stock", item)));

      if (newItems.length > 0) {
        console.log('line 1:',newItems);
        await Promise.all(newItems.map(item => axiosInstance.post("IQR1", item)));
      }
      props.setOiqr({ id: '', DocEntry: '', DocNum: '', DocDate: props.today, Hour: props.currentTime, Comment: '', UserSign: 1, DocStatus: '', WhsCode: '', PriceList: '', });
      props.setIqr1([{ id: '', DocEntry: '', LineNum: '1', ItemCode: '', ItemName: '', OnHandBef: '', CountQuantité: '0', Quantity: '', UM: '', Price: '0.00', LineTotal: '0.00', TotalCompte: '', isEditing: true,}]);
      props.setState({ Mode: 'Créer', vertical: 'top', horizontal: 'center', open: true, message: "Document validated and data updated/added successfully", severity: "success"});
    } catch (error) {
      props.handelError(error);
    }
  };



  const handleClose = () => {
    props.setState({ ...props.state, open: false });
  };

  const handleInterrompre = () => {
    props.setOiqr({ id: '', DocEntry: '', DocNum: '', DocDate: props.today, Hour: props.currentTime, Comment: '', UserSign: 1, DocStatus: '', WhsCode: '', PriceList: '',});
    props.setIqr1([{ id: '', DocEntry: '', LineNum: '1', ItemCode: '', ItemName: '', OnHandBef: '', CountQuantité: '0', Quantity: '', UM: '', Price: '0.00', LineTotal: '0.00', TotalCompte:'',isEditing: true, }]);
  }

  useEffect(() => {
    props.fetchNextDocEntry();
    Modal.setAppElement('#root');
    if (props.state.Mode === "Créer") {
      props.setOiqr(prevOiqr => ({ ...prevOiqr, Hour: props.currentTime }));
    }
  }, []);

  const paginatedData = filterData(content).slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage);

  return (
    <>
      <ValidatorForm onSubmit={props.handleSubmit}>
  
        <Grid container spacing={12} style={{marginTop:"-120px"}}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <label htmlFor="DocNum">Numéro Document:</label>
              <TextFieldD
                type="text"
                size="small"
                name="DocNum"
                value={props.oiqr.DocNum}
                onChange={props.handleChange}
                inputProps={{ readOnly: true }}
              />
              <TextFieldD
                type='Number'
                name="DocEntry"
                value={props.oiqr.DocEntry}
                onChange={props.handleChange}
                InputProps={{ inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', readOnly: true }} 
                style={{ display:"none"}}
                
              />
              <TextFieldD
                type="text"
                name="UserSign"
                value={props.oiqr.UserSign}
                onChange={props.handleChange}
                InputProps={{inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', readOnly: props.state.Mode === "Mettre à jour" || props.state.Mode === "OK",}}
                style={{ display:"none"}}
              />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <div style={{ position: "relative", width: "100%" }}>
                <label className="label-flatpickr2" style={{top: props.oiqr.DocDate ? "-10px" : "12px"}} > Date Document </label>
                <Flatpickr
                  className="Flatpickr-flatpickr"
                    data-enable-time={false}
                    value={props.oiqr.DocDate ? new Date(props.oiqr.DocDate) : new Date()}
                    onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                    options={{ dateFormat: "d/m/Y"}}
                    disabled={props.oiqr.DocStatus === "V"}
                />
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
          <label htmlFor="Hour">Heure:</label>
            <TextFieldD
              type="TIME"
              size="small"
              name="Hour"
              value={props.oiqr.Hour}
              onChange={props.handleChange}
              InputProps={{inputMode: 'decimal', readOnly: props.oiqr.DocStatus === "V" ,}}
            />
          </Grid>
        </Grid>
        <Grid container spacing={12} style={{marginTop:"-100px"}}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <label htmlFor="WhsCode">Magasin:</label> 
              <TextFieldD
                type="text"
                size="small"
                name="WhsCode"
                value={props.oiqr.WhsCode}
                onChange={props.handleChange}
                
                InputProps={{
                  readOnly: props.oiqr.DocStatus === "V" ,

                  endAdornment: (
                   props.oiqr.DocStatus !== "V"  && (
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
                        onClick={() => props.handleOpenModal('WhsCode')}
                      
                      >
                        <FontAwesomeIcon icon={faBars} />
                      </IconButton>
                    )
                  )
                }}
              />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <FormControl fullWidth  >
                <label htmlFor="UserSign">Statut:</label>
                <Select
                  label="DocStatus"
                  size="small"
                  labelId="DocStatus"
                  name="DocStatus"
                  value={props.oiqr.DocStatus.trim() }
                  onChange={props.handleChange}
                  style={{ width: '100%' }}
                  inputProps={{ readOnly: true }}
                  
                >
                  <MenuItem key='O' value="O">Ouvert</MenuItem>
                  <MenuItem key='C' value="C">Fermée</MenuItem>
                  <MenuItem key='V' value="V">Valide</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
          <FormControl fullWidth >
              <label htmlFor="PriceList">Price List:</label>
              <Select label="PriceList" labelId="PriceList" inputProps={{ readOnly: props.oiqr.DocStatus === "V" }} size="small" name="PriceList" value={props.oiqr.PriceList || ""}  onChange={props.handleChange} style={{ width: '100%' }} >
                {props.PriceListData.map((e, key) => {
                          return <MenuItem key={key} value={e.id}>{e.Name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <InventoryCountingTable searchInputVisible={ props.searchInputVisible}  calculateUpdatedValues={props.calculateUpdatedValues}
          handleSaveSelectedItem={props.handleSaveSelectedItem} handleSelectItem={props.handleSelectItem}
          handleSearchIconClick={handleSearchIconClick}   setSearchInputVisible={props.setSearchInputVisible}
          handleChangeRowsPerPage={props.handleChangeRowsPerPage} filterData={filterData} 
          page={props.page} setPage={props.setPage} rowsPerPage={props.rowsPerPage} setRowsPerPage={props.setRowsPerPage}
          paginatedData={paginatedData} handleSearchChange={handleSearchChange} handleChangePage={props.handleChangePage}
          searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery} fetchNextDocEntry={props.fetchNextDocEntry} 
          handleCloseModal={props.handleCloseModal} handleOpenModal={props.handleOpenModal}  validation={props.validation} 
          openm={props.openm} modalContent={paginatedData} seIcoode={props.seIcoode}
          selectedField={props.selectedField} setLastSavedRow={props.setLastSavedRow} allFieldsFilled={props.allFieldsFilled} 
          lastSavedRow={props.lastSavedRow} setSelectedItem={props.setSelectedItem} selectedItem={props.selectedItem} 
          iqr1={props.iqr1} oiqr={props.oiqr} setIqr1={props.setIqr1} editIndex={props.editIndex} setEditIndex={props.setEditIndex} 
          state={props.state} setState={props.setState} handleManualPriceChange={props.handleManualPriceChange}content={content}
       
           />
            
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2, mb: 2 }}>
            <TextField
              style={{ width: '100%', }}
              name="Comment"
              label="Remarque"
              size="small"
              value={props.oiqr.Comment}
              onChange={props.handleChange}
              validators={["minStringLength:1", "maxStringLength:6"]}
              rows={4} multiline maxRows={4}
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>{props.Mode}</Span>
        </Button>
        {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
          <Button color="primary" variant="contained" type="reset" style={{ marginLeft: "10px" }} onClick={handleInterrompre}>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Interrompre</Span>
          </Button>
        )}
        {(props.state.Mode === "Mettre à jour" || props.state.Mode === "OK") && (props.oiqr.DocStatus === "C" || props.oiqr.DocStatus === "O") && (
          <Button color="secondary" variant="contained" style={{ marginLeft: "10px" }} onClick={handleValidationClick}>
            <Span sx={{ pl: 1, textTransform: 'capitalize' }}>validation</Span>
          </Button>
        )}

      </ValidatorForm>

      <Snackbar  open={open}  autoHideDuration={6000}  onClose={handleClose}  anchorOrigin={{ vertical, horizontal }}  key={vertical + horizontal} >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">
          {message}
        </Alert>
      </Snackbar>
      
    </>
  );
};

export default InventoryCountingForm ;
