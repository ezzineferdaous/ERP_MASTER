import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import axios from 'axios';

import { useState ,useEffect } from "react";


const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = ({ startDate, endDate }) => {
  const [data, setData] = useState(null); 
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});

  useEffect(() => {
    const fetchData = async () => {

      console.log("start data :" , startDate) ;
      console.log("end Date :" , endDate) ;
      try {
        const response = await axiosInstance.get('/KPI/calculate', {  params: { startDate: startDate, endDate: endDate } });
        setData(response.data.data); 
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const formatNumber = (num) => {
    if (num == null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  





  const cardList = [
    { name: 'Chiffre d affaires', amount: data ? `${formatNumber(parseFloat(data.difference).toFixed(2))}` : '0',  icon: 'attach_money' },
    { name: 'Nbr des Ventes', amount: data ? `${formatNumber(data.ORINCount)} Ventes` : '0 Orders', icon: 'store' },
    { name: 'Nbr des Commandes', amount: data ? `${formatNumber(data.ORDRCount)} Commandes` : '0 Difference', icon: 'shopping_cart' },
  ];
  
  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
