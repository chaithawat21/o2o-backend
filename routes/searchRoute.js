const express = require('express')
const searchRoute = express.Router()
const searchController = require('../controllers/search-controller')

searchRoute.get('/',searchController.getSearch)
// searchRoute.get('/',searchController.getSearch)

module.exports = searchRoute