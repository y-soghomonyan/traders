import React from 'react';

import { Box, Grid } from '@mui/material';

const NotFound = () => {
  return (
    <div>
        <Box display="flex" flexDirection="column" alignItems="center" mt={5} mb={5} px={3}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
      </Box>

    </div>
  );
};

export default NotFound;