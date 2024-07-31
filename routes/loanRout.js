const express = require('express')
const loanController = require('../controllers/loanController')

const loanRoute = express.Router()

loanRoute.get('/getloan',loanController.getloan)
loanRoute.get('/getLoanById/:id',loanController.getLoanById)

module.exports  = loanRoute