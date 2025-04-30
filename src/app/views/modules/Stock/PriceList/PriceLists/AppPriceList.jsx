import { Stack, Snackbar, Alert, TextField ,MenuItem ,FormControlLabel ,Checkbox} from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Menubar } from 'primereact/menubar';
import { useMemo, useState, useEffect } from 'react';
import PriceListForm from "./PriceListForm";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import { IconButton, Button } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import AddRowModal from './AddRowModal';
import AddIcon from '@mui/icons-material/Add';

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': { marginBottom: '30px', [theme.breakpoints.down('sm')]: { marginBottom: '16px' }, },
}));

const AppForm = () => {
  const [PriceList, setPriceList] = useState({ id: null });
  const [data, setData] = useState([{}]);
  const [DataPrice, setDataPrice] = useState([{}]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [showItem, setShowItem] = useState(false);  
  const [editedRows, setEditedRows] = useState({});
  const [PriceListid, setPriceListid] = useState();
  const [state, setState] = useState({
    Mode: 'Créer',
    message: 'Error',
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: 'error',
    CodeReadOnly: false,
  });

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });
  const { vertical, horizontal, open, message, severity } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRow = async (newRow) => {
    try {
      const res = await axiosInstance.post('PriceList/', newRow);
      setData((prevData) => [...prevData, res.data]); 
      setState({
        ...state,
        open: true,
        message: 'Added successfully',
        severity: 'success',
      });
    } catch (error) {
      handelError(error);
     } 
   // finally {
    //   handleCloseModal();
    // }
  };

  const handelError = (error) => {
    if (error.response) {
      setState({
        Mode: 'Créer',
        vertical: 'top',
        horizontal: 'center',
        open: true,
        message: error.response.data.message,
        severity: 'error',
        CodeReadOnly: false,
      });
    } else if (error.request) {
      setState({
        Mode: 'Créer',
        vertical: 'top',
        horizontal: 'center',
        open: true,
        message: 'Erreur de récupération des données',
        severity: 'error',
        CodeReadOnly: false,
      });
    } else {
      setState({
        Mode: 'Créer',
        vertical: 'top',
        horizontal: 'center',
        open: true,
        message: error,
        severity: 'error',
        CodeReadOnly: false,
      });
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const handleEditRow = (rowId, rowData) => {
    if (editingRowId && editingRowId !== rowId && unsavedChanges) {
      setState({
        ...state,
        open: true,
        message: 'Enregistrez vos modifications avant de passer à une autre ligne.',
        severity: 'warning',
      });
      return;
    }
    setEditingRowId(rowId); 
    setEditedRows({ [rowId]: rowData });
  };
  
  const handleSaveChanges = async () => {
    try {
      const updatedData = { ...editedRows[editingRowId] }; 
      await axiosInstance.put(`PriceList/${editingRowId}`, updatedData);
      fetchPriceList(); 
      setUnsavedChanges(false); 
      setEditingRowId(null); 
      setState({
        ...state,
        open: true,
        message: 'La modification a été enregistrée avec succès',
        severity: 'success',
      });
      setEditedRows({});
    } catch (error) {
      handelError(error);
    }
  };
  
 
  

  const handleClick = (event, row) => {
    setPriceList(row.original);
     console.log("id row" , row.original.id);
    setPriceListid(row.original.id );
     console.log("Price List id" , row.original.id);
     setShowItem(true);
  };

  const handleEditCell = (rowId, field, newValue) => {
    setUnsavedChanges(true);
    setEditedRows((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: newValue, 
      },
    }));
  };
  

  // const handleUpdate = async () => {
  //   try {
  //     const updatedData = [...data];
  //     for (const [rowId, updatedRow] of Object.entries(editedRows)) {
  //       console.log("data :", updatedRow);
  //       await axiosInstance.put(`PriceList/${rowId}`, updatedRow);
  //     }
  //     fetchPriceList(); 
  //     setState({
  //       ...state,
  //       open: true,
  //       message: 'Les modifications ont été mises à jour avec succès!',
  //       severity: 'success',
  //     });
  //     setEditedRows({});
  //   } catch (error) {
  //     handelError(error);
  //   }
  // };
  
  
  const fetchPriceList = async () => {
  
    try {
      const resPriceList = await axiosInstance.get("PriceList/");
      setData(resPriceList.data);
      setRowCount(resPriceList.data.length);
    } catch (error) {
      console.error("Error fetching PriceList:", error.response?.data || error);
    } 
  };
  useEffect(() => {
    fetchPriceList();
  }, []);

  useEffect(() => {
    const fetchPriceListLines = async () => {
      console.log("useEffect PriceListLine" );
      setIsRefetching(true);
      try {
        const resPriceListLines = await axiosInstance.get("PriceListLine");
        setDataPrice(resPriceListLines.data);
      } catch (error) {
        console.error("Error fetching PriceListLines:", error.response?.data || error);
      } finally {
        setIsRefetching(false);
      }
    };
  
    
      fetchPriceListLines();
    
  }, [ data , showItem]); 

  const columns = useMemo(
    () => [
      {
        accessorKey: 'Name',
        header: 'Nom',
        size: 400,
        Cell: ({ cell, row }) => {
          const rowId = row.original.id;
          const isEditing = !!editedRows[rowId];
          return isEditing ? (
            <TextField
              defaultValue={cell.getValue()}
              onChange={(e) => handleEditCell(rowId, 'Name', e.target.value)} 
              size="small"
              fullWidth
            />
          ) : (
            <span onClick={() => handleEditRow(rowId, row.original)}>
              {cell.getValue()}
            </span>
          );
        },
        
      },
      {
        accessorKey: 'TTC',
        header: 'TTC',
        size: 100,
        Cell: ({ cell, row }) => {
          const rowId = row.original.id;
          const isEditing = !!editedRows[rowId];
          const isChecked = editedRows[rowId]?.TTC 
          ? editedRows[rowId].TTC === 'Y' 
          : cell.getValue() === 'Y';
        
          return isEditing ? (
            <Checkbox
              checked={isChecked}
              onChange={(e) => handleEditCell(rowId, 'TTC', e.target.checked ? 'Y' : 'N')} 
            />
          ) : (
            <Checkbox
              checked={isChecked}
              disabled
              onClick={() => handleEditRow(rowId, row.original)}
            />
          );
        },
        
      },
      {
        accessorKey: 'Status',
        header: 'Actif',
        size: 100,
        Cell: ({ cell, row }) => {
          const rowId = row.original.id;
          const isEditing = !!editedRows[rowId];
        
          return isEditing ? (
            <TextField
              select
              value={editedRows[rowId]?.Status || cell.getValue()}
              onChange={(e) => handleEditCell(rowId, 'Status', e.target.value)} 
              size="small"
              fullWidth
            >
              {['Actif', 'Inactif'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <span onClick={() => handleEditRow(rowId, row.original)}>
              {cell.getValue()}
            </span>
          );
        },
        
        
      },
      {
        id: 'Modifier',
        header: 'Les Prix',
        size: 50,
        Cell: ({ row }) => (
          <IconBox>
            <Tooltip title="Modifier">
              <IconButton
                onClick={(event) => {
                  setPriceList(row.original);
                  setShowItem(true);
                  handleClick(event, row);
                }}
                aria-label="Afficher"
                size="small"
              >
                <EditIcon sx={{ color: green[500] }} fontSize="small" />
              </IconButton>
            </Tooltip>
          </IconBox>
        ),
      },
    ],
    [editedRows]
  );
  
  

  const table = useMaterialReactTable({
    columns,
    data,
    rowCount,
    localization: MRT_Localization_FR,
    initialState: { density: 'compact' },
    state: { isLoading, showProgressBars: isRefetching },
  });

  return (
    <Container>
      <div className="card">
        <Menubar start={<Breadcrumb routeSegments={[{ name: 'Listes de prix' }]} />} style={{ border: '1px solid #dee2e600' }} />
      </div>
      <Stack spacing={3}>
        {showItem ? (
          <PriceListForm DataPrice={DataPrice} setDataPrice={setDataPrice} data={PriceList} PriceListid={PriceListid} state={state} setState={setState}  setshowItem={setShowItem} />
        ) : (
          <>
            <Button  variant="contained" color="primary" style={{ marginBottom: '10px', width:'100px'}}  onClick={handleOpenModal} > <AddIcon  /></Button>

            <div style={{ height: '100%', width: '100%' }}>
               <MaterialReactTable table={table} />
            </div>

            <Button style={{ width:'120px'}} variant="contained" color="primary" onClick={handleSaveChanges} disabled={!unsavedChanges} > Mettre à jour </Button>
          </>
        )}
      </Stack>
       <AddRowModal open={isModalOpen} onClose={handleCloseModal} onSave={handleAddRow} /> 
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled"> {message} </Alert>
      </Snackbar>
      
    </Container>
  );
};

export default AppForm;
