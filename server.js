require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer"); // nodemailer for contact email
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const bodyParser = require('body-parser');
const prisma = require("./models");
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");
const contactRoute = require("./routes/contactRoute");

const authRoute = require('./routes/authRount');
const loanRoute = require('./routes/loanRout');
const userRoute = require('./routes/userRoute');
const lendRoute = require('./routes/lendRoute');

const app = express()


app.use(cors());

app.use(express.json());
// image
app.use("/pubblic", express.static('public'))

// user
app.use("/auth", authRoute);

// contact
app.use("/contact", contactRoute);

// Basket 
app.use("/loan", loanRoute)
app.use("/lend", authenticate, lendRoute)
app.use("/user", authenticate, userRoute)
// checkout
// app.use(express.static('public'));
const YOUR_DOMAIN = 'http://localhost:8888';
app.post('/create-checkout-session', async (req, res) => {
  console.log(req.body.totalAmount)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      line_items: [
        {
          price_data: {
            currency: 'thb', 
            product_data: {
              name: 'Product Name', 
            },
            unit_amount: req.body.totalAmount * 100, 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url,status: "success" });
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
