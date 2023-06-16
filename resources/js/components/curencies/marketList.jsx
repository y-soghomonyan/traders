import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Select, MenuItem } from '@mui/material';
import Pagination from './pagination';


const MarketList = () => {
  const [result, setResult] = useState(null);
  const [totalPages, setTotalPages] = useState(5);
  const [perPage, setPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalcount, setTotalcount] = useState(null);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (event) => {
    setPerPage(event.target.value);

    if(totalcount && event.target.value){
      let count = Math.ceil(totalcount/event.target.value)
      setTotalPages(count);
      // console.log(count);
    }

  };

  useEffect(() => {
    const fetchMarketsCount = async () => {
      try {
        const response = await axios.get(
          'https://coingecko.p.rapidapi.com/exchanges/list',
          {
            headers: {
              'X-RapidAPI-Key': 'd79c8c7a46msh12510c8a727ac77p18f909jsn6d5794881978',
              'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
            },
          }
        );

        const total = response.data;
        setTotalcount(total.length);
        setTotalPages(Math.ceil(total.length/25));
      } catch (error) {
        console.error('Error fetching markets count:', error);
      }
    };

    fetchMarketsCount();
  }, []);


  const options = {
    // https://rapidapi.com/ru/coingecko/api/coingecko/
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/markets',
    params: {
      vs_currency: 'usd',
      page: currentPage,
      per_page: perPage,
      // order: 'market_cap_asc'
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
        setResult(response.data)

      } catch (error) {
        console.error(error);
      }   
    };

    fetchData();
  }, [currentPage, perPage]);

  return (
    <Box>
      <Box display="flex" justifyContent="end" mt={2} mb={3} px={3} >
        <Select value={perPage} onChange={handlePerPageChange} className="bg_white">
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50} >50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Box>
      {result ? (
        <Grid container spacing={3} px={3}>
          {result.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <a href={`product/${item.id}`} target="_blank" rel="noopener noreferrer" >
                <Box border="1px solid black" p={2} display="flex" flexDirection="column" alignItems="center">
                    <img src={item.image} alt="" />
                    <h3>{item.name}</h3>
                    <p>Price: {item.current_price} $</p>
                </Box>
              </a>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
      {totalPages > 1 ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default MarketList;
