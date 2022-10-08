import React, {useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {MenuItem, Select} from "@mui/material";
import{InputLabel} from "@mui/material";
import {FormControl} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from "./Navbar";





const theme = createTheme();

export default function CreatePost() {
 
  const handleSubmit = (event) => {
    event.preventDefault();

   
    const data = new FormData(event.currentTarget);
  }
  const [age, setAge] = useState('')
  
    const handleChange = (event) => {
      setAge(event.target.value);
    }
    const [value, setValue] = useState(null);

    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
      if (images.length > 1) return;
      const newImageURLs = [];
      images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
      setImageURLs(newImageURLs);},
      [images]);

    function onImageChange(event) {
        setImages([event.target.files]);
        }
    
    
   return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Navbar/>
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
            Registration
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="companyName"
                  required
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                
              <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
              <InputLabel id="domain" required >Company Domain</InputLabel>
              <Select
                labelId="domain"
                id="domain"
                value={age}
                label="Company Domain"
                onChange={handleChange}
              >
              <MenuItem value={1}>Medical</MenuItem>
              <MenuItem value={2}>Educational</MenuItem>
              <MenuItem value={3}>Finance</MenuItem>
              </Select>
                </FormControl>
                    </Box></Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label=" Company Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              autoFocus
              label="Date of Establishment" 
              value={value}
              onChange={(newValue) => {
              setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="desc"
                  label=" Company Description"
                  name="desc"
                  autoComplete="desc"
                  autoFocus
                />
              </Grid>

              <Grid item xs={8} >
              <TextField 
               InputLabelProps={{
                shrink: true,
              }}
              required
              label="Company Logo"  
              input type="file" multiple accept="image/*" onChange={onImageChange} />
              { imageURLs.map(imageSrc=> <img src={imageSrc} alt="image" /> )}
              </Grid>
              
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I declare that the information provided is legit and correct."
                />
              </Grid>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              </Box>
        </Box>
       </Container>
    </ThemeProvider>
  );
}