const express = require('express');
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json({ extended: false }));


app.get('/get-razorpay-key', (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
});

app.post('/create-order', async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: req.body.amount,
            currency: 'INR',
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send('Some error occured');
        res.send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/pay-order', async (req, res) => {
    try {
        const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
            req.body;
        res.send({
            msg: 'Payment was successfull',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`server started on http://localhost:${port}`)
);