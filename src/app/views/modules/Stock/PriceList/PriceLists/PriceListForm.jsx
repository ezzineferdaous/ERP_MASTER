import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';

const PriceListForm = ({ DataPrice, data , setDataPrice, setshowItem, PriceListid ,state ,setState }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [priceData, setPriceData] = useState({}); // Object to store updated prices
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });
  const { vertical, horizontal, open, message, severity } = state;

  // Handle changes in price input fields
  const handlePriceChange = (e, Price) => {
    setPriceData((prev) => ({
      ...prev,
      [Price]: e.target.value,
    }));
  };

  // Handle the update of prices
const handleUpdate = async () => {
  try {
    const updatePromises = filteredData.map((row) => {
      const newPrice = priceData[row.ItemCode];

      if (row.id) {
        
        if (newPrice !== 0 && newPrice !== row.Price) {
          return axiosInstance.put(`PriceListLine/${row.id}`, {
            ...row,
            Price: newPrice,
          });
        }
      } else {
        
        if (newPrice !== 0) {
          return axiosInstance.post("PriceListLine", {
            ItemCode: row.ItemCode,
            PriceListId: PriceListid,
            Price: newPrice,
          });
        }
      }
      return null;
    }).filter(promise => promise !== null); 

    
    await Promise.all(updatePromises);


    setshowItem(false);
    setState({
      vertical: "top",
      horizontal: "center",
      open: true,
      message: "Operation completed successfully",
      severity: "success",
    });
  } catch (error) {
    console.error(error);
    setState({
      vertical: "top",
      horizontal: "center",
      open: true,
      message: "Failed to update prices. Please try again.",
      severity: "error",
    });
  }
};

  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        
        const resArticles = await axiosInstance.get("Item");
        const articles = resArticles.data;
        
  
       
        const updatedData = articles.map((article) => {
         

          const matchedItem = DataPrice.find(
            (price) => price.ItemCode === article.ItemCode && price.PriceListId === PriceListid
          );
          console.log("DataPrice :" , DataPrice) ;
          console.log("PriceListid :" , PriceListid) ;
          
           console.log("matchedItem :" , matchedItem) ;
          return {
            ...article,
            Price: matchedItem ? matchedItem.Price : 0, 
            id: matchedItem ? matchedItem.id : null, 
          };
        });
  
        setFilteredData(updatedData);
  
        
        const initialPriceData = {};
        updatedData.forEach((row) => {
          initialPriceData[row.ItemCode] = row.Price;
        });
        setPriceData(initialPriceData);
        console.log("PriceData" , priceData);
      } catch (error) {
        console.error("Error fetching articles or prices:", error);
      }
    };
    console.log("PriceData 2" , priceData);
  
    fetchArticles();
  }, []);
  console.log("PriceData 3" , priceData);

  const handleClose = () => {
    setshowItem(false);
  };
  // console.log("priceData", priceData);

  return (
    <>
    <Modal open={true} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
           {data.Name}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>code Article</TableCell>
                <TableCell style={{ textAlign: "center" }}>Name Article</TableCell>
                <TableCell style={{ textAlign: "center" }}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.ItemCode}>
                  <TableCell style={{ textAlign: "center" }}>{row.ItemCode}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{row.ItemName}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <TextField
                      value={priceData[row.ItemCode] || '0'}
                      onChange={(e) => handlePriceChange(e, row.ItemCode)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mr: 1 }}
          >
            Modifier
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Box>
      </Box>
    </Modal>

        </>
  );
};

export default PriceListForm;
