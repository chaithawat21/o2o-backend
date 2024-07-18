const express = require('express')
const donateController = require("../controllers/donate-controller")

const DonateRoute = express.Router()

DonateRoute.get("/",donateController.getDonateByUser)
DonateRoute.post("/",donateController.donate)
DonateRoute.put("/",donateController.updateDonate)
DonateRoute.delete("/:id",donateController.deleteDonate)



module.exports = DonateRoute