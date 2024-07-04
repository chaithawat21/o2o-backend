const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync('123456', 10)

// const test = [
//     { firstname: 'test',t_code:'t001',  password: hashedPassword, email: 'test@gmail.com'},
// ]

// async function run() {
//     await prisma.test.createMany({data: test})
// }
// run()
