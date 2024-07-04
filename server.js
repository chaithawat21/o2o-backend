require('dotenv').config()
const express =require('express')
const cors = require('cors')
const jwt =require('jsonwebtoken')
const prisma = require("./models");

const notFound = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')
const authenticate = require('./middlewares/authenticate');

const app = express()

app.use(cors())

app.use(express.json())


// app.use('/test', testRoute)


// not found
app.use( notFound )
// error
app.use(errorMiddleware)

const port = process.env.PORT
app.listen(port, () => console.log('server on', port))