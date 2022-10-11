import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
import axios from 'axios';
import { app } from "../firebase-config";
import {addDoc, collection,getFirestore, setDoc, doc, getDocs} from 'firebase/firestore';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const db=getFirestore(app)
const Home = () => {
  const [application,setApplication] = useState([]);
  const appsCollectionRef = collection(db, "users");
  const [orderAmount, setOrderAmount] = useState(0);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(appsCollectionRef);
      setApplication(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("this is data from firebase")
      console.log(application);
    };

    getPosts();
  }, []);

  //************************(START) all razorpay functionality*********************//
  // function loadRazorpay() {
  //   const script = document.createElement('script');
  //   script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  //   script.onerror = () => {
  //     alert('Razorpay SDK failed to load. Are you online?');
  //   };
  //   script.onload = async () => {
  //     try {
  //       // setLoading(true);
  //       const result = await axios.post('http://localhost:5000/create-order', {
  //         amount: orderAmount + '00' ,
  //       });
  //       console.log("logging result after create-order route");
  //       console.log(result.data)
  //       const { amount, id: order_id, currency } = result.data;
  //       const {
  //         data: { key: razorpayKey },
  //       } = await axios.get('http://localhost:5000/get-razorpay-key');

  //       const options = {
  //         key: razorpayKey,
  //         amount: amount.toString(),
  //         currency: currency,
  //         name: 'example name',
  //         description: 'example transaction',
  //         order_id: order_id,
  //         handler: async function (response) {
  //           const result = await axios.post('http://localhost:5000/pay-order', {
  //             amount: amount,
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //           });
  //           alert(result.data.msg);
  //           // fetchOrders();
  //         },
  //         prefill: {
  //           name: 'example name',
  //           email: 'email@example.com',
  //           contact: '111111',
  //         },
  //         notes: {
  //           address: 'example address',
  //         },
  //         theme: {
  //           color: '#80c0f0',
  //         },
  //       };

  //       // setLoading(false);
  //       const paymentObject = new window.Razorpay(options);
  //       console.log("opening payments page powered by razorpay")
  //       paymentObject.open();
  //     } catch (err) {
  //       alert(err);
  //       // setLoading(false);
  //     }
  //   };
  //   document.body.appendChild(script);
  // }
    function loadRazorpay(index) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        // setLoading(true);
        const result = await axios.post('http://localhost:5000/create-order', {
          amount: orderAmount + '00',
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('http://localhost:5000/get-razorpay-key');

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post('http://localhost:5000/pay-order', {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
            // fetchOrders();
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '111111',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        // setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        const useremailid = localStorage.getItem("useremail");
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        // writing logic to store data of the transaction in a new collection of firestore
        // await setDoc(doc(db, "transaction", useremailid), {
        //   amount: amount,
        //   sender: useremailid,
        //   date: date,
        //   receiver: application[index].companyEmail
        // });

        await addDoc(collection(db,"transaction"),{
          amount: amount,
          sender: useremailid,
          date: date,
          receiver: application[index].companyEmail
        })



      } catch (err) {
        alert(err);
        // setLoading(false);
      }
    };
    document.body.appendChild(script);
  }
  //************************(END) all razorpay functionality*********************//


  const { logOut, user } = useUserAuth();
  console.log("logging user details")
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
    <br></br><br></br><br></br><br></br><br></br>
    <h2>See all start-ups here</h2>
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
            application.map((apps, index)=>{
              return(
                <>
                {/* <p>{apps.fname}</p>
                <p>{apps.companyDesc}</p>
                <p>{apps.companyDomain}</p>
                <p>{apps.companyEmail}</p>
                <p>{apps.companyName}</p>
                <h2> Pay Order</h2>
        <label>
          Amount:{' '}
          <input
            placeholder="INR"
            type="number"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
          ></input>
        </label>

        <button onClick={loadRazorpay}>
          Razorpay
        </button> */}
        {/* older version of cards */}
        {/* <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {apps.companyDesc}
      </Typography>
      <Typography variant="h5" component="div">
      {apps.companyDomain}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {apps.companyEmail}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {apps.fname}
      </Typography>
      <Typography variant="body2">
      {apps.companyName}
        <br />
        
      </Typography>
    </CardContent>
        <label>
           Amount:{' '}
          <input
            placeholder="INR"
            type="number"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
          ></input>
        </label>
    <CardActions>
      <Button onClick={()=>loadRazorpay(index)} size="small">Pay Now</Button>
    </CardActions> */}

    <Card sx={{ maxWidth: 350 }}>
      {/* <CardMedia
        component="img"
        height="140"
        
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="ABC Comapny"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {apps.companyName}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {apps.companyDesc}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {apps.companyEmail}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Doamin:{apps.companyDomain}
        </Typography>
      </CardContent>
      <CardActions>

      
      &nbsp;
      </CardActions>
      <CardActions>
    
      
      
      <OutlinedInput
            id="outlined-adornment-amount"
            type='number'
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
            placeholder="Enter Amount"
          /> 
       &nbsp;
       &nbsp;
       &nbsp;

      
      <Button variant="contained" color="success" onClick={()=>loadRazorpay(index)} size='medium'>Pay Now</Button>
  

       
      </CardActions>
    </Card>
    {/***************************  investment card *****************************/}
                <hr></hr>
                </>
              )
            })
        //     <>
        //     <label>
        //   Amount:{' '}
        //   <input
        //     placeholder="INR"
        //     type="number"
        //     value={orderAmount}
        //     onChange={(e) => setOrderAmount(e.target.value)}
        //   ></input>
        // </label>

        // <button onClick={loadRazorpay}>
        //   Razorpay
        // </button>
        //     </>
          )}
      
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;