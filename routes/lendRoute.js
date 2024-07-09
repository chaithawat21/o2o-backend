const express = require('express')
const lendController = require('../controllers/lend-Controller')
const lendRoute = express.Router()

lendRoute.get("/",lendController.getlendById)
lendRoute.put("/",lendController.updatelend)


module.exports = lendRoute