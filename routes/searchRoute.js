const express = require('express')
const searchRoute = express.Router()
const searchController = require('../controllers/search-controller')

// get search type
searchRoute.get('/type',searchController.getTypeSearch)

// search
searchRoute.get('/province/:province',searchController.getLoanUserOnSearch)
searchRoute.get('/categorie/:categorie',searchController.getLoanUserOnSearch)
searchRoute.get('/region/:region',searchController.getLoanUserOnSearch)


module.exports = searchRoute