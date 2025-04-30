import { Card, Grid, styled, useTheme , TextField} from '@mui/material';
import { useState ,useEffect ,useRef} from "react";
import Flatpickr from "react-flatpickr";
import { Fragment } from 'react';
import "flatpickr/dist/themes/material_blue.css"; // استيراد الأنماط
import "flatpickr/dist/flatpickr.min.css"; 
import { format, parseISO } from 'date-fns';
import Campaigns from './shared/Campaigns';
import DoughnutClient from './shared/DoughnutClient';  
import DoughnutBar from './shared/DoughnutBar';
import DoughnutFamille from './shared/DoughnutFamille'; 
import ComparisonChart from '../charts/echarts/ComparisonChart';
import SimpleCard from 'app/components/SimpleCard';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import TableStock from './shared/TableStock';
import UpgradeCard from './shared/UpgradeCard';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  padding: "2px",
  marginBottom: "8px",
  '& .MuiInputBase-input': {
    '&[readonly]': {
      fontWeight: '',
      color: 'black',
    },
  },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));


const Analytics = () => {
  const { palette } = useTheme();
  const theme = useTheme();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [colors, setColors] = useState([]);
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  // const generateRandomColors  = (numColors) => {
  //   const colors = [];
    
  //   for (let i = 0; i < numColors; i++) {
  //    
  //     const red = Math.floor(Math.random() * 50); 
  //     const green = Math.floor(Math.random() * 180); 
  //     const blue = Math.floor(Math.random() * 255); 
      
  //    
  //     const color = `rgb(${red}, ${green}, ${blue})`; 
  //     colors.push(color);
  //   }
  
  //   return colors;
  // };
  
  // const generateRandomColors = (baseColor) => {
  //   const lightenColor = (color, amount) => {
  //     let r = parseInt(color.substr(1, 2), 16);
  //     let g = parseInt(color.substr(3, 2), 16);
  //     let b = parseInt(color.substr(5, 2), 16);
  
  //     r = Math.min(255, r + amount); 
  //     g = Math.min(255, g + amount); 
  //     b = Math.min(255, b + amount); 
  
  //     return `rgb(${r}, ${g}, ${b})`;
  //   };
  
  //   const darkenColor = (color, amount) => {
  //     let r = parseInt(color.substr(1, 2), 16);
  //     let g = parseInt(color.substr(3, 2), 16);
  //     let b = parseInt(color.substr(5, 2), 16);
  
  //     r = Math.max(0, r - amount); 
  //     g = Math.max(0, g - amount); 
  //     b = Math.max(0, b - amount); 
  
  //     return `rgb(${r}, ${g}, ${b})`;
  //   };
  
    
  //   const colors = [
  //     darkenColor(baseColor, 30),  
  //     baseColor,                  
  //     lightenColor(baseColor, 30), 
  //   ];
  
  //   return colors;
  // };
  
  // const generateBlueShades = (numColors) => {
  //   const colors = [];
  
  //   for (let i = 0; i < numColors; i++) {
  //     // قيم محددة لتغيير الأحمر والأخضر لتبقى ضمن مشتقات الأزرق
  //     const red = Math.floor(Math.random() * 0); // قيمة منخفضة للأحمر
  //     const green = Math.floor(105 + Math.random() * (200 - 105));// قيمة منخفضة للأخضر
  //     const blue = Math.floor(150 + Math.random() * (255 - 200)); // قيمة عالية للأزرق (150-255)
  
  //     const color = `rgb(${red}, ${green}, ${blue})`;
  //     colors.push(color);
  //     console.log("color :",colors);
  //   }
  
  //   return colors;
  // };

  const generateBlueShades = () => {
    return [
      
      "rgb(0,76,153)","rgb(0,91,195)",
      "rgb(0,102,204)","rgb(0,119,255)",
      "rgb(0,128,255)",
      "rgb(51,153,255)",
      "rgb(102,178,255)",
      "rgb(153,204,255)",
      "rgb(0,108,230)",
      
    ];
  };







  useEffect(() => {
    
    const currentDate = new Date();

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() , 2);
    // console.log("date first" , firstDay);
    // const firstDayFormatted = firstDay.toISOString().split('T')[0]; 
    // console.log("firstDayFormatted" , firstDayFormatted);

    
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    // console.log("date last" , lastDay);
    // const lastDayFormatted = lastDay.toISOString().split('T')[0]; 
    // console.log("lastDayFormatted" , lastDayFormatted);

    
    setStartDate(firstDay);
    setEndDate(lastDay);


    const randomBlueColors = generateBlueShades(); 
    setColors(randomBlueColors);


    // const randomColors = generateRandomColors(palette.primary.main); 
    // setColors(randomColors);
  }, []);

  return (
    <>
      <style>
        {`
          /* تغيير الإطار عند التركيز */
          .custom-flatpickr:focus {
            /*border-color: #007bff !important;  اللون الأزرق */
            outline: none;
            border: 5px solid #007bff;
          }

          /* تغيير الإطار عند التمرير */
          .custom-flatpickr:hover {
            border: 2px solid #248eff !important;
          }
        `}
      </style>
    
      <Fragment>
        <ContentBox className="analytics">
          <Grid container spacing={3}>
              <Grid  item lg={12} md={8} sm={12} xs={12}>
                <StyledCard >
                  <Grid container lg={12} spacing={0} style={{marginTop:"0px"}}>
                          <Grid item lg={1} md={6} sm={12} xs={12}>
                              <H4 style={{marginLeft:"20px"}}>Date Du :</H4>
                          </Grid>
                          <Grid item lg={5} md={6} sm={12} xs={12}>
                            <Flatpickr
                              data-enable-time={false}
                              value={startDate}
                              onChange={(date) => {
                                setStartDate(date[0]);
                                setFormattedStartDate(format(date[0], 'dd/MM/yyyy'));
                              }}
                              options={{
                                dateFormat: "d/m/Y",
                              }}
                              className="custom-flatpickr"
                              style={{ width: "90%", height:"37px", borderRadius:"5px", border:"1px solid #d2d2e4" , paddingLeft: "15px", fontSize:"15px"  ,color: "#a0a0a0" ,marginTop: "10px"}}
                            />
                          </Grid>
                          <Grid item lg={1} md={6} sm={12} xs={12}>
                              <H4 style={{marginLeft:"20px"}}>Date Au :</H4>
                          </Grid>
                          <Grid item lg={5} md={6} sm={12} xs={12}>
                            <Flatpickr
                              data-enable-time={false}
                              value={endDate}
                              onChange={(date) => {
                                setEndDate(date[0]);
                                setFormattedEndDate(format(date[0], 'dd/MM/yyyy'));
                              }}
                              options={{
                                dateFormat: "d/m/Y",
                              }}
                              className="custom-flatpickr"
                              style={{ width: "90%", height:"37px", borderRadius:"5px", border:"1px solid #d2d2e4" , paddingLeft: "15px", fontSize:"15px"  ,color: "#a0a0a0" ,marginTop: "10px"}}
                            />
                          </Grid>
                  </Grid>
                </StyledCard>
              </Grid> 
              <Grid item lg={8} md={8} sm={12} xs={12}>
                  <StatCards startDate={startDate} endDate={endDate}/>
                  <TopSellingTable startDate={startDate} endDate={endDate} /> 
                  <DoughnutBar startDate={startDate} endDate={endDate} />
                  <TableStock startDate={startDate} endDate={endDate} /> 
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Card sx={{ px: 3, py: 2, mb: 3 }}>
                    <Title>Chiffre d'affaires </Title>
                    <SubTitle>par Client</SubTitle>

                    <DoughnutClient
                      startDate={startDate} endDate={endDate}
                      height="380px"
                      // color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                      color={colors}
                    />
                  </Card>
                  <Card sx={{ px: 3, py: 2, mb: 3 }}>
                    <Title>Chiffre d'affaires</Title>
                    <SubTitle>par Famille</SubTitle>

                    <DoughnutFamille
                      height="300px"
                      startDate={startDate} endDate={endDate}
                      // color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                      color={colors}
                    />
                  </Card>


              </Grid>
          </Grid>
        </ContentBox>
      </Fragment>
    </>

  );
};

export default Analytics;
