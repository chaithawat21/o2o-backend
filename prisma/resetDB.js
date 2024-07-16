require('dotenv').config()

const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database o2o')
  await prisma.$executeRawUnsafe('CREATE Database o2o')
}
console.log('Reset DB..')
run()
