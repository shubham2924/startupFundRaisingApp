// import * as React from 'react';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { Form, Alert } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import { useUserAuth,signUp,createUser} from "../context/UserAuthContext";
//import { signUp } from useUserAuth();
import PhoneInput from "react-phone-number-input";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");
    const { setUpRecaptha } = useUserAuth();
    const { signUp } = useUserAuth();
    let navigate = useNavigate();
  
    //handleSubmit function is not responsible for any functioning.
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await signUp(email, password)
        const user={
          email,
          password,
          fname,
          lname,
          number
        }
        console.log("This create user function is called from handleSubmit"); 
       await createUser(user)
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    };

    const getOtp = async (e) => {
      e.preventDefault();
      console.log(number);
      setError("");
      if (number === "" || number === undefined)
        return setError("Please enter a valid phone number!");
      try {
        const response = await setUpRecaptha(number);
        setResult(response);
        setFlag(true);
      } catch (err) {
        setError(err.message);
      }
    };    

    //Responsible for signing up a user
    const verifyOtp = async (e) => {
      e.preventDefault();
      setError("");
      if (otp === "" || otp === null) return;
      try {
        await result.confirm(otp)
        const user={
          email,
          fname,
          lname,
          number,
          password
        }

        // await signUp(email,password)
       console.log("This create user function is called from verifyOtp and is responsible for actual sign up");
       await createUser(user)
        
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
              </Grid>
              <div id="recaptcha-container"></div>
            </Grid>
            <Button
              onClick={getOtp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>  
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="otp"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Grid>
            {/* <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button> */}
            <Button
              onClick={verifyOtp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}