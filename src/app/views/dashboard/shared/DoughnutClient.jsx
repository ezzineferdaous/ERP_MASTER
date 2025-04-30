import React, { useEffect, useState } from 'react';
import { margin, useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';

const DoughnutClient = ({startDate, endDate, height, color = [] }) => {

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const axiosInstance = axios.create({timeout : 5000, baseURL : baseUrl , withCredentials : true});
    const theme = useTheme();
    const [chartData, setChartData] = useState([]);

    const formatNumber = (num) => {
        if (num == null) return '0';
        return num
          .toFixed(2) 
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' '); 
      };
      
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await axiosInstance.get('/KPI/client', {  params: { startDate: startDate, endDate: endDate } });
                

                
                const formattedData = response.data.data.map(item => ({
                    value:  item.difference,
                    name: `${item.CardName}`, //${item.CardCode}  
                }));

                console.log("carde name :",formattedData );

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [startDate, endDate]); 

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            left: 'center',
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
            margin :[0, 0, 60, 0],
            padding: [0, 0, 0, 0],
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{b}', 
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
    
        series: [
            {
                name: 'Client Difference',
                type: 'pie',
                radius: ['50%', '70%'], 
                center: ['50%', '40%'], 
                avoidLabelOverlap: false,
                // hoverOffset: 5,
                minAngle: 20,
                // stillShowZeroSum: false,
                label: {
                    normal: {
                        show: true,
                        position: 'outside', 
                        formatter: (params) => `${formatNumber(params.value)}`, 
                        textStyle: {
                            color: theme.palette.text.primary,
                            fontSize: 12,
                        },
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                        },
                        formatter: (params) => `${formatNumber(params.value)}`,
                    },
                },
                labelLine: {
                    normal: {
                        show: true, 
                    },
                },
                data: chartData, 
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    
    return (
        <ReactEcharts
            style={{ height: height,  marginTop:"20px"}}
            option={{
                ...option,
                color: [...color],
            }}
        />
    );
    
};

export default DoughnutClient;
