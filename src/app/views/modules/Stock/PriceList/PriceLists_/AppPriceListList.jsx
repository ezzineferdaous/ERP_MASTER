import { useState, useEffect } from 'react';
import axios from 'axios';
 import { styled } from '@mui/material/styles';
 import Table from '@mui/material/Table';
 import TableBody from '@mui/material/TableBody';
 import TableCell, { tableCellClasses } from '@mui/material/TableCell';
 import TableContainer from '@mui/material/TableContainer';
 import TableHead from '@mui/material/TableHead';
 import TableRow from '@mui/material/TableRow';
 import Paper from '@mui/material/Paper';
 
 export default function AppForm (props) {

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  const [data, setData] = useState([{}]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

  useEffect(() => {
    const Getdata = async () => {
      try {
        const resPriceList = await axiosInstance.get("PriceList/");
        setData(resPriceList.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.error(error.response.data);
        } else {
          console.error(error);
        }
      }      
    }; 
    Getdata();
  },[props.Partner]);

  return (
    <div>
        <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Actif</StyledTableCell>
              <StyledTableCell align="center">TTC</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <StyledTableRow key={data.id}>                
                <StyledTableCell align="center" component="th" scope="row"> {data.Name} </StyledTableCell>
                <StyledTableCell align="center">{data.Actif}</StyledTableCell>
                <StyledTableCell align="center">{ data.TTC == 'N' ? 'HT': 'TTC' }</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>   
    </div>
  );
};