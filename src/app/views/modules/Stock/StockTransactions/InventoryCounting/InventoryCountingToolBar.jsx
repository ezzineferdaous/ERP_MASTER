//InventoryCountingToolBar.jsx
import React from 'react';
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import PrintIcon from '@mui/icons-material/Print';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));

const InventoryCountingToolBar  = ({today,setshowListOiqr,currentTime, setPriceListModified, fetchNextDocEntry , setIqr1, oiqr, setOiqr, state, setState, handelError }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Add = async () => {
    fetchNextDocEntry("Créer");
    setOiqr({ DocEntry: '',  DocNum: '',  DocDate: today,  Hour:currentTime ,  Comment: '',  UserSign: '',  DocStatus: '',  WhsCode: '',  PriceList: '', });
    setIqr1([{  LineNum: '1',  ItemCode: '',  ItemName: '',  OnHandBef: '',  CountQuantité: '0',  Quantity: '',  UM: '',  Price: '0.00',  LineTotal: '0.00',  TotalCompte:'',isEditing: true,}]);
    
    setState({ ...state, Mode: "Créer" });
    console.log(oiqr.DocEntry)
  };

  const Print = async (e) => {
    e.preventDefault();
    try {
      alert('Print');
    } catch (error) {
      handelError(error);
    }
  };

  const List = async (e) => {
    e.preventDefault();
    try {
        setshowListOiqr(true);
     } catch (error) {
      console.log(error);        
    }
  };

  const Navigate = async (direction) => {

    try {
      const getWarehouseName = async (whsCode) => {
        console.log("warehouse",whsCode);
        const response = await axiosInstance.get(`Warehouse/code/${whsCode}`);
        console.log("warehouse data", response.data.NomWarehouse);
        return response.data.NomWarehouse;
      };
      
      if (direction === "First") {
        const response = await axiosInstance.get("OIQR/" + (await axiosInstance.get("OIQR/data/Min")).data.id + "");
        const warehouseName = await getWarehouseName(response.data.WhsCode);
        setOiqr({ ...response.data, WhsCode: warehouseName });
        const responseiqr1 = await axiosInstance.get("IQR1/data/Min/" + response.data.DocEntry + "");
        if (responseiqr1.data.length > 0) {
          const formattedData = await Promise.all(responseiqr1.data.map(async (item) => {
            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
            return {
              id: item.id,
              DocEntry: item.DocEntry,
              LineNum: item.LineNum,
              ItemCode:item.ItemCode,
              ItemName: item.ItemName,
              OnHandBef: item.OnHandBef,
              CountQuantité: item.CountQuantité,
              Quantity: item.Quantity,
              UM: umResponse.data.NomUM,
              Price: item.Price,
              LineTotal: item.LineTotal,
              TotalCompte:item.TotalCompte,
              
            };
          }));
          

          setIqr1(formattedData);
      }
        
        if (response.data.DocStatus === "O"||response.data.DocStatus === "C") {
          setState({ ...state, Mode: "Mettre à jour" });
        } else {
          setState({ ...state, Mode: "OK" });
        }
      } else if (direction === "Previous") {
        const previousoiqr = await axiosInstance.get("OIQR/data/Previous/" +oiqr.id+ "");
        if (previousoiqr.data.id != null) {
          const warehouseResponse = await axiosInstance.get(`Warehouse/code/${previousoiqr.data.id.WhsCode}`);
          setOiqr({id:previousoiqr.data.id.id,DocEntry:previousoiqr.data.id.DocEntry,
             DocNum: previousoiqr.data.id.DocNum, DocDate : previousoiqr.data.id.DocDate,
              Hour : previousoiqr.data.id.Hour,Comment: previousoiqr.data.id.Comment ,
              UserSign: previousoiqr.data.id.UserSign,
              DocStatus: previousoiqr.data.id.DocStatus,
              WhsCode: warehouseResponse.data.NomWarehouse,
              PriceList: previousoiqr.data.id.PriceList,});
          const previousiqr1 = await axiosInstance.get("IQR1/data/Previous/" + previousoiqr.data.id.DocEntry);
          if (previousiqr1.data.length > 0) {
            const formattedData = await Promise.all(previousiqr1.data.map(async (item) => {
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);
              return {
                id: item.id,
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode:item.ItemCode,
                ItemName: item.ItemName,
                OnHandBef: item.OnHandBef,
                CountQuantité: item.CountQuantité,
                Quantity: item.Quantity,
                UM: umResponse.data.NomUM,
                Price: item.Price,
                LineTotal: item.LineTotal,
                TotalCompte:item.TotalCompte,
                
              };
            }));
            setIqr1(formattedData);
        }
          if (previousoiqr.data.id.DocStatus === "O"||previousoiqr.data.DocStatus === "C") {
            setState({ ...state, Mode: "Mettre à jour" });
          } else {
            setState({ ...state, Mode: "OK" });
          }
        } else {
          setState({ ...state, open: true, message: "Premier enregistrement", severity: "info" });
        }
      } else if (direction === "Next") {
        const nextOige = await axiosInstance.get("OIQR/data/Next/" +oiqr.id+ "");
        if (nextOige.data.id != null) {
          const warehouseResponse = await axiosInstance.get(`Warehouse/code/${nextOige.data.id.WhsCode}`);
            setOiqr({id:nextOige.data.id.id,DocEntry:nextOige.data.id.DocEntry,
               DocNum: nextOige.data.id.DocNum, DocDate : nextOige.data.id.DocDate,
                Hour : nextOige.data.id.Hour,Comment: nextOige.data.id.Comment ,
                UserSign: nextOige.data.id.UserSign,DocStatus: nextOige.data.id.DocStatus,
                WhsCode: warehouseResponse.data.NomWarehouse,
                PriceList: nextOige.data.id.PriceList,});
          const nextIge1 = await axiosInstance.get("IQR1/data/Next/" + nextOige.data.id.DocEntry);
          console.log(nextIge1);
          if (nextIge1.data.length > 0) {
            const formattedData = await Promise.all(nextIge1.data.map(async (item) => {
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);
              return {
                id: item.id,
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode:item.ItemCode,
                ItemName: item.ItemName,
                OnHandBef: item.OnHandBef,
                CountQuantité: item.CountQuantité,
                Quantity: item.Quantity,
                UM: umResponse.data.NomUM,
                Price: item.Price,
                LineTotal: item.LineTotal,
                TotalCompte:item.TotalCompte,
               
              };
            }));

            setIqr1(formattedData);
        }
          
          if (nextOige.data.id.DocStatus === "O"||nextOige.data.DocStatus === "C") {
            setState({ ...state, Mode: "Mettre à jour" });
          } else {
            setState({ ...state, Mode: "OK" });
          }
        } else {
          setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info" });
        }
      } else if (direction === "Last") {
        setPriceListModified(false);
        const response = await axiosInstance.get("OIQR/" + (await axiosInstance.get("OIQR/data/Max")).data.id + "");
        const warehouseName = await getWarehouseName(response.data.WhsCode);
        setOiqr({ ...response.data, WhsCode: warehouseName });
        const responseIge1 = await axiosInstance.get("IQR1/data/Max/" + response.data.DocEntry + "");
        if (responseIge1.data.length > 0) {
          const formattedData = await Promise.all(responseIge1.data.map(async (item) => {
            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
            return {
              id: item.id,
              DocEntry: item.DocEntry,
              LineNum: item.LineNum,
              ItemCode:item.ItemCode,
              ItemName: item.ItemName,
              OnHandBef: item.OnHandBef,
              CountQuantité: item.CountQuantité,
              Quantity: item.Quantity,
              UM: umResponse.data.NomUM,
              Price: item.Price,
              LineTotal: item.LineTotal,
              TotalCompte:item.TotalCompte,
           
            };
          }));
          

          setIqr1(formattedData);
      }
       
        if (response.data.DocStatus === "O"||response.data.DocStatus === "C") {
          setState({ ...state, Mode: "Mettre à jour" });
        } else {
          setState({ ...state, Mode: "OK" });
        }
      }
    } catch (error) {
      handelError(error);
    }
  }

  return (
    <IconBox>
      <IconButton onClick={Add} aria-label="Nouveau" size="small"> <AddIcon fontSize="small" /> </IconButton>
      <IconButton onClick={Print} aria-label="imprimer" size="small"> <PrintIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("First")} aria-label="Premier" size="small"> <KeyboardDoubleArrowLeftIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("Previous")} aria-label="Précédent" size="small"> <KeyboardArrowLeftIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("Next")} aria-label="Suivant" size="small"> <KeyboardArrowRightIcon fontSize="small" /> </IconButton>
      <IconButton onClick={() => Navigate("Last")} aria-label="Dernier" size="small"> <KeyboardDoubleArrowRightIcon fontSize="small" /> </IconButton>
      <IconButton onClick={List} aria-label="Filtrer" size="small"> <FormatListBulletedIcon fontSize="small" /> </IconButton>
    </IconBox>
  );
}

export default InventoryCountingToolBar;