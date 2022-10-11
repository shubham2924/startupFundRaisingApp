import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Index from "./pages/Index";
// import CreatePost from "./pages/CreatePost";
// import MyPosts from "./pages/MyPosts";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import { useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase-config";
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
function Navbar() {
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/"><Button variant="contained" endIcon={<HomeIcon />}>Home</Button></Link>
          </Typography>
          
          
          <Link to="/myposts"> <Button variant="contained" startIcon={<FilterListIcon />}>My posts</Button> </Link> &nbsp;&nbsp;
          <Link to="/myinvestments"> <Button variant="contained" startIcon={<FilterListIcon />}>My Investments</Button> </Link> &nbsp;&nbsp;
          <Link to="/myfunds"> <Button variant="contained" startIcon={<FilterListIcon />}>My funds</Button> </Link> &nbsp;&nbsp;
            <Link to="/createpost"> <Button variant="contained" startIcon={<AddBoxIcon />}>Create a post</Button> </Link> &nbsp;&nbsp;&nbsp;
            <Button variant="contained" startIcon={<AccountCircleIcon />}>User</Button>&nbsp;
            <Button  variant="contained" startIcon={<LogoutIcon />}>Log Out</Button>
          
        
        </Toolbar>
      </AppBar>
    </Box>
      
    
  )
}

export default Navbar