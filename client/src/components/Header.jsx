import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box
    sx={{
      ml: "20px",
    }}
    >
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ 
          mb: "3px",
           ml: "2px", 
          fontSize: "25px"
          }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.secondary[300]}
      >
        {subtitle}
      </Typography>
      
    </Box>
  );
};

export default Header;
