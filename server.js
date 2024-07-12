require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");
const contactRoute = require("./routes/contactRoute");

const authRoute = require('./routes/authRount');
const loanRoute = require('./routes/loanRout');
const userRoute = require('./routes/userRoute');
const lendRoute = require('./routes/lendRoute');
const searchRoute = require("./routes/searchRoute");

const app = express()
// socket.io
const chatRoute = require("./routes/chatRoute");
const chatSocket = require("./utils/chatSocket");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
// image
app.use("/pubblic", express.static('public'))

// user
app.use("/auth", authRoute);

// contact
app.use("/contact", contactRoute);


// search
app.use("/search",searchRoute)


// Basket 
app.use("/loan", loanRoute)
app.use("/lend", authenticate, lendRoute)
app.use("/user", authenticate, userRoute)

// checkout
// app.use(express.static('public'));
const YOUR_DOMAIN = 'http://localhost:5173/cart';
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
      success_url: `http://localhost:5173/success/?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.json({ url: session.url, status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // console.log('test')
});

// chatbot
app.use("/", chatRoute);
chatSocket(io);


// not found
app.use(notFound);
// error
app.use(errorMiddleware);

const port = process.env.PORT || 8000

// app.listen(port, () => console.log("server on", port));
server.listen(port, () => console.log("server on", port));
