const prisma = require("../models")
const customError = require("../utils/customError")
const tryCatch = require("../utils/tryCatch")


module.exports.getDonateByUser = tryCatch(async (req,res) => {
    console.log("GET Doante..")

    const rs = await prisma.donate.findMany({
        where: {
            user_id: req.user.id,
            status: false
        }
    })
    res.json(rs)
})

module.exports.donate = tryCatch(async (req,res) => {
    const value = req.body
    // console.log(value)
    const donateUser = await prisma.donate.findMany({
        where: {
            user_id: req.user.id,
            status: false
        }
    })
    if(donateUser.length === 0){

        const rs = await prisma.donate.create({
            data: {
                user_id: req.user.id,
                amount: +value.value
            }
        })
      res.json(rs)
    }else{
        throw customError("Donations have been added.", 400);
    }
})

module.exports.updateDonate = tryCatch(async (req, res) => {
    const { id, newAmount } = req.body
    console.log(id,newAmount)
    console.log("Update Doante..")

    // const rs = await prisma.lend.update({
    //     where: { id: id },
    //     data: { amount: newAmount }
    // })
    // res.json(rs)
})