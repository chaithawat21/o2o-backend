const express = require('express')
const searchRoute = express.Router()
const searchController = require('../controllers/search-controller')

// get search type
searchRoute.get('/type',searchController.getTypeSearch)

// search
searchRoute.get('/:province',searchController.getLoanUserOnSearch)

// by Id
searchRoute.get('/getLoan/:id',searchController.getLoanById)



module.exports = searchRoute