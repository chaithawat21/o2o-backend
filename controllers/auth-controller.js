const bcrypt = require("bcryptjs");
const prisma = require("../models");
const customError = require("../utils/customError");

module.exports.register = async (req, res, next) => {
   console.log("register")
}