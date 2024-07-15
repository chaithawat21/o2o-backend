const tryCatch = require("../utils/tryCatch");
const prisma = require("../models");

module.exports.addLend = tryCatch(async(req,res) => {
    const {id} = req.body
    // console.log(req.body)
    await prisma.lend.create({
        data: {
            user_id: req.user.id,
            loan_id: id
        }
    })
})

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
    const { id } = req.params
    console.log("Delete Lend ID:", +id)
    const rs = await prisma.lend.delete({
        where: { id: +id }
    })
    res.json(rs)
})

module.exports.checkout = tryCatch(async (req, res) => {
    const { success } = req.body
    const his = await prisma.history.create({
        data: {
            user_id: req.user.id,
            date: new Date().toISOString(),
        }
    })

    await prisma.lend.updateMany({
        where: {
            user_id: req.user.id,
            status: false
        },
        data: {
            history_id: his.id,
            status: success,
        }
    })
    await prisma.donate.updateMany({
        where: {
            user_id: req.user.id,
            status: false
        },
        data: {
            history_id: his.id,
            status: success,
        }
    })
    res.json(his)
})

module.exports.updateTotalAmountLoan = tryCatch(async (req, res) => {
    const { history } = (req.body)
    if (history) {
        const lenduser = await prisma.lend.findMany({
            where: { history_id: history },
            include: {
                loan: true
            }
        })

        const updatedLoans = new Set();

        for (const item of lenduser) {
            const loanId = item.loan.id;
            const lendAmount = item.amount;

            if (!updatedLoans.has(loanId)) {
                const newTotalAmount = item.loan.total_amount + lendAmount;

                await prisma.loan.update({
                    where: { id: loanId },
                    data: { total_amount: newTotalAmount },
                });

                console.log(`Updated total_amount for loan id ${loanId} to ${newTotalAmount}`);
                updatedLoans.add(loanId);
            }
        }
    }

})