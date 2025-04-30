import React ,{useEffect, useRef ,useState ,useCallback} from "react";
import {Table, TableBody, TableCell, TableContainer,FormControl ,TablePagination, TableHead, TableRow, Select ,Radio, Paper,  IconButton, TextField, Modal, Box, Typography, Button,  InputAdornment ,  FormControlLabel, Checkbox} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBars,  faTrash,  faSave,  faTimes,  faSearch,} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import _ from "lodash";


// Styled components for TableCell
const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: "none",
  padding: 0,
  width: "80px",
  height: "40px",
  textAlign: "center",
}));

const TableCellKVAT = styled(TableCell)(() => ({
  textAlign: "center",
  width: "120px",
  height: "40px",
  borderBottom: "none",
}));
const TableCellK = styled(TableCell)(() => ({
  textAlign: "center",
  width: "80px",
  height: "40px",
  borderBottom: "none",
}));


// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// CSS to hide the spinners in number inputs
const styles = `
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const ARInvoiceTable = React.memo((props) => {
// add  thes varibel  
  const [refresh, setRefresh] = useState(false);
  const [focusField, setFocusField] = useState({ index: null, fieldName: null });
  const inputRefs = useRef({});
  const [tempValue, setTempValue] = useState("");
  const tableContainerRef = useRef(null);


//edit this function
  const handleCalculations = (lineNum) => {
  props.setInv1(prevInv1 => {
    
    const index = prevInv1.findIndex(row => row.LineNum === lineNum);
    
    if (index === -1) return prevInv1;

    const updatedRow = { ...prevInv1[index] };

    
    if (!updatedRow.isManual) {
      console.log("handleCalculations - isManual is false, skipping calculations");
      return prevInv1;
    }

  
    const PrixHT = parseFloat(updatedRow.PrixHT) || 0;
    const Discount = parseFloat(updatedRow.Discount) || 0;
    const VAT = parseFloat(updatedRow.VAT) || 0;
    const Quantity = parseFloat(updatedRow.Quantity) || 1;

    const PrixAR = PrixHT - ((Discount * PrixHT) / 100);
    const Price = PrixAR + ((VAT * PrixAR) / 100);
    const TotalHT = PrixAR * Quantity;
    const LineTotal = Price * Quantity;
    const RemiseTotal = (TotalHT * Discount) / 100;

    updatedRow.Price = Price.toFixed(2);
    updatedRow.LineHT = TotalHT.toFixed(2);
    updatedRow.LineTotal = LineTotal.toFixed(2);
    updatedRow.RemiseTotal = RemiseTotal.toFixed(2);

    console.log("handleCalculations - updated row:", prevInv1);
    prevInv1[index] = updatedRow;
    props.handleCalculations2();

    
    return prevInv1;
  });
  
  };
  

//edit this function
  const handleInputChange = useCallback((lineNum, event) => {
    const { name, value } = event.target;
    props.setInv1(prevRdp => {
      const index = prevRdp.findIndex(row => row.LineNum === lineNum);
      
      if (index === -1) return prevRdp; 
      prevRdp[index][name] = value;
      prevRdp[index].isManual = true;
      return prevRdp;
    });
    console.log("handleInputChange :", props.Inv1);
  }, [props.setInv1]);
// add  thes function 
  const handleFocus = (value) => {
    setTempValue(value);  
    console.log("value" , tempValue);
    setRefresh(prev => !prev);
  };
// add  thes function 

  const handleBlur = (index, e) => {
    if (!e || !e.target) {
      console.log("handleBlur called without an event object for index:", index);
      return;
    }
    
    const { name, value } = e.target;
    console.log("handleBlur:", { index, name, value, tempValue });
    
    if (value !== tempValue) {
      handleInputChange(index, e);
      handleCalculations(index);
    }
  };
  
  const AddRow = () => {
    if (props.allFieldsFilled()) {
      props.fetchNextDocEntry()
      props.setInv1([
        ...props.Inv1,
        {
          DocEntry: "",
          LineNum:props.Inv1.length + 1,
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
    }else {
      props.setState({ ...props.state, open: true, message: "Please choose Code Article before adding a new row.", severity: "error" });
  }
  };
  // Delete the selected row
  const handleDelete = (index) => {
    if (props.Inv1.length <= 1) {
      props.setState({ ...props.state, open: true, message: "Il doit rester au moins une ligne ", severity: "warning" });
      return;  
    }
    const updatedPOR1 = [...props.Inv1];
    updatedPOR1.splice(index, 1);
    props.setInv1(updatedPOR1);
    console.log("Data to delete:", updatedPOR1);
  };
  // Toggle search input visibility
  useEffect(() => {
    props.setInv1((prevIge12) =>
      prevIge12.map((item, i) => ({
        ...item,
        LineNum: i + 1,
      }))
    );
  }, [props.setInv1]);

  

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [props.Inv1.length]);
// add  thes function 
  const handleEdit = (index, fieldName) => {
    console.log("index:", index);
    console.log("fieldName:", fieldName);
    if (props.Inv1[index].isEditing || props.state.Mode !== "Créer") {
       return;
    }

    if (props.allFieldsFilled()) {
       const updatedRows = props.Inv1.map((row, rowIndex) => ({
          ...row,
          isEditing: rowIndex === index,
       }));
       props.setInv1(updatedRows);
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
    <Box>
      <style>{styles}</style>
      {props.state.Mode !== "Mettre à jour" &&  props.state.Mode !== "OK" &&(
      <Button onClick={AddRow} variant="contained">
        <AddIcon fontSize="small" />
      </Button>
      )}
    <TableContainer ref={props.state.Mode === "Créer" ? tableContainerRef : null} component={Paper} style={{ marginTop: '2%', maxHeight: props.state.Mode === "Créer" ? '265px' : '250px', overflowY: 'auto' }}>
      <Table border="1" style={{ width: "100%", tableLayout: "fixed" }}>
        <TableHead  style={{ backgroundColor: "lightgrey", position: 'sticky', top: 0, zIndex: 1 ,height: "20px"}}>
          <TableRow>
            <TableCellK>ID</TableCellK>
            <TableCellK>Code Article</TableCellK>
            <TableCellK>Nom Article</TableCellK>
            <TableCellK>Quantité</TableCellK>
            <TableCellK>Magasin</TableCellK>
            <TableCellK>Prix HT</TableCellK>
               <TableCellK>Remise %</TableCellK>
                <TableCellK>TVA %</TableCellK>
               <TableCellK>Prix- TTC</TableCellK>  
               <TableCellK>Total HT</TableCellK>
               <TableCellK>Total</TableCellK>
            <TableCellK>Unite de Mesure</TableCellK>
            {props.state.Mode !== "Mettre à jour" &&  props.state.Mode !== "OK" &&(
            <TableCellK>Action</TableCellK>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.Inv1.map((pdn, index) => (
            // edet this 
            <TableRow key={index}             
            onClick={(e) => {
              // Check if the clicked field is not "Action"
              const field = e.target.dataset.field || e.currentTarget.dataset.field;
              if (field !== "Action") {
                handleEdit(index, field);
              }
            }}style={{ cursor: 'pointer' }}>  
              <StyledTableCell style={{ textAlign: "center", marginLeft: "25px" }}>
                {index + 1}
              </StyledTableCell>
              {pdn.isEditing  ? (
                <>
                  <StyledTableCell>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        fullWidth
                        style={{ width: "100%", height: "53px" }}
                        name="ItemCode"
                        value={pdn.ItemCode}
                        // edet this [
                        data-index={index}
                        inputRef={(el) => (inputRefs.current[`ItemCode-${index}`] = el)}
                        //]
                        onChange={(e) => handleInputChange(index, e)}
                        InputProps={{
                          style: { borderRadius: "0px", paddingRight: "15px" },
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => props.handleOpenModal("ItemCode", index)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      name="ItemName"
                      value={pdn.ItemName}
                      // edet this [
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`ItemName-${index}`] = el)}
                      // ]
                      onChange={(e) => handleInputChange(index, e)}
                      disabled={!pdn.ItemCode}
                      InputProps={{ style: { borderRadius: "0px" }, }}
                    />
                  </StyledTableCell>

                  
                  {/* <StyledTableCell>
                    <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      type="number"
                      name="Quantity" 
                      // edet this [
                      defaultValue={pdn.Quantity}
                      key={`Quantity-${pdn.LineNum}-${pdn.Quantity}`}
                      inputRef={(el) => (inputRefs.current[`Quantity-${index}`] = el)}
                      data-index={index}
                      onFocus={(e) => handleFocus(e.target.value)} 
                      onBlur={(e) => handleBlur(pdn.LineNum, e)}  
                      // ]
                      disabled={!pdn.ItemCode}
                      InputProps={{
                        style: { borderRadius: "0px", appearance: "textfield" },
                      }}
                    />
                  </StyledTableCell> */}


                  <StyledTableCell>
                  <TextField
                    fullWidth
                    style={{ width: "100%", height: "53px" }}
                    type="number"
                    name="Quantity"
                    // value={pdn.Quantity}  // Changed from defaultValue to value
                    inputRef={(el) => (inputRefs.current[`Quantity-${index}`] = el)}
                    data-index={index}
                    onFocus={(e) => handleFocus(e.target.value)}
                    onBlur={(e) => handleBlur(pdn.LineNum, e)}
                    disabled={!pdn.ItemCode}
                    inputProps={{
                    style: { borderRadius: "0px", appearance: "textfield" },
                    }}
                    />
                    </StyledTableCell>



                  <StyledTableCell>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        fullWidth
                        style={{ width: "100%", height: "53px" }}
                        name="WhsCode"
                        value={pdn.WhsCode}
                        // edet this [
                        inputRef={(el) => (inputRefs.current[`WhsCode-${index}`] = el)}
                        data-index={index}
                        //]
                        onChange={(e) => handleInputChange(index, e)}
                        disabled={!pdn.ItemCode}
                        InputProps={{
                          style: { borderRadius: "0px", paddingRight: "15px" },
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => props.handleOpenModal("WhsCode", index)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      type="number"
                      name="PrixHT"
                      // edet this [
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`PrixHT-${index}`] = el)}
                      defaultValue={pdn.PrixHT}
                      key={`PrixHT-${pdn.LineNum}-${pdn.PrixHT}`}
                      onFocus={(e) => handleFocus(e.target.value)} 
                      onBlur={(e) => handleBlur(pdn.LineNum, e)}
                      //]
                      disabled={!pdn.ItemCode}
                      InputProps={{
                        style: { borderRadius: "0px", appearance: "textfield" },
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      type="number"
                      name="Discount"
                      // edet this [
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`Discount-${index}`] = el)}
                      defaultValue={pdn.Discount}
                      key={`Discount-${pdn.LineNum}-${pdn.Discount}`}
                      onFocus={(e) => handleFocus(e.target.value)} 
                      onBlur={(e) => handleBlur(pdn.LineNum, e)}
                      //]
                      disabled={!pdn.ItemCode}
                      InputProps={{
                       
                        style: { borderRadius: "0px", appearance: "textfield" },
                     
                      }}
                    />
                  </StyledTableCell>
                  
                  <StyledTableCell>
                    <FormControl fullWidth>
                      <Select
                        labelId={`lblVAT-${index}`}
                        name="VAT"
                        data-index={index}
                        // edet this [
                        inputRef={(el) => (inputRefs.current[`VAT-${index}`] = el)}
                        defaultValue={pdn.VAT || '0'}
                        key={`VAT-${pdn.LineNum}-${pdn.VAT}`}
                        onFocus={(e) => handleFocus(e.target.value)} 
                        onBlur={(e) => handleBlur(pdn.LineNum, e)} 
                        //]
                        disabled={!pdn.ItemCode}
                        style={{ width: "100%",borderRadius: "0px",  height: "53px" }}
                        inputProps={{ style: {  appearance: "textfield" } }}
                      >
                        {props.vatOptions.map((option , key) => {
                          return <MenuItem key={key} value={option.Rate}>{`${option.Code} - ${option.Name}%`}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      type="number"
                      name="Price"
                      value={pdn.Price}
                      // edet this [
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`Price-${index}`] = el)}
                      onChange={(e) =>{handleInputChange(index, e);} } 
                      //]
                      disabled={!pdn.ItemCode}
                      InputProps={{
                        style: { borderRadius: "0px", appearance: "textfield" },
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      type="number"
                      name="LineHT "
                      // edet this [
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`LineHT-${index}`] = el)}
                      //]
                      value={pdn.LineHT }
                      onChange={(e) =>{handleInputChange(index, e);} } 
                      disabled={!pdn.ItemCode}
                      InputProps={{
                        style: { borderRadius: "0px", appearance: "textfield" },
                         readOnly: true
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      type="number"
                      name="LineTotal"
                      // edet this [
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`LineTotal-${index}`] = el)}
                      //]
                      value={pdn.LineTotal}
                      onChange={(e) =>{handleInputChange(index, e);} }
                      disabled={!pdn.ItemCode}
                      InputProps={{
                        style: { borderRadius: "0px", appearance: "textfield" },
                         readOnly: true
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                       {/* UM NEW  */}
                      <TextField
                        fullWidth
                        style={{ width: "100%", height: "53px" }}
                        name="UM"
                        value={pdn.UM}
                        // edet this [
                        data-index={index}
                        inputRef={(el) => (inputRefs.current[`UM-${index}`] = el)}
                        onChange={(e) => handleInputChange(index, e)}
                        //]
                        disabled={!pdn.ItemCode}
                        InputProps={{
                          style: { borderRadius: "0px", paddingRight: "15px" },
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => props.handleOpenModal("UM", index)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </StyledTableCell>
                  {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" &&(
                  <StyledTableCell data-field="Action">
                  <IconButton
                    sx={{
                      fontSize: 10,
                      '&:hover': { backgroundColor: 'transparent' }
                    }}
                    style={{ marginLeft: '10px' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the onClick on the row
                      handleDelete(index);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </StyledTableCell>
                  )}
                </>
              ) : (
                <> 
                 
                 {/* edet this [ */}
                  <StyledTableCell name="ItemCode" data-field="ItemCode" style={{ textAlign: "center" }}>{pdn.ItemCode}</StyledTableCell>
                  <StyledTableCell name="ItemName" data-field="ItemName" style={{ textAlign: "center" }}>{pdn.ItemName}</StyledTableCell>
                  <StyledTableCell name="Quantity" data-field="Quantity" style={{ textAlign: "center" }}>{pdn.Quantity}</StyledTableCell>
                  <StyledTableCell name="WhsCode" data-field="WhsCode" style={{ textAlign: "center" }}>{pdn.WhsCode}</StyledTableCell>
                  <StyledTableCell data-field="PrixHT" style={{ textAlign: "center" }}>{pdn.PrixHT}</StyledTableCell>
                  <StyledTableCell data-field="Discount" style={{ textAlign: "center" }}>{pdn.Discount}</StyledTableCell>
                  <StyledTableCell data-field="VAT" style={{ textAlign: "center" }}>
                    {
                      props.vatOptions.find(option => option.Rate === pdn.VAT)?.Name || pdn.VAT
                    }
                  </StyledTableCell>
                  <StyledTableCell data-field="Price" style={{ textAlign: "center" }}>{pdn.Price}</StyledTableCell>
                  <StyledTableCell data-field="LineHT" style={{ textAlign: "center" }}>{pdn.LineHT}</StyledTableCell>
                  <StyledTableCell data-field="LineTotal" style={{ textAlign: "center" }}>{pdn.LineTotal}</StyledTableCell>
                  <StyledTableCell data-field="UM" style={{ textAlign: "center" }}>{pdn.UM}</StyledTableCell>
                  {/* ] */}
                  {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" &&(
                  <StyledTableCell data-field="Action">
                  <IconButton
                    sx={{
                      fontSize: 10,
                      '&:hover': { backgroundColor: 'transparent' }
                    }}
                    style={{ marginLeft: '10px' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the onClick on the row
                      handleDelete(index);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </StyledTableCell>
                  )}
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={props.open}
        onClose={props.handleCloseModal}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2" >
              Liste : {props.selectedField.name === "ItemCode" ? "Articles" : props.selectedField.name === "WhsCode" ? "Magasin": props.selectedField.name === "CardCode" ? "Client" : "Unite de Mesure" }
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
                    <TableCell>{props.selectedField.name === "ItemCode" ? "N° article" : props.selectedField.name === "WhsCode" ? "N° magasin": props.selectedField.name === "CardCode" ? "N° Client" : "N° unite"}</TableCell>
                    <TableCell>{props.selectedField.name === "ItemCode" ? "Description article" : props.selectedField.name === "WhsCode" ? "Description magasin": props.selectedField.name === "CardCode" ? "Description Client"  : "Description unite"}</TableCell>
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
                          props.Inv1[props.selectedField.index] && 
                          props.Inv1[props.selectedField.index].ItemCode && 
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
    </Box>
  );
});

export default  ARInvoiceTable;