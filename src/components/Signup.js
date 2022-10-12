import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth, signUp, createUser } from "../context/UserAuthContext";
import PhoneInput from "react-phone-number-input";
import validator from "validator";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
        Q Fund
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
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password)
      const user = {
        email,
        password,
        fname,
        lname,
        number
      }
      await createUser(user)
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
    // const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    const regEx = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (fname === "" || lname === "" || email === "" || password === "") {
      alert("Enter all required fields")
    }
    else {
      const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if (strongRegex.test(password)) {
        console.log("test");
        if (regEx.test(email)) {
          console.log("test1");
          if (number === "" || number === undefined)
            return setError("Please enter a valid phone number!");
          try {
            console.log("test2");
            const response = await setUpRecaptha(number);
            console.log("123")
            setResult(response);
            setFlag(true);
          } catch (err) {
            console.log("test3");
            setError(err.message);
          }
        }
        else {
          // setError(err.message);
          alert("Not a valid email");
          console.log("Not a valid email");
        }
      }
      else {
        alert("Password should include a digit, an uppercase letter, a lowercase letter, a special character and length should be minimum 8 characters.")
      }
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      console.log(process.env.PUBLIC_URL + '/' + img.name);
      console.log(img.name)
      await result.confirm(otp)

      const url = "http://localhost:3000/images";
      const formData = new FormData();
      formData.append("file", img);
      formData.append("fileName", img.name);
      const config = {
        headers: {
          "content-type": 'multipart/form-data',
        },
      };
      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      })


      const user = {
        email,
        fname,
        lname,
        number,
        password,
        img
      }


      await createUser(user)

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
            padding: '30px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#07055c" }}>
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
              {/* <Grid item xs={12}>
                <input
                  required
                  fullWidth
                  type="file"
                  name="img"
                  label="img"
                  id="img"
                  autoComplete="img"
                  onChange={(e) => {
                    setImgUrl(URL.createObjectURL(e.target.files[0]))
                    setImg(e.target.files[0])
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <img
                  width={"300px"}
                  height={"300px"}
                  src={imgUrl}
                  alt="image not selected"
                />
              </Grid> */}
              <Grid item sm={12}>
                <PhoneInput
                  defaultCountry="IN"
                  fullWidth
                  value={number}
                  onChange={setNumber}
                  placeholder="Enter Phone Number"
                  // height='100px'
                />
              </Grid>
              <div id="recaptcha-container"></div>
            </Grid>
            <Button
              onClick={getOtp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#07055c" }}
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
              sx={{ mt: 3, mb: 2, backgroundColor: "#07055c" }}
            >
              Verify
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
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