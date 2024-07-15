const express = require('express')
const userRoute = express.Router()
const userController = require("../controllers/user-controller")
const upload = require("../middlewares/upload")
const authenticate = require('../middlewares/authenticate')

userRoute.put('/updateProfile', authenticate, upload.single('file'), userController.updateProfile);


module.exports = userRoute