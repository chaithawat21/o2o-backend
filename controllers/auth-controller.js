const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports.register = tryCatch(async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  // console.log(req.body);
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
    verificationToken,
  };

  await prisma.user.create({ data: user });

  await sendVerificationEmail(email, verificationToken);

  res.status(201).json({ message: "Registered" });
});

async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    // Configure your email provider here
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'westley.botsford56@ethereal.email',
        pass: 'uNDX2ZHJzk5NYFTAcW'
    }
  });

  const mailOptions = {
    from: {email},
    to: email,
    subject: 'Verify your email address',
    html: `<p>Click <a href="http://localhost:8888/auth/verify/${token}">here</a> to verify your email address.</p>`
  };

  await transporter.sendMail(mailOptions);
}

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
  //  console.log("user",rs)
  let loginOk = await bcrypt.compare(password, rs.password);
  // console.log("status Login",loginOk)
  if (!loginOk) {
    throw customError("invalid login", 400);
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