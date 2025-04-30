// frontend/src/components/ARGoodsReturnForm.js
import React, { useEffect } from 'react';
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, styled, Box, Snackbar, Alert } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import '../../Style.css';
import Modal from 'react-modal';
import ARGoodsReturnTable from './ARGoodsReturnTable';


const StyledTextField = styled(TextValidator)(({ theme }) => ({
    width: "100%",
    padding: "2px",
    marginBottom: "8px",
    '& .MuiInputBase-input': {
      '&[readonly]': {
        fontWeight: '',
        color: 'black',
      },
    },
}));

const ARGoodsReturnForm = (props) => {
    const handleSearchIconClick = () => {
        props.setSearchInputVisible(!props.searchInputVisible);
        props.setSearchQuery("");
    };
    const handleChangePage = (event, newPage) => {
        props.setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        props.setRowsPerPage(parseInt(event.target.value, 2)); 
        props.setPage(0);
    };
    const handleClose = () => {
        props.setState({ ...props.state, open: false });
    };
    const { vertical, horizontal, open, message, severity } = props.state;
    useEffect(() => {  
        props.fetchNextDocEntry(); 
        Modal.setAppElement('#root');
    }, []);
    
    const filterData = (data) => {
        return data.filter(
            (item) =>
                item.number.toLowerCase().includes(props.searchQuery.toLowerCase()) || 
                item.description.toLowerCase().includes(props.searchQuery.toLowerCase())
        );
    };

    const handleReset = () => {
        props.fetchNextDocEntry();
        props.setOrpd({
            DocNum: '',
            DocDate: props.today,
            DueDate: props.today,
            UserSign: '',
            CardCode: '',
            CardName: '',
            DocEntry: '',
            Canceled: 'No',
            DocStatus: '',
            Comment: '',
            TotalHT: '',
            DiscPrcnt:'',
            RemiseTotal:'',
            VatSum: '',
            DocTotal: ''
        });

        props.setRdp1([
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
                LineHT: "",
                UM: "",
                isEditing: true,
            },
        ]);
    };
    useEffect(() => {
        if (!props.Orpd.DocStatus.trim()) {
            props.setOrpd(prevFormData => ({
                ...prevFormData,
                DocStatus: 'O',
            }));
        }
    }, [props.Orpd.DocStatus, props.setOrpd]);

    let content = [];
    if (props.selectedField?.name === 'UM') {
        content = props.modalContent.UM || [];
    } else if (props.selectedField?.name === 'WhsCode') {
        content = props.modalContent.WhsCode || [];
    } else if (props.selectedField?.name === 'CardCode') {
        content = props.modalContent.CardCode || [];
    } else {
        content = props.modalContent.ItemCode || [];
    }
    const paginatedData = filterData(content).slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage);
    return (
        <div>
            <ValidatorForm onSubmit={props.handleSubmit} onError={() => null}>
                <Grid container spacing={10} style={{marginTop:"-100px"}}>
                    <Grid item lg={4} md={6} sm={12} xs={12} > 
                        <StyledTextField size="small" 
                            type="text"
                            name="CardCode"
                            value={props.Orpd.CardCode}
                            onChange={props.handleChange}
                            label="Code fournisseur"
                            inputProps={{ readOnly: true }}
                            InputProps={{
                                readOnly: props.state.Mode === "Mettre à jour" || props.state.Mode === "OK",
                                endAdornment: (
                                    props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" &&(
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
                                        onClick={() => props.handleOpenModal('CardCode')}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </IconButton>
                                    )
                                )
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <StyledTextField size="small" 
                            type="text"
                            name="DocNum"
                            value={props.Orpd.DocNum}
                            onChange={props.handleChange}
                            label="Numéro de Facture"
                            inputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                    <FormControl fullWidth style={{ marginRight: "40px", width: "100%", marginBottom:"10px" }}>
                        <InputLabel id="DocStatus">Statut</InputLabel>
                        <Select size="small" 
                            label="DocStatus"
                            labelId="DocStatus"
                            name="DocStatus"
                            value={props.Orpd.DocStatus.trim() || "O"}
                            onChange={props.handleChange}
                            style={{ width: '100%' }}
                            inputProps={{ readOnly: true }}
                        >
                            <MenuItem key='O' value="O">ouvert</MenuItem>
                            <MenuItem key='C' value="C">Fermée</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <StyledTextField
                        type="text"
                        name="UserSign"
                        label="Utilisateur"
                        value={props.Orpd.UserSign}
                        onChange={props.handleChange}
                        style={{ display:"none"}}
                    />
                    <Box style={{ marginRight: "40px", width: "50%", padding: "2px" ,display:"none"}}  className="breadcrumb">
                        <FormControl fullWidth>
                            <InputLabel id="Canceled">Canceled</InputLabel>
                            <Select
                                label="Canceled"
                                labelId="Canceled"
                                name="Canceled"
                                value={props.Orpd.Canceled || ''}
                                onChange={props.handleChange}
                                style={{ width: '100%'  }}
                                inputProps={{ readOnly: true }}
                            >
                                <MenuItem key="No" value="No">NO</MenuItem>
                                <MenuItem key="Yes" value="Yes">Yes</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <StyledTextField
                        type="number"  
                        name="DocEntry"  
                        label="Numéro Order"
                        value={props.Orpd.DocEntry}
                        onChange={props.handleChange}
                        style={{ display:"none"}}
                        inputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid container spacing={10} style={{marginTop:"-70px"}}>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <StyledTextField
                            size="small" 
                            type="text"
                            name="CardName"
                            value={props.Orpd.CardName}
                            onChange={props.handleChange}
                            label="Nom fournisseur"
                            inputProps={{ readOnly: props.state.Mode === "Mettre à jour" || props.state.Mode === "OK" }}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}> {/* Flatpickr DocDate */}
                        <div style={{ position: "relative", width: "100%" }}>
                            <Flatpickr
                              className="Flatpickr-flatpickr"
                                data-enable-time={false}
                                value={props.Orpd.DocDate ? new Date(props.Orpd.DocDate) : new Date()}
                                onChange={(date) => props.handleChange({  target: { name: "DocDate", value: date[0] }, }) }
                                options={{ dateFormat: "d/m/Y"}}
                                disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                            />
                            <label className="label-flatpickr" style={{top: props.Orpd.DocDate ? "-10px" : "12px"}} > Date Document </label>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <div style={{ position: "relative", width: "100%" }}>
                            <Flatpickr
                              className="Flatpickr-flatpickr"
                                data-enable-time={false}
                                value={props.Orpd.DueDate ? new Date(props.Orpd.DueDate) : new Date()}
                                onChange={(date) => props.handleChange({  target: { name: "DueDate", value: date[0] }, }) }
                                options={{ dateFormat: "d/m/Y"}}
                                disabled={props.state.Mode === "Mettre à jour" || props.state.Mode === "OK"}
                            />
                            <label className="label-flatpickr" style={{top: props.Orpd.DueDate ? "-10px" : "12px"}} > Date d'écheance </label>
                        </div>
                    </Grid>

                </Grid>
                <ARGoodsReturnTable handleSearchIconClick={handleSearchIconClick} filterData={filterData} 
                 paginatedData={paginatedData}  setState={props.setState} rowsPerPage={props.rowsPerPage}
                 page={props.page}  setPage={props.setPage}  fetchNextDocEntry={ props.fetchNextDocEntry}
                 allFieldsFilled={  props.allFieldsFilled  }  handleSelectItem={  props.handleSelectItem}
                 setRdp1={props.setRdp1} setOpen={props.setOpen}setSelectedField={props.setSelectedField}
                 modalContent={ paginatedData }   Rdp1={ props.Rdp1}
                 state={props.state}vatOptions={props.vatOptions}handleCloseModal={props.handleCloseModal} 
                 handleSaveSelectedItem={props.handleSaveSelectedItem} axiosInstance={props.axiosInstance}
                 handleOpenModal={props.handleOpenModal} handleChangeRowsPerPage={handleChangeRowsPerPage}
                 setSearchQuery={props.setSearchQuery} setSearchInputVisible={props.setSearchInputVisible}
                 searchInputVisible={ props.searchInputVisible}   setSelectedItem={ props.setSelectedItem}
                 selectedItem={props.selectedItem}open={props.open}setModalContent={props.setModalContent}
                 selectedField={props.selectedField}setOrpd={props.setOrpd}searchQuery={props.searchQuery}
                 handleChangePage={handleChangePage}setRowsPerPage={props.setRowsPerPage}content={content}
                 lastSavedRow={props.lastSavedRow}Mode={props.Mode}setLastSavedRow={props.setLastSavedRow} 
                 handleCalculations2={props.handleCalculations2}
                 />
                <Grid container spacing={0}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 4 }}>
                        <TextField size="small" 
                            name="Comment"
                            label="Remarque"
                            value={props.Orpd.Comment}
                            onChange={props.handleChange}
                            rows={4}
                            multiline
                            maxRows={4}
                            style={{ width: "50%" }}
                        />
                       
                    </Grid>
                    <Grid item lg={2} md={6} sm={12} xs={12} sx={{ mt: 4 }}>

                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <StyledTextField size="small" 
                            type="number"
                            name="TotalHT"
                            value={props.Orpd.TotalHT}
                            onChange={props.handleChange}
                            label="Total avant remise"
                            fullWidth
                            inputProps={{ readOnly: true }}
                        />
                        <Grid item lg={12} md={6} sm={12} xs={12} >
                            <Grid container >
                                <Grid item lg={2} md={6} sm={12} xs={12} >
                                    <StyledTextField size="small" 
                                        type="text"
                                        name="DiscPrcnt"
                                        value={props.Orpd.DiscPrcnt}
                                        onChange={props.handleChange}
                                        onBlur={() => props.handleCalculations2()}
                                        label="Remise"
                                        fullWidth
                                        inputProps={{ inputMode: "decimal" }}
                                    />
                                </Grid>
                                <Grid item lg={1} md={6} sm={12} xs={12} >
                                    <span style={{fontSize:"25px" ,color:"gray" ,marginLeft:"9px"}}>%</span>
                                </Grid>
                                
                                <Grid item lg={9} md={6} sm={12} xs={12} >
                                    <StyledTextField size="small" 
                                        type="text"
                                        name="RemiseTotal"
                                        value={props.Orpd.RemiseTotal}
                                        onChange={props.handleChange}
                                        onBlur={() => props.handleCalculations2()}
                                        label="Total Remise"
                                        fullWidth
                                        inputProps={{ inputMode: "decimal" }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <StyledTextField size="small" 
                            type="number"
                            name="VatSum"
                            value={props.Orpd.VatSum}
                            onChange={props.handleChange}
                            label="TVA"
                            fullWidth
                            inputProps={{ readOnly: true }}
                        />
                        <StyledTextField size="small" 
                            type="number"
                            name="DocTotal"
                            value={props.Orpd.DocTotal}
                            onChange={props.handleChange}
                            label="Total"
                            fullWidth
                            inputProps={{ readOnly: true }}
                           
                        />
                    </Grid>
                </Grid>
                <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Button color="primary" variant="contained" type="submit">{props.Mode}</Button>
                    {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" &&(
                    <Button color="secondary" variant="contained" onClick={handleReset}>Reset</Button>
                    )}
                </Box>
            </ValidatorForm>
           
            <Snackbar open={open}  autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }} variant="filled">{message}</Alert>
            </Snackbar>

        </div>
    );
};

export default ARGoodsReturnForm;
