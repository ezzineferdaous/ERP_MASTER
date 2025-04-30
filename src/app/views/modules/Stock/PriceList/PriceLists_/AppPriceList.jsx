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
 import { Button } from '@mui/material';
 import FormEditDeleteDialog from './FormEditDeleteDialog';
 import PriceListCreateForm from './PriceListCreateForm';

const AppForm  = ({setPriceList, setshowListPriceList}) => {
  const [data, setData] = useState([{}]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
 
  const Back = async (e) => {
    e.preventDefault();
    try {
      setshowListPriceList(false);
    } catch (error) {
      console.log(error);        
    }
  };

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

    const Container = styled("div")(({ theme }) => ({
      margin: "16px",
      [theme.breakpoints.down("sm")]: { margin: "16px" },
      "& .breadcrumb": {
        marginBottom: "16px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
      },
    }));

  const handleClick = (event, row) => {
    //console.log(row.original);
    setPriceList(row.original);
    setshowListPriceList(false);
 };

  useEffect(() => {
      const Getdata = async () => {
        try {

            const  resPList  = await axiosInstance.get("PriceList/");
            setData(resPList.data);
            console.log(data);
            
        } catch (error) {
          console.error(error.response.data);
          return;
        }
      }; 
      Getdata();
    },[]);

  return (
    <div>
      <Container>
          <PriceListCreateForm data={data} setData = {setData} />
      </Container>
        <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Actif</StyledTableCell>
              <StyledTableCell align="center">TTC</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <StyledTableRow key={data.Name}>                
                <StyledTableCell align="center" component="th" scope="row"> {data.Name} </StyledTableCell>
                <StyledTableCell align="center">{data.Actif}</StyledTableCell>
                <StyledTableCell align="center">{data.TTC == 'N' ? 'HT': 'TTC'}</StyledTableCell>
                <StyledTableCell align="center"> 
                        <FormEditDeleteDialog data={data} setData = {setData} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>   
    </div>
  );
};

export default AppForm ;
