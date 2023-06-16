import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Grid, Select, MenuItem } from '@mui/material';

// https://rapidapi.com/ru/coingecko/api/coingecko/
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment'; 

import ReactHtmlParser from 'react-html-parser';

const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [PeriodPrices, setPeriodPrices] = useState(null);
    const [PerPeriod, setPerPeriod] = useState('hour');

    const options = {
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${id}`,
        params: {
          localization: 'true',
          tickers: 'true',
          market_data: 'true',
          community_data: 'true',
          developer_data: 'true',
          sparkline: 'false'
        },
        headers: {
          'X-RapidAPI-Key': 'd79c8c7a46msh12510c8a727ac77p18f909jsn6d5794881978',
          'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
      };

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.request(options);
                // console.log(response.data);
                setProduct(response.data);
                document.title = `Traders | ${response.data.name}`;
            } catch (error) {
                console.error(error);
                navigate('/market');
            }  
        };
    
        fetchData();
      }, []);
      

      const getChartData = () => {
        if (product && product.tickers) {

            let result = product.tickers;
            const dates = result.map(item => moment(item.last_fetch_at).format(' HH:mm:ss')); 
            // console.log(dates); 
            const closePrices = result.map(item => item.converted_last.usd);

          return {
            labels: dates,
            datasets: [
              {
                label: 'Closing Price',
                data: closePrices,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          };
        }
        return null;
      };


      const now_time = Date.now();
      const date = new Date(now_time);

      const periods = {
        'hour' : PerPeriod == 'hour' ? Math.floor(date.setTime(date.getTime() - (60 * 60 * 1000))/ 1000):'',
        'day' :  PerPeriod == 'day' ? Math.floor(date.setTime(date.getTime() - (60 * 60 * 24000))/ 1000) :'',
        'week' : PerPeriod == 'week' ? Math.floor(date.setTime(date.getTime() - (60 * 60 * 24000 * 7))/ 1000) :'',
        'month' : PerPeriod == 'month' ? Math.floor(date.setMonth(date.getMonth() - 1)/ 1000) :'',
        'quarter' : PerPeriod == 'quarter' ? Math.floor(date.setMonth(date.getMonth() - 3)/ 1000) :'',
        'half_year' : PerPeriod == 'half_year' ? Math.floor(date.setMonth(date.getMonth() - 6)/ 1000) :'',
        'year': PerPeriod == 'year' ? Math.floor((date.setFullYear(date.getFullYear() - 1)) / 1000) :'',
      }

      console.log(periods);
      const options2 = {
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${id}/market_chart/range`,
        params: {
          from: periods[PerPeriod],
          vs_currency: 'usd',
          to: Math.floor(now_time/ 1000)
        },
        headers: {
          'X-RapidAPI-Key': 'd79c8c7a46msh12510c8a727ac77p18f909jsn6d5794881978',
          'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.request(options2);
            setPeriodPrices(response.data)
            // console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [PerPeriod]);

      const handlePerPeriod = (event) => {
    
        let value = event.target.value;
        if(value){
          setPerPeriod(value);
        }
    
      };

     const getChartDataSort = () => {
      if (product && PeriodPrices && PeriodPrices.prices) {

        let result = PeriodPrices.prices;

        let dates = result.map(item => moment(item[0]).format('YY-MM-DD'));
        if(PerPeriod == 'hour' || PerPeriod == 'day'){
          dates = result.map(item => moment(item[0]).format(' HH:mm:ss'));
        }
        const closePrices = result.map(item => item[1].toFixed(3));

      return {
        labels: dates,
        datasets: [
          {
            label: 'Closing Price',
            data: closePrices,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      };
    }
    return null;
     }


    return (
        <Box className="container mt-5 mb-5">


            {product ? (
                <Grid container spacing={3} px={3} >
                    <Grid item xs={12} sm={6} md={6} lg={6} >
                        <img src={product.image.large} alt="" />

                        <Box display="flex" justifyContent="end" mt={2} mb={3}  >
                          <Select value={PerPeriod} onChange={handlePerPeriod} className="bg_white">
                            <MenuItem value= 'hour'>Hour</MenuItem>
                            <MenuItem value= 'day'>Day</MenuItem>
                            <MenuItem value= 'week' >Week</MenuItem>
                            <MenuItem value= 'month'>Month</MenuItem>
                            <MenuItem value= 'quarter'>Quarter</MenuItem>
                            <MenuItem value= 'half_year'>Half year</MenuItem>
                            <MenuItem value= 'year'>Year</MenuItem>
                          </Select>
                        </Box>

                        <Grid mt={5}>
                          {product && PeriodPrices && PeriodPrices.prices ?(
                            <div className='bg_white' >
                                <Line data={getChartDataSort()} />
                            </div>
                          ): ""}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} sx={{ display: 'flex', flexDirection:'column', alignItems: 'center' }} >   
                        <h2 >{product.name}</h2>
                        <p>
                          {/* {product.description.en} */}
                        {ReactHtmlParser(product.description.en)}
                        </p>
                    </Grid>
                </Grid>
             ) : (
                <div variant="body1">Loading...</div>
              )}
            <Grid container spacing={3} px={3} mt={5}>
              {/* <iframe height="480" width="650" src="https://ssltvc.investing.com/?pair_ID=7&height=480&width=650&interval=300&plotStyle=candles&domain_ID=1&lang_ID=1&timezone_ID=7"></iframe> */}
            </Grid>
        </Box>
      );
    };
    
    export default Product;