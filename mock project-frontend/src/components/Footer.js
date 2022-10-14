import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';



export default function Footer() {
  const [value, setValue] = React.useState(0);

  return (
    <Box className='footer' sx={{flexGrow: 1, position: 'absolute',bottom:0,width:"100%",left:0,right:0}} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }} 
        style={{backgroundColor: "#07055c", padding: "1px"}}
      >
        <Typography style={{color: "white", fontSize:"27px", textAlign:"left"}} >&copy; Q-Fund</Typography>
        
      </BottomNavigation>
    </Box>
  );
}



