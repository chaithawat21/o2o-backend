const express = require('express')
const userRoute = express.Router()
const userController = require("../controllers/user-controller")
const upload = require("../middlewares/upload")

userRoute.put('/updateProfile', upload.single('file'), userController.updateProfile);

module.exports = userRoute