const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {sendConfirmationEmail} = require("../utils/mailer");

module.exports.register = tryCatch(async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  console.log(req.body);
  const findEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (findEmail) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const verificationToken = crypto.randomBytes(20).toString('hex');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    firstname: firstname,
    lastname: lastname,
    password: hashedPassword,
    email: email,
    verificationToken
  };
  const newUser = await prisma.user.create({ data: user });
  try {
    await sendConfirmationEmail({ toUser: newUser, hash: verificationToken });
    res.status(201).json({ message: "Registered. Please check your email to activate your account." });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: "Error registering user. Please try again later." });
  }
});

module.exports.activation = tryCatch(async(req,res)=> {
  const {hashValue,verified} = req.body
  console.log("Request Body:",req.body)

  if (!hashValue || verified === undefined) {
    return res.status(400).json({ message: "Invalid request parameters" });
  }

  try {
    const rs = await prisma.user.updateMany({
      where: { verificationToken: hashValue },
      data:{
        verified
      }
    });

    console.log("Update Result:", rs);

    res.status(200).json({ message: "User verification updated successfully", data: rs });
  } catch (error) {
    console.error("Prisma Error:", error);
    res.status(500).json({ message: "An error occurred while updating user verification" });
  }
})

module.exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  // console.log("body",req.body)
  if (!email) {
    throw customError("Invalid Email or Password", 400);
  }
  if (!password) {
    throw customError("Invalid Email or Password", 400);
  }

  const rs = await prisma.user.findUnique({ where: { email: email } });
  //  console.log("user",rs.verified)

  let loginOk = await bcrypt.compare(password, rs.password);
  // console.log("status Login",loginOk)
  if (!loginOk) {
    throw customError("invalid login", 400);
  }
  if(rs.verified === 'false'){
    return res.json({msg:"Email has not been verified yet."});
   }
  const payload = { id: rs.id, firstname: rs.firstname };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json(token);
});

module.exports.getme = tryCatch(async (req, res, next) => {
  const user = await prisma.user.findMany({
    where: { id: req.user.id },
  });
  // console.log(cart)
  res.json({ user: user });
});