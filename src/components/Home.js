import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
const Home = () => {
  
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