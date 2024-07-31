require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const checkoutController = require("./controllers/checkout-Controller")

const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");
const contactRoute = require("./routes/contactRoute");

const authRoute = require('./routes/authRount');
const loanRoute = require('./routes/loanRout');
const userRoute = require('./routes/userRoute');
const lendRoute = require('./routes/lendRoute');
const searchRoute = require("./routes/searchRoute");
const DonateRoute = require("./routes/donateRoute");


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
// Serve static files
// Serve static files
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created upload directory:', uploadDir);
} else {
  console.log('Upload directory exists:', uploadDir);
}

app.use('/uploads', express.static(uploadDir));

// app.use("/pubblic", express.static('public'))

// user
app.use("/auth", authRoute);
app.use("/user", authenticate, userRoute)

// contact
app.use("/contact", contactRoute);


// search
app.use("/search",searchRoute)


// Basket 
app.use("/loan", loanRoute)
app.use("/lend", authenticate, lendRoute)
app.use("/donate",authenticate,DonateRoute)

// checkout
app.post('/create-checkout-session', checkoutController.checkout);

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
