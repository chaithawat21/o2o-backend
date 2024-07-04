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
    if (!token) {
      throw customError("Unauthorized", 401);
    }

    // const { id, s_code, t_code } = jwt.verify(token, process.env.JWT_SECRET);
    // const result = t_code
    //   ? await prisma.teacher.findUnique({ where: { t_code: t_code } })
    //   : await prisma.student.findUnique({ where: { s_code: s_code } });
    delete result.password;
    req.user = result
    next()


});


