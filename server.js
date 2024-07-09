require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const prisma = require("./models");

const bodyParser = require('body-parser');
const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-middleware");
const authenticate = require("./middlewares/authenticate");
const contactRoute = require("./routes/contactRoute");


const authRoute = require('./routes/authRount');
const loanRoute = require('./routes/loanRout');


const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoute);

// contact
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/contact",contactRoute);

// wit 
app.use("/loan", loanRoute)

// not found
app.use(notFound);
// error
app.use(errorMiddleware);

const port = process.env.PORT;
app.listen(port, () => console.log("server on", port));
