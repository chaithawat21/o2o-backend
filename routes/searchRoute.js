const express = require('express')
const searchRoute = express.Router()
const searchController = require('../controllers/search-controller')

// get search type
searchRoute.get('/type',searchController.getTypeSearch)

// search
searchRoute.get('/province/:province',searchController.getLoanUserOnSearch)
searchRoute.get('/categorie/:categorie',searchController.getLoanUserOnSearch)
searchRoute.get('/region/:region',searchController.getLoanUserOnSearch)
searchRoute.get('/loan/:loan',searchController.getLoanUserOnSearch)

searchRoute.get('/getAmountAllId',searchController.getAmountAllId)


module.exports = searchRoute