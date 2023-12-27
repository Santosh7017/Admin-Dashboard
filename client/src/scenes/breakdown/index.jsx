import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import BreakdownChart from "components/BreakdownChart";


const Breakdown = () => {
  return (
    <Box m="1rem 2rem">
        <Header title="BREAKDOWN" subtitle="Breakdown of sales By category" />
        <Box mt="40px" height="70vh">
            <BreakdownChart />
        </Box>

    </Box>
  )
}

export default Breakdown