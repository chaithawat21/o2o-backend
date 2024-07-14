const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { sendConfirmationEmail } = require("../utils/mailer");


module.exports.register = tryCatch(async (req, res) => {
  const { firstname, lastname, username, password, email } = req.body;
  console.log(req.body);
  const findEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (findEmail) {
    return res.status(409).json({ message: "Email already in use" });
  }


  const verificationToken = crypto.randomBytes(20).toString("hex");
  // console.log(verificationToken)
  // const newUser = new PendingUser

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: hashedPassword,
    email: email,
    verificationToken

  };
  const newUser = await prisma.user.create({ data: user });
  try {
    await sendConfirmationEmail({ toUser: newUser, hash: verificationToken });
    res.status(201).json({
      message: "Registered. Please check your email to activate your account.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error registering user. Please try again later." });
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
  if (!email) {
    throw customError("Invalid Email or Password", 400);
  }
  if (!password) {
    throw customError("Invalid Email or Password", 400);
  }

  const rs = await prisma.user.findUnique({ where: { email: email } });

  let loginOk = await bcrypt.compare(password, rs.password);
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
  try {
    const user = await prisma.user.findMany({
      where: { id: req.user.id },
    });
    res.json({ user: user });
  } catch (error) {
    console.log(error);
  }
});

module.exports.updateMe = tryCatch(async (req, res, next) => {
  const { firstname, lastname, username, phone_number, date_birth, address } = req.body;

  // Check if username already exists and is not the same as the current user's username
  const currentUser = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (username !== currentUser.username) {
    const findUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (findUsername) {
      return res.status(409).json({ message: "Username already in use" });
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstname,
        lastname,
        username,
        phone_number,
        date_birth: new Date(date_birth).toISOString(),
        address,
      },
    });

    // Generate a new token with updated user information
    const payload = { id: updatedUser.id, firstname: updatedUser.firstname };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

    // Send response with new token and updated user object
    res.json({ token, user: updatedUser });
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
});
