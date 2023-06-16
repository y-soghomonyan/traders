import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import moment from 'moment'; // Import moment library

import { restClient } from '@polygon.io/client-js';

const ShowCurrency = () => {
  const [result, setResult] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const currentDate = `${year}-${month}-${day}`;

  today.setDate(today.getDate() - 14);
  const year_5 = today.getFullYear();
  const month_5 = String(today.getMonth() + 1).padStart(2, '0');
  const day_5 = String(today.getDate()).padStart(2, '0');
  const previousDate = `${year_5}-${month_5}-${day_5}`;




  const options = {
    method: 'GET',
    url: 'https://coingecko.p.rapidapi.com/coins/markets',
    params: {
      vs_currency: 'usd',
      page: '1',
      per_page: '100',
      order: 'market_cap_desc'
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
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }    };

  fetchData();
}, []);



  useEffect(() => {
    const fetchData = async () => {
    const rest = restClient('N7r4kQNYv2ZnpUitHhh5r462oTt2q70D');

      try {
        const data = await rest.stocks.aggregates('AAPL', 1, 'day', previousDate, currentDate);

        setResult(data);
      } catch (error) {
        console.error('An error happened:', error);
      }
    };

    fetchData();
  }, []);

  const getChartData = () => {
    if (result) {
        const dates = result.results.map(item => moment(item.t).format('YYYY-MM-DD'));  
        const closePrices = result.results.map(item => item.c);
  
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

  return (
        <Box>
            <h2 className='text-center'>AAPL</h2>
         {result ? (
            <Grid item xs={12}>
                <Line data={getChartData()} />
            </Grid>
            ) : (
            <Typography variant="body1">Loading...</Typography>
            )}
        </Box>
  );
};

export default ShowCurrency;



// import React, { useEffect, useState } from 'react';
// import { Typography, Box, Grid } from '@mui/material';

// import { restClient } from '@polygon.io/client-js';

// const ShowCurrency = () => {
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const rest = restClient("N7r4kQNYv2ZnpUitHhh5r462oTt2q70D");
      
//       const today = new Date();
//       const year = today.getFullYear();
//       const month = String(today.getMonth() + 1).padStart(2, "0");
//       const day = String(today.getDate()).padStart(2, "0");
//       const currentDate = `${year}-${month}-${day}`;

//       today.setDate(today.getDate() - 14);
//       const year_5 = today.getFullYear();
//       const month_5 = String(today.getMonth() + 1).padStart(2, "0");
//       const day_5 = String(today.getDate()).padStart(2, "0");
//       const previousDate = `${year_5}-${month_5}-${day_5}`;

//       try {
//         const data = await rest.stocks.aggregates("AAPL", 1, "day", previousDate, currentDate);
//         setResult(data);
//       } catch (error) {
//         console.error('An error happened:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Box>
//       {result ? (
//         <Grid container spacing={2}>
//           {result.results.map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//               <Box border="1px solid black" p={2}>
//                 <Typography variant="body1">Date: {item.t}</Typography>
//                 <Typography variant="body1">Open: {item.o}</Typography>
//                 <Typography variant="body1">High: {item.h}</Typography>
//                 <Typography variant="body1">Low: {item.l}</Typography>
//                 <Typography variant="body1">Close: {item.c}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography variant="body1">Loading...</Typography>
//       )}
//     </Box>
//   );
// };

// export default ShowCurrency;





// import React, { useEffect } from "react";
// import { websocketClient } from "@polygon.io/client-js";

// const ShowCurrency = () => {
//   useEffect(() => {
//     // Create WebSocket client
//     const stocksWS = websocketClient("N7r4kQNYv2ZnpUitHhh5r462oTt2q70D").stocks();

  
//     // Event handler for incoming messages
//     stocksWS.onmessage = ({ data }) => {
//       const [message] = JSON.parse(data);

//       console.log(message);return;

//       switch (message.ev) {
//         case "AM":
//           // Handle trade message for AM event
//           console.log("Received AM event:", message);
//           break;
//         case "A":
//           // Handle trade message for A event
//           console.log("Received A event:", message);
//           break;
//         default:
//           break;
//       }
//     };
//     console.log(stocksWS); return;
//     // Subscribe to symbols
//     // stocksWS.send('{"action":"subscribe", "params":"AM.MSFT,A.MSFT"}');
//     stocksWS.send({ action: "subscribe", params: "T.MSFT" });

//     // Clean up the WebSocket connection
//     return () => {
//       stocksWS.close();
//     };
//   }, []); // Run the effect only once on component mount

//   return <div>WebSocket example</div>;
// };

// export default ShowCurrency;