// InventoryCountingTable.jsx
import React, { useEffect,useState, useRef } from "react";
import { Table, TableBody,FormControlLabel,Checkbox, TableCell,TablePagination ,TableFooter , TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Modal, Box, Typography, Button, Radio, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Span } from "app/components/Typography";
import { faEdit, faBars, faTrash, faSave, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { styled } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: "none",
  textAlign: "center",
  padding: 0,
  width: "80px",
  height: "40px",
  color:"black"
}));

const TableCellK = styled(TableCell)(() => ({
  textAlign: "center",
  width: "80px",
  height: "30px",
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



const InventoryCountingTable = React.memo((props) => {
  const tableContainerRef = useRef(null);
  const [focusField, setFocusField] = useState({ index: null, fieldName: null });
  const inputRefs = useRef({});

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [props.iqr1.length]);




  
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    let updatedIqr1 = [...props.iqr1];
  
    updatedIqr1[index] = { ...updatedIqr1[index], [name]: value };
  
    if (name === "ItemCode") {
      props.seIcoode(true);
    }
  
    props.setIqr1(updatedIqr1);
  };


  const handleCalculations = (index) => {
    let updatedIqr1 = [...props.iqr1];
    
    let onHandBef = parseFloat(updatedIqr1[index].OnHandBef) || 0;
    let countQuantité = parseFloat(updatedIqr1[index].CountQuantité) || 0;
    let prix = parseFloat(updatedIqr1[index].Price) || 0;
    
    let Quantity = countQuantité - onHandBef;
    let lineTotal = (prix * Quantity).toFixed(2);
    let totalCompte = (prix * countQuantité).toFixed(2);
  
    updatedIqr1[index] = {
      ...updatedIqr1[index],
      Quantity: Quantity,
      LineTotal: lineTotal,
      TotalCompte: totalCompte
    };
  
    props.setIqr1(updatedIqr1.map((item, i) => ({ ...item, LineNum: i + 1 })));
  };
  
  

  const addige = () => {
    if (props.allFieldsFilled()) {
      props.setEditIndex(props.iqr1.length);
      if (props.state.Mode !== "Mettre à jour") {
        props.fetchNextDocEntry();
      }
      props.setIqr1([...props.iqr1, { DocEntry: '', LineNum:props.iqr1.length + 1, ItemCode: '', ItemName: '', OnHandBef: '', CountQuantité: '0', Quantity: '', UM: '',  Price: '0.00',   LineTotal: '0.00' ,isEditing: true,  }]);
    } else {
        props.setState({ ...props.state, open: true, message: "Please choose Code Article before adding a new row.", severity: "error" });
    }
  };

  
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });




  const handleDelete = async (index) => {
    if (props.iqr1.length <= 1) {
      props.setState({ ...props.state, open: true, message: "Il doit rester au moins une ligne ", severity: "warning" });
      return;  
    }
    if (props.state.Mode === "Mettre à jour") {
      const itemToDelete = props.iqr1[index];
      
      if (itemToDelete.id) {
        try {
          console.log("id", itemToDelete.id);
          
          await axiosInstance.delete(`IQR1/${itemToDelete.id}`);

          const updatedIqr1 = [...props.iqr1];
          updatedIqr1.splice(index, 1);
          props.setIqr1(updatedIqr1);

          props.setState({ ...props.state, open: true, message: "Ligne supprimée", severity: "success" });
        } catch (error) {
          props.setState({ ...props.state, open: true, message: "Erreur lors de la suppression d’une ligne", severity: "error" });
        }
      }
    } else {
           props.iqr1.splice(index , 1);
           props.setIqr1([... props.iqr1]);
           console.log("Data to save:",  props.iqr1);
      
    }
  };
  

  const getSum = (column) => {
    return props.iqr1.reduce((acc, curr) => acc + parseFloat(curr[column] || 0), 0).toFixed(2);
  };

  const handleEdit = (index, fieldName) => {
    console.log("index:", index);
    console.log("fieldName:", fieldName);
    console.log("isEditing:", props.iqr1[index].isEditing );
    props.fetchNextDocEntry();

    if (props.iqr1[index].isEditing  ||  props.oiqr.DocStatus === "V" ) {
      console.log("return:");
       return;
    }

    if (props.allFieldsFilled()) {
       const updatedRows = props.iqr1.map((row, rowIndex) => ({
          ...row,
          isEditing: rowIndex === index,
       }));
       props.setIqr1(updatedRows);
       setFocusField({ index, fieldName });
       console.log("setFocusField:", focusField);
    } else {
       alert("Please fill all fields before adding a new row!");
    }
 };
// add  thes useEffect 
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


  return (
  <>
    { props.oiqr.DocStatus !== "V"   && (
    <Button color="primary" variant="contained" type="reset" onClick={addige} style={{ marginLeft: "10px" }}>
    <AddIcon fontSize="small" />
   </Button>
    )}
    <TableContainer
      ref={props.state.Mode === "Créer" ? tableContainerRef : null}
      component={Paper}
      style={{ marginTop: '2%', maxHeight: props.state.Mode === "Créer" ? '265px' : '250px', overflowY: 'auto' }}
    >
      <Table border="1"  style={{ width: "100%", tableLayout: "fixed" }}>
      
        <TableHead style={{  backgroundColor: "lightgrey",  position: 'sticky', top: 0, zIndex: 1 }}>
          <TableRow>
            <TableCellK>ID</TableCellK>
            <TableCellK>Code Article</TableCellK>
            <TableCellK>Nom Article</TableCellK>
            <TableCellK>Quantité en magasin</TableCellK>
            <TableCellK>Quantité comptée</TableCellK> 
            <TableCellK>Ecart</TableCellK>
            <TableCellK>Unite de Mesure</TableCellK>
            <TableCellK>Prix</TableCellK>
            <TableCellK>Total</TableCellK>
            <TableCellK>Total comptée</TableCellK>
            { props.oiqr.DocStatus !== "V"   && (
            <TableCellK>Action</TableCellK>
            )}
          </TableRow>
        </TableHead>
        
        <TableBody>
          {props.iqr1.map((iqr, index) => (
            <TableRow key={index} onClick={(e) => handleEdit(index, e.target.dataset.field || e.currentTarget.dataset.field)}  style={{cursor: 'pointer'  ,borderBottom:'2px solid gray', borderTop:'2px solid gray'}}>
              <StyledTableCell >{index + 1}</StyledTableCell>
              { iqr.isEditing ? (
                <>
              <StyledTableCell style={{display:"none"}}>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px", display:"none"}}
                  type="Number"
                  name="DocEntry"
                  InputProps={{ style: { borderRadius: '0px', },     pattern: '[0-9]*[.,]?[0-9]*',readOnly: true  }}
                  value={iqr.DocEntry || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  
                />
              </StyledTableCell>
              <StyledTableCell style={{display:"none"}}>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px", display:"none" }}
                  type="text"
                  name="LineNum"
                  InputProps={{ style: { borderRadius: '0px', },     pattern: '[0-9]*[.,]?[0-9]*', readOnly: true  }}
                  value={iqr.LineNum || ''}
                  onChange={(e) => handleInputChange(index, e)}
                  
                />
              </StyledTableCell>
              <StyledTableCell>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    style={{ width: "100%", height: "53px" }}
                    name="ItemCode"
                    value={iqr.ItemCode || ''}
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
                      onClick={() =>  props.handleOpenModal('ItemCode', index)}
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
                  value={iqr.ItemName || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`ItemName-${index}`] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                  disabled={!iqr.ItemCode}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="OnHandBef"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={iqr.OnHandBef || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`OnHandBef-${index}`] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                  onBlur={() => handleCalculations(index)}
                  disabled={!iqr.ItemCode}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="CountQuantité"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={iqr.CountQuantité || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`CountQuantité-${index}`] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                  onBlur={() => handleCalculations(index)}
                  disabled={!iqr.ItemCode}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="Quantity"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={iqr.Quantity || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`Quantity-${index}`] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                  onBlur={() => handleCalculations(index)}
                  disabled={!iqr.ItemCode}
                />
              </StyledTableCell>
              <StyledTableCell>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    style={{ width: "100%", height: "53px" }}
                    name="UM"
                    value={iqr.UM || ''}
                    data-index={index}
                    inputRef={(el) => (inputRefs.current[`UM-${index}`] = el)}
                    onChange={(e) => handleInputChange(index, e)}
                    InputProps={ {style: {borderRadius: '0px', paddingRight: "15px" }}}
                    disabled={!iqr.ItemCode}
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
                      onClick={() =>  props.handleOpenModal('UM', index)}
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
                  type="text"
                  name="Price"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={iqr.Price || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`Price-${index}`] = el)}
                  onChange={(e) => props.handleManualPriceChange(index, e.target.value)}  
                  onBlur={() => {  handleCalculations(index);  }}  
                  disabled={!iqr.ItemCode}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="LineTotal"
                  InputProps={{ style: { borderRadius: '0px', },readOnly: true,     inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={iqr.LineTotal || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`LineTotal-${index}`] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                  disabled={!iqr.ItemCode}
                />
              </StyledTableCell>
              <StyledTableCell>
                <TextField
                  fullWidth
                  style={{ width: "100%", height: "53px" }}
                  type="text"
                  name="TotalCompte"
                  InputProps={{ style: { borderRadius: '0px', },    inputMode: 'decimal', pattern: '[0-9]*[.,]?[0-9]*', }}
                  value={iqr.TotalCompte || ''}
                  data-index={index}
                  inputRef={(el) => (inputRefs.current[`TotalCompte-${index}`] = el)}
                  onChange={(e) => handleInputChange(index, e)}
                  disabled={!iqr.ItemCode}
                />
              </StyledTableCell>
              { props.oiqr.DocStatus !== "V"  &&   (

              <StyledTableCell>

                <IconButton
                  sx={{
                    fontSize: 10,
                    '&:hover': { backgroundColor: 'transparent' }
                  }}
                  style={{ marginLeft: '10px', }}
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </StyledTableCell>
              )}

              </>


            ) : (
                <>

                  <StyledTableCell name="ItemCode" data-field="ItemCode">{iqr.ItemCode}</StyledTableCell>
                  <StyledTableCell name="ItemName" data-field="ItemName">{iqr.ItemName}</StyledTableCell>
                  <StyledTableCell name="OnHandBef" data-field="OnHandBef">{iqr.OnHandBef}</StyledTableCell>
                  <StyledTableCell name="CountQuantité" data-field="CountQuantité">{iqr.CountQuantité}</StyledTableCell>
                  <StyledTableCell name="Quantity" data-field="Quantity">{iqr.Quantity}</StyledTableCell>
                  <StyledTableCell name="UM" data-field="UM">{iqr.UM}</StyledTableCell>
                  <StyledTableCell name="Price" data-field="Price">{iqr.Price}</StyledTableCell>
                  <StyledTableCell name="LineTotal" data-field="LineTotal">{iqr.LineTotal}</StyledTableCell>
                  <StyledTableCell name="TotalCompte" data-field="TotalCompte">{iqr.TotalCompte}</StyledTableCell>
                  
                  { props.oiqr.DocStatus !== "V"   && (
                  <StyledTableCell>
                    <IconButton sx={{fontSize: 10, '&:hover': { backgroundColor: 'transparent' } }} style={{ marginLeft: '10px', }} onClick={() => handleDelete(index)}>
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
        <TableFooter style={{ position: 'sticky', bottom: 0, backgroundColor: 'lightgrey', zIndex: 1 }}>
            <TableRow>
              <StyledTableCell colSpan={3}></StyledTableCell>
              <StyledTableCell>{getSum('OnHandBef')}</StyledTableCell>
              <StyledTableCell>{getSum('CountQuantité')}</StyledTableCell>
              <StyledTableCell>{getSum('Quantity')}</StyledTableCell>
              <StyledTableCell colSpan={4}></StyledTableCell>
              {props.oiqr.DocStatus !== "V"  && (
                <StyledTableCell></StyledTableCell>
              )}
            </TableRow>
          </TableFooter>
        
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
              Liste : {props.selectedField.name === "ItemCode" ? "Articles" : props.selectedField.name === "WhsCode" ? "Magasin": props.selectedField.name === "CardCode" ? "fournisseur" : "Unite de Mesure" }
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
              {props.paginatedData.map((item, index) => (
                    <TableRow key={index} onClick={(e) => { if (e.target.type !== 'checkbox') { props.handleSelectItem(item);}}} style={{ cursor: 'pointer' }}>
                      <TableCell style={{ textAlign: "center", marginLeft: '25px' }}>
                      {props.selectedField.name === "ItemCode" ? (
                        <FormControlLabel 
                        control={
                          <Checkbox
                          checked={props.selectedItem.some(selected => selected.number === item.number)} 
                          onChange={() => props.handleSelectItem(item)} 
                          disabled={props.selectedField.name === "ItemCode" && 
                          props.iqr1[props.selectedField.index] && 
                          props.iqr1[props.selectedField.index].ItemCode && 
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
            count={props.filterData(props.content).length}
            page={props.page}
            onPageChange={props.handleChangePage}
            rowsPerPage={props.rowsPerPage} 
            onRowsPerPageChange={props.handleChangeRowsPerPage}
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
});


export default InventoryCountingTable;
