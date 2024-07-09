const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");

module.exports.getlendById = tryCatch(async(req,res) => {
    // console.log(req.user)
    const cartid = await prisma.cart.findFirst({
        where: {lender_id: req.user.id},
        select: {id:true}
    })
    const lend = await prisma.lend.findMany({
        where: {cart_id: cartid.id},
        include: {loan:true}
    })
    res.json(lend)
})

module.exports.updatelend = tryCatch(async(req,res) => {
    const {id,newAmount} = req.body
    // console.log(id,newAmount)
    const rs = await prisma.lend.update({
        where: {id: id},
        data: {amount: newAmount}
    })
    res.json(rs)
})