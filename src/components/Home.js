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
const Home = () => {
  const [application, setApplication] = useState([]);
  const appsCollectionRef = collection(db, "users");
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

  const useremailid = localStorage.getItem("useremail");
  

  const deletePost = async (id) => {
    const postDoc = doc(db, "users", id);
    await deleteDoc(postDoc);
    window.location.reload();
    // navigate("/home");
  };

  //************************(START) all razorpay functionality*********************//

  function loadRazorpay(index) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        // setLoading(true);
        const result = await axios.post("http://localhost:5000/create-order", {
          amount: orderAmount + "00",
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get("http://localhost:5000/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "example name",
          description: "example transaction",
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post("http://localhost:5000/pay-order", {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
            // fetchOrders();
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "111111",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        // setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        const useremailid = localStorage.getItem("useremail");
        


        const current = new Date();
        const date = `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()}`;
        // writing logic to store data of the transaction in a new collection of firestore
        
        await addDoc(collection(db, "transaction"), {
          amount: amount,
          sender: useremailid,
          date: date,
          receiver: application[index].companyEmail,
          receiveruseremail: application[index].email
        });
      } catch (err) {
        alert(err);
        // setLoading(false);
      }
    };
    document.body.appendChild(script);
  }
  //************************(END) all razorpay functionality*********************//

  const { logOut, user } = useUserAuth();
  console.log("logging user details");
  console.log(user);
  const navigate = useNavigate();

  return (
    <>
      <h2>See all start-ups here</h2>
      <Navbar />

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
                  {/* <CardMedia
        component="img"
        height="140"
        
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="ABC Comapny"
      /> */}
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
                        <b> {apps.companyName} </b>
                      </h5>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {apps.companyDesc}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {apps.companyEmail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Doamin:{apps.companyDomain}
                    </Typography>
                  </CardContent>
                  <CardActions>&nbsp;</CardActions>
                  <CardActions>
                  {useremailid!=`${apps.email}`?
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      type="number"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(e.target.value)}
                      placeholder="Enter Amount"
                    />:
                    ""}
                    &nbsp; &nbsp; &nbsp;
                    {useremailid!=`${apps.email}`?
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => loadRazorpay(index)}
                      size="medium"
                    >
                      Pay Now
                    </Button>
                    :
                    ""}
                    {useremailid=="admin@gmail.com"?
                    <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      deletePost(apps.id);
                    }}
                    size="medium"
                  >
                    Delete
                  </Button>
                    :
                    ""}
                    
                  </CardActions>
                </Card>
                {/***************************  investment card *****************************/}
                <br></br>
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
