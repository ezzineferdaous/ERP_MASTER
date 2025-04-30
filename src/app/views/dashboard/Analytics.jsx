import { Card, Grid, styled, useTheme , TextField} from '@mui/material';
import { useState ,useEffect ,useRef} from "react";
import Flatpickr from "react-flatpickr";
import { Fragment } from 'react';
import "flatpickr/dist/themes/material_blue.css"; 
import "flatpickr/dist/flatpickr.min.css"; 
import DoughnutClient from './shared/DoughnutClient';  
import DoughnutBar from './shared/DoughnutBar';
import DoughnutFamille from './shared/DoughnutFamille'; 
import StatCards from './shared/StatCards';
import TopSellingTable from './shared/TopSellingTable';
import TableStock from './shared/TableStock';
import '../../views/dashboard/Style.css'

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


  const generateSpectrumColors = () => {
    const colors = [];
    const steps = 50; 
    const hue = 225; 
    const saturationLevels = [90, 92, 95, 98, 100]; 
    const lightnessLevels = [30, 40, 50, 60, 70]; 
  
    for (let s = 0; s < saturationLevels.length; s++) {
      for (let l = 0; l < lightnessLevels.length; l++) {
        if (colors.length < steps) {
          const saturation = saturationLevels[s];
          const lightness = lightnessLevels[l];
          const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          colors.push(color);
        }
      }
    }

    console.log("color :" ,colors);
  
    return colors;
  };
  

  useEffect(() => {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() , 2);
    // console.log("date first" , firstDay);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    // console.log("date last" , lastDay);
    setStartDate(firstDay);
    setEndDate(lastDay);

    const spectrumColors = generateSpectrumColors();
    setColors(spectrumColors);


  }, []);

  return (
    <>
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
                              }}
                              options={{
                                dateFormat: "d/m/Y",
                              }}
                              className="custom-flatpickr"
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
                              }}
                              options={{
                                dateFormat: "d/m/Y",
                              }}
                              className="custom-flatpickr"
                            />
                          </Grid>
                  </Grid>
                </StyledCard>
              </Grid> 
              <Grid item lg={7} md={8} sm={12} xs={12}>
                  <StatCards startDate={startDate} endDate={endDate}/>
                  <TopSellingTable startDate={startDate} endDate={endDate} /> 
                  <DoughnutBar startDate={startDate} endDate={endDate} />
                  <TableStock startDate={startDate} endDate={endDate} /> 
              </Grid>
              <Grid item lg={5} md={4} sm={12} xs={12}>
                  <Card sx={{ px: 3, py: 2, mb: 3 }} >
                    <Title>Chiffre d'affaires </Title>
                    <SubTitle>par Client</SubTitle>
                    
                    <DoughnutClient 
                      startDate={startDate} endDate={endDate} 
                      height="400px"
                      // color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                      color={colors}
                    />
                  </Card>
                  <Card sx={{ px: 3, py: 2, mb: 3 }}>
                    <Title>Chiffre d'affaires</Title>
                    <SubTitle>par Famille</SubTitle>

                    <DoughnutFamille
                      height="400px"
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
