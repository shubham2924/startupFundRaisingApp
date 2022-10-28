import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Navbar from "./Navbar";
import { doc, updateDoc } from "firebase/firestore";
import { auth, app } from "../firebase-config";
import { getFirestore } from "firebase/firestore";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const db = getFirestore(app);
const domains = [
  {
    value: "Educational",
    label: "Educational",
  },
  {
    value: "Finance",
    label: "Finance",
  },
  {
    value: "Medical",
    label: "Medical",
  },
  {
    value: "Technology",
    label: "Technology",
  },
];

const theme = createTheme();

export default function Registration() {
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const compName = useRef(null);
  const compDomain = useRef(null);
  const compEmail = useRef(null);
  const compDOI = useRef(null);
  const compDesc = useRef(null);
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [imageURL, setImageURL] = useState("");
  const useremailid = localStorage.getItem("useremail");
  const collectionRef = doc(db, "users", useremailid);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target[0].files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress =
        //   Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // setProgresspercent(progress);
        console.log(snapshot);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // setImageURL(downloadURL);
          await updateDoc(collectionRef, {
            companyDesc: desc,
            companyName: companyName,
            companyEmail: companyEmail,
            companyDomain: domain,
            DOI: value.$d,
            imageurl: downloadURL,
          });
        });
      }
    );

    console.log(desc);
    console.log(companyName);
    console.log(value.$d);
    console.log(useremailid);
    console.log(domain);
    event.target.reset();
    navigate("/home");
    localStorage.setItem("registered", true);
  };
  const [domain, setDomain] = React.useState("");

  const handleChange = (event) => {
    setDomain(event.target.value);
  };
  const [value, setValue] = useState(null);

  // const [images, setImages] = useState([]);
  //.......currently not in use function, kept for future reference........//
  // function onImageChange(event) {
  //   setImages([event.target.files]);
  // }
  const isregistered = localStorage.getItem("registered");
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Navbar />
        {isregistered ? (
          <h2>Already registered</h2>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    label="Company Logo"
                    input
                    type="file"
                    multiple
                    accept="image/*"
                    // onChange={onImageChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    ref={compName}
                    autoComplete="given-name"
                    name="companyName"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    autoFocus
                    onChange={(event) => {
                      setCompanyName(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <TextField
                        ref={compDomain}
                        id="domain"
                        select
                        required
                        label="Company Domain"
                        value={domain}
                        onChange={handleChange}
                        // helperText="Please select your Domain"
                      >
                        {domains.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    ref={compEmail}
                    required
                    fullWidth
                    id="email"
                    label=" Company Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => {
                      setCompanyEmail(event.target.value);
                    }}
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
                      renderInput={(params) => (
                        <TextField ref={compDOI} {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    ref={compDesc}
                    required
                    fullWidth
                    id="desc"
                    label=" Company Description"
                    name="desc"
                    autoComplete="desc"
                    autoFocus
                    onChange={(event) => {
                      setDesc(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
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
        )}
      </Container>
    </ThemeProvider>
  );
}
