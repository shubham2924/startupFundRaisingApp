import React, { useState, useEffect } from "react";
import { app } from "../firebase-config";
import {query, where, collection,getFirestore, setDoc, doc, getDocs} from 'firebase/firestore';
const db=getFirestore(app)
export default function MyFunds() {
    const useremailid = localStorage.getItem("useremail");
    const [postLists, setPostList] = useState([]);
    


    useEffect(() => {
        const getPosts = async () => {
          const q = query(collection(db,"transaction"), where("receiver","==",useremailid));
          const data = await getDocs(q);
          setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          console.log("this is data from firebase regarding investment done in logged in user")
          console.log(postLists);
        };
    
        getPosts();
      }, []);


  return (
    <>
      <div className="homePage">
        {/* <Container maxWidth="sm"> */}
          <br></br>
          {postLists.length == 0 ? (
            <h2>Loading details, please wait</h2>
          ) : (
            postLists.map((post) => {
              return (
                <>
                {post.amount}
                {post.sender}
                {post.date}
                </>
                // <Box display="inline-block">
                //   <Card variant="outlined" sx={{ minWidth: 375 }}>
                //     <CardContent>
                //       <Typography
                //         sx={{ fontSize: 24 }}
                //         color="text.secondary"
                //         gutterBottom
                //       >
                //         {post.title}
                //       </Typography>
                //       <Typography variant="h6" component="div">
                //         Posted by : @{post.author.name}
                //       </Typography>

                //       <Typography variant="body2">
                //         {post.desc}
                //         <br />
                //         <br></br>
                //       </Typography>
                //       <Typography sx={{ mb: 1.5 }} color="text.secondary">
                //         Published on : {post.postdate.date}
                //       </Typography>
                //     </CardContent>
                //     &nbsp;&nbsp;&nbsp;
                //     {authh && post.author.id === auth.currentUser.uid && (
                //       <Button
                //         onClick={() => {
                //           deletePost(post.id);
                //         }}
                //         variant="outlined"
                //         startIcon={<DeleteIcon />}
                //       >
                //         Delete
                //       </Button>
                //     )}
                //     <br></br>
                //     <br></br>
                //   </Card><br></br>
                // </Box>
              );
            })
          )}
        {/* </Container> */}
      </div>
    </>
  )
}
