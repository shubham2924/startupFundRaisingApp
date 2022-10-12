import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockIcon from '@mui/icons-material/Lock';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";
function Navbar() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const useremailid = localStorage.getItem("useremail");
  
  return (
      <Box sx={{ flexGrow: 1, position: 'absolute',top:0,width:"100%",left:0,right:0 }}>
      <AppBar style={{backgroundColor: "#07055c"}} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/home"><Button variant="contained" endIcon={<HomeIcon />}>Home</Button></Link>
          </Typography>
          
          {/* {useremailid=="admin@gmail.com"?<Button variant="contained" startIcon={<FilterListIcon />}>See AC</Button>:""}&nbsp;&nbsp;&nbsp;&nbsp; */}
          <Link to="/mycompany"> <Button variant="contained" startIcon={<FilterListIcon />}>My Company</Button> </Link> &nbsp;&nbsp;
          <Link to="/myinvestments"> <Button variant="contained" startIcon={<FilterListIcon />}>My Investments</Button> </Link> &nbsp;&nbsp;
          <Link to="/myfunds"> <Button variant="contained" startIcon={<FilterListIcon />}>My funds</Button> </Link> &nbsp;&nbsp;
            <Link to="/registration"> <Button variant="contained" startIcon={<AddBoxIcon />}>Registration</Button> </Link> &nbsp;&nbsp;&nbsp;
            <Button onClick={handleLogout} variant="contained" startIcon={<LogoutIcon />}>Log Out</Button>
          
        
        </Toolbar>
      </AppBar>
    </Box>
      
    
  )
}

export default Navbar