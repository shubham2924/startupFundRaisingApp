import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
import axios from "axios";
import { app } from "../firebase-config";
import {
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { margin } from "@mui/system";
import Footer from "./Footer";
const db = getFirestore(app);
function AllTransactions() {
    const [application, setApplication] = useState([]);
    const appsCollectionRef = collection(db, "transaction");
    const [orderAmount, setOrderAmount] = useState(0);
    useEffect(() => {
      const getPosts = async () => {
        const data = await getDocs(appsCollectionRef);
        setApplication(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log("this is data from firebase");
        console.log(application);
      };
  
      getPosts();
    }, []);
  return (
    <>
    <Navbar />
    <div style={{marginTop:"350px"}}></div>

    <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {application.length == 0 ? (
          <h1>please wait</h1>
        ) : (
          application.map((apps, index) => {
            return (
              <div style={{ width: "30%", height: "30%" }}>
                <Card sx={{ maxWidth: 350 }}>
                  
                  <CardContent>
                    <Typography
                      style={{ color: "#f00" }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {/* <h5></h5> */}
                      <h5>
                        {" "}
                        <b>Sender : {apps.sender} </b>
                      </h5>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Receiver:{apps.receiver}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Amount : {apps.amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date:{apps.date}
                    </Typography>
                  </CardContent>
                  <CardActions>&nbsp;</CardActions>
                  <CardActions>  
                  </CardActions>
                </Card>
                {/***************************  investment card *****************************/}
                <br></br>
              </div>
            );
          })
        )}
      </div>


    </>
  )
}

export default AllTransactions