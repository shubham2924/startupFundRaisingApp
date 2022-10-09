import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
import { app } from "../firebase-config";
import {addDoc, collection,getFirestore, setDoc, doc, getDocs} from 'firebase/firestore';
const db=getFirestore(app)
const Home = () => {
  const [application,setApplication] = useState([]);
  const appsCollectionRef = collection(db, "users");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(appsCollectionRef);
      setApplication(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(application);
    };

    getPosts();
  }, []);
  const { logOut, user } = useUserAuth();
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
    <Navbar />
    {/* {application.length == 0 ? (
            <p>fetching data, please wait</p>
          ) : (
            application.map((post) => {
              return (
                <h1>{post.DOI}</h1>
              );
            })
          )} */}
          {application.length==0?(
            <h1>please wait</h1>
          ):(
            application.map((apps)=>{
              return(
                <>
                <p>{apps.fname}</p>
                <p>{apps.companyDesc}</p>
                <p>{apps.companyDomain}</p>
                <p>{apps.companyEmail}</p>
                <p>{apps.companyName}</p>
                <hr></hr>
                </>
              )
            })
          )}
      <div className="p-4 box mt-3 text-center">
        Hello Welcome to home page<br />
        {/* {user && user.email}
        <p>${user.email}</p> */}
        
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;