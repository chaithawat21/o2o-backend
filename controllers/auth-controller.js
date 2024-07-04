const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");

module.exports.register = tryCatch(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(req.body);
  const findEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (findEmail) {
    throw customError(`Email already taken: ${email}`, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    firstname: firstname,
    lastname: lastname,
    password: hashedPassword,
    email: email,
  };

  await prisma.user.create({ data: user });

  res.status(201).json({ message: "Registered" });
});