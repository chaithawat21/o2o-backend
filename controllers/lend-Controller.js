const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");

module.exports.getlendById = tryCatch(async (req, res) => {
    // console.log(req.user)
    const lend = await prisma.lend.findMany({
        where: { user_id: req.user.id, status: false },
        include: {
            loan: {
                include: { categories: true }
            }
        }
    })
    res.json(lend)
})

module.exports.updatelend = tryCatch(async (req, res) => {
    const { id, newAmount } = req.body
    // console.log(id,newAmount)
    const rs = await prisma.lend.update({
        where: { id: id },
        data: { amount: newAmount }
    })
    res.json(rs)
})

module.exports.deleteLend = tryCatch(async (req, res) => {
    const {id} = req.params
    console.log("Delete Lend ID:",+id)
    const rs = await prisma.lend.delete({
        where: {id : +id}
    })
    res.json(rs)
})

module.exports.checkout = tryCatch(async (req, res) => {
    const { success } = req.body
    console.log(success)

    const his = await prisma.history.create({
        data: {
            user_id: req.user.id
        }
    })
    const rs = await prisma.lend.updateMany({
        where: {
            user_id: req.user.id,
            status: false
        },
        data: {
            history_id: his.id,
            status: success,
            
        }
    })
    res.json(rs)
})