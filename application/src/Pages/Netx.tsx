import { Box , Typography } from '@mui/material';

import React from 'react'
import { useSelector } from 'react-redux';
const Netx = () => {
 const isSidebarOpen = useSelector((state: any) => state.sidebar.isSidebarOpen); 
  return (
    <Box sx={{backgroundColor: '#F7F9FB' , height:'90%'}}>
      <Typography>
          NTX
      </Typography>
    </Box>
  )
}

export default Netx;