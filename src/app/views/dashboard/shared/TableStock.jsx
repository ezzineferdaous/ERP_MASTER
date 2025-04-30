import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  styled,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import axios from 'axios';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const TableStock = () => {
  const { palette } = useTheme();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });

  const [stockData, setStockData] = useState([]); // state to hold stock data
  const [warehouses, setWarehouses] = useState([]); // state to hold warehouses
  const [selectedWarehouse, setSelectedWarehouse] = useState("ALL"); // state to store selected warehouse

  const fetchStockData = async () => {
    try {
      console.log("selectedWarehouse data:", selectedWarehouse);
      const endpoint = `/KPI/stokparmagsan?WhsCode=${selectedWarehouse}`;
      const response = await axiosInstance.get(endpoint);
      setStockData(response.data.data);
      console.log("Stock data:", response.data.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  // Fetch warehouse data
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axiosInstance.get('Warehouse/');
        setWarehouses(response.data);
      } catch (error) {
        console.error("Error fetching warehouse data:", error);
      }
    };

    fetchWarehouses();
  }, []);

  // Fetch stock data when selected warehouse changes
  useEffect(() => {
    fetchStockData();
  }, [selectedWarehouse]);

  // Handle warehouse selection change
  const handleWarehouseChange = (event) => {
    const value = event.target.value;
    setSelectedWarehouse(value);
  };

  const formatNumber = (num) => {
    if (num == null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Stock Par Article</Title>
        <Select
          size="small"
          value={selectedWarehouse}
          onChange={handleWarehouseChange}
        >
          <MenuItem value="ALL">Toute Magasins</MenuItem>
          {warehouses.map((warehouse) => (
            <MenuItem key={warehouse.CodeWarehouse} value={warehouse.CodeWarehouse}>
              {warehouse.NomWarehouse}
            </MenuItem>
          ))}
        </Select>
      </CardHeader>

      <Box overflow="auto" sx={{ maxHeight: 300, overflowY: 'auto' }}>
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Code Article
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Nom Article
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Stock Disponible
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {stockData.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph>{product.ItemCode}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.ItemName}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  <Box display="flex" alignItems="center">
                    <Paragraph>{formatNumber(product.AvailableStock || product.EnStock)} </Paragraph>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default TableStock;
