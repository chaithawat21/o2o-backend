const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");
const customError = require("../utils/customError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



module.exports.getloan = tryCatch(async(req,res,next) => {
    const rs =await prisma.loan.findMany({
        include:{borrower:true}
    })
    res.json(rs)
})