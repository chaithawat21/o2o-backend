const express = require('express')
const lendController = require('../controllers/lend-Controller')
const lendRoute = express.Router()

lendRoute.get("/",lendController.getlendById)
lendRoute.put("/",lendController.updatelend)
lendRoute.delete("/:id",lendController.deleteLend)
lendRoute.put("/checkout",lendController.checkout)
lendRoute.put("/updatetotalamount",lendController.updateTotalAmountLoan)

module.exports = lendRoute