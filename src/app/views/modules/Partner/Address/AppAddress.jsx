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
 import AddressCreateForm from './AddressCreateForm';

const AppForm  = ({setAddress, setshowListAddress}) => {
  const [data, setData] = useState([{}]);
  const [Countries, setCountries] = useState([{}]);
  const [Cities, setCities] = useState([{}]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
 
  const Back = async (e) => {
    e.preventDefault();
    try {
      setshowListAddress(false);
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
    setAddress(row.original);
    setshowListAddress(false);
 };

    useEffect(() => {
      const Getdata = async () => {
        try {
          //Address
          const  resAddress  = await axiosInstance.get("Address/");
          setData(resAddress.data);
          //Countries
          const  resCountries  = await axiosInstance.get("Country/");
          setCountries(resCountries.data);
          //Cities
          const  resCities  = await axiosInstance.get("City");
          setCities(resCities.data);
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
          <AddressCreateForm Cities = {Cities} Countries = {Countries} data={data} setData = {setData} />
      </Container>
        <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Code</StyledTableCell>
              <StyledTableCell align="center">Rue/ Boîte postale</StyledTableCell>
              <StyledTableCell align="center">Bâtiments</StyledTableCell>
              <StyledTableCell align="center">Pays</StyledTableCell>
              <StyledTableCell align="center">Ville</StyledTableCell>
              <StyledTableCell align="center">Code postal</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <StyledTableRow key={data.Code}>                
                <StyledTableCell align="center" component="th" scope="row"> {data.Code} </StyledTableCell>
                <StyledTableCell align="center">{data.Street}</StyledTableCell>
                <StyledTableCell align="center">{data.Block}</StyledTableCell>
                <StyledTableCell align="center">{data.CountryCode}</StyledTableCell>
                <StyledTableCell align="center">{data.CityCode}</StyledTableCell>
                <StyledTableCell align="center">{data.ZIPCode}</StyledTableCell>
                <StyledTableCell align="center"> 
                        <FormEditDeleteDialog Cities = {Cities} Countries = {Countries} data={data} setData = {setData} />
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
