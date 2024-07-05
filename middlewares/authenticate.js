const jwt =require('jsonwebtoken')
const prisma = require("../models");
const customError = require('../utils/customError')
const tryCatch = require('../utils/tryCatch')


module.exports = tryCatch(async (req, res, next) => {


    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw customError("Unauthorized", 401);
    }
    const token = authorization.split(" ")[1];
    // console.log(token)
    if (!token) {
      throw customError("Unauthorized", 401);
    }

    const {id,firstname} = jwt.verify(token,process.env.JWT_SECRET)
    const rs = await prisma.user.findFirst({
      where: {
        firstname: firstname
      }
    })
    delete rs.password;
    req.user = rs
    next()
});


