import React, { useState, useEffect } from "react";
import { app } from "../firebase-config";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  query,
  where,
  collection,
  getFirestore,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import Navbar from "./Navbar";
const db = getFirestore(app);
export default function MyFunds() {
  const useremailid = localStorage.getItem("useremail");
  const [postLists, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(
        collection(db, "transaction"),
        where("receiveruseremail", "==", useremailid)
      );
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(
        "this is data from firebase regarding investment done in logged in user"
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
                {/* {post.amount}
                {post.sender}
                {post.date} */}
                <Card sx={{ maxWidth: 350 }}>
                  {/* <CardMedia
        component="img"
        height="140"
        
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="ABC Comapny"
      /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Date of investment : {post.date}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Amount you recieved : {post.amount}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Sender : {post.receiver}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            );
          })
        )}
        {/* </Container> */}
      </div>
    </>
  );
}
