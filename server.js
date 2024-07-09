require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const prisma = require("./models");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const bodyParser = require('body-parser');
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");
const contactRoute = require("./routes/contactRoute");


const authRoute = require('./routes/authRount');
const loanRoute = require('./routes/loanRout');
const userRoute = require('./routes/userRoute');
const lendRoute = require('./routes/lendRoute')

const app = express();

app.use(cors());

app.use(express.json());
// image
app.use("/pubblic",express.static('public'))

app.use("/auth", authRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/about",contactRoute);

// wit 
app.use("/loan", loanRoute)
app.use("/lend",authenticate,lendRoute)
app.use("/user",authenticate,userRoute)

// checkout
// app.use(express.static('public'));
const YOUR_DOMAIN = 'http://localhost:8888';
app.post('/create-checkout-session', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1PabU1Rr9hKeVi7FNfkqgYXx', // แทนที่ด้วย Price ID ที่แท้จริง
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
  
      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// not found
app.use(notFound);
// error
app.use(errorMiddleware);

const port = process.env.PORT || 8000
app.listen(port, () => console.log("server on", port));
