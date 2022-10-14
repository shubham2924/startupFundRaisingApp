// ****************************************************
// This component is only accessible for admin users to see all the transactions
// **************************************************
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

import { app } from "../firebase-config";
import {
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
const db = getFirestore(app);
function AllTransactions() {
    const [application, setApplication] = useState([]);
    const appsCollectionRef = collection(db, "transaction");
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
                {/***************************  All transactions *****************************/}
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