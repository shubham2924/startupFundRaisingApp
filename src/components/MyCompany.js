import React, { useState, useEffect } from "react";
import { app } from "../firebase-config";
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from "react-router-dom";
import {query, where, collection,getFirestore, setDoc, doc, getDocs, deleteDoc} from 'firebase/firestore';
import Navbar from "./Navbar";
const db=getFirestore(app)
function MyCompany() {
    let navigate = useNavigate();
    const useremailid = localStorage.getItem("useremail");
    const [postLists, setPostList] = useState([]);
    useEffect(()=>{
        async function myfunc(){
                const postsCollectionRef = collection(db, "users");
               
                // console.log(author)
                const q = query(postsCollectionRef, where("email", "==", useremailid));
                const data = await getDocs(q);
                data.forEach((user)=>{
                    console.log(user.data())
                })
                setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            }
            myfunc()
            console.log(postLists);
    },[]);
    const deletePost = async (id) => {
        const postDoc = doc(db, "users", id);
        await deleteDoc(postDoc);
        // window.location.reload();
        navigate("/home");
      };
  return (
    <>
    <Navbar/>
    {postLists.length == 0 ? (
        <>
            <h2>New User!</h2> 
            <p style={{textDecoration:"underline"}}><Link to="/createpost">Register your company</Link></p></>
          ) : (
            postLists.map((post) => {
              return (
                <Box display="inline-block">
                  <Card variant="outlined" sx={{ minWidth: 375 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 24 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="h6" component="div">
                        {post.companyName}
                      </Typography>

                      <Typography variant="body2">
                        {post.companyDesc}
                        <br />
                        <br></br>
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {post.companyDomain}
                      </Typography>
                    </CardContent>
                    &nbsp;&nbsp;&nbsp;
                    
                      <Button
                        onClick={() => {
                          deletePost(post.id);
                        }}
                        variant="outlined"
                        // startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    
                    <br></br>
                    <br></br>
                  </Card><br></br>
                </Box>
              );
            })
          )}
    </>
  )
}

export default MyCompany