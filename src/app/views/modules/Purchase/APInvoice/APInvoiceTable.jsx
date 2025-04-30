import React, {useEffect, useRef ,useState ,useCallback} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  FormControl,
  TablePagination,
  TableHead,
  TableRow,
  Select,
  Paper,
  IconButton,
  TextField,
  Modal,
  Box,
  Typography,
  Button,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Radio,
} from "@mui/material"; // Importing necessary Material UI components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome for icons
import {
  faBars,
  faTrash,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"; // Import specific icons
import { styled } from "@mui/system"; // Importing styled for custom styling
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem for dropdowns
import AddIcon from "@mui/icons-material/Add";


// Styled component for custom TableCell styling
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

// Modal style configuration (positioning and size)
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

// CSS to hide spinners in number inputs
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

// APInvoiceTable component
const APInvoiceTable =React.memo((props) => {
// add  thes varibel  
const [refresh, setRefresh] = useState(false);
const [focusField, setFocusField] = useState({ index: null, fieldName: null });
const inputRefs = useRef({});
const [tempValue, setTempValue] = useState("");
const tableContainerRef = useRef(null);


  // Reference for the table container
  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop =
        tableContainerRef.current.scrollHeight;
    }
  }, [props.APIn.length]);

  // Handle input changes for different fields and calculations for line totals, discount, VAT, etc.
 
  const handleCalculations = (lineNum) => {
    props.setAPIn(prevDln1 => {
     
      const index = prevDln1.findIndex(row => row.LineNum === lineNum);
     
      if (index === -1) return prevDln1;
  
      const updatedRow = { ...prevDln1[index] };
  
     
      if (!updatedRow.isManual) {
        console.log("handleCalculations - isManual is false, skipping calculations");
        return prevDln1;
      }
  
   
      const PriceHT = parseFloat(updatedRow.PriceHT) || 0;
      const Discount = parseFloat(updatedRow.Discount) || 0;
      const VAT = parseFloat(updatedRow.VAT) || 0;
      const Quantity = parseFloat(updatedRow.Quantity) || 1;
  
      const PrixAR = PriceHT - ((Discount * PriceHT) / 100);
      const Price = PrixAR + ((VAT * PrixAR) / 100);
      const TotalHT = PrixAR * Quantity;
      const LineTotal = Price * Quantity;
      const RemiseTotal = (TotalHT * Discount) / 100;
  
      updatedRow.Price = Price.toFixed(2);
      updatedRow.LineHT = TotalHT.toFixed(2);
      updatedRow.LineTotal = LineTotal.toFixed(2);
      updatedRow.RemiseTotal = RemiseTotal.toFixed(2);
  
      console.log("handleCalculations - updated row:", prevDln1);
      prevDln1[index] = updatedRow;
      props.handleCalculations2();
  
     
      return prevDln1;
    });
   
    };
  const handleInputChange = useCallback((lineNum, event) => {
    const { name, value } = event.target;
    props.setAPIn(prevRdp => {
      const index = prevRdp.findIndex(row => row.LineNum === lineNum);
     
      if (index === -1) return prevRdp;
      prevRdp[index][name] = value;
      prevRdp[index].isManual = true;
      return prevRdp;
    });
    console.log("handleInputChange :", props.Dln1);
  }, [props.setAPIn]);

  // add  thes function
  const handleFocus = (value) => {
    setTempValue(value);  
    console.log("value" , tempValue);
    setRefresh(prev => !prev);
  };
  // add  thes function
  const handleBlur = (index, e) => {
    const { name, value } = e.target;
     if (value !== tempValue  ) {
       handleInputChange(index, e);
       
         handleCalculations(index);
       
     }
  };

  // Update line numbers for all entries in APIn
  useEffect(() => {
    props.setAPIn((prevIge12) =>
      prevIge12.map((item, i) => ({
        ...item,
        LineNum: i + 1, // Set the line number incrementally
      }))
    );
  }, [props.setAPIn]);

  // Function to add a new row to the table if all fields are filled
  const POR1D = () => {
    if (props.allFieldsFilled()) {
      props.fetchNextDocEntry(); // Fetch the next document entry
      props.setAPIn([
        ...props.APIn,
        {
          DocEntry: "",
          LineNum: props.APIn.length + 1, // Set the line number for the new entry
          ItemCode: "",
          ItemName: "",
          Quantity: 1,
          WhsCode: "",
          PriceHT: "",
          VAT: "",
          Price: "",
          Discount: "",
          RemiseTotal:"",
          LineTotal: "",
          UM: "",
          isEditing: true, //add colone
        },
      ]);
    } else {
      alert("Please fill all fields before adding a new row!."); // Show alert if fields are not filled
    }
  };

  // Delete the selected row from the table
  const handleDelete = (index) => {
    if (props.APIn.length <= 1) {
      props.setState({ ...props.state, open: true, message: "Il doit rester au moins une ligne ", severity: "warning" });
      return;  
    }
    const updatedDLN1 = [...props.APIn]; // Clone the data
    updatedDLN1.splice(index, 1); // Remove the selected row
    props.setAPIn(updatedDLN1); // Update the state
    console.log("Data to delete:", updatedDLN1);
  };

  // add  this function
  const handleEdit = (index, fieldName) => {
    console.log("index:", index);
    console.log("fieldName:", fieldName);
    if (props.APIn[index].isEditing || props.state.Mode !== "Créer") {
       return;
    }

    if (props.allFieldsFilled()) {
       const updatedRows = props.APIn.map((row, rowIndex) => ({
          ...row,
          isEditing: rowIndex === index,
       }));
       props.setAPIn(updatedRows);
       setFocusField({ index, fieldName });
       console.log("setFocusField:", focusField);
    } else {
       alert("Please fill all fields before adding a new row!");
    }
 };
  // add  this useEffect
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
      <style>{styles}</style> {/* Add the custom styles */}
      {props.state.Mode !== "Mettre à jour" && props.state.Mode !== "OK" && (
        <Button onClick={POR1D} variant="contained">
          <AddIcon fontSize="small" /> {/* Add icon for the button */}
        </Button>
      )}
      <TableContainer
        ref={props.state.Mode === "Créer" ? tableContainerRef : null} // Reference to the container if in "Créer" mode
        component={Paper}
        style={{
          marginTop: "2%",
          maxHeight: props.state.Mode === "Créer" ? "265px" : "250px", // Adjust height based on the mode
          overflowY: "auto", // Scrollable container
        }}
      >
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
            {props.APIn.map((dln, index) => (
              // <TableRow key={index} onClick={(e) => handleEdit(index, e.target.dataset.field || e.currentTarget.dataset.field)} style={{ cursor: 'pointer' }}>
              <TableRow key={index}            
              onClick={(e) => {
              // Check if the clicked field is not "Action"
               const field = e.target.dataset.field || e.currentTarget.dataset.field;
                if (field !== "Action") {
                  handleEdit(index, field);
                }
              }} style={{ cursor: 'pointer' }}>  
                <StyledTableCell
                  style={{ textAlign: "center", marginLeft: "25px" }}
                >
                  {index + 1} {/* Row number */}
                </StyledTableCell>
                {dln.isEditing ? (
                  <>
                    {/* Editable fields when the row is being edited */}
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
                          value={dln.ItemCode}
                          data-index={index}
                          inputRef={(el) => (inputRefs.current[`ItemCode-${index}`] = el)}
                          onChange={(e) => handleInputChange(index, e)}
                          InputProps={{
                            style: {
                              borderRadius: "0px",
                              paddingRight: "15px",
                            },
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faBars}
                          onClick={() =>
                            props.handleOpenModal("ItemCode", index)
                          }
                          style={{
                            position: "absolute",
                            right: "10px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
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
                          name="ItemName"
                          value={dln.ItemName}
                          data-index={index}
                          inputRef={(el) => (inputRefs.current[`ItemName-${index}`] = el)}
                          onChange={(e) => handleInputChange(index, e)}
                          disabled={!dln.ItemCode}
                          InputProps={{ style: { borderRadius: "0px" } }}
                        />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                      fullWidth
                      style={{ width: "100%", height: "53px" }}
                      type="number"
                      name="Quantity"
                      defaultValue={dln.Quantity}
                      key={`Quantity-${dln.LineNum}-${dln.Quantity}`}
                      inputRef={(el) => (inputRefs.current[`Quantity-${index}`] = el)}
                      data-index={index}
                      onFocus={(e) => handleFocus(e.target.value)}
                      onBlur={(e) => handleBlur(dln.LineNum, e)} 
                      disabled={!dln.ItemCode}
                      InputProps={{
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
                          value={dln.WhsCode}
                          inputRef={(el) => (inputRefs.current[`WhsCode-${index}`] = el)}
                          data-index={index}
                          onChange={(e) => handleInputChange(index, e)}
                          disabled={!dln.ItemCode}
                          InputProps={{
                            style: {
                              borderRadius: "0px",
                              paddingRight: "15px",
                            },
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faBars}
                          onClick={() =>
                            props.handleOpenModal("WhsCode", index)
                          }
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
                        name="PriceHT"
                        data-index={index}
                        inputRef={(el) => (inputRefs.current[`PriceHT-${index}`] = el)}
                        defaultValue={dln.PriceHT}
                        key={`PriceHT-${dln.LineNum}-${dln.PriceHT}`}
                        onFocus={(e) => handleFocus(e.target.value)}
                        onBlur={(e) => handleBlur(dln.LineNum, e)}
                        disabled={!dln.ItemCode}
                        InputProps={{
                          style: {
                            borderRadius: "0px",
                            appearance: "textfield",
                          },
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        fullWidth
                        style={{ width: "100%", height: "53px" }}
                        type="number"
                        name="Discount"
                        data-index={index}
                        inputRef={(el) => (inputRefs.current[`Discount-${index}`] = el)}
                        defaultValue={dln.Discount}
                        key={`Discount-${dln.LineNum}-${dln.Discount}`}
                        onFocus={(e) => handleFocus(e.target.value)}
                        onBlur={(e) => handleBlur(dln.LineNum, e)}
                        disabled={!dln.ItemCode}
                        InputProps={{
                          style: {
                            borderRadius: "0px",
                            appearance: "textfield",
                          },
                        }}
                      />
                    </StyledTableCell>

                    {/* TVA */}
                    <StyledTableCell>
                      <FormControl fullWidth>
                        <Select
                          labelId={`lblVAT-${index}`}
                          name="VAT"
                          data-index={index}
                        inputRef={(el) => (inputRefs.current[`VAT-${index}`] = el)}
                        defaultValue={dln.VAT || '0'}
                        key={`VAT-${dln.LineNum}-${dln.VAT}`}
                        onFocus={(e) => handleFocus(e.target.value)}
                        onBlur={(e) => handleBlur(dln.LineNum, e)}
                          disabled={!dln.ItemCode}
                          style={{
                            width: "100%",
                            borderRadius: "0px",
                            height: "53px",
                          }}
                          InputProps={{
                            style: {
                              appearance: "textfield",
                            },
                          }}
                        >
                          {props.vatOptions.map((option, key) => {
                            return (
                              <MenuItem
                                key={key}
                                value={option.Rate}
                              >{`${option.Code} - ${option.Name}%`}</MenuItem>
                            );
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
                        value={dln.Price}
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`Price-${index}`] = el)}
                      onChange={(e) =>{handleInputChange(index, e);} }
                        disabled={!dln.ItemCode}
                        InputProps={{
                          style: {
                            borderRadius: "0px",
                            appearance: "textfield",
                          },
                        }}
                      />
                    </StyledTableCell>
                    
                    <StyledTableCell>
                      <TextField
                        fullWidth
                        style={{ width: "100%", height: "53px" }}
                        type="number"
                        name="Total HT"
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`LineHT-${index}`] = el)}
                      value={dln.LineHT }
                        onChange={(e) =>{handleInputChange(index, e);} }
                        disabled={!dln.ItemCode}
                        InputProps={{
                          readOnly: true,
                          style: {
                            borderRadius: "0px",
                            appearance: "textfield",
                          },
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        fullWidth
                        style={{ width: "100%", height: "53px" }}
                        type="number"
                        name="LineTotal"
                      data-index={index}
                      inputRef={(el) => (inputRefs.current[`LineTotal-${index}`] = el)}
                      value={dln.LineTotal}
                        onChange={(e) => {handleInputChange(index, e);} }
                        disabled={!dln.ItemCode}
                        InputProps={{
                          readOnly: true,
                          style: {
                            borderRadius: "0px",
                            appearance: "textfield",
                          },
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
                        {/* UM */}
                        <TextField
                          fullWidth
                          style={{ width: "100%", height: "53px" }}
                          name="UM"
                          value={dln.UM}
                          data-index={index}
                          inputRef={(el) => (inputRefs.current[`UM-${index}`] = el)}
                          onChange={(e) => handleInputChange(index, e)}
                          disabled={!dln.ItemCode}
                          InputProps={{
                            style: {
                              borderRadius: "0px",
                              paddingRight: "15px",
                            },
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
                    {props.state.Mode !== "Mettre à jour" &&
                      props.state.Mode !== "OK" && (
                        // <StyledTableCell>
                        //   <IconButton
                        //     sx={{
                        //       fontSize: 10,
                        //       "&:hover": { backgroundColor: "transparent" },
                        //     }}
                        //     style={{ marginLeft: "10px" }}
                        //     onClick={() => handleDelete(index)}
                        //   >
                        //     <FontAwesomeIcon icon={faTrash} />
                        //   </IconButton>
                        // </StyledTableCell>
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
                    
                  <StyledTableCell name="ItemCode" data-field="ItemCode" style={{ textAlign: "center" }}>{dln.ItemCode}</StyledTableCell>
                  <StyledTableCell name="ItemName" data-field="ItemName" style={{ textAlign: "center" }}>{dln.ItemName}</StyledTableCell>
                  <StyledTableCell name="Quantity" data-field="Quantity" style={{ textAlign: "center" }}>{dln.Quantity}</StyledTableCell>
                  <StyledTableCell name="WhsCode" data-field="WhsCode" style={{ textAlign: "center" }}>{dln.WhsCode}</StyledTableCell>
                  <StyledTableCell data-field="PriceHT" style={{ textAlign: "center" }}>{dln.PriceHT}</StyledTableCell>
                  <StyledTableCell data-field="Discount" style={{ textAlign: "center" }}>{dln.Discount}</StyledTableCell>
                  <StyledTableCell data-field="VAT" style={{ textAlign: "center" }}>
                    {
                      props.vatOptions.find(option => option.Rate === dln.VAT)?.Name || dln.VAT
                    }
                  </StyledTableCell>
                  <StyledTableCell data-field="Price" style={{ textAlign: "center" }}>{dln.Price}</StyledTableCell>
                  <StyledTableCell data-field="LineHT" style={{ textAlign: "center" }}>{dln.LineHT}</StyledTableCell>
                  <StyledTableCell data-field="LineTotal" style={{ textAlign: "center" }}>{dln.LineTotal}</StyledTableCell>
                  <StyledTableCell data-field="UM" style={{ textAlign: "center" }}>{dln.UM}</StyledTableCell>
              
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
        {/* Modal for selecting items (articles, warehouses, etc.) */}
        <Modal
          open={props.open}
          onClose={props.handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* Modal content */}
          <Box sx={modalStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                Liste : {/* Show the appropriate label for the modal */}
                {props.selectedField.name === "ItemCode"
                  ? "Articles"
                  : props.selectedField.name === "WhsCode"
                  ? "Magasin"
                  : props.selectedField.name === "CardCode"
                  ? "fournisseur"
                  : "Unite de Mesure"}
              </Typography>
              <IconButton onClick={props.handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
                {/* Close button */}
              </IconButton>
            </div>
            <IconButton onClick={props.handleSearchIconClick}>
              <FontAwesomeIcon icon={faSearch} />
            </IconButton>
            {props.searchInputVisible && (
              <TextField
                placeholder="Search..."
                variant="outlined"
                size="small"
                style={{ marginBottom: "10px" }}
                onChange={(e) =>
                  props.setSearchQuery(e.target.value.toLowerCase())
                } // Update search query
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={props.handleSearchIconClick}>
                        <FontAwesomeIcon icon={faTimes} /> {/* Clear search */}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { borderRadius: "0px" },
                }}
              />
            )}
            {/* Modal table for selecting items */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>
                      Select
                    </TableCell>
                    {/* Dynamic labels based on the selected field */}
                    <TableCell>
                      {props.selectedField.name === "ItemCode"
                        ? "N° article"
                        : props.selectedField.name === "WhsCode"
                        ? "N° magasin"
                        : props.selectedField.name === "CardCode"
                        ? "N° fournisseur"
                        : "N° unite"}
                    </TableCell>
                    <TableCell>
                      {props.selectedField.name === "ItemCode"
                        ? "Description article"
                        : props.selectedField.name === "WhsCode"
                        ? "Description magasin"
                        : props.selectedField.name === "CardCode"
                        ? "Description fournisseur"
                        : "Description unite"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.paginatedData.map((item, index) => (
                    <TableRow
                      key={index}
                      onClick={(e) => {
                        if (e.target.type !== "checkbox") {
                          props.handleSelectItem(item);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell
                        style={{ textAlign: "center", marginLeft: "25px" }}
                      >
                        {props.selectedField.name === "ItemCode" ? (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={props.selectedItem.some(
                                  (selected) => selected.number === item.number
                                )}
                                onChange={() => props.handleSelectItem(item)}
                                disabled={
                                  props.selectedField.name === "ItemCode" &&
                                  props.APIn[props.selectedField.index] && // UPDATE
                                  props.APIn[props.selectedField.index]
                                    .ItemCode &&
                                  props.selectedItem.length > 0
                                }
                              />
                            }
                          />
                        ) : (
                          <Radio
                            checked={
                              props.selectedItem.length > 0 &&
                              props.selectedItem[0].number === item.number
                            }
                            onChange={() => props.setSelectedItem([item])}
                            value={item.number || ""}
                            name="radio-buttons"
                            inputProps={{ "aria-label": item.number }}
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
              {/* Pagination for the modal */}
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
            <Button
              color="primary"
              variant="contained"
              onClick={props.handleSaveSelectedItem}
              style={{ marginTop: "10px" }}
            >
              sélectionner {/* Button to select the item */}
            </Button>
          </Box>
        </Modal>
      </TableContainer>
    </Box>
  );
}
);

export default APInvoiceTable;
