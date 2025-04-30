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

const GoodsIssueToolBar = ({today,setshowListOige, fetchNextDocEntry , setige1, oige, setOige, state, setState, handelError }) => {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({ timeout: 5000, baseURL: baseUrl, withCredentials: true });

  const Add = async () => {
    fetchNextDocEntry("Créer");
    setOige({ DocEntry:"",DocNum:"", DocDate: today, UserSign: "", Comment: "" });
    setige1([{  LineNum: "1", ItemCode: "", ItemName: "", Quantity: "", WhsCode: "", Price: "0.00", Discount: "0", LineTotal: "0.00", UM: "" ,isEditing: true, }]);
    
    setState({ ...state, Mode: "Créer" });
    console.log(oige.DocEntry)
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
      setshowListOige(true);
     } catch (error) {
      console.log(error);        
    }
  };

  const Navigate = async (direction) => {
    try {
      if (direction === "First") {
        
        const response = await axiosInstance.get("OIGE/" + (await axiosInstance.get("OIGE/data/Min")).data.id + "");
        setOige(response.data);
       
        
        const responseIge1 = await axiosInstance.get("IGE1/data/Min/" + response.data.DocEntry + "");
        if (responseIge1.data.length > 0) {
          const formattedData = await Promise.all(responseIge1.data.map(async (item) => {
            const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
            return {
              DocEntry: item.DocEntry,
              LineNum: item.LineNum,
              ItemCode:item.ItemCode,
              ItemName: item.ItemName,
              Quantity: item.Quantity,
              WhsCode: warehouseResponse.data.NomWarehouse,
              Price: item.Price,
              Discount: item.Discount,
              LineTotal: item.LineTotal,
              UM: umResponse.data.NomUM
            };
          }));
          

          setige1(formattedData);
      }
        setState({ ...state, Mode: "OK" });
      } else if (direction === "Previous") {
        const previousOige = await axiosInstance.get("OIGE/data/Previous/" +oige.id+ "");
        if (previousOige.data.id != null) {
          setOige({id:previousOige.data.id.id,DocEntry:previousOige.data.id.DocEntry, DocNum: previousOige.data.id.DocNum, DocDate : previousOige.data.id.DocDate, UserSign: previousOige.data.id.UserSign,Comment: previousOige.data.id.Comment});
          const previousIge1 = await axiosInstance.get("IGE1/data/Previous/" + previousOige.data.id.DocEntry);
          if (previousIge1.data.length > 0) {
            const formattedData = await Promise.all(previousIge1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);
              return {
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode:item.ItemCode,
                ItemName: item.ItemName,
                Quantity: item.Quantity,
                WhsCode: warehouseResponse.data.NomWarehouse,
                Price: item.Price,
                Discount: item.Discount,
                LineTotal: item.LineTotal,
                UM: umResponse.data.NomUM
              };
              }));

            setige1(formattedData);
        }
          setState({ ...state, open: false, Mode: "OK" });
        } else {
          setState({ ...state, open: true, message: "Premier enregistrement", severity: "info" });
        }
      } else if (direction === "Next") {
        const nextOige = await axiosInstance.get("OIGE/data/Next/" +oige.id+ "");
        if (nextOige.data.id != null) {
          setOige({id:nextOige.data.id.id,DocEntry:nextOige.data.id.DocEntry, DocNum: nextOige.data.id.DocNum, DocDate : nextOige.data.id.DocDate, UserSign: nextOige.data.id.UserSign,Comment: nextOige.data.id.Comment});
          const nextIge1 = await axiosInstance.get("IGE1/data/Next/" + nextOige.data.id.DocEntry);
          console.log(nextIge1);
          if (nextIge1.data.length > 0) {
            const formattedData = await Promise.all(nextIge1.data.map(async (item) => {
              const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
              const umResponse = await axiosInstance.get(`UM/${item.UM}`);
              return {
                DocEntry: item.DocEntry,
                LineNum: item.LineNum,
                ItemCode:item.ItemCode,
                ItemName: item.ItemName,
                Quantity: item.Quantity,
                WhsCode: warehouseResponse.data.NomWarehouse,
                Price: item.Price,
                Discount: item.Discount,
                LineTotal: item.LineTotal,
                UM: umResponse.data.NomUM
               };
            }));

            setige1(formattedData);
        }
          setState({ ...state, open: false, Mode: "OK" });
        } else {
          setState({ ...state, open: true, message: "Dernier enregistrement", severity: "info" });
        }
      } else if (direction === "Last") {
        const response = await axiosInstance.get("OIGE/" + (await axiosInstance.get("OIGE/data/Max")).data.id + "");
        setOige(response.data);
        const responseIge1 = await axiosInstance.get("IGE1/data/Max/" + response.data.DocEntry + "");
        if (responseIge1.data.length > 0) {
          const formattedData = await Promise.all(responseIge1.data.map(async (item) => {
            const warehouseResponse = await axiosInstance.get(`Warehouse/code/${item.WhsCode}`);
            const umResponse = await axiosInstance.get(`UM/${item.UM}`);
            return {
              DocEntry: item.DocEntry,
              LineNum: item.LineNum,
              ItemCode:item.ItemCode,
              ItemName: item.ItemName,
              Quantity: item.Quantity,
              WhsCode: warehouseResponse.data.NomWarehouse,
              Price: item.Price,
              Discount: item.Discount,
              LineTotal: item.LineTotal,
              UM: umResponse.data.NomUM
            };
          }));
         

          setige1(formattedData);
      }
        setState({ ...state, open: false, Mode: "OK" });
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

export default GoodsIssueToolBar;
