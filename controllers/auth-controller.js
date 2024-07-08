const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");

module.exports.register = tryCatch(async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  console.log(req.body);
  const findEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (findEmail) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    firstname: firstname,
    lastname: lastname,
    password: hashedPassword,
    email: email
  };

  await prisma.user.create({ data: user });

  res.status(201).json({ message: "Registered" });
});

module.exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  console.log("body",req.body)
  if (!email) {
    throw customError('use teacher or student code', 400)
  }
  if (!password) {
    throw (customError("fill all blank inputs", 400));
  }

  const rs = await prisma.user.findUnique({ where: { email: email } })
   console.log("user",rs)
  let loginOk = await bcrypt.compare(password, rs.password)
  console.log("status Login",loginOk)
  if (!loginOk) {
    throw (customError('invalid login', 400))
  }

  const payload = { id: rs.id, firstname: rs.firstname }

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
  res.json(token)
})

module.exports.getme = tryCatch(async (req, res, next) => {
  const cart = await prisma.user.findMany({
    where: { id: req.user.id },
    include:{
      cart:{
        include:{lend:{
          include:{loan:true}
        }}
      }
    }
  })
  // console.log(cart)
  res.json({ data: cart })
})