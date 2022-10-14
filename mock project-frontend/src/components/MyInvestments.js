// ****************************************************
// This component is responsible for showing details of investment done by you in various start-up
// **************************************************
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { app } from "../firebase-config";
import {
  query,
  where,
  collection,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import Navbar from "./Navbar";
const db = getFirestore(app);
export default function MyInvestments() {
  const useremailid = localStorage.getItem("useremail");
  const [postLists, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(
        collection(db, "transaction"),
        where("sender", "==", useremailid)
      );
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(
        "this is data from firebase regarding investment done by logged in user"
      );
      console.log(postLists);
    };

    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="homePage">
        {/* <Container maxWidth="sm"> */}
        <br></br>
        {postLists.length == 0 ? (
          <h2>Loading details, please wait</h2>
        ) : (
          postLists.map((post) => {
            return (
              <>
                <Card sx={{ maxWidth: 350 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Date of investment : {post.date}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Amount you invested : {post.amount}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Receiver : {post.receiver}
                    </Typography>
                  </CardContent>
                </Card>
                <br></br>
              </>
            );
          })
        )}
      </div>
    </>
  );
}
