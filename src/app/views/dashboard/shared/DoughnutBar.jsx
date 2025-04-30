import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Box, styled } from '@mui/material';
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

const BarChart = ({ startDate, endDate }) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: baseUrl,
    withCredentials: true,
  });
  const [chartData, setChartData] = useState({
    categories: [],
    series: [{
      name: 'Chiffre d\'affaires',
      data: [],
    }],
  });

  useEffect(() => {
    // Call the API to get daily chiffre d'affaires data
    const fetchData = async () => {
      try {

        const response = await axiosInstance.get('/KPI/jour', {  params: { startDate: startDate, endDate: endDate } });

        const data = response.data.data;

        const categories = data.map(item => {
          const date = new Date(item.date);
          const formattedDate = new Intl.DateTimeFormat('fr-FR').format(date); // Format to dd/mm/yyyy
          return formattedDate;
        });

        // const categories = data.map(item => item.date);
        const seriesData = data.map(item => item.chiffreAffaires);

        setChartData({
          categories,
          series: [{
            name: 'Chiffre d\'affaires',
            data: seriesData,
          }],
        });
      } catch (error) {
        console.error('Error fetching data for chart:', error);
      }
    };

    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      title: {
        text: 'Chiffre d\'affaires ',
      },
    },
    legend: {
      position: 'top',
    },
    colors: ['#005BC3'],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Chiffre d'Affaires per jour</Title>
      </CardHeader>
      <Box p={3}>
        <ReactApexChart
          options={chartOptions}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </Box>
    </Card>
  );
};

export default BarChart;
